import { Layers, Puzzle, Plug, ShieldCheck, Palette, Smartphone, Radio, BarChart3, Network, CreditCard } from "lucide-react";
import { EnterpriseSolutionPage } from "@/site/phase8/EnterpriseSolutionLayout";
import { T } from "@/site/theme";

const CAPABILITIES = [
  { icon: Layers, h: "Unified Platform", p: "Bring onboarding, payments, transfers, analytics, and digital banking journeys into one connected platform." },
  { icon: Puzzle, h: "Modular & Scalable", p: "Deploy the capabilities you need now and extend the platform as business and channel requirements grow." },
  { icon: Plug, h: "Seamless Integration", p: "Integrate with existing systems and third-party services through an API-first technology approach." },
  { icon: ShieldCheck, h: "Enterprise-Grade Security", p: "Support digital banking operations with microservices, real-time events, observability, and security controls." },
  { icon: Palette, h: "White-Label Ready", p: "Customize the customer experience to align with institutional branding and business requirements." },
  { icon: Radio, h: "USSD / Offline Support", p: "Extend financial-service access with offline and low-connectivity channel capabilities where required." },
];

function MBukeVisual() {
  const nodes = [
    { icon: Smartphone, label: "Mobile" },
    { icon: CreditCard, label: "Payments" },
    { icon: Radio, label: "USSD" },
    { icon: BarChart3, label: "Analytics" },
  ];
  return (
    <div className="relative mx-auto max-w-[620px] overflow-hidden rounded-2xl border p-6" style={{ borderColor: T.border, background: "linear-gradient(145deg, rgba(13,90,140,.13), rgba(104,166,60,.04))" }}>
      <div className="relative flex min-h-72 items-center justify-center">
        <div className="absolute h-56 w-56 rounded-full border" style={{ borderColor: "rgba(13,90,140,.22)" }} />
        <div className="absolute h-40 w-40 rounded-full border" style={{ borderColor: "rgba(13,90,140,.38)" }} />
        <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-2xl text-center text-lg font-bold" style={{ background: T.signal, color: T.bg }}><Network size={28} className="mr-2" aria-hidden="true" />MBuke</div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {nodes.map(({ icon: Icon, label }) => <div key={label} className="border p-3 text-center" style={{ borderColor: T.border, background: T.bg }}><Icon className="mx-auto" size={18} style={{ color: T.signal }} aria-hidden="true" /><div className="mt-2 text-[11px] font-medium">{label}</div></div>)}
      </div>
    </div>
  );
}

export default function MBuke() {
  return (
    <EnterpriseSolutionPage
      hero={{
        eyebrow: "MBuke Digital Banking",
        title: "Digital Banking, Built Around Your Brand.",
        tagline: "A white-label mobile finance platform designed to simplify digital banking for institutions.",
        lead: "MBuke combines onboarding, transfers and payments, analytics, agent banking support, and USSD/offline capabilities in a unified digital-banking ecosystem.",
        visual: <MBukeVisual />,
      }}
      challenges={[
        "Institutions need modern digital channels without replacing every surrounding banking system at once.",
        "Customer access requirements can span smartphones, agent networks, online experiences, and low-connectivity environments.",
        "Launching and scaling digital services requires integration, security, analytics, and brand flexibility to work as one experience.",
      ]}
      outcomes={[
        "Unified digital-banking journeys",
        "White-label customer experience",
        "Mobile and offline channel reach",
        "Integrated payments and transfers",
        "Operator monitoring and analytics",
        "Modular expansion as needs grow",
      ]}
      capabilityTitle="One Platform. Multiple Digital Channels."
      capabilityIntro="MBuke is designed as a modular digital-banking foundation that can connect customer journeys, institutional operations, and supporting services without forcing a single-channel model."
      capabilities={CAPABILITIES}
      architecture={{
        title: "A Digital Banking Delivery Layer",
        steps: ["Customer & Agent Channels", "Onboarding & Experience", "Payments & Transfers", "APIs & Integration", "Core & Third-Party Services"],
      }}
      related={[
        { title: "Core Banking", href: "/solutions/core-banking", description: "Connect digital channels to the broader banking operating foundation." },
        { title: "Fahim AI", href: "/solutions/fahim-ai", description: "Add intelligent onboarding, conversational service, and workflow automation." },
        { title: "Managed Services", href: "/solutions/managed-services", description: "Support the ongoing operation and evolution of digital banking environments." },
      ]}
    />
  );
}
