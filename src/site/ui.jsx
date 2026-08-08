import Image from "next/image";
import Link from "next/link";
import { Reveal, LineReveal } from "./motion";
import { T } from "./theme";

export { default as CountUp } from "./CountUp";

const BREADCRUMB_HREFS = {
  Home: "/",
  Solutions: "/solutions",
  Blog: "/blog",
  "Blogs and Resources": "/blog",
  About: "/about",
  Careers: "/careers",
  Connect: "/connect",
  "Core Banking": "/solutions/core-banking",
  "Fahim AI": "/solutions/fahim-ai",
  MBuke: "/solutions/mbuke",
  "Managed Services": "/solutions/managed-services",
  "Banking Systems": "/solutions/banking-systems",
  "Software Management Systems": "/solutions/software-management-systems"
};

export const SectionLabel = ({ children }) => (
  <div className="mb-6 flex items-center gap-3 font-jbmono text-[12px] uppercase tracking-[0.25em]" style={{ color: T.signal }}>
    <span className="h-1.5 w-1.5" style={{ background: T.green }} />{children}
  </div>
);

export const InnerHero = ({ index, crumbs, title, tagline, lead }) => (
  <section className="grain relative overflow-hidden border-b" style={{ background: T.bg, borderColor: T.border }}>
    <div className="hairline-grid absolute inset-0" style={{ "--hl": T.hl, backgroundSize: "8.33% 6rem" }} />
    <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/2 md:block">
      <Image
        src="/background.jpeg"
        alt=""
        fill
        priority
        sizes="50vw"
        quality={82}
        className="object-cover object-right opacity-70"
        style={{ maskImage: "linear-gradient(90deg,transparent,#000 75%)", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 75%)" }}
      />
    </div>
    <div className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full" style={{ background: T.signal, filter: "blur(220px)", opacity: 0.05 }} />
    <div className="relative mx-auto max-w-[1400px] px-6 pt-36 pb-20 md:px-12 md:pt-44">
      <Reveal>
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 font-jbmono text-[11px] uppercase tracking-[0.2em]" style={{ color: T.faint }} data-testid="breadcrumb">
          {crumbs.map((crumb, i) => {
            const isCurrent = i === crumbs.length - 1;
            const href = BREADCRUMB_HREFS[crumb];
            return (
              <span key={`${crumb}-${i}`} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true" style={{ color: T.signal }}>»</span>}
                {href && !isCurrent ? (
                  <Link href={href} className="transition-colors hover:text-white" style={{ color: T.faint }}>{crumb}</Link>
                ) : (
                  <span aria-current={isCurrent ? "page" : undefined} style={{ color: isCurrent ? T.signal : T.faint }}>{crumb}</span>
                )}
              </span>
            );
          })}
        </nav>
      </Reveal>
      <h1 className="max-w-5xl text-5xl font-extrabold uppercase leading-[0.9] tracking-[-0.03em] sm:text-7xl lg:text-[6rem]">
        <LineReveal lines={[title]} />
      </h1>
      {tagline && <Reveal delay={0.3}><p className="mt-8 max-w-3xl text-xl font-medium leading-snug" style={{ color: T.text }}>{tagline}</p></Reveal>}
      {lead && <Reveal delay={0.4}><p className="mt-6 max-w-3xl text-base leading-relaxed" style={{ color: T.muted }}>{lead}</p></Reveal>}
    </div>
  </section>
);
