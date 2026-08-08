"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section role="alert" aria-labelledby="error-title" className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-6 py-24">
      <p className="font-jbmono text-xs uppercase tracking-[0.24em] text-[#0D5A8C]">Something went wrong</p>
      <h1 id="error-title" className="mt-4 text-4xl font-bold uppercase tracking-tight sm:text-6xl">We couldn’t load this page</h1>
      <p className="mt-5 max-w-xl text-base leading-relaxed opacity-70">Please try again. If the problem continues, return to the homepage or contact Tayseer for assistance.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" onClick={reset} className="inline-flex min-h-11 items-center bg-[#0D5A8C] px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white">Try again</button>
        <Link href="/" className="inline-flex min-h-11 items-center border border-[#0D5A8C] px-5 py-3 text-sm font-semibold uppercase tracking-wider text-[#0D5A8C]">Back to home</Link>
      </div>
    </section>
  );
}
