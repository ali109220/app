"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Menu, X, ArrowRight, Landmark, BrainCircuit, Smartphone, Layers3, Wrench, ServerCog } from "lucide-react";
import { Logo } from "./Logo";
import { SOLUTIONS, T } from "./theme";

const focusableSelector = ["a[href]", "button:not([disabled])", "[tabindex]:not([tabindex='-1'])"].join(",");
const icons = [Landmark, BrainCircuit, Smartphone, Layers3, Wrench, ServerCog];
const solutionGroups = [
  { title: "Banking platforms", items: SOLUTIONS.slice(0, 3) },
  { title: "Operations & systems", items: SOLUTIONS.slice(3) },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [solOpen, setSolOpen] = useState(false);
  const [mSol, setMSol] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const solutionsGroupRef = useRef(null);
  const solutionsTriggerRef = useRef(null);
  const mobileToggleRef = useRef(null);
  const mobileNavRef = useRef(null);

  const warmRoute = (href) => router.prefetch(href);

  useEffect(() => { setOpen(false); setMSol(false); setSolOpen(false); }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const nav = mobileNavRef.current;
    nav?.querySelector(focusableSelector)?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") { event.preventDefault(); setOpen(false); setMSol(false); mobileToggleRef.current?.focus(); return; }
      if (event.key !== "Tab" || !nav) return;
      const focusable = [...nav.querySelectorAll(focusableSelector)].filter((el) => el.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, mSol]);

  const handleSolutionsBlur = (event) => { if (!solutionsGroupRef.current?.contains(event.relatedTarget)) setSolOpen(false); };
  const focusSolutionLink = (index) => {
    const links = solutionsGroupRef.current?.querySelectorAll("#desktop-solutions-menu a");
    if (!links?.length) return;
    links[Math.max(0, Math.min(index, links.length - 1))]?.focus();
  };
  const handleSolutionsKeyDown = (event) => {
    const links = [...(solutionsGroupRef.current?.querySelectorAll("#desktop-solutions-menu a") || [])];
    const currentIndex = links.indexOf(document.activeElement);
    if (event.key === "Escape") { event.preventDefault(); setSolOpen(false); solutionsTriggerRef.current?.focus(); return; }
    if (event.target === solutionsTriggerRef.current && event.key === "ArrowDown") { event.preventDefault(); setSolOpen(true); requestAnimationFrame(() => focusSolutionLink(0)); return; }
    if (currentIndex < 0) return;
    if (event.key === "ArrowDown") { event.preventDefault(); focusSolutionLink((currentIndex + 1) % links.length); }
    else if (event.key === "ArrowUp") { event.preventDefault(); focusSolutionLink((currentIndex - 1 + links.length) % links.length); }
    else if (event.key === "Home") { event.preventDefault(); focusSolutionLink(0); }
    else if (event.key === "End") { event.preventDefault(); focusSolutionLink(links.length - 1); }
  };

  const directLinks = [
    { label: "About", to: "/about" },
    { label: "Insights", to: "/blog" },
    { label: "Careers", to: "/careers" },
  ];

  return (
    <header data-testid="site-header" className="fixed inset-x-0 top-0 z-50 border-b font-archivo backdrop-blur-xl" style={{ background: "rgba(247,246,242,0.9)", borderColor: T.border, color: T.text }}>
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3.5 md:px-12">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex" data-testid="desktop-nav" aria-label="Primary navigation">
          <div ref={solutionsGroupRef} className="relative" onMouseEnter={() => { setSolOpen(true); warmRoute("/solutions"); }} onMouseLeave={() => setSolOpen(false)} onFocusCapture={() => setSolOpen(true)} onBlurCapture={handleSolutionsBlur} onKeyDown={handleSolutionsKeyDown}>
            <Link ref={solutionsTriggerRef} href="/solutions" aria-haspopup="true" aria-expanded={solOpen} aria-controls="desktop-solutions-menu" className="flex min-h-11 items-center gap-1.5 rounded-sm text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: pathname.startsWith("/solutions") ? T.signal : T.muted }}>
              Solutions <ChevronDown aria-hidden="true" size={14} className="transition-transform" style={{ transform: solOpen ? "rotate(180deg)" : "none" }} />
            </Link>
            {solOpen && (
              <div id="desktop-solutions-menu" className="absolute left-1/2 top-full w-[720px] -translate-x-1/2 pt-4" aria-label="Solutions">
                <div className="grid grid-cols-[1fr_1fr_220px] overflow-hidden rounded-xl border shadow-2xl" style={{ background: T.panel, borderColor: T.border }}>
                  {solutionGroups.map((group, gi) => (
                    <div key={group.title} className="p-5" style={{ borderRight: `1px solid ${T.border}` }}>
                      <div className="mb-3 font-jbmono text-[9px] uppercase tracking-[0.2em]" style={{ color: T.faint }}>{group.title}</div>
                      <div className="space-y-1">
                        {group.items.map((s, i) => { const Icon = icons[gi * 3 + i] || ArrowRight; return <Link key={s.to} href={s.to} onMouseEnter={() => warmRoute(s.to)} onFocus={() => warmRoute(s.to)} className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-black/[0.03]" aria-current={pathname === s.to ? "page" : undefined}><span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md" style={{ background: "rgba(13,90,140,.08)", color: T.signal }}><Icon aria-hidden="true" size={15} /></span><span><span className="block text-sm font-semibold">{s.label}</span><span className="mt-0.5 block text-[11px] leading-snug" style={{ color: T.faint }}>{s.desc}</span></span></Link>; })}
                      </div>
                    </div>
                  ))}
                  <div className="flex flex-col justify-between p-5" style={{ background: T.bg }}>
                    <div><div className="font-jbmono text-[9px] uppercase tracking-[0.2em]" style={{ color: T.green }}>Explore Tayseer</div><h3 className="mt-3 text-lg font-semibold">One portfolio. One banking technology partner.</h3></div>
                    <div className="mt-6 space-y-2 text-sm"><Link href="/solutions" className="flex items-center justify-between py-2" style={{ color: T.signal }}>All solutions <ArrowRight size={14} /></Link><Link href="/connect" className="flex items-center justify-between py-2">Talk to our team <ArrowRight size={14} /></Link></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {directLinks.map((n) => <Link key={n.to} href={n.to} onMouseEnter={() => warmRoute(n.to)} onFocus={() => warmRoute(n.to)} aria-current={pathname === n.to ? "page" : undefined} className="flex min-h-11 items-center rounded-sm text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: pathname === n.to ? T.signal : T.muted }}>{n.label}</Link>)}
          <Link href="/connect" className="inline-flex min-h-11 items-center gap-2 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ background: T.signal, color: T.bg }}>Talk to us <ArrowRight aria-hidden="true" size={14} /></Link>
        </nav>

        <button ref={mobileToggleRef} type="button" className="flex min-h-11 min-w-11 items-center justify-center rounded-md lg:hidden" onClick={() => setOpen((v) => !v)} aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="mobile-navigation">{open ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}</button>
      </div>
      {open && (
        <nav ref={mobileNavRef} id="mobile-navigation" aria-label="Mobile navigation" className="max-h-[calc(100vh-72px)] overflow-y-auto border-t lg:hidden" style={{ borderColor: T.border, background: T.panel }}>
          <div className="px-6 py-4">
            <button type="button" className="flex min-h-11 w-full items-center justify-between py-3 text-sm font-semibold uppercase tracking-widest" onClick={() => setMSol((v) => !v)} aria-expanded={mSol} aria-controls="mobile-solutions-menu">Solutions <ChevronDown aria-hidden="true" size={16} style={{ transform: mSol ? "rotate(180deg)" : "none" }} /></button>
            {mSol && <div id="mobile-solutions-menu" className="grid gap-1 border-l pl-4" style={{ borderColor: T.border }}><Link href="/solutions" onClick={() => setOpen(false)} className="flex min-h-11 items-center text-sm" style={{ color: T.signal }}>All solutions</Link>{SOLUTIONS.map((s) => <Link key={s.to} href={s.to} onClick={() => setOpen(false)} className="flex min-h-11 items-center text-sm" style={{ color: T.muted }}>{s.label}</Link>)}</div>}
            {directLinks.map((n) => <Link key={n.to} href={n.to} onClick={() => setOpen(false)} className="flex min-h-11 items-center border-t py-3 text-sm font-semibold uppercase tracking-widest" style={{ borderColor: T.border }}>{n.label}</Link>)}
            <Link href="/connect" onClick={() => setOpen(false)} className="mt-4 flex min-h-11 items-center justify-center gap-2 px-6 py-3 text-sm font-semibold uppercase tracking-widest" style={{ background: T.signal, color: T.bg }}>Talk to us <ArrowRight size={14} /></Link>
          </div>
        </nav>
      )}
    </header>
  );
};