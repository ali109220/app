import type { Metadata } from "next";
import { Privacy } from "@/pages/Legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read the Tayseer Innovations privacy policy and learn how personal information is handled when you use our website and contact our team.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "/privacy",
    title: "Privacy Policy | Tayseer Innovations",
    description: "Tayseer Innovations privacy policy for website visitors and business contacts."
  }
};

export default function PrivacyPage() {
  return <Privacy />;
}
