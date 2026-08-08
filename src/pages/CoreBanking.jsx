import { CreditCard, Send, Users, ShieldCheck, LineChart, ScrollText, Wallet, Landmark } from "lucide-react";
import { EnterpriseSolutionPage } from "@/site/phase8/EnterpriseSolutionLayout";
import { T } from "@/site/theme";

const CAPS = [
  { icon: CreditCard, h: "Payments", p: "Empower your customers with a modern and convenient way to manage their finances. Streamline payments processing across cards, mobile wallets, and app-based payments with a secure and efficient platform." },
  { icon: Send, h: "Remittance Solutions", p: "Enable fast, secure, and cost-effective domestic and international money transfers through a user-friendly remittance experience." },
  { icon: Users, h: "Consumer Banking", p: "Deliver a seamless and personalized banking experience with convenient access to account information, online banking features, and mobile applications." },
  { icon: ShieldCheck, h: "Security & Compliance", p: "Safeguard data and operations with security capabilities designed to support evolving industry regulations, financial integrity, and customer trust." },
  { icon: LineChart, h: "CRM & BI Systems", p: "Turn customer data into actionable insight using CRM and Business Intelligence capabilities that support smarter decisions and more relevant customer experiences." },
  { icon: ScrollText, h: "Audit & Legislation", p: "Support regulatory compliance and financial integrity with audit and legislative tooling designed to help institutions stay aligned with changing requirements." },
  { icon: Wallet, h: "Financial Management", p: "Improve visibility into cash flow, profitability, and financial performance to support informed resource allocation and risk management." },
  { icon: Landmark, h: "Funds & Treasury", p: "Manage liquidity and funds with tools that support forecasting, investment management, and foreign exchange operations." },
];

function CoreBankingVisual() {
  return (
    <div className="relative mx-auto max-w-[620px] overflow-hidden rounded-2xl border p-5" style={{ borderColor: T.border, background: "linear-gradient(145deg, rgba(13,90,140,.10), rgba(255,255,255,.01))" }}>
      <div className="grid gap-3 sm:grid-cols-[1fr_1.3fr_1fr] sm:items-center">
        <div className="space-y-3">
          {["Digital Channels", "Payments", "Remittance"].map((item) => <div key={item} className="border px-4 py-3 text-xs" style={{ borderColor: T.border, background: T.bg }}>{item}</div>)}
        </div>
        <div className="relative flex min-h-64 items-center justify-center">
          <div className="absolute h-48 w-48 rounded-full border" style={{ borderColor: "rgba(13,90,140,.22)" }} />
          <div className="absolute h-36 w-36 rounded-full border" style={{ borderColor: "rgba(13,90,140,.35)" }} />
          <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full text-center text-sm font-semibold uppercase tracking-wide" style={{ background: T.signal, color: T.bg }}>Core<br/>Banking</div>
        </div>
        <div className="space-y-3">
          {["Customer Data", "Treasury", "Compliance"].map((item) => <div key={item} className="border px-4 py-3 text-xs" style={{ borderColor: T.border, background: T.bg }}>{item}</div>)}
        </div>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2 font-jbmono text-[9px] uppercase tracking-wider" style={{ color: T.faint }}>
        <span>Secure</span><span className="text-center">Connected</span><span className="text-right">Scalable</span>
      </div>
    </div>
  );
}

export default function CoreBanking() {
  return (
    <EnterpriseSolutionPage
      hero={{
        eyebrow: "Core Banking",
        title: "The Banking Core, Modernized.",
        tagline: "Streamline your core banking foundation and create room for customer-focused innovation.",
        lead: "Tayseer's core banking capabilities bring payments, remittance, customer banking, treasury, financial management, compliance, and intelligence into a connected operating foundation.",
        visual: <CoreBankingVisual />,
      }}
      challenges={[
        "Legacy banking environments can make change slower and increase the effort required to launch new customer experiences.",
        "Critical capabilities such as payments, remittance, treasury, compliance, and customer insight often operate across disconnected systems.",
        "Financial institutions need a dependable core while still being able to evolve digital services and operational processes.",
      ]}
      outcomes={[
        "Connected banking capabilities",
        "Faster operational decision-making",
        "Stronger customer experience foundations",
        "Improved financial visibility",
        "Security and compliance support",
        "Greater flexibility for digital innovation",
      ]}
      capabilityTitle="One Core. Multiple Banking Capabilities."
      capabilityIntro="The existing Tayseer core banking offering spans the operational capabilities financial institutions need to run, manage, and evolve their banking services."
      capabilities={CAPS}
      architecture={{
        title: "A Connected Banking Foundation",
        steps: ["Customer Channels", "Payments & Remittance", "Core Banking Services", "Financial & Treasury Operations", "Data, CRM & Compliance"],
      }}
      related={[
        { title: "MBuke", href: "/solutions/mbuke", description: "Extend the core with digital banking experiences across modern customer channels." },
        { title: "Fahim AI", href: "/solutions/fahim-ai", description: "Add intelligence and automation to banking workflows and decision support." },
        { title: "Managed Services", href: "/solutions/managed-services", description: "Support banking platforms with ongoing operational and technology expertise." },
      ]}
    />
  );
}
