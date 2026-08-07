"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col justify-center px-6 py-24">
      <p className="font-jbmono text-xs uppercase tracking-[0.24em] text-[#5CF0CE]">Something went wrong</p>
      <h1 className="mt-4 text-4xl font-bold">We couldn’t load this page.</h1>
      <button onClick={reset} className="mt-8 w-fit bg-[#5CF0CE] px-5 py-3 font-semibold text-[#090B0E]">Try again</button>
    </section>
  );
}
