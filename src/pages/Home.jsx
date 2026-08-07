import { useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, Sparkles, BarChart3, ShieldCheck, Workflow, Target,
  Users, Eye, BadgeCheck, Server, Cloud, Quote,
} from "lucide-react";
import { Reveal, LineReveal, Marquee } from "@/site/motion";
import { toast } from "sonner";
import { T } from "@/site/theme";
import { DataGridArt, ContactAccentArt } from "@/site/DecorativeArt";

const Link = ({ to, children, ...props }) => <NextLink href={to} {...props}>{children}</NextLink>;

// ALL copy below is SOURCED from the live tayseer.me mirror unless tagged otherwise.

const SERVICES = [
  { name: "Core Banking", tag: "Future-Proof Core Banking. Growth Unleashed.", to: "/solutions/core-banking" },
  { name: "Fahim AI", tag: "Intelligence to Revolutionize Your Business", to: "/solutions/fahim-ai" },
  { name: "MBuke", tag: "White-Label Mobile Banking Platform", to: "/solutions/mbuke" },
  { name: "Software Management Systems", tag: "Effortless Solutions. Powerful Results.", to: "/solutions/software-management-systems" },
  { name: "Managed Services", tag: "Peak Performance via Managed Expertise.", to: "/solutions/managed-services" },
  { name: "Banking Systems", tag: "Experience Next-Gen Banking with GRG Banking", to: "/solutions/banking-systems" },
];

const STATS = [
  { n: 100, suffix: "+", label: "Satisfied Clients" },
  { n: 15, suffix: "+", label: "Countries" },
  { n: 600, suffix: "+", label: "Finished Products" },
  { n: 100, suffix: "+", label: "Skilled Experts" },
];

const VALUE_PROPS = [
  { t: "Enhanced Customer Experience", icon: Sparkles },
  { t: "Data Driven Decision Making", icon: BarChart3 },
  { t: "Robust Fraud Detection", icon: ShieldCheck },
  { t: "Streamlined Operations", icon: Workflow },
  { t: "Personalized Customer Strategies", icon: Target },
];

const MANTRA = [
  { t: "Dedicated One Project, One Team", d: "Our team focuses exclusively on your business success.", icon: Users },
  { t: "Complete Transparency", d: "Daily updates and direct communication with all key team members.", icon: Eye },
  { t: "Consistent Quality", d: "Polished and tailored business-ready products and services.", icon: BadgeCheck },
];

const DEPLOY = [
  { t: "On-Site Deployment", d: "A traditional approach for those who prioritize control & customization with seamless integration.", icon: Server },
  { t: "Cloud Deployment", d: "Designed for agility, scalability, cost-effectiveness and enhanced operational efficiency.", icon: Cloud },
];

const TESTIMONIALS = [
  { name: "Saber Alkahtani", role: "Head of Individual Services Sector", q: "Tayseer Innovations has been a key partner in driving growth and innovation within our individual banking services. Their solutions empower us to stay ahead of the curve and cater to the evolving needs of our customers." },
  { name: "Abdulla Alttowi", role: "Manager – R&D", q: "By partnering with Tayseer Innovations, our bank is well-positioned for the future. Their innovative FinTech solutions provide a robust foundation for continuous improvement and adaptation within the ever-evolving financial landscape." },
  { name: "Bassma Alzailay", role: "Development & Systems Analyst Manager", q: "Tayseer Innovations developed a user-friendly and intuitive software application for our customers. The app has been a huge hit, and our customer satisfaction ratings have soared since its launch. The team of developers at Tayseer is highly skilled and experienced. They were able to understand our complex requirements and develop a software solution that meets all our needs. They also kept us informed throughout the development process, which was very important to us." },
  { name: "Amd Ali", role: "IT Sector Manager", q: "The scalable products and services from Tayseer Innovations have seamlessly adapted to our evolving needs, proving essential to our growth. Their dedicated support team has been pivotal not only in smooth implementation but also as a partner in our ongoing success." },
];

const CountUp = ({ to, suffix }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf, start;
    const dur = 1600;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / dur);
      setV(Math.floor((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{v}{suffix}</span>;
};

const SectionLabel = ({ children }) => (
  <div className="mb-6 flex items-center gap-3 font-jbmono text-[12px] uppercase tracking-[0.25em]" style={{ color: T.signal }}>
    <span className="h-1.5 w-1.5" style={{ background: T.green }} />{children}
  </div>
);

export default function Home() {
  const handleContact = async (e) => {
    e.preventDefault();
    const f = e.target;
    const fd = new FormData(f);
    const p = { name: fd.get("name"), email: fd.get("email"), phone: "", organization: fd.get("company") || "—", message: fd.get("message") };
    try {
      const res = await fetch("/api/connect", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(p) });
      const d = await res.json().catch(() => ({}));
      if (!res.ok || !d.ok) throw new Error(d.error || "send failed");
      toast.success("Thanks — your message has been sent.");
      f.reset();
    } catch (err) {
      toast.message("Opening your email app to send your message…");
      window.location.href = `mailto:info@tayseer.me?subject=${encodeURIComponent("Website Query - " + (p.name || ""))}&body=${encodeURIComponent((p.message || "") + "\n\n" + (p.email || ""))}`;
    }
  };
  return (
    <div style={{ background: T.bg, color: T.text }} className="font-archivo">
      <section className="grain relative min-h-screen overflow-hidden">
        <img src="https://static.prod-images.emergentagent.com/jobs/820ed89a-f907-42ba-8029-9fc496755307/images/d7082aa064a573f30c37c34174e7d046c75aa40b56150ce1a6aa66cb5aa906b2.jpeg" alt="" className="pointer-events-none absolute right-0 top-0 hidden h-full w-2/3 object-cover object-right opacity-90 md:block" style={{ maskImage: "linear-gradient(90deg,transparent,#000 55%)", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 55%)" }} />
        <div className="hairline-grid absolute inset-0" style={{ "--hl": T.hl, backgroundSize: "8.33% 6rem" }} />
        <div className="pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full" style={{ background: T.signal, filter: "blur(220px)", opacity: 0.04 }} />
        <div className="relative mx-auto flex min-h-screen max-w-[1400px] flex-col justify-center px-6 pt-28 pb-20 md:px-12">
          <SectionLabel>Innovative approach</SectionLabel>
          <h1 className="max-w-5xl text-[13vw] font-extrabold uppercase leading-[0.88] tracking-[-0.03em] sm:text-7xl lg:text-[7rem]">
            <LineReveal lines={["Future-ready AI", <>&amp; Digital <span style={{ color: T.signal }}>Solutions</span></>]} />
          </h1>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }} className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/connect" data-testid="hero-cta" className="group inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold uppercase tracking-wider transition-transform hover:-translate-y-0.5" style={{ background: T.signal, color: T.bg }}>
              Submit A Query <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/solutions" className="inline-flex items-center gap-2 border px-8 py-4 text-sm font-semibold uppercase tracking-wider transition-colors hover:border-[#0D5A8C]" style={{ borderColor: "rgba(238,241,244,0.2)" }}>
              View All Services
            </Link>
          </motion.div>
        </div>
        <div className="absolute bottom-0 w-full border-t py-4 font-jbmono text-[11px] uppercase tracking-[0.3em]" style={{ borderColor: T.border, color: T.faint }}>
          <Marquee items={SERVICES.map((s) => s.name)} speed={45} />
        </div>
      </section>

      <section className="relative border-t px-6 py-24 md:px-12" style={{ borderColor: T.border }}>
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Reveal>
              <SectionLabel>Solutions</SectionLabel>
              <h2 className="max-w-2xl text-4xl font-bold uppercase leading-[0.95] tracking-[-0.02em] sm:text-5xl">We Have All Your Business Needs Covered</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link to="/solutions" className="inline-flex items-center gap-2 font-jbmono text-[12px] uppercase tracking-widest transition-colors hover:text-white" style={{ color: T.signal }} data-testid="view-all-services">
                View All Services <ArrowUpRight size={14} />
              </Link>
            </Reveal>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-lg border sm:grid-cols-2 lg:grid-cols-3" style={{ borderColor: T.border, background: T.border }}>
            {SERVICES.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.05}>
                <Link to={s.to} data-testid={`service-card-${i}`} className="group flex h-full flex-col justify-between p-8 transition-colors" style={{ background: T.panel }}>
                  <div>
                    <div className="font-jbmono text-[11px]" style={{ color: T.faint }}>0{i + 1}</div>
                    <h3 className="mt-4 text-xl font-semibold group-hover:text-[#0D5A8C]" style={{ transition: "color .2s" }}>{s.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: T.muted }}>{s.tag}</p>
                  </div>
                  <ArrowUpRight size={18} className="mt-8 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: T.signal }} />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t px-6 py-24 md:px-12" style={{ borderColor: T.border }}>
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal><SectionLabel>About Us</SectionLabel></Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-4xl font-bold uppercase leading-[0.95] tracking-[-0.02em] sm:text-5xl">Born from Innovation, Backed by Strength</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed" style={{ color: T.muted }}>
                Established in 2016, Tayseer Innovations emerges as a premier FinTech company in the UAE. We specialize in elevating businesses through advanced financial technology solutions, enhancing financial accessibility and fostering regional growth. As more than just a service provider, we position ourselves as your committed ally in the digital landscape, dedicated to facilitating your journey towards digital excellence. Our approach exceeds traditional service; we engage in a partnership that jointly shapes your digital destiny.
              </p>
              <Link to="/about" className="mt-8 inline-flex items-center gap-2 font-jbmono text-[12px] uppercase tracking-widest transition-colors hover:text-white" style={{ color: T.signal }} data-testid="about-read-more">
                Read more about Tayseer <ArrowRight size={14} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t px-6 py-20 md:px-12" style={{ borderColor: T.border, background: T.panel }}>
        <DataGridArt className="pointer-events-none absolute right-6 top-6 hidden h-40 w-56 opacity-60 lg:block" />
        <div className="mx-auto max-w-[1400px]">
          <Reveal><SectionLabel>Tayseer By Numbers</SectionLabel></Reveal>
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden lg:grid-cols-4" style={{ background: T.border }}>
            {STATS.map((s, i) => (
              <div key={s.label} data-testid={`stat-${i}`} className="p-8" style={{ background: T.panel }}>
                <div className="text-5xl font-extrabold tracking-tight sm:text-6xl" style={{ color: T.signal }}><CountUp to={s.n} suffix={s.suffix} /></div>
                <div className="mt-3 font-jbmono text-[12px] uppercase tracking-widest" style={{ color: T.muted }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t px-6 py-24 md:px-12" style={{ borderColor: T.border }}>
        <div className="mx-auto max-w-[1400px]">
          <Reveal><SectionLabel>Why Tayseer</SectionLabel></Reveal>
          <Reveal delay={0.05}>
            <h2 className="max-w-3xl text-4xl font-bold uppercase leading-[0.95] tracking-[-0.02em] sm:text-5xl">Become Future – Ready With Our Cutting Edge Products &amp; Services</h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VALUE_PROPS.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.05}>
                <div className="flex h-full items-start gap-4 rounded-lg border p-6" style={{ borderColor: T.border, background: T.panel }}>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md" style={{ background: "rgba(13,90,140,0.12)", color: T.signal }}>
                    <v.icon size={20} />
                  </div>
                  <div className="pt-1.5 text-base font-medium">{v.t}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t px-6 py-24 md:px-12" style={{ borderColor: T.border, background: T.panel }}>
        <div className="mx-auto max-w-[1400px]">
          <Reveal><SectionLabel>How We Work</SectionLabel></Reveal>
          <Reveal delay={0.05}><h2 className="text-4xl font-bold uppercase leading-[0.95] tracking-[-0.02em] sm:text-5xl">Our Success Mantra</h2></Reveal>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {MANTRA.map((m, i) => (
              <Reveal key={m.t} delay={i * 0.08}>
                <div className="h-full border-t pt-6" style={{ borderColor: "rgba(13,90,140,0.4)" }}>
                  <m.icon size={22} style={{ color: T.signal }} />
                  <h3 className="mt-5 text-xl font-semibold">{m.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: T.muted }}>{m.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t px-6 py-24 md:px-12" style={{ borderColor: T.border }}>
        <div className="mx-auto max-w-[1400px]">
          <Reveal><SectionLabel>Deployment</SectionLabel></Reveal>
          <Reveal delay={0.05}><h2 className="text-4xl font-bold uppercase leading-[0.95] tracking-[-0.02em] sm:text-5xl">We Pioneer Flexible Technology</h2></Reveal>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {DEPLOY.map((d, i) => (
              <Reveal key={d.t} delay={i * 0.08}>
                <div className="group flex h-full flex-col rounded-lg border p-10 transition-colors hover:border-[#0D5A8C]" style={{ borderColor: T.border, background: T.panel }}>
                  <div className="flex h-14 w-14 items-center justify-center rounded-md" style={{ background: "rgba(13,90,140,0.12)", color: T.signal }}><d.icon size={26} /></div>
                  <h3 className="mt-6 text-2xl font-semibold">{d.t}</h3>
                  <p className="mt-3 max-w-md text-base leading-relaxed" style={{ color: T.muted }}>{d.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t px-6 py-24 md:px-12" style={{ borderColor: T.border, background: T.panel }}>
        <div className="mx-auto max-w-[1400px]">
          <Reveal><SectionLabel>Our Client Speak</SectionLabel></Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.06}>
                <figure data-testid={`testimonial-${i}`} className="flex h-full flex-col rounded-lg border p-8" style={{ borderColor: T.border, background: T.bg }}>
                  <Quote size={26} style={{ color: T.signal }} />
                  <blockquote className="mt-5 flex-1 text-base leading-relaxed" style={{ color: T.muted }}>{t.q}</blockquote>
                  <figcaption className="mt-6 border-t pt-5" style={{ borderColor: T.border }}>
                    <div className="font-semibold">{t.name}</div>
                    <div className="font-jbmono text-[11px] uppercase tracking-widest" style={{ color: T.faint }}>{t.role}</div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t px-6 py-24 md:px-12" style={{ borderColor: T.border }}>
        <ContactAccentArt className="pointer-events-none absolute -right-10 top-0 hidden h-64 w-64 opacity-70 lg:block" />
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal><SectionLabel>Talk To Us</SectionLabel></Reveal>
            <Reveal delay={0.05}><h2 className="text-4xl font-bold uppercase leading-[0.95] tracking-[-0.02em] sm:text-5xl">How May We Help You!</h2></Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 space-y-2 font-jbmono text-sm" style={{ color: T.muted }}>
                <div><a href="mailto:info@tayseer.me" className="hover:text-white">info@tayseer.me</a></div>
                <div><a href="tel:+966555203079" className="hover:text-white">+966 555203079</a></div>
                <div><a href="tel:+97143997558" className="hover:text-white">+971 43997558</a></div>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <form data-testid="home-contact-form" onSubmit={handleContact} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input name="name" required placeholder="Name" data-testid="contact-name" className="rounded-md border bg-transparent px-4 py-3.5 text-sm outline-none focus:border-[#0D5A8C]" style={{ borderColor: T.border, color: T.text }} />
                <input name="email" type="email" required placeholder="Email" data-testid="contact-email" className="rounded-md border bg-transparent px-4 py-3.5 text-sm outline-none focus:border-[#0D5A8C]" style={{ borderColor: T.border, color: T.text }} />
                <input name="company" placeholder="Company (optional)" data-testid="contact-company" className="rounded-md border bg-transparent px-4 py-3.5 text-sm outline-none focus:border-[#0D5A8C] sm:col-span-2" style={{ borderColor: T.border, color: T.text }} />
                <textarea name="message" required rows={4} placeholder="How may we help you?" data-testid="contact-message" className="rounded-md border bg-transparent px-4 py-3.5 text-sm outline-none focus:border-[#0D5A8C] sm:col-span-2" style={{ borderColor: T.border, color: T.text }} />
                <button type="submit" data-testid="contact-submit" className="inline-flex w-full items-center justify-center gap-2 px-8 py-4 text-sm font-semibold uppercase tracking-wider transition-transform hover:-translate-y-0.5 sm:w-auto" style={{ background: T.signal, color: T.bg }}>
                  Submit <ArrowRight size={16} />
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
