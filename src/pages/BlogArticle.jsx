"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/site/motion";
import { InnerHero } from "@/site/ui";
import { ContactSection } from "@/site/ContactSection";
import { T } from "@/site/theme";
import { getPost, POSTS } from "./blogData";

const RELATED = {
  "open-banking-uae-ksa": [
    { label: "Core Banking", href: "/solutions/core-banking", copy: "Explore the banking platform capabilities behind modern payments, remittance, security and customer experiences." },
    { label: "Software Management Systems", href: "/solutions/software-management-systems", copy: "See the API, integration, DevOps and operational tooling that supports modern banking ecosystems." },
    { label: "Talk to Tayseer", href: "/connect", copy: "Discuss an Open Banking or digital transformation requirement with our regional team." }
  ],
  "rise-of-fintech-uae": [
    { label: "Fahim AI", href: "/solutions/fahim-ai", copy: "Discover Tayseer’s agentic AI capabilities for intelligent customer interaction and business operations." },
    { label: "MBuke", href: "/solutions/mbuke", copy: "Explore a white-label mobile banking platform for onboarding, payments, transfers and digital engagement." },
    { label: "Talk to Tayseer", href: "/connect", copy: "Discuss your FinTech, AI or digital banking transformation priorities with our team." }
  ]
};

export default function BlogArticle({ slug }) {
  const post = getPost(slug);

  if (!post) {
    return (
      <div style={{ background: T.bg, color: T.text }} className="font-archivo">
        <InnerHero index="05.x" crumbs={["Home", "Blogs and Resources", "Not Found"]} title="Article Not Found" />
        <div className="mx-auto max-w-[900px] px-6 py-24 md:px-12">
          <Link href="/blog" className="inline-flex items-center gap-2 font-jbmono text-[12px] uppercase tracking-widest" style={{ color: T.signal }}><ArrowLeft size={14} /> Back to all posts</Link>
        </div>
      </div>
    );
  }

  const more = POSTS.filter((p) => p.slug !== slug);
  const related = RELATED[slug] || [];

  return (
    <div style={{ background: T.bg, color: T.text }} className="font-archivo">
      <InnerHero index="05" crumbs={["Home", "Blogs and Resources", post.title.length > 40 ? "Article" : post.title]} title={post.title} />

      <article className="mx-auto max-w-[820px] px-6 py-20 md:px-12">
        <Reveal>
          <div className="flex flex-wrap items-center gap-3 border-b pb-6 font-jbmono text-[11px] uppercase tracking-widest" style={{ borderColor: T.border, color: T.faint }}>
            <span style={{ color: T.signal }}>{post.date}</span><span>·</span><span>{post.author}</span>
          </div>
        </Reveal>
        {post.titleFlag && (
          <Reveal>
            <div className="mt-6 rounded-lg border px-4 py-3 font-jbmono text-[11px] uppercase tracking-wider" style={{ borderColor: "rgba(13,90,140,0.35)", color: T.faint }}>⚑ {post.titleFlag}</div>
          </Reveal>
        )}
        <Reveal delay={0.05}>
          <p className="mt-8 text-xl leading-relaxed" style={{ color: T.text }}>{post.lead}</p>
        </Reveal>
        <div className="mt-10 space-y-10">
          {post.sections.map((s, i) => (
            <Reveal key={s.h} delay={0.03 * i}>
              <section>
                <h2 className="text-2xl font-bold tracking-tight">{s.h}</h2>
                {s.flag && (
                  <div className="mt-3 rounded border px-3 py-1.5 font-jbmono text-[10px] uppercase tracking-wider" style={{ borderColor: "rgba(13,90,140,0.35)", color: T.faint }}>⚑ Needs verification — {s.flag}</div>
                )}
                <p className="mt-4 text-base leading-relaxed" style={{ color: T.muted }}>{s.p}</p>
              </section>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-14 border-t pt-6" style={{ borderColor: T.border }}>
            <Link href="/blog" className="inline-flex items-center gap-2 font-jbmono text-[12px] uppercase tracking-widest" style={{ color: T.signal }}><ArrowLeft size={14} /> Back to all posts</Link>
          </div>
        </Reveal>
      </article>

      {related.length > 0 && (
        <section className="border-t px-6 py-16 md:px-12" style={{ borderColor: T.border }} aria-labelledby="related-solutions-heading">
          <div className="mx-auto max-w-[1400px]">
            <div id="related-solutions-heading" className="mb-8 font-jbmono text-[12px] uppercase tracking-[0.25em]" style={{ color: T.signal }}>Related Solutions</div>
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border md:grid-cols-3" style={{ borderColor: T.border, background: T.border }}>
              {related.map((item) => (
                <Link key={item.href} href={item.href} className="group p-7" style={{ background: T.bg }}>
                  <h2 className="text-lg font-semibold group-hover:text-[#0D5A8C]" style={{ transition: "color .2s" }}>{item.label}</h2>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: T.muted }}>{item.copy}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-jbmono text-[11px] uppercase tracking-widest" style={{ color: T.signal }}>Explore <ArrowUpRight size={13} /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t px-6 py-20 md:px-12" style={{ borderColor: T.border, background: T.panel }}>
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-8 font-jbmono text-[12px] uppercase tracking-[0.25em]" style={{ color: T.signal }}>More Posts</div>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border md:grid-cols-2" style={{ borderColor: T.border, background: T.border }}>
            {more.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group p-8" style={{ background: T.bg }}>
                <div className="font-jbmono text-[11px] uppercase tracking-widest" style={{ color: T.faint }}>{p.date}</div>
                <h3 className="mt-3 text-lg font-semibold leading-snug group-hover:text-[#0D5A8C]" style={{ transition: "color .2s" }}>{p.title}</h3>
                <span className="mt-4 inline-flex items-center gap-2 font-jbmono text-[11px] uppercase tracking-widest" style={{ color: T.signal }}>Read <ArrowUpRight size={13} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
