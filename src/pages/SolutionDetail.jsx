import { Reveal } from "@/site/motion";
import { InnerHero } from "@/site/ui";
import { ContactSection } from "@/site/ContactSection";
import { T } from "@/site/theme";

// Shared layout for capability-list solution pages (all copy passed in is SOURCED).
export default function SolutionDetail({ index, crumbs, title, tagline, lead, capabilities }) {
  return (
    <div style={{ background: T.bg, color: T.text }} className="font-instrument">
      <InnerHero index={index} crumbs={crumbs} title={title} tagline={tagline} lead={lead} />
      <section className="px-6 py-24 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {capabilities.map((c, i) => (
              <Reveal key={c.h} delay={(i % 2) * 0.06}>
                <div data-testid={`cap-${i}`} className="group flex h-full flex-col rounded-lg border p-8 transition-colors hover:border-[#0F5CBF]" style={{ borderColor: T.border, background: T.panel }}>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md" style={{ background: "rgba(13,90,140,0.12)", color: T.signal }}>
                      <c.icon size={22} />
                    </div>
                    <div className="font-jbmono text-[11px]" style={{ color: T.faint }}>{String(i + 1).padStart(2, "0")}</div>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{c.h}</h3>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: T.muted }}>{c.p}</p>
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
