import Link from "next/link";
import { Logo } from "./Logo";
import { SOLUTIONS, T } from "./theme";

const Col = ({ title, links }) => (
  <div>
    <div className="mb-4 font-jbmono text-[11px] uppercase tracking-[0.25em]" style={{ color: T.faint }}>{title}</div>
    <ul className="space-y-2.5">
      {links.map((l) => (
        <li key={l.to}>
          <Link href={l.to} className="text-sm transition-colors hover:text-white" style={{ color: T.muted }} data-testid={`footer-${l.to.replace(/\//g, "-")}`}>{l.label}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export const Footer = () => (
  <footer data-testid="site-footer" className="font-archivo" style={{ background: T.panel, color: T.text, borderTop: `1px solid ${T.border}` }}>
    <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-12">
      <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
        <div className="col-span-2 md:col-span-1">
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: T.faint }}>
            Tayseer is a premier fintech company based in Saudi Arabia and the UAE with an aim to spearhead the AI and digital banking revolution in the region.
          </p>
        </div>
        <Col title="Solutions" links={SOLUTIONS} />
        <Col title="Company" links={[{ label: "About", to: "/about" }, { label: "Careers", to: "/careers" }, { label: "Blog", to: "/blog" }, { label: "Connect", to: "/connect" }]} />
        <Col title="Legal" links={[{ label: "Privacy Policy", to: "/privacy" }, { label: "Terms & Conditions", to: "/terms" }]} />
        <div>
          <div className="mb-4 font-jbmono text-[11px] uppercase tracking-[0.25em]" style={{ color: T.faint }}>Contact Us</div>
          <div className="space-y-4 text-sm" style={{ color: T.muted }}>
            <p className="leading-relaxed">Saudi Arabia — Office 7, 2nd Floor, Selam Building, Prince Saad bin Abdulrahman Alawal Branch Road, Al Rawabi, Riyadh, KSA</p>
            <p className="leading-relaxed">UAE — 601, One Lake Plaza, Cluster T, JLT, Dubai, UAE</p>
            <div className="flex flex-col items-start font-jbmono text-[12px]">
              <a href="tel:+966555203079" className="inline-block py-2 hover:text-white">+966 555203079</a>
              <a href="tel:+97143997558" className="inline-block py-2 hover:text-white">+971 43997558</a>
              <a href="mailto:info@tayseer.me" className="inline-block py-2 hover:text-white">info@tayseer.me</a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t pt-6 font-jbmono text-[11px] uppercase tracking-widest md:flex-row md:items-center" style={{ borderColor: T.border, color: T.faint }}>
        <span>© Tayseer Innovations. All Rights Reserved.</span>
        <span>Built on proof, not inflated claims</span>
      </div>
    </div>
  </footer>
);
