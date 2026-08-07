"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/site/motion";
import { InnerHero } from "@/site/ui";
import { ContactSection } from "@/site/ContactSection";
import { T } from "@/site/theme";
import { POSTS } from "./blogData";

export default function Blog() {
  return (
    <div style={{ background: T.bg, color: T.text }} className="font-archivo">
      <InnerHero index="05" crumbs={["Home", "Blogs and Resources"]} title="Blogs and Resources" />

      <section className="px-6 py-24 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border md:grid-cols-2" style={{ borderColor: T.border, background: T.border }}>
            {POSTS.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.06}>
                <Link href={`/blog/${post.slug}`} data-testid={`blog-card-${i}`} className="group flex h-full flex-col justify-between p-10 transition-colors" style={{ background: T.panel }}>
                  <div>
                    <div className="font-jbmono text-[11px] uppercase tracking-widest" style={{ color: T.signal }}>{post.date}</div>
                    <h2 className="mt-4 text-2xl font-semibold leading-snug group-hover:text-[#0D5A8C]" style={{ transition: "color .2s" }}>{post.title}</h2>
                    {post.titleFlag && (
                      <p className="mt-3 rounded border px-3 py-1.5 font-jbmono text-[10px] uppercase tracking-wider" style={{ borderColor: "rgba(13,90,140,0.35)", color: T.faint }}>⚑ {post.titleFlag}</p>
                    )}
                    <p className="mt-4 text-sm leading-relaxed" style={{ color: T.muted }}>{post.excerpt}</p>
                  </div>
                  <span className="mt-8 inline-flex items-center gap-2 font-jbmono text-[11px] uppercase tracking-widest" style={{ color: T.signal }}>Read Article <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
