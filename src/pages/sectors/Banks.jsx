import { CreditCard, Send, Users, ShieldCheck, Banknote, Fingerprint, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { EnterpriseSolutionPage } from "@/site/phase8/EnterpriseSolutionLayout";
import { T } from "@/site/theme";

/**
 * PROTOTYPE — buyer-first sector page (proposal deliverable, not yet linked from
 * primary nav). Content is not new copy: every capability below is reused
 * verbatim from the existing, real Core Banking (/solutions/core-banking) and
 * Banking Systems (/solutions/banking-systems) pages — regrouped under a "Banks"
 * buyer-segment lens instead of a product-line lens, to demonstrate the proposed
 * IA without fabricating new claims. See PROPOSAL section 2 for the full
 * buyer-first-vs-product-catalogue comparison this page is evidence for.
 */
const CAPS = [
  { icon: CreditCard, h: "Payments", p: "Empower your customers with a modern and convenient way to manage their finances. Streamline payments processing across cards, mobile wallets, and app-based payments with a secure and efficient platform." },
  { icon: Send, h: "Remittance Solutions", p: "Enable fast, secure, and cost-effective domestic and international money transfers through a user-friendly remittance experience." },
  { icon: Users, h: "Consumer Banking", p: "Deliver a seamless and personalized banking experience with convenient access to account information, online banking features, and mobile applications." },
  { icon: ShieldCheck, h: "Security & Compliance", p: "Safeguard data and operations with security capabilities designed to support evolving industry regulations, financial integrity, and customer trust." },
  { icon: Banknote, h: "ATMs & Cash Recyclers", p: "Extend self-service access while improving cash availability and branch cash-management efficiency with advanced ATM and recycling technology." },
  { icon: Fingerprint, h: "Biometrics Modules", p: "Add biometric authentication options including fingerprint, facial and iris-based verification to supported banking experiences." },
];

export default function BanksSector() {
  return (
    <EnterpriseSolutionPage
      hero={{
        eyebrow: "Sector — Banks",
        title: "Built for banks, not just sold to them.",
        tagline: "Core banking, branch systems and compliance, organized around what a bank buyer needs to evaluate — not around Tayseer's product names.",
        lead: "This page groups Tayseer's core banking and banking-systems capabilities under one buyer-first sector view. The capabilities themselves are unchanged and already live today at /solutions/core-banking and /solutions/banking-systems — only the organizing structure is new.",
        visual: (
          <div className="relative mx-auto max-w-[620px] border p-6" style={{ borderColor: T.border, background: T.panel }}>
            <div className="font-jbmono text-[11px] uppercase tracking-[0.2em]" style={{ color: T.signal }}>Where this content comes from</div>
            <div className="mt-4 space-y-2">
              <Link href="/solutions/core-banking" className="group flex items-center justify-between border px-4 py-3 transition-colors hover:border-[#0F5CBF]" style={{ borderColor: T.border, background: T.bg }}>
                <span className="text-sm font-medium">Core Banking (live page)</span>
                <ArrowUpRight size={15} className="shrink-0" style={{ color: T.signal }} aria-hidden="true" />
              </Link>
              <Link href="/solutions/banking-systems" className="group flex items-center justify-between border px-4 py-3 transition-colors hover:border-[#0F5CBF]" style={{ borderColor: T.border, background: T.bg }}>
                <span className="text-sm font-medium">Banking Systems (live page)</span>
                <ArrowUpRight size={15} className="shrink-0" style={{ color: T.signal }} aria-hidden="true" />
              </Link>
            </div>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: T.muted }}>
              This sector view regroups the two pages above by buyer, not by product name. Nothing on this page is new copy.
            </p>
          </div>
        ),
      }}
      challenges={[
        "Legacy banking environments can make change slower and increase the effort required to launch new customer experiences.",
        "Branches must serve more customers while reducing repetitive manual cash-handling work.",
        "Financial institutions need a dependable core while still being able to evolve digital services and operational processes.",
      ]}
      outcomes={[
        "Connected banking capabilities",
        "Extended self-service availability",
        "Stronger customer experience foundations",
        "Security and compliance support",
      ]}
      capabilityTitle="What a bank buyer gets, in one view"
      capabilityIntro="Pulled from Tayseer's existing Core Banking and Banking Systems pages — regrouped, not rewritten."
      capabilities={CAPS}
      architecture={{ title: "From branch and channel to core", steps: ["Customer", "ATM / STM / Digital Channel", "Secure Modules", "Bank Integration", "Core Banking"] }}
      related={[
        { href: "/solutions/core-banking", title: "Core Banking (live page)", description: "The full, current product page this sector view draws from." },
        { href: "/solutions/banking-systems", title: "Banking Systems (live page)", description: "Branch and self-service capabilities behind this sector view." },
      ]}
    />
  );
}
