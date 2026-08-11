// Ported 1:1 from tayseer-ai-ad.html's Three.js/GSAP scene — camera path, beat
// timing, easing, fade windows, lighting and object construction are preserved
// exactly. The only structural changes: the timeline plays once (no repeat),
// resources come from real npm packages + /public/intro/*.webp instead of
// vendored/base64 sources, and a handful of controller hooks were added
// (pointer parallax, visibility pause, dispose) that the source didn't need
// because it looped forever in its own standalone page.
import * as THREE from "three";
import gsap from "gsap";
import { introStrings, type CaptionIndex } from "./introStrings";

const BG = 0x060b16;
const NAVY_DEEP = 0x081226;
const BLUE = 0x2f6fef;
const GREEN = 0x38c172;

// Source's timeline content spans 16.45s; `timeScale` compresses that into
// TARGET_LOOP_SECONDS of real playback. Both constants are copied verbatim
// from the source's own AUTHORED_LOOP_SECONDS/TARGET_LOOP_SECONDS — the 5s
// wall-clock runtime is a *result* of this ratio, not an assumption.
const AUTHORED_LOOP_SECONDS = 16.45;
const TARGET_LOOP_SECONDS = 5;
const CAPTION_HIDE_AFTER = 15.3;

export interface IntroQuality {
  dpr: number;
  reducedEffects: boolean; // fewer particles, single halo ring, no rim glow — mobile/constrained tier
}

export interface IntroSceneCallbacks {
  onCaptionChange: (index: CaptionIndex | null) => void;
  onComplete: () => void;
}

export interface IntroScene {
  ready: Promise<void>;
  play: () => void;
  /** Stops the timeline and the render loop immediately, freezing the last drawn
   *  frame. Used both when the user skips and after the timeline completes
   *  naturally — in both cases nothing should keep animating. */
  stop: () => void;
  pauseRendering: () => void;
  resumeRendering: () => void;
  setPointerEnabled: (enabled: boolean) => void;
  setPointerTarget: (nx: number, ny: number) => void;
  resize: () => void;
  dispose: () => void;
}

function glowTexture(): THREE.CanvasTexture {
  const s = 128;
  const cnv = document.createElement("canvas");
  cnv.width = cnv.height = s;
  const ctx = cnv.getContext("2d")!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.55)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  return new THREE.CanvasTexture(cnv);
}

function makeGlowSprite(glowTex: THREE.Texture, color: number, size: number, opacity = 0.9): THREE.Sprite {
  const mat = new THREE.SpriteMaterial({ map: glowTex, color, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false });
  const spr = new THREE.Sprite(mat);
  spr.scale.set(size, size, 1);
  return spr;
}

function addRimGlow(mesh: THREE.Mesh, color: number, scale = 1.12, opacity = 0.35): THREE.Mesh {
  const g = (mesh.geometry as THREE.BufferGeometry).clone();
  const m = new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false });
  const rimMesh = new THREE.Mesh(g, m);
  rimMesh.scale.setScalar(scale);
  mesh.add(rimMesh);
  return rimMesh;
}

function roundedRectShape(w: number, h: number, r: number): THREE.Shape {
  const s = new THREE.Shape();
  const x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

function roundedPanel(w: number, h: number, depth: number, r: number): THREE.ExtrudeGeometry {
  const shape = roundedRectShape(w, h, r);
  const geo = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 3, curveSegments: 12 });
  geo.center();
  return geo;
}

type IconType = "fingerprint" | "wifi" | "chart" | "camera" | "ai" | "doc" | "bank";

function drawIcon(ctx: CanvasRenderingContext2D, type: IconType, cx: number, cy: number, r: number, color: string) {
  ctx.save(); ctx.translate(cx, cy); ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = Math.max(2, r * 0.12); ctx.lineCap = "round";
  if (type === "fingerprint") {
    for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(0, 2, r * 0.3 + i * r * 0.16, Math.PI * 1.15, Math.PI * 1.95); ctx.stroke(); }
  } else if (type === "wifi") {
    for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(0, r * 0.35, r * 0.25 + i * r * 0.24, Math.PI * 1.2, Math.PI * 1.8); ctx.stroke(); }
    ctx.beginPath(); ctx.arc(0, r * 0.35, r * 0.06, 0, 7); ctx.fill();
  } else if (type === "chart") {
    ctx.beginPath(); ctx.moveTo(-r * 0.4, r * 0.15); ctx.lineTo(-r * 0.4, r * 0.35); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, -r * 0.15); ctx.lineTo(0, r * 0.35); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(r * 0.4, -r * 0.3); ctx.lineTo(r * 0.4, r * 0.35); ctx.stroke();
  } else if (type === "camera") {
    ctx.beginPath(); ctx.roundRect(-r * 0.42, -r * 0.22, r * 0.84, r * 0.5, r * 0.1); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 0.05, r * 0.2, 0, 7); ctx.stroke();
  } else if (type === "ai") {
    ctx.font = "bold " + r * 0.62 + "px Arial"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("AI", 0, 2);
  } else if (type === "doc") {
    for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(-r * 0.35, -r * 0.25 + i * r * 0.28); ctx.lineTo(r * 0.35, -r * 0.25 + i * r * 0.28); ctx.stroke(); }
  } else if (type === "bank") {
    ctx.beginPath(); ctx.moveTo(-r * 0.45, r * 0.28); ctx.lineTo(r * 0.45, r * 0.28); ctx.stroke();
    for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(i * r * 0.18, -r * 0.05); ctx.lineTo(i * r * 0.18, r * 0.22); ctx.stroke(); }
    ctx.beginPath(); ctx.moveTo(-r * 0.5, -r * 0.1); ctx.lineTo(0, -r * 0.48); ctx.lineTo(r * 0.5, -r * 0.1); ctx.stroke();
  }
  ctx.restore();
}

// draws a source image into a canvas feathered to transparent at the edges (elliptical
// mask scaled to the canvas aspect) so a photographic asset blends into the 3D scene
// instead of reading as a pasted rectangle.
function featherImageTexture(img: HTMLImageElement, w: number, h: number, featherStart = 0.5): THREE.CanvasTexture {
  const cnv = document.createElement("canvas"); cnv.width = w; cnv.height = h;
  const ctx = cnv.getContext("2d")!;
  const scale = Math.max(w / img.width, h / img.height);
  const iw = img.width * scale, ih = img.height * scale;
  ctx.drawImage(img, (w - iw) / 2, (h - ih) / 2, iw, ih);
  ctx.globalCompositeOperation = "destination-in";
  ctx.save();
  ctx.translate(w / 2, h / 2);
  ctx.scale(w / 2, h / 2);
  const grad = ctx.createRadialGradient(0, 0, featherStart, 0, 0, 1.05);
  grad.addColorStop(0, "rgba(255,255,255,1)"); grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad; ctx.fillRect(-1, -1, 2, 2);
  ctx.restore();
  ctx.globalCompositeOperation = "source-over";
  return new THREE.CanvasTexture(cnv);
}

function loadImage(loader: THREE.ImageLoader, url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    loader.load(url, (img) => resolve(img as HTMLImageElement), undefined, reject);
  });
}

interface HaloUserData {
  waveArm: THREE.Object3D;
  haloRing: THREE.Mesh;
  haloRing2: THREE.Mesh | null;
  core: THREE.Mesh;
}

function buildAICharacter(robotImg: HTMLImageElement, glowTex: THREE.Texture, reducedEffects: boolean): THREE.Group & { userData: HaloUserData } {
  const g = new THREE.Group() as THREE.Group & { userData: HaloUserData };
  const aspect = robotImg.width / robotImg.height;
  const texH = 900, texW = Math.round(texH * aspect);
  const tex = featherImageTexture(robotImg, texW, texH, 0.5);
  const planeH = 1.7, planeW = planeH * aspect;
  const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true });
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(planeW, planeH), mat);
  plane.position.y = 0.25;
  g.add(plane);
  g.add((() => { const s = makeGlowSprite(glowTex, BLUE, 1.6, 0.4); s.position.set(0, 0.25, -0.05); return s; })());

  const haloRing = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.013, 8, 48), new THREE.MeshBasicMaterial({ color: BLUE, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending }));
  haloRing.position.y = 1.0; haloRing.rotation.x = Math.PI / 2.3; g.add(haloRing);

  let haloRing2: THREE.Mesh | null = null;
  if (!reducedEffects) {
    haloRing2 = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.01, 8, 48), new THREE.MeshBasicMaterial({ color: GREEN, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending }));
    haloRing2.position.y = -0.42; haloRing2.rotation.x = Math.PI / 2.3; g.add(haloRing2);
  }

  const waveArmDummy = new THREE.Object3D(); g.add(waveArmDummy);
  const coreDummy = new THREE.Mesh(new THREE.SphereGeometry(0.001), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  g.add(coreDummy);

  g.userData = { waveArm: waveArmDummy, haloRing, haloRing2, core: coreDummy };
  return g;
}

interface ShieldUserData { ring: THREE.Mesh; }

function buildShield(shieldImg: HTMLImageElement, glowTex: THREE.Texture): THREE.Group & { userData: ShieldUserData } {
  const g = new THREE.Group() as THREE.Group & { userData: ShieldUserData };
  const aspect = shieldImg.width / shieldImg.height;
  const texH = 900, texW = Math.round(texH * aspect);
  const tex = featherImageTexture(shieldImg, texW, texH, 0.5);
  const planeH = 1.9, planeW = planeH * aspect;
  const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true });
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(planeW, planeH), mat);
  g.add(plane);
  g.add((() => { const s = makeGlowSprite(glowTex, BLUE, 1.8, 0.45); s.position.z = -0.05; return s; })());

  const r1 = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.01, 8, 48), new THREE.MeshBasicMaterial({ color: BLUE, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending }));
  g.add(r1);
  g.userData = { ring: r1 };
  return g;
}

function buildPhone(diagramImg: HTMLImageElement, reducedEffects: boolean): THREE.Group {
  const g = new THREE.Group();
  const bodyGeo = roundedPanel(1.15, 2.3, 0.12, 0.16);
  const bodyMat = new THREE.MeshPhysicalMaterial({ color: 0x11182a, roughness: 0.3, metalness: 0.4, clearcoat: 0.6 });
  const body = new THREE.Mesh(bodyGeo, bodyMat); g.add(body);

  const screenGeo = new THREE.PlaneGeometry(1.0, 2.1);
  const cnv = document.createElement("canvas"); cnv.width = 300; cnv.height = 630;
  const ctx = cnv.getContext("2d")!;
  ctx.fillStyle = "#F4F7FC"; ctx.fillRect(0, 0, 300, 630);

  const headerH = 78;
  ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, 300, headerH);
  ctx.strokeStyle = "rgba(10,27,51,0.08)"; ctx.beginPath(); ctx.moveTo(0, headerH); ctx.lineTo(300, headerH); ctx.stroke();
  ctx.fillStyle = "#38C172";
  ctx.beginPath(); ctx.moveTo(20, 26); ctx.lineTo(30, 34); ctx.lineTo(20, 42); ctx.lineTo(24, 34); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(29, 26); ctx.lineTo(39, 34); ctx.lineTo(29, 42); ctx.lineTo(33, 34); ctx.closePath(); ctx.fill();
  ctx.fillStyle = "#0A1B33"; ctx.font = "bold 17px Arial"; ctx.textAlign = "left"; ctx.fillText("TAYSEER", 48, 39);
  ctx.fillStyle = "#2F6FEF"; ctx.beginPath(); ctx.roundRect(248, 20, 34, 28, 14); ctx.fill();
  ctx.strokeStyle = "#ffffff"; ctx.lineWidth = 1.6;
  ctx.beginPath(); ctx.moveTo(258, 30); ctx.lineTo(278, 30); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(258, 38); ctx.lineTo(272, 38); ctx.stroke();

  const pad = 12, diagW = 300 - pad * 2;
  const dAspect = diagramImg.width / diagramImg.height;
  const diagH = diagW / dAspect;
  const diagY = headerH + 22;
  ctx.save();
  ctx.shadowColor = "rgba(10,27,51,0.18)"; ctx.shadowBlur = 18; ctx.shadowOffsetY = 6;
  ctx.fillStyle = "#ffffff"; ctx.beginPath(); ctx.roundRect(pad, diagY, diagW, diagH, 14); ctx.fill();
  ctx.restore();
  ctx.save();
  ctx.beginPath(); ctx.roundRect(pad, diagY, diagW, diagH, 14); ctx.clip();
  ctx.drawImage(diagramImg, pad, diagY, diagW, diagH);
  ctx.restore();

  ctx.fillStyle = "#0A1B33"; ctx.font = "bold 17px Arial"; ctx.textAlign = "center";
  ctx.fillText("One connected banking", 150, diagY + diagH + 46);
  ctx.fillText("ecosystem.", 150, diagY + diagH + 68);
  ctx.fillStyle = "#5B6472"; ctx.font = "12px Arial";
  ctx.fillText("Core banking, AI and digital — unified.", 150, diagY + diagH + 92);

  const screenTex = new THREE.CanvasTexture(cnv);
  const screen = new THREE.Mesh(screenGeo, new THREE.MeshBasicMaterial({ map: screenTex, side: THREE.DoubleSide, toneMapped: false }));
  screen.position.z = 0.16; g.add(screen);
  if (!reducedEffects) addRimGlow(body, BLUE, 1.05, 0.16);
  return g;
}

function buildSitePanel(reducedEffects: boolean): THREE.Group {
  const g = new THREE.Group();
  const geo = new THREE.PlaneGeometry(4.6, 2.85);
  const canvas = document.createElement("canvas"); canvas.width = 1200; canvas.height = 745;
  const ctx = canvas.getContext("2d")!;
  const bgGrad = ctx.createLinearGradient(0, 0, 1200, 700); bgGrad.addColorStop(0, "#EEF3FC"); bgGrad.addColorStop(1, "#F7FAFF");
  ctx.fillStyle = bgGrad; ctx.fillRect(0, 0, 1200, 745);
  ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, 1200, 78);
  ctx.strokeStyle = "rgba(10,27,51,0.08)"; ctx.beginPath(); ctx.moveTo(0, 78); ctx.lineTo(1200, 78); ctx.stroke();
  ctx.fillStyle = "#38C172";
  ctx.beginPath(); ctx.moveTo(40, 26); ctx.lineTo(58, 39); ctx.lineTo(40, 52); ctx.lineTo(46, 39); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(56, 26); ctx.lineTo(74, 39); ctx.lineTo(56, 52); ctx.lineTo(62, 39); ctx.closePath(); ctx.fill();
  ctx.fillStyle = "#0A1B33"; ctx.font = "bold 26px Arial"; ctx.textAlign = "left"; ctx.fillText("TAYSEER", 84, 48);
  ctx.fillStyle = "#5B6472"; ctx.font = "13px Arial";
  ctx.fillText("SOLUTIONS  ⌄", 430, 44); ctx.fillText("ABOUT US", 560, 44); ctx.fillText("BLOGS AND RESOURCES", 660, 44); ctx.fillText("CAREERS", 860, 44);
  ctx.fillStyle = "#2F6FEF"; ctx.beginPath(); ctx.roundRect(960, 20, 150, 38, 19); ctx.fill();
  ctx.fillStyle = "#fff"; ctx.font = "bold 14px Arial"; ctx.textAlign = "center"; ctx.fillText("Talk to us  →", 1035, 44);
  ctx.textAlign = "left";
  ctx.fillStyle = "#0A1B33"; ctx.font = "bold 76px Arial"; ctx.fillText("Banking.", 56, 260);
  ctx.fillStyle = "#2F6FEF"; ctx.fillText("Reinvented.", 56, 340);
  ctx.fillStyle = "#5B6472"; ctx.font = "19px Arial";
  ctx.fillText("AI, digital banking and enterprise technology working together to", 56, 385);
  ctx.fillText("help financial institutions modernize with confidence.", 56, 411);
  ctx.fillStyle = "#2F6FEF"; ctx.beginPath(); ctx.roundRect(56, 440, 230, 52, 8); ctx.fill();
  ctx.fillStyle = "#fff"; ctx.font = "bold 16px Arial"; ctx.textAlign = "center"; ctx.fillText("Schedule consultation  →", 171, 472);
  ctx.strokeStyle = "#0A1B33"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.roundRect(300, 440, 190, 52, 8); ctx.stroke();
  ctx.fillStyle = "#0A1B33"; ctx.fillText("Explore solutions  ↗", 395, 472);
  ctx.textAlign = "left";
  const stats: [string, string][] = [["15+", "Countries"], ["100+", "Satisfied clients"], ["100+", "Skilled experts"]];
  stats.forEach((s, i) => {
    const sx = 56 + i * 175;
    ctx.fillStyle = "#0A1B33"; ctx.font = "bold 30px Arial"; ctx.fillText(s[0], sx, 545);
    ctx.fillStyle = "#5B6472"; ctx.font = "14px Arial"; ctx.fillText(s[1], sx, 568);
  });
  ctx.strokeStyle = "rgba(10,27,51,0.15)"; ctx.beginPath(); ctx.moveTo(56, 590); ctx.lineTo(560, 590); ctx.stroke();
  ctx.beginPath(); ctx.arc(76, 625, 20, 0, 7); ctx.strokeStyle = "#9fb3d1"; ctx.lineWidth = 2; ctx.stroke();
  ctx.fillStyle = "#5B6472"; ctx.font = "11px Arial"; ctx.fillText("ISO 27001:2022 CERTIFIED", 108, 630);

  const cardX = 650, cardY = 110, cardW = 500, cardH = 520;
  ctx.fillStyle = "#0A1B33"; ctx.beginPath(); ctx.roundRect(cardX, cardY, cardW, cardH, 26); ctx.fill();
  ctx.strokeStyle = "rgba(140,170,220,0.18)"; ctx.lineWidth = 1;
  for (let i = cardX; i < cardX + cardW; i += 34) { ctx.beginPath(); ctx.moveTo(i, cardY); ctx.lineTo(i, cardY + cardH); ctx.stroke(); }
  for (let j = cardY; j < cardY + cardH; j += 34) { ctx.beginPath(); ctx.moveTo(cardX, j); ctx.lineTo(cardX + cardW, j); ctx.stroke(); }
  const pcx = cardX + cardW / 2, pcy = cardY + cardH / 2;
  ctx.fillStyle = "#050d1c"; ctx.beginPath(); ctx.roundRect(pcx - 85, pcy - 165, 170, 330, 26); ctx.fill();
  ctx.strokeStyle = "rgba(140,170,220,0.4)"; ctx.stroke();
  const nodes2: { a: number; type: IconType }[] = [{ a: -1.0, type: "fingerprint" }, { a: -0.4, type: "wifi" }, { a: 0.4, type: "chart" }, { a: 1.0, type: "camera" }, { a: 2.2, type: "ai" }, { a: 2.8, type: "doc" }];
  ctx.strokeStyle = "rgba(140,170,220,0.5)";
  nodes2.forEach((n) => { const nx = pcx + Math.cos(n.a) * 190, ny = pcy + Math.sin(n.a) * 190 * 0.85; ctx.beginPath(); ctx.moveTo(pcx, pcy); ctx.lineTo(nx, ny); ctx.stroke(); });
  ctx.beginPath(); ctx.arc(pcx, pcy, 58, 0, 7); ctx.strokeStyle = "#8fb3ff"; ctx.lineWidth = 3; ctx.stroke();
  ctx.beginPath(); ctx.arc(pcx, pcy, 44, 0, 7); ctx.setLineDash([4, 4]); ctx.stroke(); ctx.setLineDash([]);
  drawIcon(ctx, "bank", pcx, pcy, 68, "#eaf1ff");
  nodes2.forEach((n) => {
    const nx = pcx + Math.cos(n.a) * 190, ny = pcy + Math.sin(n.a) * 190 * 0.85; const isAI = n.type === "ai";
    ctx.beginPath(); ctx.arc(nx, ny, 40, 0, 7); ctx.fillStyle = "#0e2547"; ctx.fill();
    ctx.lineWidth = isAI ? 3 : 2; ctx.strokeStyle = isAI ? "#38C172" : "#8fb3ff"; ctx.stroke();
    drawIcon(ctx, n.type, nx, ny, 44, isAI ? "#38C172" : "#eaf1ff");
  });

  const tex = new THREE.CanvasTexture(canvas);
  const mat = new THREE.MeshPhysicalMaterial({ map: tex, roughness: 0.35, clearcoat: 0.5, side: THREE.DoubleSide, toneMapped: false });
  const panel = new THREE.Mesh(geo, mat); g.add(panel);
  if (!reducedEffects) addRimGlow(panel, BLUE, 1.04, 0.16);

  const chromeH = 0.26;
  const chromeGeo = new THREE.PlaneGeometry(4.6, chromeH);
  const chromeCanvas = document.createElement("canvas"); chromeCanvas.width = 1200; chromeCanvas.height = 68;
  const cctx = chromeCanvas.getContext("2d")!;
  cctx.fillStyle = "#E7ECF5"; cctx.fillRect(0, 0, 1200, 68);
  ["#FF5F57", "#FEBC2E", "#28C840"].forEach((c, i) => { cctx.fillStyle = c; cctx.beginPath(); cctx.arc(34 + i * 30, 34, 9, 0, 7); cctx.fill(); });
  cctx.fillStyle = "#fff"; cctx.beginPath(); cctx.roundRect(150, 14, 900, 40, 20); cctx.fill();
  cctx.fillStyle = "#5B6472"; cctx.font = "16px Arial"; cctx.textAlign = "left"; cctx.fillText("🔒  tayseerdemo.xyz", 175, 40);
  const chromeTex = new THREE.CanvasTexture(chromeCanvas);
  const chromeMesh = new THREE.Mesh(chromeGeo, new THREE.MeshBasicMaterial({ map: chromeTex, side: THREE.DoubleSide, toneMapped: false }));
  chromeMesh.position.y = 2.85 / 2 + chromeH / 2 + 0.02;
  g.add(chromeMesh);

  return g;
}

function prepareFade(root: THREE.Object3D) {
  root.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (mesh.material) {
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      mats.forEach((m) => {
        if (m.userData.baseOpacity === undefined) {
          m.userData.baseOpacity = m.opacity !== undefined ? m.opacity : 1;
          m.transparent = true;
        }
      });
    }
  });
}

function setGroupAlpha(root: THREE.Object3D, alpha: number) {
  root.visible = alpha > 0.003;
  if (!root.visible) return;
  root.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (mesh.material) {
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      mats.forEach((m) => { m.opacity = m.userData.baseOpacity * alpha; });
    }
  });
}

function fadeWindow(t: number, inStart: number, inEnd: number, outStart: number, outEnd: number): number {
  if (t < inStart) return 0;
  if (t < inEnd) return (t - inStart) / (inEnd - inStart);
  if (t < outStart) return 1;
  if (t < outEnd) return Math.max(0, 1 - (t - outStart) / (outEnd - outStart));
  return 0;
}

export interface IntroSceneElements {
  canvas: HTMLCanvasElement;
  flash: HTMLDivElement;
}

export function createIntroScene(elements: IntroSceneElements, quality: IntroQuality, callbacks: IntroSceneCallbacks): IntroScene {
  const { canvas, flash: flashEl } = elements;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(quality.dpr);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(BG);
  scene.fog = new THREE.Fog(BG, 9, 32);

  const camera = new THREE.PerspectiveCamera(42, 16 / 10, 0.1, 100);
  camera.position.set(0, 0.4, 7);

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (w === 0 || h === 0) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  let resizeObserver: ResizeObserver | null = null;
  if (typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(canvas);
  } else {
    window.addEventListener("resize", resize);
  }

  scene.add(new THREE.HemisphereLight(0x9db8e8, 0x060a12, 0.55));
  const key = new THREE.DirectionalLight(0xeaf1ff, 1.5); key.position.set(4, 6, 6); scene.add(key);
  const fillL = new THREE.PointLight(0x2f6fef, 1.1, 32); fillL.position.set(-5, -1, 3); scene.add(fillL);
  const rimL = new THREE.PointLight(0x38c172, 1.6, 40); rimL.position.set(0, 2, -6); scene.add(rimL);
  const silverLight = new THREE.PointLight(0xc9d4e3, 0.9, 20); silverLight.position.set(3, -2, 2); scene.add(silverLight);

  const glowTex = glowTexture();

  const world = new THREE.Group(); scene.add(world);

  const particleCount = quality.reducedEffects ? 10 : 26;
  const particleGroup = new THREE.Group(); world.add(particleGroup);
  for (let i = 0; i < particleCount; i++) {
    const spr = makeGlowSprite(glowTex, Math.random() > 0.5 ? BLUE : GREEN, 0.12 + Math.random() * 0.22, 0.3 + Math.random() * 0.28);
    spr.position.set((Math.random() - 0.5) * 14, (Math.random() - 0.5) * 8, -Math.random() * 32 + 2);
    spr.userData.speed = 0.15 + Math.random() * 0.25;
    spr.userData.baseY = spr.position.y;
    particleGroup.add(spr);
  }

  const orbCompanion = (() => {
    const g = new THREE.Group();
    const orbMat = new THREE.MeshPhysicalMaterial({ color: NAVY_DEEP, emissive: new THREE.Color(BLUE), emissiveIntensity: 0.9, roughness: 0.15, transmission: 0.55, thickness: 0.6, ior: 1.3 });
    const orb = new THREE.Mesh(new THREE.SphereGeometry(0.22, 32, 32), orbMat);
    g.add(orb); g.add(makeGlowSprite(glowTex, BLUE, 1.2, 0.5));
    (g.userData as { orb: THREE.Mesh }).orb = orb;
    return g;
  })();
  orbCompanion.position.set(0.35, 0.25, -1.15);
  world.add(orbCompanion);

  const satOrb = (() => {
    const g = new THREE.Group();
    const m = new THREE.MeshPhysicalMaterial({ color: NAVY_DEEP, emissive: new THREE.Color(BLUE), emissiveIntensity: 0.9, roughness: 0.15, transmission: 0.55, thickness: 0.6 });
    const orb = new THREE.Mesh(new THREE.SphereGeometry(0.1, 24, 24), m);
    g.add(orb); g.add(makeGlowSprite(glowTex, BLUE, 0.45, 0.4));
    return g;
  })();
  world.add(satOrb);

  const sitePanel = buildSitePanel(quality.reducedEffects);
  sitePanel.position.set(0, 0.15, -25.0);
  world.add(sitePanel);

  let aiChar: ReturnType<typeof buildAICharacter> | null = null;
  let shield: ReturnType<typeof buildShield> | null = null;
  let phone: THREE.Group | null = null;
  let master: gsap.core.Timeline | null = null;

  const camPos = { x: 0, y: 0.4, z: 7 };
  const lookAt = { x: -0.3, y: 0.15, z: -1.4 };

  const pointerCurrent = { x: 0, y: 0 };
  const pointerTarget = { x: 0, y: 0 };
  let pointerEnabled = false;

  let lastCaptionIndex: CaptionIndex | null = null;
  const captionThresholds: { t: number; index: CaptionIndex }[] = [
    { t: 0.3, index: 1 },
    { t: 3.3, index: 2 },
    { t: 6.9, index: 3 },
    { t: 10.3, index: 4 }
  ];
  function updateCaption(t: number) {
    let cur: CaptionIndex = captionThresholds[0].index;
    for (const c of captionThresholds) { if (t >= c.t) cur = c.index; }
    if (t > CAPTION_HIDE_AFTER) {
      if (lastCaptionIndex !== null) { lastCaptionIndex = null; callbacks.onCaptionChange(null); }
      return;
    }
    if (cur !== lastCaptionIndex) { lastCaptionIndex = cur; callbacks.onCaptionChange(cur); }
  }

  function animateAmbient(t: number) {
    if (!aiChar || !shield || !phone) return;
    aiChar.userData.haloRing.rotation.z = t * 0.5;
    if (aiChar.userData.haloRing2) aiChar.userData.haloRing2.rotation.z = -t * 0.4;
    (aiChar.userData.core.material as THREE.MeshBasicMaterial).color.setScalar(0.85 + Math.sin(t * 3) * 0.15);
    const orbMat = (orbCompanion.userData as { orb: THREE.Mesh }).orb.material as THREE.MeshPhysicalMaterial;
    orbMat.emissiveIntensity = 0.75 + Math.sin(t * 2.4) * 0.25;

    const aiBaseX = -0.65, aiBaseY = -0.3;
    const shieldBaseX = -1.6;
    orbCompanion.position.x = 0.35 + Math.sin(t * 0.6) * 0.08;
    shield.rotation.y = Math.sin(t * 0.5) * 0.25;
    shield.userData.ring.rotation.z = t * 0.6;

    const ang = t * 0.22;
    satOrb.position.set(sitePanel.position.x + Math.cos(ang) * 0.9, sitePanel.position.y + 2.35 + Math.sin(ang * 1.3) * 0.08, sitePanel.position.z + 0.4);

    particleGroup.children.forEach((p) => {
      const spr = p as THREE.Sprite;
      spr.position.y = spr.userData.baseY + Math.sin(t * spr.userData.speed + spr.position.x) * 0.4;
    });

    aiChar.rotation.y = Math.sin(t * 0.35) * 0.12;

    // subtle pointer parallax layered on top of the authored idle motion — never
    // touches camPos/lookAt or timeline-driven values, only adds a small offset.
    pointerCurrent.x += (pointerTarget.x - pointerCurrent.x) * 0.06;
    pointerCurrent.y += (pointerTarget.y - pointerCurrent.y) * 0.06;
    const px = pointerEnabled ? pointerCurrent.x : 0;
    const py = pointerEnabled ? pointerCurrent.y : 0;
    aiChar.position.x = aiBaseX + px * 0.05;
    aiChar.position.y = aiBaseY + py * 0.035;
    shield.position.x = shieldBaseX + px * 0.03;
    world.rotation.y = px * 0.01;

    const aiAlpha = fadeWindow(t, 0, 0.35, 3.0, 3.6);
    setGroupAlpha(aiChar, aiAlpha);
    setGroupAlpha(orbCompanion, aiAlpha);

    const shieldAlpha = fadeWindow(t, 2.8, 3.4, 6.2, 6.8);
    setGroupAlpha(shield, shieldAlpha);

    const phoneAlpha = fadeWindow(t, 6.0, 6.6, 9.6, 10.2);
    setGroupAlpha(phone, phoneAlpha);

    const siteAlpha = fadeWindow(t, 9.7, 10.2, 17.0, 17.4);
    setGroupAlpha(sitePanel, siteAlpha);
    setGroupAlpha(satOrb, siteAlpha);
  }

  function render() {
    camera.position.set(camPos.x, camPos.y, camPos.z);
    camera.lookAt(lookAt.x, lookAt.y, lookAt.z);
    const t = master ? master.time() : 0;
    animateAmbient(t);
    renderer.render(scene, camera);
  }

  function buildTimeline(): gsap.core.Timeline {
    const tl = gsap.timeline({
      paused: true,
      onUpdate() { updateCaption(tl.time()); },
      onComplete() { callbacks.onComplete(); }
    });

    // Beat 1: AI character intro (0 - 3.2s)
    tl.to(camPos, { x: 0.3, y: 0.4, z: 2.3, duration: 3.2, ease: "power2.inOut" }, 0);
    tl.to(lookAt, { x: -0.65, y: 0.15, z: -1.5, duration: 3.2, ease: "power2.inOut" }, 0);
    tl.to(aiChar!.userData.waveArm.rotation, { z: -1.3, duration: 0.5, ease: "power2.out", yoyo: true, repeat: 3 }, 0.6);

    // Beat 2: security (3.2 - 6.6s)
    tl.to(camPos, { x: -0.5, y: 0.2, z: -5.0, duration: 3.4, ease: "power2.inOut" }, 3.0);
    tl.to(lookAt, { x: -1.6, y: 0.0, z: -9.0, duration: 3.4, ease: "power2.inOut" }, 3.0);
    tl.fromTo(shield!.scale, { x: 0.7, y: 0.7, z: 0.7 }, { x: 1, y: 1, z: 1, duration: 1.0, ease: "back.out(1.6)" }, 3.4);

    // Beat 3: phone / AI banking UI (6.6 - 10s)
    tl.to(camPos, { x: 1.65, y: 0.35, z: -11.6, duration: 3.4, ease: "power2.inOut" }, 6.6);
    tl.to(lookAt, { x: 1.6, y: 0.1, z: -17.0, duration: 3.4, ease: "power2.inOut" }, 6.6);
    tl.fromTo(phone!.scale, { x: 0.75, y: 0.75, z: 0.75 }, { x: 1, y: 1, z: 1, duration: 0.9, ease: "back.out(1.6)" }, 6.7);

    // Beat 4: real website reveal (10 - 13.6s)
    tl.to(camPos, { x: 0, y: 0.5, z: -17.5, duration: 3.6, ease: "power2.inOut" }, 10.0);
    tl.to(lookAt, { x: 0, y: 0.3, z: -25.0, duration: 3.6, ease: "power2.inOut" }, 10.0);
    tl.fromTo(sitePanel.scale, { x: 0.85, y: 0.85, z: 0.85 }, { x: 1, y: 1, z: 1, duration: 1.0, ease: "back.out(1.5)" }, 10.0);

    // Beat 5: dolly to fullscreen, then flash-open (13.6 - 16.45s)
    tl.to(camPos, { x: 0, y: 0.35, z: -21.6, duration: 2.0, ease: "power2.in" }, 13.6);
    tl.to(lookAt, { x: 0, y: 0.16, z: -25.0, duration: 2.0, ease: "power2.in" }, 13.6);
    tl.to(flashEl, { opacity: 1, duration: 0.32, ease: "power1.in" }, 15.55);
    tl.to({}, { duration: 0.55 }, 15.9); // hold on full white — "the site is open"
    // NOTE: the source's looping version also had a tween at position 0 that faded
    // the flash back to 0 to clear it for the next loop iteration. That tween only
    // existed to service the infinite repeat and has no meaning for a single pass
    // (the flash already starts at 0), so it is intentionally not carried over.

    return tl;
  }

  let renderingActive = false;
  function startRenderLoop() {
    if (renderingActive) return;
    renderingActive = true;
    gsap.ticker.add(render);
  }
  function stopRenderLoop() {
    if (!renderingActive) return;
    renderingActive = false;
    gsap.ticker.remove(render);
  }

  let disposed = false;

  const imgLoader = new THREE.ImageLoader();
  const ready = Promise.all([
    loadImage(imgLoader, "/intro/robot.webp"),
    loadImage(imgLoader, "/intro/shield.webp"),
    loadImage(imgLoader, "/intro/diagram.webp")
  ]).then(([robotImg, shieldImg, diagramImg]) => {
    // guards against the readiness budget in HeroIntro expiring (or the component
    // unmounting) while these loads were still in flight — dispose() may already
    // have run by the time this resolves, and it must not resurrect the scene.
    if (disposed) return;

    aiChar = buildAICharacter(robotImg, glowTex, quality.reducedEffects);
    aiChar.position.set(-0.65, -0.3, -1.5);
    world.add(aiChar);

    shield = buildShield(shieldImg, glowTex);
    shield.position.set(-1.6, -0.2, -9.0);
    world.add(shield);

    phone = buildPhone(diagramImg, quality.reducedEffects);
    phone.position.set(1.6, 0.1, -17.0);
    phone.rotation.y = 0.12;
    world.add(phone);

    [aiChar, orbCompanion, shield, phone, sitePanel, satOrb].forEach(prepareFade);

    master = buildTimeline();
    master.timeScale(AUTHORED_LOOP_SECONDS / TARGET_LOOP_SECONDS);
    resize();
  });

  return {
    ready,
    play() {
      if (disposed || !master) return;
      startRenderLoop();
      master.play(0);
    },
    stop() {
      if (disposed) return;
      if (master) master.pause();
      stopRenderLoop();
    },
    pauseRendering() {
      if (disposed) return;
      if (master) master.pause();
      stopRenderLoop();
    },
    resumeRendering() {
      if (disposed || !master) return;
      if (master.progress() < 1) {
        startRenderLoop();
        master.resume();
      }
    },
    setPointerEnabled(enabled: boolean) {
      pointerEnabled = enabled;
      if (!enabled) { pointerTarget.x = 0; pointerTarget.y = 0; }
    },
    setPointerTarget(nx: number, ny: number) {
      pointerTarget.x = nx; pointerTarget.y = ny;
    },
    resize,
    dispose() {
      if (disposed) return;
      disposed = true;
      stopRenderLoop();
      if (master) master.kill();
      resizeObserver?.disconnect();
      window.removeEventListener("resize", resize);

      scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          mats.forEach((m) => {
            const withMap = m as THREE.Material & { map?: THREE.Texture | null };
            withMap.map?.dispose();
            m.dispose();
          });
        }
      });
      glowTex.dispose();
      renderer.dispose();
    }
  };
}
