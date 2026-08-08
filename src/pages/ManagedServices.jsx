import { Server, Database, ShieldCheck, Banknote, Cloud, Activity, Layers3 } from "lucide-react";
import { EnterpriseSolutionPage } from "@/site/phase8/EnterpriseSolutionLayout";
import { T } from "@/site/theme";

const CAPS = [
  { icon: Server, h: "Managed T24 Temenos Service", p: "Expert administration, performance optimization and ongoing maintenance to help keep Temenos T24 environments operating efficiently." },
  { icon: Database, h: "Big Data Management", p: "Data storage, processing and analytics services that help institutions organize large datasets and turn them into useful operational insight." },
  { icon: ShieldCheck, h: "Managed Security Services", p: "Ongoing monitoring, threat detection and incident-response support for critical systems and data." },
  { icon: Banknote, h: "ATM & STM Management", p: "Proactive maintenance and incident-response services designed to keep ATM and STM estates available to customers." },
  { icon: Cloud, h: "IaaS & SaaS Systems", p: "Flexible infrastructure and software service models that support scalability, resource optimization and changing business requirements." },
];

function ManagedServicesVisual() {
  const services = [
    ["Core", "T24"],
    ["Data", "Analytics"],
    ["Security", "Monitoring"],
    ["Channels", "ATM / STM"],
    ["Cloud", "IaaS / SaaS"],
  ];
  return (
    <div className="relative mx-auto max-w-[620px] border p-5 sm:p-7" style={{ borderColor: T.border, background: T.panel }} aria-label="Managed services lifecycle illustration">
      <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: T.border }}>
        <div><div className="font-jbmono text-[10px] uppercase tracking-[0.22em]" style={{ color: T.signal }}>Operations layer</div><div className="mt-1 text-lg font-semibold">Managed Service Lifecycle</div></div>
        <Activity size={20} aria-hidden="true" style={{ color: T.green }} />
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {services.map(([label, value], index) => (
          <div key={label} className="border p-4" style={{ borderColor: T.border, background: T.bg }}>
            <div className="flex items-center justify-between"><span className="font-jbmono text-[10px]" style={{ color: T.faint }}>{String(index + 1).padStart(2, "0")}</span><Layers3 size={15} aria-hidden="true" style={{ color: T.signal }} /></div>
            <div className="mt-5 text-xs uppercase tracking-wider" style={{ color: T.muted }}>{label}</div>
            <div className="mt-1 font-semibold">{value}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 border p-4 text-center text-sm font-medium" style={{ borderColor: T.signal, color: T.signal, background: "rgba(13,90,140,.08)" }}>Monitor → Optimize → Support → Improve</div>
    </div>
  );
}

export default function ManagedServices() {
  return (
    <EnterpriseSolutionPage
      hero={{
        eyebrow: "Managed Services",
        title: "Operate with confidence.",
        tagline: "Expert support for the systems that keep financial services running.",
        lead: "Tayseer managed services help institutions operate, protect and optimize critical banking technology while internal teams stay focused on business priorities.",
        visual: <ManagedServicesVisual />,
      }}
      challenges={[
        "Critical banking platforms require continuous operational attention and specialist expertise.",
        "Security, data, channel availability and infrastructure must be managed as one operating environment.",
        "Internal teams need predictable support without losing focus on strategic transformation work.",
      ]}
      outcomes={[
        "More resilient day-to-day operations",
        "Specialist support for core banking environments",
        "Improved visibility across data and security operations",
        "Proactive management of customer-facing banking channels",
      ]}
      capabilityTitle="Managed operations across the banking technology stack"
      capabilityIntro="From core banking administration to data, security, self-service channels and infrastructure services, Tayseer provides operational support around critical financial technology."
      capabilities={CAPS}
      architecture={{ title: "A continuous managed-service operating model", steps: ["Observe", "Detect", "Respond", "Optimize", "Report"] }}
      related={[
        { href: "/solutions/core-banking", title: "Core Banking", description: "Modernize the transactional foundation behind banking operations." },
        { href: "/solutions/banking-systems", title: "Banking Systems", description: "Connect physical banking infrastructure with digital operations." },
        { href: "/solutions/software-management-systems", title: "Software Management", description: "Strengthen the engineering systems that support reliable delivery." },
      ]}
    />
  );
}
