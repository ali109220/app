import type { Metadata } from "next";
import BanksSector from "@/pages/sectors/Banks";

const title = "Banks";
const description = "Core banking, branch systems and compliance capabilities for bank buyers — organized by sector, not by product name.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sectors/banks" },
  openGraph: {
    type: "website",
    url: "/sectors/banks",
    title,
    description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Tayseer Innovations for Banks" }]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"]
  }
};

export default function BanksSectorPage() {
  return <BanksSector />;
}
