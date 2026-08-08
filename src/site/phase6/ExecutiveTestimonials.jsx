import { Quote } from "lucide-react";
import { Reveal } from "@/site/motion";
import { T } from "@/site/theme";
import { IdentityTile } from "./VisualMedia";

const TESTIMONIALS = [
  { name: "Saber Alkahtani", role: "Head of Individual Services Sector", quote: "Tayseer Innovations has been a key partner in driving growth and innovation within our individual banking services." },
  { name: "Abdulla Alttowi", role: "Manager – R&D", quote: "Their innovative FinTech solutions provide a robust foundation for continuous improvement and adaptation." },
  { name: "Bassma Alzailay", role: "Development & Systems Analyst Manager", quote: "The team understood our complex requirements and developed a software solution that meets our needs." },
  { name: "Amd Ali", role: "IT Sector Manager", quote: "Their support team has been pivotal in smooth implementation and as a partner in our ongoing success." },
];

export default function ExecutiveTestimonials() {
  return (
    <section className="relative border-t px-6 py-24 md:px-12" style={{ borderColor: T.border, background: T.panel }} aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-[1400px]">
        <Reveal><div className="font-jbmono text-[11px] uppercase tracking-[0.26em]" style={{ color: T.signal }}>Client feedback</div><h2 id="testimonials-heading" className="mt-5 max-w-3xl text-4xl font-bold uppercase leading-[0.96] tracking-[-0.025em] sm:text-5xl">What Clients Say</h2><p className="mt-5 max-w-xl text-base" style={{ color: T.muted }}>Feedback already published by Tayseer, presented with clearer visual identity and less copy.</p></Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">{TESTIMONIALS.map((item, index) => <Reveal key={item.name} delay={index * 0.05}><article className="flex h-full min-h-[250px] flex-col rounded-xl border p-7 sm:p-8" style={{ borderColor: T.border, background: T.bg }}><div className="flex items-center justify-between"><IdentityTile name={item.name} role={item.role} /><Quote aria-hidden="true" size={22} style={{ color: T.signal }} /></div><blockquote className="mt-8 text-xl leading-relaxed sm:text-2xl">“{item.quote}”</blockquote><div className="mt-auto pt-7 font-jbmono text-[9px] uppercase tracking-[0.18em]" style={{ color: T.faint }}>Published client perspective</div></article></Reveal>)}</div>
      </div>
    </section>
  );
}
