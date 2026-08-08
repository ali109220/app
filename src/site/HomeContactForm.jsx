"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { T } from "./theme";
import { FieldError, FormErrorSummary, useAccessibleFormValidation } from "./useAccessibleFormValidation";

const fieldClass = "rounded-md border bg-transparent px-4 py-3.5 text-sm outline-none focus:border-[#0D5A8C]";

export default function HomeContactForm() {
  const [sending, setSending] = useState(false);
  const { errors, onInvalid, onInput, validate, clearErrors } = useAccessibleFormValidation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!validate(form)) return;

    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      phone: "",
      organization: data.get("company") || "—",
      message: data.get("message"),
    };

    setSending(true);
    try {
      const response = await fetch("/api/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) throw new Error(result.error || "send failed");
      toast.success("Thanks — your message has been sent.");
      form.reset();
      clearErrors();
    } catch {
      toast.message("Opening your email app to send your message…");
      window.location.href = `mailto:info@tayseer.me?subject=${encodeURIComponent(`Website Query - ${payload.name || ""}`)}&body=${encodeURIComponent(`${payload.message || ""}\n\n${payload.email || ""}`)}`;
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <form data-testid="home-contact-form" onSubmit={handleSubmit} onInvalid={onInvalid} onInput={onInput} noValidate aria-busy={sending} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormErrorSummary errors={errors} />
        <div>
          <label htmlFor="home-contact-name" className="sr-only">Name</label>
          <input id="home-contact-name" name="name" required autoComplete="name" placeholder="Name" data-testid="contact-name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "home-contact-name-error" : undefined} className={`${fieldClass} w-full`} style={{ borderColor: T.border, color: T.text }} />
          <FieldError id="home-contact-name-error" message={errors.name} />
        </div>
        <div>
          <label htmlFor="home-contact-email" className="sr-only">Email address</label>
          <input id="home-contact-email" name="email" type="email" required autoComplete="email" inputMode="email" placeholder="Email" data-testid="contact-email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "home-contact-email-error" : undefined} className={`${fieldClass} w-full`} style={{ borderColor: T.border, color: T.text }} />
          <FieldError id="home-contact-email-error" message={errors.email} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="home-contact-company" className="sr-only">Company</label>
          <input id="home-contact-company" name="company" autoComplete="organization" placeholder="Company (optional)" data-testid="contact-company" className={`${fieldClass} w-full`} style={{ borderColor: T.border, color: T.text }} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="home-contact-message" className="sr-only">How may we help you?</label>
          <textarea id="home-contact-message" name="message" required rows={4} placeholder="How may we help you?" data-testid="contact-message" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "home-contact-message-error" : undefined} className={`${fieldClass} w-full`} style={{ borderColor: T.border, color: T.text }} />
          <FieldError id="home-contact-message-error" message={errors.message} />
        </div>
        <button type="submit" disabled={sending} data-testid="contact-submit" className="inline-flex min-h-11 w-full items-center justify-center gap-2 px-8 py-4 text-sm font-semibold uppercase tracking-wider transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60 sm:w-auto" style={{ background: T.signal, color: T.bg }}>
          {sending ? "Sending…" : "Submit"} <ArrowRight aria-hidden="true" size={16} />
        </button>
        <span className="sr-only" role="status" aria-live="polite">{sending ? "Sending your message" : ""}</span>
      </form>
      <Toaster theme="dark" position="bottom-right" richColors />
    </>
  );
}
