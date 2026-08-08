import { T } from "@/site/theme";

export const ProductDashboardVisual = ({ label = "Digital Banking" }) => (
  <div className="relative overflow-hidden rounded-xl border p-4" style={{ borderColor: T.border, background: T.panel }} aria-label={`${label} interface preview`} role="img">
    <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: T.border }}>
      <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: T.green }} /><span className="font-jbmono text-[10px] uppercase tracking-[0.18em]" style={{ color: T.faint }}>{label}</span></div>
      <span className="font-jbmono text-[9px] uppercase tracking-[0.16em]" style={{ color: T.signal }}>Live view</span>
    </div>
    <div className="mt-4 grid grid-cols-3 gap-2">
      {["Customers", "Transactions", "Services"].map((item, i) => <div key={item} className="rounded-md border p-3" style={{ borderColor: T.border, background: T.bg }}><div className="text-[9px] uppercase tracking-wider" style={{ color: T.faint }}>{item}</div><div className="mt-3 h-2 rounded-full" style={{ background: i === 1 ? T.green : T.signal, opacity: .55 + i * .12 }} /></div>)}
    </div>
    <div className="mt-3 grid grid-cols-5 items-end gap-2 rounded-md border p-4" style={{ borderColor: T.border, background: T.bg }}>
      {[38, 62, 48, 82, 68].map((h, i) => <div key={i} className="rounded-t-sm" style={{ height: `${h}px`, background: i === 3 ? T.green : T.signal, opacity: i === 3 ? .8 : .35 + i * .08 }} />)}
    </div>
    <div className="mt-3 grid grid-cols-2 gap-2">
      <div className="rounded-md border p-3" style={{ borderColor: T.border }}><div className="h-2 w-20 rounded-full" style={{ background: T.signal, opacity: .35 }} /><div className="mt-2 h-2 w-28 rounded-full" style={{ background: T.border }} /></div>
      <div className="rounded-md border p-3" style={{ borderColor: T.border }}><div className="h-2 w-16 rounded-full" style={{ background: T.green, opacity: .55 }} /><div className="mt-2 h-2 w-24 rounded-full" style={{ background: T.border }} /></div>
    </div>
  </div>
);

export const AIWorkflowVisual = () => {
  const steps = ["Signals", "Understand", "Decide", "Automate"];
  return <div className="rounded-xl border p-5 sm:p-6" style={{ borderColor: T.border, background: T.panel }} role="img" aria-label="Fahim AI workflow from signals to automation">
    <div className="flex items-center justify-between"><span className="font-jbmono text-[10px] uppercase tracking-[0.2em]" style={{ color: T.faint }}>Fahim intelligence flow</span><span className="h-2 w-2 rounded-full" style={{ background: T.green }} /></div>
    <div className="mt-7 grid gap-3 sm:grid-cols-4">
      {steps.map((step, i) => <div key={step} className="relative rounded-lg border p-4 text-center" style={{ borderColor: T.border, background: T.bg }}><div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full font-jbmono text-[10px]" style={{ background: "rgba(13,90,140,.12)", color: T.signal }}>0{i+1}</div><div className="mt-3 text-xs font-semibold uppercase tracking-wider">{step}</div>{i < steps.length - 1 && <span aria-hidden="true" className="absolute -right-3 top-1/2 hidden h-px w-3 sm:block" style={{ background: T.signal }} />}</div>)}
    </div>
    <div className="mt-5 rounded-lg border p-4" style={{ borderColor: T.border, background: T.bg }}><div className="flex items-center justify-between text-[10px] uppercase tracking-wider" style={{ color: T.faint }}><span>Human oversight</span><span style={{ color: T.green }}>AI-enabled</span></div><div className="mt-3 h-1.5 overflow-hidden rounded-full" style={{ background: T.border }}><div className="h-full w-3/4 rounded-full" style={{ background: T.signal }} /></div></div>
  </div>;
};

export const DeploymentArchitectureVisual = () => (
  <div className="rounded-xl border p-5 sm:p-6" style={{ borderColor: T.border, background: T.panel }} role="img" aria-label="Tayseer deployment architecture supporting on-site and cloud delivery">
    <div className="font-jbmono text-[10px] uppercase tracking-[0.2em]" style={{ color: T.faint }}>Deployment architecture</div>
    <div className="mt-6 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 text-center text-xs">
      {[["Bank", "Channels"], ["Tayseer", "Platform"], ["Core / Cloud", "Systems"]].map(([a,b], i) => <div key={a} className="rounded-lg border px-3 py-5" style={{ borderColor: i===1 ? T.signal : T.border, background: T.bg }}><div className="font-semibold">{a}</div><div className="mt-1" style={{ color: T.faint }}>{b}</div></div>)}
      <div aria-hidden="true" style={{ color: T.signal }}>→</div><div aria-hidden="true" style={{ color: T.signal }}>→</div>
    </div>
    <div className="mt-5 grid grid-cols-2 gap-3"><div className="rounded-md border p-3 text-center text-[11px] uppercase tracking-wider" style={{ borderColor: T.border }}>On-site</div><div className="rounded-md border p-3 text-center text-[11px] uppercase tracking-wider" style={{ borderColor: T.border }}>Cloud</div></div>
  </div>
);

export const ScaleVisual = () => (
  <div className="relative overflow-hidden rounded-xl border p-6" style={{ borderColor: T.border, background: T.panel }} role="img" aria-label="Abstract visualization of Tayseer delivery reach and scale">
    <svg viewBox="0 0 520 220" className="w-full" aria-hidden="true">
      <g fill="none" stroke={T.border} strokeWidth="1">{[[80,120,210,70],[210,70,350,115],[350,115,445,55],[210,70,285,175],[285,175,445,55]].map((l,i)=><line key={i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} />)}</g>
      {[[80,120,"100+"],[210,70,"15+"],[350,115,"600+"],[285,175,"100+"],[445,55,"T"]].map(([x,y,t],i)=><g key={i}><circle cx={x} cy={y} r={i===4?25:18} fill={T.bg} stroke={i===4?T.green:T.signal} strokeWidth="2"/><text x={x} y={Number(y)+4} textAnchor="middle" fontSize={i===4?12:9} fill={T.text}>{t}</text></g>)}
    </svg>
    <div className="mt-2 flex justify-between font-jbmono text-[9px] uppercase tracking-[0.16em]" style={{ color: T.faint }}><span>Clients</span><span>Countries</span><span>Products</span><span>Experts</span></div>
  </div>
);

export const IdentityTile = ({ name, role }) => {
  const initials = name.split(" ").map((part) => part[0]).join("").slice(0,2).toUpperCase();
  return <div className="flex items-center gap-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border font-jbmono text-xs font-semibold" style={{ borderColor: T.signal, color: T.signal, background: "rgba(13,90,140,.08)" }}>{initials}</div><div><div className="font-semibold">{name}</div><div className="mt-1 text-xs" style={{ color: T.faint }}>{role}</div></div></div>;
};