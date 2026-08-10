import type { Metadata, Viewport } from "next";
import "@/index.css";
import "@/App.css";
import "@/performance.css";
import { Header } from "@/site/Header";
import { Footer } from "@/site/Footer";
import StructuredData from "@/site/StructuredData";
import { T } from "@/site/theme";
import { SITE_URL } from "@/lib/site";
import TayseerEntrance from "@/site/intro/TayseerEntrance";
import PageTransition from "@/site/motion/PageTransition";


export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
  "@id": `${SITE_URL}/#organization`,
  name: "Tayseer Innovations",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-light.svg`,
  email: "info@tayseerdemo.xyz",
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
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Tayseer Innovations",
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/InstrumentSans-Variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {/* Runtime kill switch for the entrance intro. `async` so it can never
            block the parser or move LCP; it resolves long before hydration,
            which is the earliest point the intro can mount. */}
        <script src="/intro-flag.js" async />
      </head>
      <body suppressHydrationWarning>
        <StructuredData data={[organizationSchema, websiteSchema]} />
        <a className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-[#0F5CBF] focus:px-4 focus:py-3 focus:text-white" href="#main-content">
          Skip to content
        </a>
        <div style={{ background: T.bg, color: T.text }} className="min-h-screen font-instrument antialiased">
          <Header />
          <main id="main-content" tabIndex={-1} data-testid="page-main">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </div>
        {/* Sibling of the page, never a wrapper: it renders null on the server
            and on the hydration pass, so it cannot gate rendering or LCP. */}
        <TayseerEntrance />
      </body>
    </html>
  );
}
