import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { T } from "@/site/theme";

const PROOF = [
  ["15+", "Countries"],
  ["100+", "Satisfied clients"],
  ["100+", "Skilled experts"],
];

export default function CinematicHero() {
  return (
    <section className="relative isolate overflow-hidden border-b px-6 pb-14 pt-24 md:min-h-[92vh] md:px-12 md:pb-20 md:pt-32" style={{ borderColor: T.border }} aria-labelledby="phase7-hero-title">
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(circle at 78% 30%, rgba(13,90,140,.15), transparent 30%), linear-gradient(180deg, rgba(13,90,140,.04), transparent 58%)" }} />
      <div className="hairline-grid pointer-events-none absolute inset-0 opacity-45" style={{ "--hl": T.hl, backgroundSize: "8.33% 6rem" }} />

      <div className="relative mx-auto grid max-w-[1480px] gap-6 lg:grid-cols-12 lg:items-center xl:gap-10">
        <div className="lg:col-span-6">
          <div className="mb-5 flex items-center gap-3 font-jbmono text-xs uppercase tracking-[0.24em] md:mb-7" style={{ color: T.signal }}>
            <span className="h-1.5 w-1.5" style={{ background: T.green }} /> Enterprise banking technology
          </div>

          <h1 id="phase7-hero-title" className="max-w-[690px] text-[15vw] font-extrabold leading-[.84] tracking-[-.045em] sm:text-7xl lg:text-[5.8rem] xl:text-[6.4rem]">
            <span className="block overflow-hidden"><span className="motion-line-reveal block" style={{ animationDelay: ".15s" }}>Banking.</span></span>
            <span className="block overflow-hidden"><span className="motion-line-reveal block" style={{ color: T.signal, animationDelay: ".26s" }}>Reinvented.</span></span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed sm:text-lg md:mt-7" style={{ color: T.muted }}>
            AI, digital banking and enterprise technology working together to help financial institutions modernize with confidence.
          </p>

          <div className="mt-7 flex flex-wrap gap-3 md:mt-9">
            <Link href="/connect" className="group inline-flex min-h-12 items-center gap-2 px-7 py-3.5 text-sm font-semibold tracking-wide" style={{ background: T.signal, color: T.bg }}>
              Schedule consultation <ArrowRight aria-hidden="true" size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/solutions" className="group inline-flex min-h-12 items-center gap-2 border px-7 py-3.5 text-sm font-semibold tracking-wide" style={{ borderColor: T.border }}>
              Explore solutions <ArrowUpRight aria-hidden="true" size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="mt-6 grid max-w-xl grid-cols-3 gap-3 border-t pt-5 md:mt-8" style={{ borderColor: T.border }} aria-label="Published Tayseer company figures">
            {PROOF.map(([value, label]) => <div key={label}><div className="text-lg font-semibold sm:text-xl">{value}</div><div className="mt-1 text-xs leading-tight" style={{ color: T.muted }}>{label}</div></div>)}
          </div>
        </div>

        <div className="relative mx-auto w-full lg:col-span-6">
          <div className="absolute inset-6 rounded-full blur-3xl" style={{ background: "rgba(13,90,140,.13)" }} />
          <div className="relative mx-auto w-full max-w-[720px]">
            <img
              src="/tayseer-banking-hero.svg"
              alt="Tayseer enterprise banking technology ecosystem connecting digital banking, core banking, payments, AI, integration and managed services"
              width="720"
              height="480"
              className="h-auto w-full object-contain"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
