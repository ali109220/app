import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/site/motion";
import { T } from "@/site/theme";
import { AIWorkflowVisual } from "./VisualMedia";

export default function FahimShowcase() {
  return (
    <section className="relative overflow-hidden border-t px-6 py-24 md:px-12" style={{ borderColor: T.border }} aria-labelledby="fahim-showcase-heading">
      <div className="pointer-events-none absolute right-[-12rem] top-[-12rem] h-[34rem] w-[34rem] rounded-full" style={{ background: T.signal, filter: "blur(220px)", opacity: 0.06 }} />
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-5"><div className="font-jbmono text-[11px] uppercase tracking-[0.26em]" style={{ color: T.green }}>Fahim AI</div><h2 id="fahim-showcase-heading" className="mt-5 text-4xl font-bold uppercase leading-[0.95] tracking-[-0.025em] sm:text-5xl">Banking Intelligence</h2><p className="mt-6 max-w-lg text-base leading-relaxed" style={{ color: T.muted }}>Connect signals, improve decisions and automate selected workflows with human oversight.</p><Link href="/solutions/fahim-ai" className="mt-8 inline-flex min-h-11 items-center gap-2 font-jbmono text-[11px] uppercase tracking-widest" style={{ color: T.signal }}>Explore Fahim AI <ArrowRight aria-hidden="true" size={14} /></Link></Reveal>
        <Reveal delay={0.08} className="lg:col-span-7"><AIWorkflowVisual /></Reveal>
      </div>
    </section>
  );
}
