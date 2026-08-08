import type { Metadata } from "next";
import CareersClient from "@/next/CareersClient";

const title = "Careers at Tayseer Innovations | FinTech, AI & Banking Technology";
const description = "Explore career opportunities at Tayseer Innovations and help build AI, digital banking, core banking and financial technology solutions across the Middle East.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["Tayseer Innovations careers", "FinTech jobs Middle East", "banking technology careers", "AI jobs banking", "digital banking jobs"],
  alternates: { canonical: "/careers" },
  openGraph: {
    type: "website",
    url: "/careers",
    title,
    description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Careers at Tayseer Innovations" }]
  },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] }
};

export default function CareersPage() {
  return <CareersClient />;
}
