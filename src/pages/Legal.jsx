import { AlertTriangle } from "lucide-react";
import { Reveal } from "@/site/motion";
import { T } from "@/site/theme";

// Legal pages are intentional PLACEHOLDERS, flagged for real legal review.
// No drafted clause here should be treated as final or enforceable language.
function LegalShell({ index, title, updated, sections }) {
  return (
    <section className="grain relative min-h-screen overflow-hidden" style={{ background: T.bg }}>
      <div className="hairline-grid absolute inset-0" style={{ "--hl": T.hl, backgroundSize: "8.33% 6rem" }} />
      <div className="relative mx-auto max-w-[900px] px-6 pt-32 pb-24 md:px-12">
        <Reveal>
          <div className="mb-5 font-jbmono text-[12px] uppercase tracking-[0.25em]" style={{ color: T.signal }}>{index} — Legal</div>
          <h1 className="text-4xl font-extrabold uppercase leading-[0.92] tracking-[-0.02em] sm:text-6xl" style={{ color: T.text }}>{title}</h1>
        </Reveal>

        {/* NEEDS VERIFICATION — placeholder banner, must be replaced by counsel-approved copy */}
        <Reveal delay={0.05}>
          <div className="mt-8 flex items-start gap-3 rounded-lg border p-5" style={{ borderColor: "rgba(13,90,140,0.4)", background: "rgba(13,90,140,0.06)" }}>
            <AlertTriangle size={18} className="mt-0.5 shrink-0" style={{ color: T.signal }} />
            <p className="text-sm leading-relaxed" style={{ color: T.muted }}>
              <span className="font-semibold" style={{ color: T.text }}>Placeholder — not final. </span>
              This page is a structural draft awaiting review and approval by legal counsel.
              The text below is generic scaffolding only and is <span className="font-semibold">not</span> a
              binding {title.toLowerCase()}. Do not publish until replaced with counsel-approved language.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 font-jbmono text-[12px] uppercase tracking-widest" style={{ color: T.faint }}>Last updated: {updated}</p>
        </Reveal>

        <div className="mt-12 space-y-10">
          {sections.map((s, i) => (
            <Reveal key={s.h} delay={0.05 * i}>
              <div>
                <h2 className="text-xl font-semibold" style={{ color: T.text }}>{i + 1}. {s.h}</h2>
                <p className="mt-3 text-base leading-relaxed" style={{ color: T.muted }}>{s.p}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 border-t pt-6 font-jbmono text-[12px] uppercase tracking-widest" style={{ borderColor: T.border, color: T.faint }}>
            {/* SOURCED — contact from live site footer */}
            Questions? info@tayseerdemo.xyz · +966 555203079 · +971 43997558
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// DRAFTED, NOT SOURCED — factual replacement describing the REAL data flow (form
// submissions forwarded by email via Resend, zero storage, résumé as attachment only).
// NEEDS VERIFICATION — accurate to the technical flow but NOT legally reviewed. The
// visible "for legal review" banner MUST remain as prominent as it is.
const PRIVACY = [
  { h: "Introduction", p: "This policy describes how Tayseer Innovations handles information you submit through this website. It reflects how the site actually works today and is provided for transparency while awaiting formal legal review." },
  { h: "Information We Collect", p: "Through our Connect form we collect your name, email, phone (optional), organization, and message. Through our Careers form we collect your name, phone (optional), email, the position you are applying for, your résumé/CV file, and an optional message. We do not collect this information in any other way on the site." },
  { h: "How We Use Your Information", p: "We use the information solely to respond to your enquiry or to assess your job application. We do not use it for advertising or sell it to third parties." },
  { h: "How It Is Handled & Stored", p: "Submissions are not stored in any database on this website. They are transmitted over an encrypted connection to a serverless function that forwards them as a single email to info@tayseerdemo.xyz via Resend, our email-delivery provider, and retains nothing afterwards. Résumé files are passed through only as an email attachment and are never stored on the website or with any form-service. Your information then resides only within Tayseer's email systems." },
  { h: "Third Parties", p: "Resend processes your message in transit purely to deliver the email. No advertising or analytics trackers receive this form data." },
  { h: "Data Retention", p: "Submitted information is retained only within Tayseer's internal email systems in line with company policy." },
  { h: "Your Rights & Contact", p: "To request access to, correction of, or deletion of the information you submitted, contact info@tayseerdemo.xyz." },
];

const TERMS = [
  { h: "Acceptance of Terms", p: "— Placeholder. Statement that use of the website and services constitutes acceptance, to be provided by legal counsel." },
  { h: "Use of Services", p: "— Placeholder. Permitted use, restrictions, and account responsibilities, to be confirmed." },
  { h: "Intellectual Property", p: "— Placeholder. Ownership of site content, trademarks, and product materials, to be confirmed." },
  { h: "Disclaimers & Limitation of Liability", p: "— Placeholder. Warranty disclaimers and liability limits under applicable law, to be confirmed by counsel." },
  { h: "Governing Law", p: "— Placeholder. Governing jurisdiction (UAE/KSA) and dispute resolution, to be confirmed." },
  { h: "Changes to These Terms", p: "— Placeholder. How updates are communicated and take effect, to be confirmed." },
  { h: "Contact", p: "— Placeholder. Official contact point for legal enquiries, to be confirmed." },
];

export const Privacy = () => <LegalShell index="06" title="Privacy Policy" updated="—" sections={PRIVACY} />;
export const Terms = () => <LegalShell index="07" title="Terms & Conditions" updated="—" sections={TERMS} />;
