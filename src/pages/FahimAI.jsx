import { Target, ScanFace, MessagesSquare, Gauge, Plug, Boxes, BrainCircuit, FileCheck2, Workflow, UserRoundCheck, CheckCircle2, XCircle } from "lucide-react";
import { EnterpriseSolutionPage } from "@/site/phase8/EnterpriseSolutionLayout";
import { ActivityIndicator, activityAlpha, activityGreen } from "@/site/motion";
import { T } from "@/site/theme";

// ALL copy SOURCED from fahim-ai.html.
const HOW_FAHIM = [
  { icon: Target, h: "Goal-Oriented Execution", p: "Contemplates instructions intelligently, then executes end-to-end business operations with accuracy and speed." },
  { icon: ScanFace, h: "Intelligent Onboarding / KYC", p: "Analyzes documents and verifies authenticity as part of customer onboarding, supporting compliance and security requirements." },
  { icon: MessagesSquare, h: "Voice & Chat Experience", p: "Supports human-like interaction through simple conversational experiences tailored for business and localization needs." },
  { icon: Gauge, h: "Resource-Efficient Scalability", p: "Designed as a lightweight, resource-optimized solution supporting on-demand scalability and faster task execution." },
  { icon: Plug, h: "Flexible Integration", p: "Connects with existing systems and business modules without requiring major disruption to the surrounding technology landscape." },
  { icon: Boxes, h: "Flexible Deployment", p: "Supports on-premise or containerized deployment based on security, infrastructure, and operating requirements." },
];

// SOURCED — data-count values (real, from source attributes).
const KPIS = [
  { to: 99, suffix: "%", label: "Response Rate" },
  { to: 30, prefix: "<", suffix: "", label: "Secs Response Time" },
  // RESOLVED 2026-08-09 — fahim-ai.html source also stated 94% Customer Satisfaction
  // in prose elsewhere (see FAHIM_WAY below); confirmed 95% (this counter) as correct.
  { to: 95, suffix: "%", label: "Customer Satisfaction" },
  { to: 300, suffix: "%", label: "Improvement in Efficiency" },
];

// SOURCED — comparison copy from fahim-ai.html.
const OLD_WAY = [
  "40% of calls go unanswered",
  "Long wait times frustrate customers",
  "Low customer satisfaction rate",
  "High operational costs",
  "High customer churn",
];

// SOURCED — comparison copy from fahim-ai.html. "Customer Satisfaction Rate" corrected
// to 95% (was 94%) 2026-08-09 to match the verified KPI counter above — see note there.
const FAHIM_WAY = [
  "99% response rate, 24/7 availability",
  "Less than 30 seconds response time with zero queues",
  "95% Customer Satisfaction Rate",
  "Improve Business Efficiency by 300%",
  "Improve customer retention by 20% – 30%",
];

function BusinessImpact() {
  return (
    <section className="border-t px-6 py-20 sm:py-24 md:px-12" style={{ borderColor: T.border }} aria-labelledby="business-impact-title">
      <div className="mx-auto max-w-[1400px]">
        <div id="business-impact-title" className="font-jbmono text-[12px] uppercase tracking-[0.24em]" style={{ color: T.signal }}>Business Impact</div>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="h-full rounded-lg border p-8" style={{ borderColor: "rgba(192,57,43,0.3)", background: T.panel }}>
            <h3 className="text-xl font-semibold" style={{ color: "#C0392B" }}>The Old Way</h3>
            <ul className="mt-5 space-y-3">
              {OLD_WAY.map((o) => (
                <li key={o} className="flex gap-3 text-sm" style={{ color: T.muted }}><XCircle size={16} className="mt-0.5 shrink-0" style={{ color: "#C0392B" }} />{o}</li>
              ))}
            </ul>
          </div>
          <div className="h-full rounded-lg border p-8" style={{ borderColor: "rgba(13,90,140,0.4)", background: T.panel }}>
            <h3 className="text-xl font-semibold" style={{ color: T.signal }}>The Fahim Way</h3>
            <ul className="mt-5 space-y-3">
              {FAHIM_WAY.map((o) => (
                <li key={o} className="flex gap-3 text-sm" style={{ color: T.text }}><CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: T.signal }} />{o}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

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
          {/* Processing indicator: the reasoning core pings three times on arrival
              and then holds still. This page already states that it runs an
              agentic workflow, so the pulse reports something real rather than
              inventing AI activity. */}
          <div className="motion-data-pulse absolute h-32 w-32 rounded-full border" style={{ borderColor: activityAlpha(0.55) }} aria-hidden="true" />
          <div className="relative z-10 text-center"><BrainCircuit className="mx-auto" size={42} style={{ color: T.signal }} /><div className="mt-3 text-lg font-semibold">Fahim AI</div><div className="mt-1 font-jbmono text-[9px] uppercase tracking-widest" style={{ color: T.faint }}>Agentic workflow</div></div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {/* "Resolve" is the outcome stage the design already singled out. It is
            the one green step: current/success state, per the colour rule. The
            other three stay structural blue. */}
        {steps.map(({ icon: Icon, label }, index) => {
          const isResolved = index === steps.length - 1;
          return (
            <div key={label} className="relative border p-3 text-center" style={{ borderColor: isResolved ? activityAlpha(0.45) : T.border, background: T.bg }}>
              {isResolved && <ActivityIndicator className="absolute right-2 top-2" size={5} />}
              <Icon className="mx-auto" size={18} style={{ color: isResolved ? activityGreen : T.signal }} aria-hidden="true" />
              <div className="mt-2 text-[12px] font-medium">{label}</div>
            </div>
          );
        })}
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
      beforeStats={<BusinessImpact />}
      stats={KPIS}
      statsEyebrow="Key Performance Areas"
      related={[
        { title: "Core Banking", href: "/solutions/core-banking", description: "Connect AI-enabled workflows to the broader banking operating foundation." },
        { title: "MBuke", href: "/solutions/mbuke", description: "Bring intelligent customer interaction into modern digital banking journeys." },
        { title: "Banking Systems", href: "/solutions/banking-systems", description: "Extend AI-enabled experiences across supporting enterprise banking systems." },
      ]}
    />
  );
}
