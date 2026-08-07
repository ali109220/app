import type { Metadata } from "next";
import CareersClient from "@/next/CareersClient";

export const metadata: Metadata = {
  title: "Careers",
  description: "Explore career opportunities with Tayseer Innovations and help shape intelligent banking and digital solutions across the region.",
  alternates: { canonical: "/careers" }
};

export default function CareersPage() {
  return <CareersClient />;
}
