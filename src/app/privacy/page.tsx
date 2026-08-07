import type { Metadata } from "next";
import { Privacy } from "@/pages/Legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy" }
};

export default function PrivacyPage() {
  return <Privacy />;
}
