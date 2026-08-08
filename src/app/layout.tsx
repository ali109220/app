import type { Metadata, Viewport } from "next";
import "@/index.css";
import "@/App.css";
import { Header } from "@/site/Header";
import { Footer } from "@/site/Footer";
import ClientRuntime from "@/site/ClientRuntime";
import StructuredData from "@/site/StructuredData";
import { T } from "@/site/theme";
import { SITE_URL } from "@/lib/site";

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Tayseer Innovations | AI & Digital Banking Solutions",
    template: "%s | Tayseer Innovations"
  },
  description: "Tayseer Innovations delivers core banking, digital banking, AI, managed services and banking technology solutions for financial institutions across the Middle East.",
  applicationName: "Tayseer Innovations",
  creator: "Tayseer Innovations",
  publisher: "Tayseer Innovations",
  category: "Financial Technology",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Tayseer Innovations",
    locale: "en_US",
    title: "Tayseer Innovations | AI & Digital Banking Solutions",
    description: "Future-ready banking technology, AI and digital solutions for financial institutions across the Middle East.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Tayseer Innovations — AI & Digital Banking Solutions" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Tayseer Innovations | AI & Digital Banking Solutions",
    description: "Future-ready banking technology, AI and digital solutions for financial institutions across the Middle East.",
    images: ["/opengraph-image"]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#090B0E",
  colorScheme: "dark"
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Tayseer Innovations",
  url: siteUrl,
  logo: `${siteUrl}/logo-light.svg`,
  email: "info@tayseer.me",
  telephone: ["+966555203079", "+97143997558"],
  description: "Tayseer Innovations provides AI, digital banking, core banking, managed services and financial technology solutions for financial institutions.",
  areaServed: ["Saudi Arabia", "United Arab Emirates", "Middle East"],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+966555203079",
      contactType: "sales",
      areaServed: "SA",
      availableLanguage: ["English", "Arabic"]
    },
    {
      "@type": "ContactPoint",
      telephone: "+97143997558",
      contactType: "sales",
      areaServed: "AE",
      availableLanguage: ["English", "Arabic"]
    }
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "Tayseer Innovations",
  publisher: { "@id": `${siteUrl}/#organization` },
  inLanguage: "en"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>      <head>
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
        <StructuredData data={[organizationSchema, websiteSchema]} />
        <a className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-[#5CF0CE] focus:px-4 focus:py-3 focus:text-[#090B0E]" href="#main-content">
          Skip to content
        </a>
        <div style={{ background: T.bg, color: T.text }} className="min-h-screen font-archivo antialiased">
          <Header />
          <main id="main-content" tabIndex={-1} data-testid="page-main">{children}</main>
          <Footer />
        </div>
        <ClientRuntime />
      </body>
    </html>
  );
}
