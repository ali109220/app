"use client";

import Link from "next/link";
import { ArrowUpRight, Zap, Heart, ShieldCheck, Rocket } from "lucide-react";
import { Reveal } from "@/site/motion";
import { InnerHero, SectionLabel } from "@/site/ui";
import { ContactSection } from "@/site/ContactSection";
import { T } from "@/site/theme";

// ALL copy SOURCED from solutions.html unless tagged otherwise.
const SOLUTIONS = [
  { name: "Core Banking", to: "/solutions/core-banking", p: "Streamline and enhance your banking operations with our comprehensive Core Banking solutions, including everything from payments systems to comprehensive risk management." },
  { name: "Fahim AI", to: "/solutions/fahim-ai", p: "Discover the Agentic AI engineered to execute defined rules — and deliver an enhanced, seamless customer experience." },
  { name: "MBuke", to: "/solutions/mbuke", p: "The comprehensive white-label digital banking solution with an aim to connect users and agents and empower communities with accessible digital banking infrastructure." },
  { name: "Software Management Systems", to: "/solutions/software-management-systems", p: "Optimize your software infrastructure with our robust management systems designed for seamless integration and maximum efficiency." },
  { name: "Managed Services", to: "/solutions/managed-services", p: "Let us manage your complex systems with our Managed Services, ensuring efficiency, security, and innovation without the overheads of in-house operations." },
  { name: "Banking Systems", to: "/solutions/banking-systems", p: "Partner with us for state-of-the-art Banking Systems developed by GRG Banking, tailored for reliability and advanced functionality." },
];

const DESIGNED_TO = [
  { t: "Streamline Operations and Boost Efficiency", icon: Zap },
  { t: "Enhance Customer Experience and Satisfaction", icon: Heart },
  { t: "Mitigate Risk and Ensure Security", icon: ShieldCheck },
  { t: "Embrace Innovation and Stay Ahead of the Curve", icon: Rocket },
];

export default function Solutions() {
  return (
    <div style={{ background: T.bg, color: T.text }} className="font-archivo">
      <InnerHero
        index="01"
        crumbs={["Home", "Solutions"]}
        title="Solutions"
        tagline="Intelligent Solutions for Your Business — Where Innovation Meets Global Excellence in Business Transformation."
        lead="At Tayseer, we empower businesses of all sizes with a comprehensive suite of cutting-edge AI and digital solutions. We are a single source for your technology needs, offering a diverse range of solutions customized for your business needs."
      />

      <section className="px-6 py-24 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border sm:grid-cols-2 lg:grid-cols-3" style={{ borderColor: T.border, background: T.border }}>
            {SOLUTIONS.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.05}>
                <Link href={s.to} data-testid={`sol-card-${i}`} className="group flex h-full flex-col justify-between p-8 transition-colors" style={{ background: T.panel }}>
                  <div>
                    <div className="font-jbmono text-[11px]" style={{ color: T.faint }}>0{i + 1}</div>
                    <h3 className="mt-4 text-xl font-semibold group-hover:text-[#0D5A8C]" style={{ transition: "color .2s" }}>{s.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: T.muted }}>{s.p}</p>
                  </div>
                  <span className="mt-8 inline-flex items-center gap-2 font-jbmono text-[11px] uppercase tracking-widest" style={{ color: T.signal }}>Read More <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t px-6 py-24 md:px-12" style={{ borderColor: T.border, background: T.panel }}>
        <div className="mx-auto max-w-[1400px]">
          <Reveal><SectionLabel>Outcomes</SectionLabel></Reveal>
          <Reveal delay={0.05}><h2 className="max-w-3xl text-4xl font-bold uppercase leading-[0.95] tracking-[-0.02em] sm:text-5xl">Our Products &amp; Services are designed to:</h2></Reveal>
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {DESIGNED_TO.map((d, i) => (
              <Reveal key={d.t} delay={i * 0.05}>
                <div className="flex items-start gap-4 rounded-lg border p-6" style={{ borderColor: T.border, background: T.bg }}>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md" style={{ background: "rgba(13,90,140,0.12)", color: T.signal }}><d.icon size={20} /></div>
                  <div className="pt-2.5 text-base font-medium">{d.t}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="mt-12 max-w-3xl text-lg leading-relaxed" style={{ color: T.muted }}>
              Ready to take your financial institution to the next level? Contact Tayseer Innovations today and explore how our comprehensive suite of solutions can help you achieve your business goals.
            </p>
          </Reveal>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
