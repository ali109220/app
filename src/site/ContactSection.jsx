"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Reveal } from "./motion";
import { SectionLabel } from "./ui";
import { T } from "./theme";
import { ContactAccentArt } from "./DecorativeArt";
import { FieldError, FormErrorSummary, useAccessibleFormValidation } from "./useAccessibleFormValidation";

const fieldClass = "rounded-md border bg-transparent px-4 py-3.5 text-sm outline-none focus:border-[#0D5A8C]";

export const ContactSection = () => {
  const [sending, setSending] = useState(false);
  const { errors, onInvalid, onInput, validate, clearErrors } = useAccessibleFormValidation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    if (!validate(f)) return;
    const fd = new FormData(f);
    const p = { name: fd.get("name"), email: fd.get("email"), phone: "", organization: fd.get("company") || "—", message: fd.get("message") };
    setSending(true);
    try {
      const res = await fetch("/api/connect", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(p) });
      const d = await res.json().catch(() => ({}));
      if (!res.ok || !d.ok) throw new Error(d.error || "send failed");
      toast.success("Thanks — your message has been sent.");
      f.reset();
      clearErrors();
    } catch {
      toast.message("Opening your email app to send your message…");
      window.location.href = `mailto:info@tayseer.me?subject=${encodeURIComponent("Website Query - " + (p.name || ""))}&body=${encodeURIComponent((p.message || "") + "\n\n" + (p.email || ""))}`;
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden border-t px-6 py-24 md:px-12" style={{ borderColor: T.border, background: T.bg }} aria-labelledby="contact-section-heading">
        <ContactAccentArt className="pointer-events-none absolute -right-10 top-0 hidden h-64 w-64 opacity-70 lg:block" />
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal><SectionLabel>Talk To Us</SectionLabel></Reveal>
            <Reveal delay={0.05}><h2 id="contact-section-heading" className="text-4xl font-bold uppercase leading-[0.95] tracking-[-0.02em] sm:text-5xl">How May We Help You!</h2></Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 space-y-6 text-sm" style={{ color: T.muted }}>
                <address className="not-italic"><div className="mb-1 font-jbmono text-[11px] uppercase tracking-widest" style={{ color: T.faint }}>Saudi Arabia</div>Office 7, 2nd Floor, Selam Building, Prince Saad bin Abdulrahman Alawal Branch Road, Al Rawabi, Riyadh, Kingdom of Saudi Arabia</address>
                <address className="not-italic"><div className="mb-1 font-jbmono text-[11px] uppercase tracking-widest" style={{ color: T.faint }}>UAE</div>601, One Lake Plaza, Cluster T, JLT, Dubai, UAE</address>
                <div className="space-y-1 font-jbmono"><div><a href="mailto:info@tayseer.me" className="rounded-sm hover:text-white">info@tayseer.me</a></div><div><a href="tel:+966555203079" className="rounded-sm hover:text-white">+966 555203079</a> · <a href="tel:+97143997558" className="rounded-sm hover:text-white">+971 43997558</a></div></div>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <form data-testid="contact-form" onSubmit={handleSubmit} onInvalid={onInvalid} onInput={onInput} noValidate aria-busy={sending} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormErrorSummary errors={errors} />
                <div><label htmlFor="shared-contact-name" className="sr-only">Name</label><input id="shared-contact-name" name="name" required autoComplete="name" placeholder="Name" data-testid="cs-name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "shared-contact-name-error" : undefined} className={`${fieldClass} w-full`} style={{ borderColor: T.border, color: T.text }} /><FieldError id="shared-contact-name-error" message={errors.name} /></div>
                <div><label htmlFor="shared-contact-email" className="sr-only">Email address</label><input id="shared-contact-email" name="email" type="email" required autoComplete="email" inputMode="email" placeholder="Email" data-testid="cs-email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "shared-contact-email-error" : undefined} className={`${fieldClass} w-full`} style={{ borderColor: T.border, color: T.text }} /><FieldError id="shared-contact-email-error" message={errors.email} /></div>
                <div className="sm:col-span-2"><label htmlFor="shared-contact-company" className="sr-only">Company</label><input id="shared-contact-company" name="company" autoComplete="organization" placeholder="Company (optional)" data-testid="cs-company" className={`${fieldClass} w-full`} style={{ borderColor: T.border, color: T.text }} /></div>
                <div className="sm:col-span-2"><label htmlFor="shared-contact-message" className="sr-only">How may we help you?</label><textarea id="shared-contact-message" name="message" required rows={4} placeholder="How may we help you?" data-testid="cs-message" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "shared-contact-message-error" : undefined} className={`${fieldClass} w-full`} style={{ borderColor: T.border, color: T.text }} /><FieldError id="shared-contact-message-error" message={errors.message} /></div>
                <button type="submit" disabled={sending} data-testid="cs-submit" className="inline-flex min-h-11 w-full items-center justify-center gap-2 px-8 py-4 text-sm font-semibold uppercase tracking-wider transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60 sm:w-auto" style={{ background: T.signal, color: T.bg }}>{sending ? "Sending…" : "Submit"} <ArrowRight aria-hidden="true" size={16} /></button>
                <span className="sr-only" role="status" aria-live="polite">{sending ? "Sending your message" : ""}</span>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
      <Toaster theme="dark" position="bottom-right" richColors />
    </>
  );
};
