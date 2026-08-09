import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { POSTS } from "@/pages/blogData";
import { T } from "@/site/theme";

export default function LatestInsights() {
  const latest = POSTS.slice(0, 3);
  return (
    <section className="relative border-t px-6 py-20 md:px-12 md:py-24" style={{ borderColor: T.border }} aria-labelledby="insights-heading">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div><div className="font-jbmono text-xs uppercase tracking-[0.22em]" style={{ color: T.signal }}>Resources</div><h2 id="insights-heading" className="mt-5 text-4xl font-bold leading-[0.96] tracking-[-0.025em] sm:text-5xl">Latest insights</h2></div>
          <Link href="/blog" className="inline-flex min-h-11 items-center gap-2 font-jbmono text-xs tracking-wide" style={{ color: T.signal }}>View all insights <ArrowRight aria-hidden="true" size={14} /></Link>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">{latest.map((post, index) => <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex h-full min-h-[290px] flex-col rounded-xl border p-7 sm:p-8" style={{ borderColor: T.border, background: index === 0 ? T.panel : T.bg }}><div className="flex items-center justify-between gap-4 font-jbmono text-xs tracking-wide" style={{ color: T.muted }}><span>Insight 0{index + 1}</span><span>{post.date}</span></div><h3 className="mt-8 max-w-2xl text-2xl font-semibold leading-tight tracking-[-0.02em] sm:text-3xl">{post.title}</h3><p className="mt-4 max-w-2xl text-sm leading-relaxed" style={{ color: T.muted }}>{post.excerpt}</p><div className="mt-auto flex items-center justify-between gap-6 pt-8"><span className="font-jbmono text-xs tracking-wide" style={{ color: T.signal }}>Read article</span><ArrowUpRight aria-hidden="true" size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: T.signal }} /></div></Link>)}</div>
      </div>
    </section>
  );
}
