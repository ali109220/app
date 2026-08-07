import type { Metadata, Viewport } from "next";
import "@/index.css";
import "@/App.css";
import SiteChrome from "@/site/SiteChrome";

export const metadata: Metadata = {
  metadataBase: new URL("https://tayseer.me"),
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
      <body suppressHydrationWarning>
        <a className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-[#5CF0CE] focus:px-4 focus:py-3 focus:text-[#090B0E]" href="#main-content">
          Skip to content
        </a>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
