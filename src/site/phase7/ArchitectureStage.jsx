import { Cloud, Database, Landmark, Network, Server, Smartphone, Workflow, BrainCircuit } from "lucide-react";
import { T } from "@/site/theme";
import { ActivityIndicator, RevealOnScroll, STAGGER, StageArrival, StagePulse, green } from "@/site/motion";

const FLOW = [
  { label: "Customers", icon: Smartphone, copy: "Mobile · Web · Assisted" },
  { label: "Experience", icon: Network, copy: "Digital channels" },
  { label: "Gateway", icon: Workflow, copy: "APIs · Integration" },
  { label: "Services", icon: Server, copy: "Business capabilities" },
  { label: "Core Banking", icon: Landmark, copy: "Transactions · Accounts" },
  { label: "Data & AI", icon: BrainCircuit, copy: "Insights · Automation" },
];

// One dot walks the whole pipeline, one hop at a time, then the row rests.
// HOP_OFFSET is the gap between hop starts; travel itself is 14% of the cycle
// (see .motion-stage-travel), so 16% keeps a beat between hops and leaves the
// last ~22% of every cycle completely still.
const FLOW_CYCLE = 9000;
const HOP_OFFSET = FLOW_CYCLE * 0.16;
const HOP_TRAVEL = FLOW_CYCLE * 0.14;

export default function ArchitectureStage() {
  return <section className="relative border-b px-6 py-20 md:px-12 md:py-24" style={{ borderColor: T.border }} aria-labelledby="architecture-stage-heading">
    <div className="mx-auto max-w-[1400px]">
      <RevealOnScroll className="flex items-center gap-2.5 font-jbmono text-xs uppercase tracking-[.22em]" style={{ color: T.signal }}><ActivityIndicator />Architecture</RevealOnScroll>
      <RevealOnScroll delay={STAGGER} className="mt-5 grid gap-8 lg:grid-cols-12 lg:items-end"><h2 id="architecture-stage-heading" className="text-4xl font-bold leading-[.94] tracking-[-.03em] sm:text-5xl lg:col-span-7">Designed to connect the banking technology environment</h2><p className="max-w-xl text-base leading-relaxed lg:col-span-5" style={{ color: T.muted }}>A representative architecture view showing how customer experiences, APIs, services, core banking systems and intelligence can operate as one connected technology landscape.</p></RevealOnScroll>

      <div className="mt-14 overflow-hidden rounded-2xl border" style={{ borderColor: T.border, background: T.panel }}>
        <div className="grid md:grid-cols-6">
          {FLOW.map((item,index) => {
            const isLast = index === FLOW.length - 1;
            // Hop i carries data out of stage i, so stage i+1 acknowledges it.
            const departure = index * HOP_OFFSET;
            const arrival = (index - 1) * HOP_OFFSET + HOP_TRAVEL;
            return <RevealOnScroll key={item.label} delay={index*STAGGER} variant="scale" className="arch-node relative border-b p-5 text-center md:border-b-0 md:border-r" style={{ borderColor: T.border }}>
              <div className="arch-node-chip mx-auto flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: index===4 ? "rgba(13,90,140,.16)" : T.bg, color: index===4 ? T.signal : T.muted }}><item.icon size={20} aria-hidden="true" /></div>
              <h3 className="mt-4 text-sm font-semibold">{item.label}</h3>
              <p className="mt-2 text-xs leading-relaxed" style={{ color: T.muted }}>{item.copy}</p>
              {/* Green wash confirming the data landed here. */}
              {index > 0 && <StageArrival className="inset-0 rounded-none" delay={arrival} cycle={FLOW_CYCLE} style={{ background: `radial-gradient(circle at 50% 30%, ${green(0.16)}, transparent 62%)` }} />}
              {!isLast && <>
                <StagePulse delay={departure} cycle={FLOW_CYCLE} />
                <span className="arch-node-link absolute -right-1 top-1/2 hidden h-2 w-2 -translate-y-1/2 rotate-45 border-r border-t md:block" style={{ borderColor: T.signal }} />
              </>}
            </RevealOnScroll>;
          })}
        </div>
        <div className="grid border-t md:grid-cols-2" style={{ borderColor: T.border }}>
          <RevealOnScroll className="p-6 md:p-8"><div className="flex items-center gap-3"><Server size={19} aria-hidden="true" style={{ color: T.signal }} /><div className="font-semibold">On-site deployment</div></div><p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: T.muted }}>For institutions prioritizing control, tailored integration and deployment within their own technology environment.</p></RevealOnScroll>
          <RevealOnScroll delay={STAGGER} className="border-t p-6 md:border-l md:border-t-0 md:p-8" style={{ borderColor: T.border }}><div className="flex items-center gap-3"><Cloud size={19} aria-hidden="true" style={{ color: T.signal }} /><div className="font-semibold">Cloud deployment</div></div><p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: T.muted }}>For institutions prioritizing agility, scalability and a more flexible operating model as technology needs evolve.</p></RevealOnScroll>
        </div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t px-6 py-4 text-xs font-jbmono tracking-wide" style={{ borderColor: T.border, color: T.muted }}><span className="inline-flex items-center gap-2"><Database size={13} aria-hidden="true" /> Data integration</span><span>API-led connectivity</span><span>Layered modernization</span><span>Human-led operations</span></div>
      </div>
    </div>
  </section>;
}
