import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/site/motion";
import { POSTS } from "@/pages/blogData";
import { T } from "@/site/theme";

export default function LatestInsights() {
  const latest = POSTS.slice(0, 3);
  return (
    <section className="relative border-t px-6 py-24 md:px-12" style={{ borderColor: T.border }} aria-labelledby="insights-heading">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><Reveal><div className="font-jbmono text-[11px] uppercase tracking-[0.26em]" style={{ color: T.signal }}>Resources</div><h2 id="insights-heading" className="mt-5 text-4xl font-bold uppercase leading-[0.96] tracking-[-0.025em] sm:text-5xl">Latest Insights</h2></Reveal><Reveal delay={0.08}><Link href="/blog" className="inline-flex min-h-11 items-center gap-2 font-jbmono text-[11px] uppercase tracking-widest" style={{ color: T.signal }}>View all insights <ArrowRight aria-hidden="true" size={14} /></Link></Reveal></div>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">{latest.map((post, index) => <Reveal key={post.slug} delay={index * 0.05}><Link href={`/blog/${post.slug}`} className="group flex h-full min-h-[290px] flex-col rounded-xl border p-7 sm:p-8" style={{ borderColor: T.border, background: index === 0 ? T.panel : T.bg }}><div className="flex items-center justify-between gap-4 font-jbmono text-[10px] uppercase tracking-[0.18em]" style={{ color: T.faint }}><span>Insight 0{index + 1}</span><span>{post.date}</span></div><h3 className="mt-8 max-w-2xl text-2xl font-semibold leading-tight tracking-[-0.02em] sm:text-3xl">{post.title}</h3><p className="mt-4 max-w-2xl text-sm leading-relaxed" style={{ color: T.muted }}>{post.excerpt}</p><div className="mt-auto flex items-center justify-between gap-6 pt-8"><span className="font-jbmono text-[10px] uppercase tracking-[0.18em]" style={{ color: T.signal }}>Read article</span><ArrowUpRight aria-hidden="true" size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: T.signal }} /></div></Link></Reveal>)}</div>
      </div>
    </section>
  );
}
