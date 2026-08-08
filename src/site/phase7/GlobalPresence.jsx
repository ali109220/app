import { Globe2, Users, Layers3, MapPinned } from "lucide-react";
import { Reveal } from "@/site/motion";
import { CountUp } from "@/site/ui";
import { T } from "@/site/theme";

const METRICS = [
  { n: 15, suffix: "+", label: "Countries", icon: Globe2 },
  { n: 100, suffix: "+", label: "Satisfied clients", icon: Users },
  { n: 600, suffix: "+", label: "Finished products", icon: Layers3 },
  { n: 100, suffix: "+", label: "Skilled experts", icon: MapPinned },
];

export default function GlobalPresence() {
  return <section className="relative overflow-hidden border-b px-6 py-24 md:px-12" style={{ borderColor: T.border }} aria-labelledby="presence-heading">
    <div className="mx-auto max-w-[1400px]">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-5">
          <div className="font-jbmono text-[11px] uppercase tracking-[.26em]" style={{ color: T.signal }}>Scale & presence</div>
          <h2 id="presence-heading" className="mt-5 text-4xl font-bold uppercase leading-[.94] tracking-[-.03em] sm:text-5xl">Built with regional perspective</h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed" style={{ color: T.muted }}>Tayseer’s published company figures reflect delivery across more than 15 countries, supported by a broad portfolio and specialist technology teams.</p>
          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border" style={{ borderColor: T.border, background: T.border }}>
            {METRICS.map((m) => <div key={m.label} className="p-5 sm:p-6" style={{ background: T.panel }}><m.icon size={17} aria-hidden="true" style={{ color: T.signal }} /><div className="mt-5 text-3xl font-semibold"><CountUp to={m.n} suffix={m.suffix} /></div><div className="mt-2 text-[10px] uppercase tracking-[.14em]" style={{ color: T.faint }}>{m.label}</div></div>)}
          </div>
        </Reveal>

        <Reveal delay={.08} className="lg:col-span-7">
          <div className="relative mx-auto aspect-square w-full max-w-[620px] rounded-full border" style={{ borderColor: T.border, background: "radial-gradient(circle at 50% 50%, rgba(13,90,140,.11), transparent 58%)" }} role="img" aria-label="Abstract visualization of Tayseer's regional and international delivery network">
            <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <circle cx="300" cy="300" r="230" fill="none" stroke="currentColor" strokeOpacity=".08" />
              <ellipse cx="300" cy="300" rx="230" ry="86" fill="none" stroke="currentColor" strokeOpacity=".08" />
              <ellipse cx="300" cy="300" rx="230" ry="160" fill="none" stroke="currentColor" strokeOpacity=".06" />
              <ellipse cx="300" cy="300" rx="95" ry="230" fill="none" stroke="currentColor" strokeOpacity=".08" />
              <ellipse cx="300" cy="300" rx="170" ry="230" fill="none" stroke="currentColor" strokeOpacity=".06" />
              <path d="M104 378 C190 188 400 177 500 320" fill="none" stroke="#0D5A8C" strokeOpacity=".52" strokeWidth="2" strokeDasharray="7 8" />
              <path d="M138 222 C256 372 394 410 488 266" fill="none" stroke="#68A63C" strokeOpacity=".38" strokeWidth="2" strokeDasharray="5 9" />
              {[{x:104,y:378},{x:171,y:249},{x:300,y:300},{x:402,y:202},{x:500,y:320},{x:421,y:414},{x:138,y:222}].map((p,i)=><g key={i}><circle cx={p.x} cy={p.y} r={i===2?12:7} fill={i===2?'#0D5A8C':'#68A63C'} opacity={i===2?.95:.72}/>{i===2 && <circle cx={p.x} cy={p.y} r="23" fill="none" stroke="#0D5A8C" opacity=".26" />}</g>)}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-center"><div className="rounded-2xl border px-6 py-5" style={{ borderColor: T.border, background: T.bg }}><div className="font-jbmono text-[9px] uppercase tracking-[.2em]" style={{ color: T.signal }}>Delivery network</div><div className="mt-2 text-2xl font-semibold">15+ countries</div><div className="mt-2 max-w-[190px] text-xs leading-relaxed" style={{ color: T.faint }}>Abstract network view. It does not represent specific client locations.</div></div></div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>;
}
