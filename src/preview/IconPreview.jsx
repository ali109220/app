import {
  CreditCard, ArrowLeftRight, UserRound, ShieldCheck, LineChart, Scale, Wallet, Landmark,
  Target, ScanFace, MessagesSquare, Gauge, Plug, Boxes,
  Server, Database, Radar, Banknote, CloudCog,
} from "lucide-react";

const NAVY = "#0F5CBF";
const GREEN = "#0F5CBF";
const INK = "#0F2333";
const PAPER = "#F7F6F2";

// Icon direction preview only. Navy is the default; green is a sparing accent
// (one per row). Each section uses a DIFFERENT set so they read as distinct.
const SECTIONS = [
  { title: "Core Banking", icons: [
    { c: CreditCard, l: "Payments" }, { c: ArrowLeftRight, l: "Remittance" }, { c: UserRound, l: "Consumer" },
    { c: ShieldCheck, l: "Security", accent: true }, { c: LineChart, l: "CRM & BI" }, { c: Scale, l: "Audit" },
    { c: Wallet, l: "Fin. Mgmt" }, { c: Landmark, l: "Treasury" },
  ] },
  { title: "Fahim AI", icons: [
    { c: Target, l: "Goal-Oriented" }, { c: ScanFace, l: "KYC" }, { c: MessagesSquare, l: "Interaction" },
    { c: Gauge, l: "Scalability", accent: true }, { c: Plug, l: "Integration" }, { c: Boxes, l: "Deployment" },
  ] },
  { title: "Managed Services", icons: [
    { c: Server, l: "T24 Temenos" }, { c: Database, l: "Big Data" }, { c: Radar, l: "Security", accent: true },
    { c: Banknote, l: "ATM / STM" }, { c: CloudCog, l: "IaaS & SaaS" },
  ] },
];

const Row = ({ title, icons, dark }) => (
  <div className="mb-8">
    <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em]" style={{ color: dark ? "rgba(255,255,255,0.6)" : "#64748B" }}>{title}</div>
    <div className="flex flex-wrap gap-4">
      {icons.map(({ c: Icon, l, accent }) => (
        <div key={l} className="flex w-28 flex-col items-center gap-3 rounded-lg border p-5"
          style={{ borderColor: dark ? "rgba(255,255,255,0.15)" : "rgba(13,90,140,0.18)", background: dark ? "rgba(255,255,255,0.04)" : "#fff" }}>
          <Icon size={30} strokeWidth={1.6} color={accent ? GREEN : (dark ? "#fff" : NAVY)} />
          <span className="text-center text-[12px]" style={{ color: dark ? "rgba(255,255,255,0.75)" : INK }}>{l}</span>
        </div>
      ))}
    </div>
  </div>
);

export default function IconPreview() {
  return (
    <div style={{ background: PAPER, color: INK, minHeight: "100vh" }} className="font-instrument px-8 py-14">
      <div className="mx-auto max-w-[1100px]">
        <div className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: NAVY }}>Icon direction — proposal</div>
        <h1 className="mt-2 text-3xl font-bold" style={{ color: INK }}>Navy default · green as sparing accent · varied per section</h1>
        <p className="mt-3 max-w-2xl text-sm" style={{ color: "#475569" }}>Line/geometric lucide icons. Default stroke is navy #0F5CBF; green #0F5CBF appears once per section as an accent (marked). Different concepts use different symbols so sections don't repeat the same six.</p>

        <div className="mt-10 rounded-xl border p-8" style={{ borderColor: "rgba(13,90,140,0.15)", background: "#fff" }}>
          {SECTIONS.map((s) => <Row key={s.title} {...s} />)}
        </div>

        <div className="mt-10 rounded-xl p-8" style={{ background: NAVY }}>
          <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.25em]" style={{ color: "rgba(255,255,255,0.6)" }}>On navy surfaces (white icons, green accent)</div>
          {SECTIONS.map((s) => <Row key={s.title} {...s} dark />)}
        </div>
      </div>
    </div>
  );
}
