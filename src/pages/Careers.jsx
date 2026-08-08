import { useState } from "react";
import { ArrowRight, Upload } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/site/motion";
import { InnerHero, SectionLabel } from "@/site/ui";
import { T } from "@/site/theme";
import { FieldError, FormErrorSummary, useAccessibleFormValidation } from "@/site/useAccessibleFormValidation";

const fieldClass = "rounded-md border bg-transparent px-4 py-3.5 text-sm outline-none focus:border-[#0D5A8C]";

export default function Careers() {
  const [sending, setSending] = useState(false);
  const { errors, onInvalid, onInput, validate, clearErrors } = useAccessibleFormValidation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    if (!validate(f)) return;
    const fd = new FormData(f);
    setSending(true);
    try {
      const res = await fetch("/api/careers", { method: "POST", body: fd });
      const d = await res.json().catch(() => ({}));
      if (!res.ok || !d.ok) throw new Error(d.error || "send failed");
      toast.success("Thanks — your application has been submitted.");
      f.reset();
      clearErrors();
    } catch {
      toast.message("Opening your email app… please attach your résumé manually.");
      window.location.href = `mailto:info@tayseer.me?subject=${encodeURIComponent("Career Application - " + (fd.get("name") || ""))}&body=${encodeURIComponent("Position: " + (fd.get("position") || "") + "\nPhone: " + (fd.get("phone") || "") + "\nEmail: " + (fd.get("email") || "") + "\n\n" + (fd.get("message") || ""))}`;
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ background: T.bg, color: T.text }} className="font-archivo">
      <InnerHero index="04" crumbs={["Home", "Careers"]} title="Careers" tagline="Shape the Future of Intelligent Solutions in the Region" lead="Please fill the form below along with your detailed resume." />
      <section className="px-6 py-24 md:px-12" aria-labelledby="careers-apply-heading">
        <div className="mx-auto max-w-[900px]">
          <Reveal><div id="careers-apply-heading"><SectionLabel>Apply</SectionLabel></div></Reveal>
          <Reveal delay={0.05}>
            <form data-testid="careers-form" onSubmit={handleSubmit} onInvalid={onInvalid} onInput={onInput} noValidate aria-busy={sending} className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormErrorSummary errors={errors} />
              <div><label htmlFor="careers-name" className="sr-only">Your name</label><input id="careers-name" name="name" required autoComplete="name" placeholder="Your Name*" data-testid="careers-name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "careers-name-error" : undefined} className={`${fieldClass} w-full`} style={{ borderColor: T.border, color: T.text }} /><FieldError id="careers-name-error" message={errors.name} /></div>
              <div><label htmlFor="careers-phone" className="sr-only">Your phone number</label><input id="careers-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="Your Phone" data-testid="careers-phone" className={`${fieldClass} w-full`} style={{ borderColor: T.border, color: T.text }} /></div>
              <div><label htmlFor="careers-email" className="sr-only">Your email address</label><input id="careers-email" name="email" type="email" required autoComplete="email" inputMode="email" placeholder="Your Email*" data-testid="careers-email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "careers-email-error" : undefined} className={`${fieldClass} w-full`} style={{ borderColor: T.border, color: T.text }} /><FieldError id="careers-email-error" message={errors.email} /></div>
              <div><label htmlFor="careers-position" className="sr-only">Position applied for</label><select id="careers-position" name="position" required defaultValue="" data-testid="careers-position" aria-invalid={Boolean(errors.position)} aria-describedby={errors.position ? "careers-position-error" : undefined} className={`${fieldClass} min-h-11 w-full`} style={{ borderColor: T.border, color: T.text }}><option value="" disabled style={{ background: T.panel }}>Position Applied For*</option><option value="Software Development" style={{ background: T.panel }}>Software Development</option><option value="Sales" style={{ background: T.panel }}>Sales</option><option value="Others" style={{ background: T.panel }}>Others</option></select><FieldError id="careers-position-error" message={errors.position} /></div>
              <div className="sm:col-span-2"><label htmlFor="careers-resume" className="flex min-h-11 cursor-pointer items-center gap-3 rounded-md border border-dashed px-4 py-3.5 text-sm" style={{ borderColor: T.border, color: T.muted }}><Upload aria-hidden="true" size={16} style={{ color: T.signal }} /> Resume/CV* — .pdf, .txt, .jpg, .jpeg, .png, .gif, .doc, .docx, .ppt</label><input id="careers-resume" name="resume" type="file" required accept=".pdf,.txt,.jpg,.jpeg,.png,.gif,.doc,.docx,.ppt" data-testid="careers-resume" aria-invalid={Boolean(errors.resume)} aria-describedby={errors.resume ? "careers-resume-error" : undefined} className="sr-only" /><FieldError id="careers-resume-error" message={errors.resume} /></div>
              <div className="sm:col-span-2"><label htmlFor="careers-message" className="sr-only">Your message</label><textarea id="careers-message" name="message" rows={4} placeholder="Your Message" data-testid="careers-message" className={`${fieldClass} w-full`} style={{ borderColor: T.border, color: T.text }} /></div>
              <button type="submit" disabled={sending} data-testid="careers-submit" className="inline-flex min-h-11 w-full items-center justify-center gap-2 px-8 py-4 text-sm font-semibold uppercase tracking-wider transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60 sm:w-auto" style={{ background: T.signal, color: T.bg }}>{sending ? "Submitting…" : "Submit"} <ArrowRight aria-hidden="true" size={16} /></button>
              <span className="sr-only" role="status" aria-live="polite">{sending ? "Submitting your application" : ""}</span>
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
