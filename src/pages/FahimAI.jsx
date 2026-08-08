import { Target, ScanFace, MessagesSquare, Gauge, Plug, Boxes, BrainCircuit, FileCheck2, Workflow, UserRoundCheck } from "lucide-react";
import { EnterpriseSolutionPage } from "@/site/phase8/EnterpriseSolutionLayout";
import { T } from "@/site/theme";

const HOW_FAHIM = [
  { icon: Target, h: "Goal-Oriented Execution", p: "Contemplates instructions intelligently, then executes end-to-end business operations with accuracy and speed." },
  { icon: ScanFace, h: "Intelligent Onboarding / KYC", p: "Analyzes documents and verifies authenticity as part of customer onboarding, supporting compliance and security requirements." },
  { icon: MessagesSquare, h: "Voice & Chat Experience", p: "Supports human-like interaction through simple conversational experiences tailored for business and localization needs." },
  { icon: Gauge, h: "Resource-Efficient Scalability", p: "Designed as a lightweight, resource-optimized solution supporting on-demand scalability and faster task execution." },
  { icon: Plug, h: "Flexible Integration", p: "Connects with existing systems and business modules without requiring major disruption to the surrounding technology landscape." },
  { icon: Boxes, h: "Flexible Deployment", p: "Supports on-premise or containerized deployment based on security, infrastructure, and operating requirements." },
];

function FahimVisual() {
  const steps = [
    { icon: FileCheck2, label: "Understand" },
    { icon: BrainCircuit, label: "Reason" },
    { icon: Workflow, label: "Execute" },
    { icon: UserRoundCheck, label: "Resolve" },
  ];
  return (
    <div className="relative mx-auto max-w-[620px] overflow-hidden rounded-2xl border p-6" style={{ borderColor: T.border, background: "radial-gradient(circle at 50% 45%, rgba(13,90,140,.18), rgba(13,90,140,.03) 48%, transparent 72%)" }}>
      <div className="flex min-h-80 items-center justify-center">
        <div className="relative flex h-44 w-44 items-center justify-center rounded-full border" style={{ borderColor: "rgba(13,90,140,.35)" }}>
          <div className="absolute h-32 w-32 rounded-full border" style={{ borderColor: "rgba(104,166,60,.28)" }} />
          <div className="relative z-10 text-center"><BrainCircuit className="mx-auto" size={42} style={{ color: T.signal }} /><div className="mt-3 text-lg font-semibold">Fahim AI</div><div className="mt-1 font-jbmono text-[9px] uppercase tracking-widest" style={{ color: T.faint }}>Agentic workflow</div></div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {steps.map(({ icon: Icon, label }, index) => <div key={label} className="border p-3 text-center" style={{ borderColor: T.border, background: T.bg }}><Icon className="mx-auto" size={18} style={{ color: index === 3 ? T.green : T.signal }} aria-hidden="true" /><div className="mt-2 text-[11px] font-medium">{label}</div></div>)}
      </div>
    </div>
  );
}

export default function FahimAI() {
  return (
    <EnterpriseSolutionPage
      hero={{
        eyebrow: "Fahim AI",
        title: "AI That Moves Work Forward.",
        tagline: "An agentic AI platform designed to understand goals, execute business operations, and improve customer interactions.",
        lead: "Fahim combines intelligent onboarding, conversational interaction, flexible integration, scalable execution, and deployment flexibility in a solution tailored for specific business and localization needs.",
        visual: <FahimVisual />,
      }}
      challenges={[
        "Customer journeys often span multiple systems, documents, service teams, and repetitive manual steps.",
        "Traditional support experiences can create queues, handoffs, and fragmented context between automated and human service.",
        "AI adoption must fit existing systems, security requirements, infrastructure constraints, and localized customer experiences.",
      ]}
      outcomes={[
        "End-to-end task execution",
        "Smarter onboarding and KYC support",
        "Voice and chat interaction",
        "Context-aware human escalation",
        "Flexible system integration",
        "On-premise or containerized deployment",
      ]}
      capabilityTitle="From Intent to Execution"
      capabilityIntro="Fahim is positioned around completing business goals rather than simply answering questions, connecting customer interaction with operational execution."
      capabilities={HOW_FAHIM}
      architecture={{
        title: "A Goal-Oriented AI Journey",
        steps: ["Customer Intent", "Context & Documents", "AI Reasoning", "Business-System Execution", "Resolution or Human Escalation"],
      }}
      related={[
        { title: "Core Banking", href: "/solutions/core-banking", description: "Connect AI-enabled workflows to the broader banking operating foundation." },
        { title: "MBuke", href: "/solutions/mbuke", description: "Bring intelligent customer interaction into modern digital banking journeys." },
        { title: "Banking Systems", href: "/solutions/banking-systems", description: "Extend AI-enabled experiences across supporting enterprise banking systems." },
      ]}
    />
  );
}
