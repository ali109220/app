/* Tayseer entrance intro — synchronous gate.
 *
 * Loaded with a blocking <script> tag in <head>, before <body> parses, so
 * every decision below lands before the browser paints anything. That is
 * what makes `#intro` (rendered server-side in the body) present in the
 * first painted frame instead of appearing after hydration.
 *
 * Also the runtime kill switch: edit INTRO_ENABLED in place on the host (or
 * CDN) and purge its cache to turn the intro off without a rebuild. The site
 * is a static export (`output: "export"`), so a build-time env var would
 * require a full redeploy — this does not. Served with
 * `Cache-Control: no-store` (see next.config.mjs) so the switch takes effect
 * on the very next load.
 */
(function () {
  "use strict";

  var INTRO_ENABLED = true;

  var SESSION_KEY = "tayseer-intro-seen";
  var TOTAL_MS = 5900;
  var REDUCED_TOTAL_MS = 750;

  var html = document.documentElement;
  var done = false;
  var resizeRaf = 0;
  var stopParallax = null;

  function readSession() {
    try {
      return window.sessionStorage.getItem(SESSION_KEY);
    } catch (e) {
      return null;
    }
  }

  function writeSession() {
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch (e) {
      /* Non-fatal: worst case the intro plays again next navigation. */
    }
  }

  function flagEnabled() {
    try {
      var q = new URLSearchParams(window.location.search).get("intro");
      if (q === "off" || q === "0") return false;
      if (q === "on" || q === "1") return true;
    } catch (e) {
      /* ignore */
    }
    return INTRO_ENABLED;
  }

  function supports3D() {
    try {
      return (
        typeof CSS !== "undefined" &&
        typeof CSS.supports === "function" &&
        CSS.supports("transform-style", "preserve-3d") &&
        CSS.supports("perspective", "1000px")
      );
    } catch (e) {
      return false;
    }
  }

  function detectTier() {
    try {
      var nav = navigator;
      if (nav.connection && nav.connection.saveData) return "low";

      var cores = nav.hardwareConcurrency || 4;
      var mem = nav.deviceMemory || 4;
      var coarse = window.matchMedia("(pointer: coarse)").matches;

      if (cores <= 4 || mem <= 2) return "low";
      if (cores <= 6 || mem <= 4 || coarse) return "med";
      return "high";
    } catch (e) {
      return "med";
    }
  }

  /* The scene is authored in absolute px inside a fixed 1200x720 frame and
   * cover-scaled via `transform: scale(var(--intro-s))`, so this must be a
   * unitless ratio — no CSS expression produces that from a viewport length. */
  function coverScale() {
    return Math.max(window.innerWidth / 1200, window.innerHeight / 720);
  }

  function applyScale() {
    html.style.setProperty("--intro-s", String(coverScale()));
  }

  function onResize() {
    if (resizeRaf) return;
    resizeRaf = window.requestAnimationFrame(function () {
      resizeRaf = 0;
      applyScale();
    });
  }

  /* Pointer parallax: max 4px translate / 0.15deg rotate, spring-eased.
   * Applied to .parallax, which sits ABOVE .drift, so it never touches the
   * handheld float and can never influence the man, the gait, the doors,
   * the lighting or the master duration. */
  function initParallax(tier) {
    if (reduced || tier === "low") return null;
    try {
      if (!window.matchMedia("(pointer: fine)").matches) return null;
    } catch (e) {
      return null;
    }

    var el = document.querySelector("#intro .parallax");
    if (!el) return null;

    var targetX = 0, targetY = 0, curX = 0, curY = 0, raf = 0, idle = 0;

    function onMove(e) {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!raf) raf = window.requestAnimationFrame(tick);
    }

    function tick() {
      curX += (targetX - curX) * 0.075;
      curY += (targetY - curY) * 0.075;

      el.style.transform =
        "translate3d(" + (curX * 4).toFixed(2) + "px, " + (curY * 4).toFixed(2) + "px, 0) " +
        "rotateY(" + (curX * 0.15).toFixed(3) + "deg) " +
        "rotateX(" + (-curY * 0.15).toFixed(3) + "deg)";

      var settled = Math.abs(targetX - curX) < 0.001 && Math.abs(targetY - curY) < 0.001;
      idle = settled ? idle + 1 : 0;
      raf = idle > 3 ? 0 : window.requestAnimationFrame(tick);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    return function () {
      window.removeEventListener("pointermove", onMove);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }

  var reduced = false;
  try {
    reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) {
    /* ignore */
  }

  var seen = readSession() === "1";
  var play = flagEnabled() && !seen && supports3D();

  if (!play) return;

  /* Written up front, not on completion: a refresh mid-intro must not
   * replay it, and neither must the next route in this session. */
  writeSession();

  var tier = detectTier();

  applyScale();
  html.setAttribute("data-intro-tier", tier);
  html.setAttribute("data-intro", "play");

  window.addEventListener("resize", onResize, { passive: true });
  window.addEventListener("orientationchange", onResize, { passive: true });

  function finish() {
    if (done) return;
    done = true;
    html.removeAttribute("data-intro");
    window.clearTimeout(timer);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("orientationchange", onResize);
    if (resizeRaf) {
      window.cancelAnimationFrame(resizeRaf);
      resizeRaf = 0;
    }
    document.removeEventListener("keydown", onKeyDown, true);
    document.removeEventListener("click", onClick, true);
    if (stopParallax) {
      stopParallax();
      stopParallax = null;
    }
  }

  function onKeyDown(e) {
    if (e.key === "Escape") finish();
  }

  function onClick(e) {
    if (e.target && e.target.closest && e.target.closest("#intro-skip")) {
      finish();
    }
  }

  document.addEventListener("keydown", onKeyDown, true);
  document.addEventListener("click", onClick, true);

  document.addEventListener("DOMContentLoaded", function () {
    var skip = document.getElementById("intro-skip");
    if (skip) skip.focus({ preventScroll: true });
    if (!done) stopParallax = initParallax(tier);
  });

  var timer = window.setTimeout(finish, reduced ? REDUCED_TOTAL_MS : TOTAL_MS);
})();
