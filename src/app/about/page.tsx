import type { Metadata } from "next";
import About from "@/pages/About";

const title = "About Tayseer Innovations | Banking Technology & AI Partner";
const description = "Learn about Tayseer Innovations, a regional banking technology and AI partner delivering digital banking, core banking, managed services and financial technology solutions across Saudi Arabia, the UAE and the Middle East.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["Tayseer Innovations", "banking technology company", "FinTech company Middle East", "digital banking partner", "AI banking solutions"],
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: "/about",
    title,
    description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "About Tayseer Innovations" }]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"]
  }
};

export default function AboutPage() {
  return <About />;
}
