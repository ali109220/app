import { GitBranch, Wrench, FolderTree, Plug, ScrollText, Lock, Rocket, Code2, Workflow } from "lucide-react";
import { EnterpriseSolutionPage } from "@/site/phase8/EnterpriseSolutionLayout";
import { T } from "@/site/theme";

const CAPS = [
  { icon: GitBranch, h: "Version Control Systems", p: "Track code changes, maintain integrity and support collaborative development through centralized version-control practices." },
  { icon: Wrench, h: "Development Tooling", p: "Support mobile and software engineering with development environments, debugging and testing tools that improve delivery quality." },
  { icon: FolderTree, h: "File Management", p: "Organize source, assets and project files with centralized access and version-aware management." },
  { icon: Plug, h: "Integration API Management", p: "Connect applications and external systems through managed APIs that simplify data exchange and workflow automation." },
  { icon: ScrollText, h: "Log Management", p: "Centralize and analyze application logs to improve troubleshooting, operational visibility and application uptime." },
  { icon: Lock, h: "Authorization Tools", p: "Define granular permissions and access levels to protect sensitive application data and functionality." },
  { icon: Rocket, h: "CI/CD Tools", p: "Automate build, test and deployment activities to improve release consistency and shorten delivery cycles." },
];

function SoftwareLifecycleVisual() {
  const stages = [
    ["Plan", FolderTree],
    ["Code", Code2],
    ["Integrate", Plug],
    ["Secure", Lock],
    ["Observe", ScrollText],
    ["Release", Rocket],
  ];
  return (
    <div className="mx-auto max-w-[620px] border p-5 sm:p-7" style={{ borderColor: T.border, background: T.panel }} aria-label="Software delivery lifecycle illustration">
      <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: T.border }}>
        <div><div className="font-jbmono text-[10px] uppercase tracking-[0.22em]" style={{ color: T.signal }}>Engineering system</div><div className="mt-1 text-lg font-semibold">Connected Delivery Lifecycle</div></div>
        <Workflow size={21} aria-hidden="true" style={{ color: T.green }} />
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {stages.map(([label, Icon], index) => (
          <div key={label} className="relative flex items-center gap-3 border p-4" style={{ borderColor: T.border, background: T.bg }}>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center" style={{ background: "rgba(13,90,140,.10)", color: T.signal }}><Icon size={17} aria-hidden="true" /></div>
            <div><div className="font-jbmono text-[9px]" style={{ color: T.faint }}>{String(index + 1).padStart(2, "0")}</div><div className="text-sm font-semibold">{label}</div></div>
          </div>
        ))}
      </div>
      <div className="mt-4 border p-4 text-center text-sm font-medium" style={{ borderColor: T.signal, color: T.signal, background: "rgba(13,90,140,.07)" }}>Version → Build → Test → Deploy → Observe → Improve</div>
    </div>
  );
}

export default function SoftwareManagementSystems() {
  return (
    <EnterpriseSolutionPage
      hero={{
        eyebrow: "Software Management Systems",
        title: "Engineer with control.",
        tagline: "The systems behind secure, repeatable software delivery.",
        lead: "Tayseer brings together software-management capabilities that help engineering teams collaborate, integrate, secure, observe and release applications with greater consistency.",
        visual: <SoftwareLifecycleVisual />,
      }}
      challenges={[
        "Distributed development teams need reliable control over code, files and change history.",
        "Modern applications depend on secure integrations, clear authorization and operational visibility.",
        "Manual build, test and deployment steps slow releases and create avoidable inconsistency.",
      ]}
      outcomes={[
        "More consistent development workflows",
        "Faster integration between systems",
        "Improved application observability",
        "Repeatable build, test and release processes",
      ]}
      capabilityTitle="One engineering lifecycle from source to production"
      capabilityIntro="Version control, development tools, API management, logs, authorization and CI/CD work together as one software-delivery operating system."
      capabilities={CAPS}
      architecture={{ title: "A controlled software delivery path", steps: ["Source", "Build & Test", "API & Security", "Deploy", "Observe"] }}
      related={[
        { href: "/solutions/managed-services", title: "Managed Services", description: "Extend engineering delivery into managed operations and support." },
        { href: "/solutions/fahim-ai", title: "Fahim AI", description: "Apply intelligent automation to customer and business workflows." },
        { href: "/solutions/core-banking", title: "Core Banking", description: "Support modern banking platforms with reliable engineering foundations." },
      ]}
    />
  );
}
