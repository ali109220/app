import type { Metadata } from "next";
import { Terms } from "@/pages/Legal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Read the Tayseer Innovations website terms and conditions governing use of our website, content and digital services.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "/terms",
    title: "Terms & Conditions | Tayseer Innovations",
    description: "Terms and conditions for using the Tayseer Innovations website and digital content."
  }
};

export default function TermsPage() {
  return <Terms />;
}
