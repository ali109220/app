import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { LineReveal, Marquee } from "@/site/motion";
import { T } from "@/site/theme";

const TRUST_AREAS = ["Banking", "FinTech", "Payments", "Digital Banking", "AI", "Core Banking", "Managed Services", "Banking Systems"];

export default function EnterpriseHero() {
  return (
    <section className="grain relative min-h-screen overflow-hidden" aria-labelledby="phase6-home-title">
      <Image src="/background.jpeg" alt="" fill priority sizes="(min-width: 768px) 66vw, 1px" className="pointer-events-none absolute right-0 top-0 hidden object-cover object-right opacity-90 md:block" style={{ maskImage: "linear-gradient(90deg,transparent,#000 58%)", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 58%)" }} />
      <div className="hairline-grid absolute inset-0" style={{ "--hl": T.hl, backgroundSize: "8.33% 6rem" }} />
      <div className="relative mx-auto flex min-h-screen max-w-[1400px] flex-col justify-center px-6 pb-28 pt-32 md:px-12">
        <div className="mb-7 flex items-center gap-3 font-jbmono text-[11px] uppercase tracking-[0.28em]" style={{ color: T.signal }}><span className="h-1.5 w-1.5" style={{ background: T.green }} />Enterprise Banking Technology</div>
        <h1 id="phase6-home-title" className="max-w-5xl text-[13vw] font-extrabold uppercase leading-[0.86] tracking-[-0.04em] sm:text-7xl lg:text-[7rem]">
          <LineReveal lines={["Banking.", <span key="reinvented" style={{ color: T.signal }}>Reinvented.</span>]} />
        </h1>
        <p className="phase3-hero-actions mt-8 max-w-xl text-base leading-relaxed sm:text-lg" style={{ color: T.muted }}>Core banking, digital channels, AI and managed technology for financial institutions ready to move forward.</p>
        <div className="phase3-hero-actions mt-9 flex flex-wrap items-center gap-4">
          <Link href="/connect" data-testid="hero-cta" className="group inline-flex min-h-12 items-center gap-2 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider transition-transform hover:-translate-y-0.5" style={{ background: T.signal, color: T.bg }}>Schedule Consultation <ArrowRight aria-hidden="true" size={16} className="transition-transform group-hover:translate-x-1" /></Link>
          <Link href="/solutions" className="group inline-flex min-h-12 items-center gap-2 border px-7 py-3.5 text-sm font-semibold uppercase tracking-wider" style={{ borderColor: T.border, color: T.text }}>Explore Solutions <ArrowUpRight aria-hidden="true" size={15} /></Link>
        </div>
      </div>
      <div className="absolute bottom-0 w-full border-t py-4 font-jbmono text-[10px] uppercase tracking-[0.26em] sm:text-[11px]" style={{ borderColor: T.border, color: T.faint, background: "rgba(247,246,242,.78)" }}><Marquee items={TRUST_AREAS} speed={48} /></div>
    </section>
  );
}
