import { useState } from "react";
import { MapPin, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/site/motion";
import { InnerHero, SectionLabel } from "@/site/ui";
import { T } from "@/site/theme";
import { ContactAccentArt } from "@/site/DecorativeArt";
import { FieldError, FormErrorSummary, useAccessibleFormValidation } from "@/site/useAccessibleFormValidation";

const OFFICES = [
  { region: "Saudi Arabia", addr: "Office 7, 2nd Floor, Selam Building, Prince Saad bin Abdulrahman Alawal Branch Road, Al Rawabi, Riyadh, Kingdom of Saudi Arabia" },
  { region: "UAE", addr: "601, One Lake Plaza, Cluster T, JLT, Dubai, UAE" },
];

const fieldClass = "rounded-md border bg-transparent px-4 py-3.5 text-sm outline-none focus:border-[#0D5A8C]";

export default function Connect() {
  const [sending, setSending] = useState(false);
  const { errors, onInvalid, onInput, validate, clearErrors } = useAccessibleFormValidation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    if (!validate(f)) return;
    const p = Object.fromEntries(new FormData(f).entries());
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
      window.location.href = `mailto:info@tayseer.me?subject=${encodeURIComponent("Connect - " + (p.name || ""))}&body=${encodeURIComponent((p.message || "") + "\n\n" + (p.email || "") + " " + (p.phone || "") + "\nOrganization: " + (p.organization || ""))}`;
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ background: T.bg, color: T.text }} className="font-archivo">
      <InnerHero index="03" crumbs={["Home", "Connect"]} title="Connect" tagline="Connect with Tayseer – The Trusted Partner for Your Business" />
      <section className="relative overflow-hidden px-6 py-24 md:px-12" aria-labelledby="connect-form-heading">
        <ContactAccentArt className="pointer-events-none absolute -right-10 top-0 hidden h-64 w-64 opacity-70 lg:block" />
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal><SectionLabel>Visit Us</SectionLabel></Reveal>
            <div className="mt-6 space-y-5">
              {OFFICES.map((o) => (
                <Reveal key={o.region} delay={0.05}>
                  <address className="rounded-lg border p-6 not-italic" style={{ borderColor: T.border, background: T.panel }}>
                    <div className="flex items-center gap-2 font-jbmono text-[12px] uppercase tracking-widest" style={{ color: T.signal }}><MapPin aria-hidden="true" size={15} /> {o.region}</div>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: T.muted }}>{o.addr}</p>
                  </address>
                </Reveal>
              ))}
              <Reveal delay={0.1}><div className="space-y-1 font-jbmono text-sm" style={{ color: T.muted }}><div><a href="mailto:info@tayseer.me" className="rounded-sm hover:text-white">info@tayseer.me</a></div><div><a href="tel:+966555203079" className="rounded-sm hover:text-white">+966 555203079</a></div><div><a href="tel:+97143997558" className="rounded-sm hover:text-white">+971 43997558</a></div></div></Reveal>
            </div>
          </div>
          <div className="lg:col-span-7">
            <Reveal><p id="connect-form-heading" className="text-lg" style={{ color: T.muted }}>Fill out the form below, and we will contact you as soon as possible!</p></Reveal>
            <Reveal delay={0.05}>
              <form data-testid="connect-form" onSubmit={handleSubmit} onInvalid={onInvalid} onInput={onInput} noValidate aria-busy={sending} className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormErrorSummary errors={errors} />
                <div><label htmlFor="connect-name" className="sr-only">Your name</label><input id="connect-name" name="name" required autoComplete="name" placeholder="Your Name*" data-testid="connect-name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "connect-name-error" : undefined} className={`${fieldClass} w-full`} style={{ borderColor: T.border, color: T.text }} /><FieldError id="connect-name-error" message={errors.name} /></div>
                <div><label htmlFor="connect-email" className="sr-only">Your email address</label><input id="connect-email" name="email" type="email" required autoComplete="email" inputMode="email" placeholder="Your Email*" data-testid="connect-email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "connect-email-error" : undefined} className={`${fieldClass} w-full`} style={{ borderColor: T.border, color: T.text }} /><FieldError id="connect-email-error" message={errors.email} /></div>
                <div><label htmlFor="connect-phone" className="sr-only">Your phone number</label><input id="connect-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="Your Phone" data-testid="connect-phone" className={`${fieldClass} w-full`} style={{ borderColor: T.border, color: T.text }} /></div>
                <div><label htmlFor="connect-organization" className="sr-only">Organization</label><input id="connect-organization" name="organization" required autoComplete="organization" placeholder="Organization*" data-testid="connect-organization" aria-invalid={Boolean(errors.organization)} aria-describedby={errors.organization ? "connect-organization-error" : undefined} className={`${fieldClass} w-full`} style={{ borderColor: T.border, color: T.text }} /><FieldError id="connect-organization-error" message={errors.organization} /></div>
                <div className="sm:col-span-2"><label htmlFor="connect-message" className="sr-only">Your message</label><textarea id="connect-message" name="message" required rows={5} placeholder="Your Message*" data-testid="connect-message" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "connect-message-error" : undefined} className={`${fieldClass} w-full`} style={{ borderColor: T.border, color: T.text }} /><FieldError id="connect-message-error" message={errors.message} /></div>
                <button type="submit" disabled={sending} data-testid="connect-submit" className="inline-flex min-h-11 w-full items-center justify-center gap-2 px-8 py-4 text-sm font-semibold uppercase tracking-wider transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60 sm:w-auto" style={{ background: T.signal, color: T.bg }}>{sending ? "Sending…" : "Submit"} <ArrowRight aria-hidden="true" size={16} /></button>
                <span className="sr-only" role="status" aria-live="polite">{sending ? "Sending your message" : ""}</span>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
