import type { Metadata } from "next";
import { Terms } from "@/pages/Legal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  alternates: { canonical: "/terms" }
};

export default function TermsPage() {
  return <Terms />;
}
