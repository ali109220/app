"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { NAV, SOLUTIONS, T } from "./theme";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [solOpen, setSolOpen] = useState(false);
  const [mSol, setMSol] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const routes = Array.from(new Set([
      "/solutions",
      "/connect",
      ...SOLUTIONS.map((s) => s.to),
      ...NAV.filter((n) => !n.children).map((n) => n.to),
    ]));

    const prefetch = () => routes.forEach((route) => router.prefetch(route));

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(prefetch, { timeout: 1500 });
      return () => window.cancelIdleCallback?.(id);
    }

    const id = window.setTimeout(prefetch, 350);
    return () => window.clearTimeout(id);
  }, [router]);

  const warmRoute = (href) => {
    router.prefetch(href);
  };

  return (
    <header
      data-testid="site-header"
      className="fixed inset-x-0 top-0 z-50 border-b font-archivo backdrop-blur-xl"
      style={{ background: "rgba(247,246,242,0.82)", borderColor: T.border, color: T.text }}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-12">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex" data-testid="desktop-nav" aria-label="Primary navigation">
          <div className="relative" onMouseEnter={() => { setSolOpen(true); warmRoute("/solutions"); }} onMouseLeave={() => setSolOpen(false)}>
            <Link
              href="/solutions"
              prefetch
              onFocus={() => warmRoute("/solutions")}
              data-testid="nav-solutions"
              className="flex items-center gap-1.5 text-[13px] uppercase tracking-widest transition-colors"
              style={{ color: pathname.startsWith("/solutions") ? T.signal : T.muted }}
            >
              Solutions <ChevronDown size={14} className="transition-transform" style={{ transform: solOpen ? "rotate(180deg)" : "none" }} />
            </Link>
            <AnimatePresence>
              {solOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.2 }}
                  data-testid="solutions-dropdown"
                  className="absolute left-1/2 top-full w-[420px] -translate-x-1/2 pt-4"
                >
                  <div className="grid grid-cols-1 gap-1 rounded-lg border p-2" style={{ background: T.panel, borderColor: T.border }}>
                    {SOLUTIONS.map((s) => (
                      <Link
                        key={s.to} href={s.to} prefetch data-testid={`nav-sol-${s.to.split("/").pop()}`}
                        onMouseEnter={() => warmRoute(s.to)}
                        onFocus={() => warmRoute(s.to)}
                        className="group flex items-center justify-between rounded-md px-4 py-3 transition-colors hover:bg-white/5"
                      >
                        <div>
                          <div className="text-sm font-medium" style={{ color: T.text }}>{s.label}</div>
                          <div className="text-[11px]" style={{ color: T.faint }}>{s.desc}</div>
                        </div>
                        <ArrowRight size={14} className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" style={{ color: T.signal }} />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {NAV.filter((n) => !n.children).map((n) => (
            <Link
              key={n.to} href={n.to} prefetch data-testid={`nav-${n.label.toLowerCase()}`}
              onMouseEnter={() => warmRoute(n.to)}
              onFocus={() => warmRoute(n.to)}
              className="text-[13px] uppercase tracking-widest transition-colors"
              style={{ color: pathname === n.to ? T.signal : T.muted }}
            >
              {n.label}
            </Link>
          ))}

          <Link
            href="/connect" prefetch data-testid="nav-connect"
            onMouseEnter={() => warmRoute("/connect")}
            onFocus={() => warmRoute("/connect")}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-[12px] font-semibold uppercase tracking-widest transition-transform hover:-translate-y-0.5"
            style={{ background: T.signal, color: T.bg }}
          >
            Connect
          </Link>
        </nav>

        <button
          data-testid="mobile-menu-toggle"
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          style={{ color: T.text }}
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
            data-testid="mobile-menu" className="overflow-hidden border-t md:hidden" style={{ borderColor: T.border, background: T.panel }}
          >
            <div className="px-6 py-4">
              <button
                className="flex w-full items-center justify-between py-3 text-sm uppercase tracking-widest"
                style={{ color: T.text }}
                onClick={() => setMSol((v) => !v)}
                data-testid="mobile-solutions-toggle"
                aria-expanded={mSol}
              >
                Solutions <ChevronDown size={16} style={{ transform: mSol ? "rotate(180deg)" : "none" }} />
              </button>
              <AnimatePresence>
                {mSol && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden pl-4">
                    <Link href="/solutions" prefetch onClick={() => setOpen(false)} className="block py-2 text-sm" style={{ color: T.signal }}>All solutions</Link>
                    {SOLUTIONS.map((s) => (
                      <Link key={s.to} href={s.to} prefetch onClick={() => setOpen(false)} data-testid={`m-nav-sol-${s.to.split("/").pop()}`} className="block py-2 text-sm" style={{ color: T.muted }}>{s.label}</Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              {NAV.filter((n) => !n.children).map((n) => (
                <Link key={n.to} href={n.to} prefetch onClick={() => setOpen(false)} data-testid={`m-nav-${n.label.toLowerCase()}`} className="block border-t py-3 text-sm uppercase tracking-widest" style={{ color: T.text, borderColor: T.border }}>{n.label}</Link>
              ))}
              <Link href="/connect" prefetch onClick={() => setOpen(false)} data-testid="m-nav-connect" className="mt-4 flex items-center justify-center px-6 py-3 text-sm font-semibold uppercase tracking-widest" style={{ background: T.signal, color: T.bg }}>Connect</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
