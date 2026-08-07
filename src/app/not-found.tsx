import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-6 py-24">
      <p className="font-jbmono text-xs uppercase tracking-[0.24em] text-[#0D5A8C]">404</p>
      <h1 className="mt-4 text-4xl font-bold uppercase tracking-tight sm:text-6xl">Page not found</h1>
      <p className="mt-5 max-w-xl text-base opacity-70">The page you requested does not exist or has moved.</p>
      <Link href="/" className="mt-8 inline-flex w-fit items-center bg-[#0D5A8C] px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white">
        Back to home
      </Link>
    </section>
  );
}
