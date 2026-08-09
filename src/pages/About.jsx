import { Reveal } from "@/site/motion";
import { InnerHero, SectionLabel } from "@/site/ui";
import { ContactSection } from "@/site/ContactSection";
import { T } from "@/site/theme";
import { Building2, Sparkles, Globe, CheckCircle2, Target, Compass, Gem } from "lucide-react";


// ALL copy SOURCED from about-us.html.
const KURAIMI = [
  { icon: Building2, h: "Unmatched Industry Insights", p: "Our affiliation with two prominent banks within the group enriches our understanding of the financial sector, enabling us to tailor solutions that effectively tackle practical challenges." },
  { icon: Sparkles, h: "Culture of Innovation", p: "The presence of multiple technology companies within the Kuraimi Group fosters a vibrant culture where innovation is routine, paving the way for pioneering ideas." },
  // FLAG 4 — concrete sourced company-scale numbers, kept verbatim.
  { icon: Globe, h: "Global Reach and Expertise", p: "Our team, comprising over 5,500 professionals from more than 20 nationalities, caters to over 4 million customers regionwide. This extensive network equips us to offer superior service with an international outlook." },
];

const COMMITMENTS = [
  { h: "More Accessible", p: "Ensuring that effective financial tools are available to all." },
  { h: "Less Time-Consuming", p: "Optimizing your operations so you can concentrate on your core business." },
  { h: "Significantly More Efficient", p: "Elevating your profitability with intelligent, cutting-edge technologies." },
  { h: "Seamlessly Integrated", p: "Our solutions promote fluid transactions and superior system integration." },
  { h: "Empowering Better Business Outcomes", p: "Our ultimate aim is to bolster your business’s success." },
];

const VMV = [
  { icon: Compass, h: "Our Vision", p: "To contribute to digitalizing the financial sector." },
  { icon: Target, h: "Our Mission", p: "To provide the most comprehensive advanced solutions to our partners enabling them to provide their financial products in a fast, easy, convenient, and cost-effective way. This will be achieved by digitalizing their activities and processes. Our research and development capabilities will support the financial partners to cope and compete in this challenging and rapidly changing environment. Our selective team members are committed to meeting the expectations of the financial partners." },
  { icon: Gem, h: "Our Values", p: "Commitment: We are dedicated to delivering exceptional results and building long-lasting partnerships. Respectfulness: We value diverse perspectives and foster a collaborative environment where everyone feels heard. Clarity & Transparency: We believe in open communication and clear expectations, ensuring trust with clients and partners. Social Responsibility: We strive to create positive change by empowering financial inclusion and supporting local communities." },
];

const EFFICIENCY = [
  { h: "Reduce Manpower Costs", p: "We specialize in delivering innovative solutions using AI that automate key financial processes such as loan approvals, account management, and customer onboarding, significantly reducing manual labor and cutting back-office costs." },
  { h: "Reduce Infrastructure Investment", p: "Ditch the tech burden! We provide cutting-edge solutions with flexible tech models, eliminating upfront costs and scaling seamlessly with your bank’s needs, especially for large customer bases." },
  { h: "Improve Customer Experience", p: "Empower your customers with self-service, mobile banking, and AI chatbots powered by our solutions – reduce costs by streamlining operations without sacrificing customer satisfaction through a user-friendly experience." },
];

const PARTNERS = [
  { h: "Intertech", p: "A pioneer and leader in the Turkish and EMEA fintech market" },
  { h: "DZD Tech", p: "Experts in mobile banking & internet banking solutions" },
  { h: "Odyssey Solutions", p: "Specialists in AI and machine learning solutions in fintech" },
  { h: "Ultimate Solutions", p: "Banking solutions experts and Temenos partner firm" },
  { h: "GRG Banking", p: "Top global player with state of the art banking hardware technology" },
];

export default function About() {
  return (
    <div style={{ background: T.bg, color: T.text }} className="font-instrument">
      <InnerHero
        index="02"
        crumbs={["Home", "About Us"]}
        title="About Us"
        tagline="We are Tayseer – The Trusted Partner for Your Business"
        lead="Established in 2016, we have emerged as the premier tech company in the region. Our expertise in creating intelligent solutions customized for your business, from advanced Agentic AI platforms to white-label Digital and Mobile Banking solutions. We specialize in elevating businesses through advanced AI and digital solutions, enhancing their customer experience and fostering growth. We are not just a service provider, we position ourselves as your committed ally and partner in the technology landscape, dedicated to facilitating your journey towards digital transformation. Our approach exceeds traditional service; we aim to engage in a partnership that jointly shapes your journey to digital excellence."
      />

      {/* KURAIMI GROUP */}
      <section className="px-6 py-24 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <Reveal><SectionLabel>Backed by Strength</SectionLabel></Reveal>
          <Reveal delay={0.05}>
            <p className="max-w-3xl text-2xl font-medium leading-snug">Tayseer Innovations is built upon the solid foundation of the Kuraimi Group, a diversified multinational conglomerate. This powerful partnership provides us with:</p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {KURAIMI.map((k, i) => (
              <Reveal key={k.h} delay={i * 0.08}>
                <div className="h-full rounded-lg border p-8" style={{ borderColor: T.border, background: T.panel }}>
                  <k.icon size={24} style={{ color: T.signal }} />
                  <h3 className="mt-5 text-lg font-semibold">{k.h}</h3>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: T.muted }}>{k.p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY TAYSEER */}
      <section className="border-t px-6 py-24 md:px-12" style={{ borderColor: T.border, background: T.panel }}>
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><Reveal><SectionLabel>Why About ‘Tayseer’?</SectionLabel></Reveal></div>
          <div className="lg:col-span-8">
            <Reveal delay={0.05}>
              <p className="text-2xl font-medium leading-snug">
                The name “Tayseer,” which translates from Arabic as “to facilitate” or “to make easier,” encapsulates our mission: <span style={{ color: T.signal }}>To simplify complex financial processes with the sharpest FinTech solutions.</span>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* COMMITMENTS */}
      <section className="border-t px-6 py-24 md:px-12" style={{ borderColor: T.border }}>
        <div className="mx-auto max-w-[1400px]">
          <Reveal><SectionLabel>Our Commitments to You</SectionLabel></Reveal>
          <Reveal delay={0.05}><p className="max-w-3xl text-lg" style={{ color: T.muted }}>At Tayseer Innovations, our passion lies in transforming your financial operations by making them:</p></Reveal>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COMMITMENTS.map((c, i) => (
              <Reveal key={c.h} delay={(i % 3) * 0.05}>
                <div className="flex h-full gap-4 rounded-lg border p-6" style={{ borderColor: T.border, background: T.panel }}>
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0" style={{ color: T.signal }} />
                  <div>
                    <div className="font-semibold">{c.h}</div>
                    <p className="mt-1.5 text-sm leading-relaxed" style={{ color: T.muted }}>{c.p}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VISION / MISSION / VALUES */}
      <section className="border-t px-6 py-24 md:px-12" style={{ borderColor: T.border, background: T.panel }}>
        <div className="mx-auto max-w-[1400px] space-y-6">
          {VMV.map((v, i) => (
            <Reveal key={v.h} delay={i * 0.06}>
              <div className="grid grid-cols-1 gap-6 border-t pt-8 md:grid-cols-12" style={{ borderColor: "rgba(13,90,140,0.4)" }}>
                <div className="flex items-center gap-3 md:col-span-4">
                  <v.icon size={22} style={{ color: T.signal }} />
                  <h3 className="text-2xl font-bold uppercase tracking-tight">{v.h}</h3>
                </div>
                <p className="text-base leading-relaxed md:col-span-8" style={{ color: T.muted }}>{v.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* EFFICIENCY / LOWER COSTS */}
      <section className="border-t px-6 py-24 md:px-12" style={{ borderColor: T.border }}>
        <div className="mx-auto max-w-[1400px]">
          <Reveal><SectionLabel>Partnership Value</SectionLabel></Reveal>
          <Reveal delay={0.05}><h2 className="max-w-4xl text-4xl font-bold uppercase leading-[0.95] tracking-[-0.02em] sm:text-5xl">Our Partnership Aims to Improve Your Business Efficiency &amp; Lower Your Operating Costs</h2></Reveal>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {EFFICIENCY.map((e, i) => (
              <Reveal key={e.h} delay={i * 0.08}>
                <div className="h-full rounded-lg border p-8" style={{ borderColor: T.border, background: T.panel }}>
                  <div className="font-jbmono text-[11px]" style={{ color: T.faint }}>{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="mt-4 text-lg font-semibold">{e.h}</h3>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: T.muted }}>{e.p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER ECOSYSTEM */}
      <section className="border-t px-6 py-24 md:px-12" style={{ borderColor: T.border, background: T.panel }}>
        <div className="mx-auto max-w-[1400px]">
          <Reveal><SectionLabel>Partner Ecosystem</SectionLabel></Reveal>
          <Reveal delay={0.05}><h2 className="max-w-4xl text-3xl font-bold uppercase leading-[0.95] tracking-[-0.02em] sm:text-4xl">Our Robust Partner Ecosystem Helps You Accelerate Your Digital Transformation Journey</h2></Reveal>
          {/* NEEDS VERIFICATION — partner logo image assets available in mirror /images; names/taglines sourced. */}
          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border sm:grid-cols-2 lg:grid-cols-3" style={{ borderColor: T.border, background: T.border }}>
            {PARTNERS.map((p) => (
              <Reveal key={p.h}>
                <div className="h-full p-8" style={{ background: T.bg }}>
                  <h4 className="text-lg font-semibold" style={{ color: T.signal }}>{p.h}</h4>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: T.muted }}>{p.p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
