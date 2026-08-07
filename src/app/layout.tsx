import type { Metadata, Viewport } from "next";
import "@/index.css";
import "@/App.css";
import SiteChrome from "@/site/SiteChrome";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tayseer Innovations | AI & Digital Banking Solutions",
    template: "%s | Tayseer Innovations"
  },
  description: "Tayseer Innovations delivers core banking, digital banking, AI, managed services and banking technology solutions across the region.",
  applicationName: "Tayseer Innovations",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Tayseer Innovations",
    title: "Tayseer Innovations | AI & Digital Banking Solutions",
    description: "Future-ready banking technology, AI and digital solutions for financial institutions."
  },
  twitter: {
    card: "summary_large_image",
    title: "Tayseer Innovations | AI & Digital Banking Solutions",
    description: "Future-ready banking technology, AI and digital solutions for financial institutions."
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#090B0E",
  colorScheme: "dark"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Both fonts are referenced only from inside index.css's @font-face
            rules, so without a preload the browser can't start fetching them
            until it has downloaded and parsed that CSS. That delay pushes the
            font-display:swap swap to ~2.4s in, well after first paint — late
            enough that swapping in Archivo/JetBrains Mono (used almost
            everywhere via font-archivo/font-jbmono) reflows most of the page
            at once and shows up as a huge, single layout shift in CLS. */}
        <link rel="preload" href="/fonts/Archivo-Variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/JetBrainsMono-Variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        <a className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-[#5CF0CE] focus:px-4 focus:py-3 focus:text-[#090B0E]" href="#main-content">
          Skip to content
        </a>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
