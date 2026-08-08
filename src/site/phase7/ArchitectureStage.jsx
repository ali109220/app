import { Cloud, Database, Landmark, Network, Server, Smartphone, Workflow, BrainCircuit } from "lucide-react";
import { Reveal } from "@/site/motion";
import { T } from "@/site/theme";

const FLOW = [
  { label: "Customers", icon: Smartphone, copy: "Mobile · Web · Assisted" },
  { label: "Experience", icon: Network, copy: "Digital channels" },
  { label: "Gateway", icon: Workflow, copy: "APIs · Integration" },
  { label: "Services", icon: Server, copy: "Business capabilities" },
  { label: "Core Banking", icon: Landmark, copy: "Transactions · Accounts" },
  { label: "Data & AI", icon: BrainCircuit, copy: "Insights · Automation" },
];

export default function ArchitectureStage() {
  return <section className="relative border-b px-6 py-24 md:px-12" style={{ borderColor: T.border }} aria-labelledby="architecture-stage-heading">
    <div className="mx-auto max-w-[1400px]">
      <Reveal>
        <div className="font-jbmono text-[11px] uppercase tracking-[.26em]" style={{ color: T.signal }}>Architecture</div>
        <div className="mt-5 grid gap-8 lg:grid-cols-12 lg:items-end"><h2 id="architecture-stage-heading" className="text-4xl font-bold uppercase leading-[.94] tracking-[-.03em] sm:text-5xl lg:col-span-7">Designed to connect the banking estate</h2><p className="max-w-xl text-base leading-relaxed lg:col-span-5" style={{ color: T.muted }}>A representative architecture view showing how customer experiences, APIs, services, core systems and intelligence can operate as one connected technology landscape.</p></div>
      </Reveal>

      <Reveal delay={.08} className="mt-14">
        <div className="overflow-hidden rounded-2xl border" style={{ borderColor: T.border, background: T.panel }}>
          <div className="grid md:grid-cols-6">
            {FLOW.map((item,index) => <div key={item.label} className="relative border-b p-5 text-center md:border-b-0 md:border-r" style={{ borderColor: T.border }}><div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: index===4 ? "rgba(13,90,140,.16)" : T.bg, color: index===4 ? T.signal : T.muted }}><item.icon size={20} aria-hidden="true" /></div><h3 className="mt-4 text-sm font-semibold">{item.label}</h3><p className="mt-2 text-[10px] leading-relaxed" style={{ color: T.faint }}>{item.copy}</p>{index<FLOW.length-1 && <span className="absolute -right-1 top-1/2 hidden h-2 w-2 -translate-y-1/2 rotate-45 border-r border-t md:block" style={{ borderColor: T.signal }} />}</div>)}
          </div>
          <div className="grid border-t md:grid-cols-2" style={{ borderColor: T.border }}>
            <div className="p-6 md:p-8"><div className="flex items-center gap-3"><Server size={19} aria-hidden="true" style={{ color: T.signal }} /><div className="font-semibold">On-site deployment</div></div><p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: T.muted }}>For institutions prioritizing control, tailored integration and deployment within their own technology environment.</p></div>
            <div className="border-t p-6 md:border-l md:border-t-0 md:p-8" style={{ borderColor: T.border }}><div className="flex items-center gap-3"><Cloud size={19} aria-hidden="true" style={{ color: T.signal }} /><div className="font-semibold">Cloud deployment</div></div><p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: T.muted }}>For institutions prioritizing agility, scalability and a more flexible operating model as technology needs evolve.</p></div>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t px-6 py-4 text-[10px] font-jbmono uppercase tracking-[.16em]" style={{ borderColor: T.border, color: T.faint }}><span className="inline-flex items-center gap-2"><Database size={13} aria-hidden="true" /> Data integration</span><span>API-led connectivity</span><span>Layered modernization</span><span>Human-led operations</span></div>
        </div>
      </Reveal>
    </div>
  </section>;
}
