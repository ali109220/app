import { Banknote, MonitorSmartphone, Coins, LayoutGrid, Layers, CreditCard, Fingerprint, Landmark, RadioTower } from "lucide-react";
import { EnterpriseSolutionPage } from "@/site/phase8/EnterpriseSolutionLayout";
import { T } from "@/site/theme";

const CAPS = [
  { icon: Banknote, h: "ATMs & Cash Recyclers", p: "Extend self-service access while improving cash availability and branch cash-management efficiency with advanced ATM and recycling technology." },
  { icon: MonitorSmartphone, h: "Smart Teller Machines", p: "Combine assisted service with automation so branches can handle more transactions while preserving human support where it matters." },
  { icon: Coins, h: "Cash Sorting Machines", p: "Automate counting, sorting and verification of cash to reduce manual handling and improve operational accuracy." },
  { icon: LayoutGrid, h: "Self-Service Solutions", p: "Expand customer self-service beyond traditional ATMs through banking kiosks and additional service points." },
  { icon: Layers, h: "Banknote & Coin Processing", p: "Integrate modular cash-processing capabilities into a wider branch and self-service estate." },
  { icon: CreditCard, h: "Card Processing Modules", p: "Support secure debit and credit card transactions across ATMs, STMs and self-service devices." },
  { icon: Fingerprint, h: "Biometrics Modules", p: "Add biometric authentication options including fingerprint, facial and iris-based verification to supported banking experiences." },
];

function BankingSystemsVisual() {
  const nodes = [
    ["ATM", Banknote],
    ["STM", MonitorSmartphone],
    ["Cash", Coins],
    ["Kiosk", LayoutGrid],
    ["Cards", CreditCard],
    ["Biometrics", Fingerprint],
  ];
  return (
    <div className="relative mx-auto max-w-[620px] overflow-hidden border p-5 sm:p-7" style={{ borderColor: T.border, background: T.panel }} aria-label="Connected banking systems illustration">
      <div className="pointer-events-none absolute inset-0 opacity-50" style={{ background: "radial-gradient(circle at 50% 48%, rgba(13,90,140,.18), transparent 28%)" }} />
      <div className="relative flex items-center justify-center py-5">
        <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full border-2 text-center" style={{ borderColor: T.signal, background: T.bg }}>
          <Landmark size={28} aria-hidden="true" style={{ color: T.signal }} />
          <span className="mt-2 text-xs font-semibold uppercase tracking-wider">Branch Hub</span>
        </div>
      </div>
      <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-3">
        {nodes.map(([label, Icon]) => (
          <div key={label} className="flex items-center gap-3 border p-3.5" style={{ borderColor: T.border, background: T.bg }}>
            <Icon size={18} aria-hidden="true" style={{ color: T.signal }} />
            <span className="text-sm font-medium">{label}</span>
          </div>
        ))}
      </div>
      <div className="relative mt-4 flex items-center justify-center gap-2 font-jbmono text-[10px] uppercase tracking-[0.18em]" style={{ color: T.muted }}>
        <RadioTower size={14} aria-hidden="true" style={{ color: T.green }} /> Connected self-service estate
      </div>
    </div>
  );
}

export default function BankingSystems() {
  return (
    <EnterpriseSolutionPage
      hero={{
        eyebrow: "Banking Systems",
        title: "Modernize the branch.",
        tagline: "Connected cash, self-service and assisted banking infrastructure.",
        lead: "Tayseer brings together GRG banking systems that help financial institutions extend customer access, automate cash handling and modernize branch operations.",
        visual: <BankingSystemsVisual />,
      }}
      challenges={[
        "Branches must serve more customers while reducing repetitive manual cash-handling work.",
        "Self-service estates need secure, reliable integration with the wider banking environment.",
        "Institutions need a consistent experience across ATMs, assisted service, kiosks, cards and authentication." ,
      ]}
      outcomes={[
        "Extended self-service availability",
        "More efficient branch operations",
        "Reduced manual cash-processing effort",
        "Stronger authentication options across supported channels",
      ]}
      capabilityTitle="A connected physical banking ecosystem"
      capabilityIntro="Tayseer combines self-service, assisted-service, cash-processing, card and biometric capabilities to support modern branch and off-branch banking experiences."
      capabilities={CAPS}
      architecture={{ title: "From customer interaction to core banking", steps: ["Customer", "ATM / STM / Kiosk", "Secure Modules", "Bank Integration", "Core Banking"] }}
      related={[
        { href: "/solutions/core-banking", title: "Core Banking", description: "Connect channel experiences to the transactional banking foundation." },
        { href: "/solutions/managed-services", title: "Managed Services", description: "Support availability and operations across critical banking systems." },
        { href: "/solutions/mbuke", title: "MBuke", description: "Extend the customer experience into mobile and digital channels." },
      ]}
    />
  );
}
