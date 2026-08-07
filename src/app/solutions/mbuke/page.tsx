import type { Metadata } from "next";
import MBuke from "@/pages/MBuke";

export const metadata: Metadata = {
  title: "MBuke",
  description: "MBuke is Tayseer's white-label mobile banking platform for onboarding, payments, transfers, analytics, agent banking and offline access.",
  alternates: { canonical: "/solutions/mbuke" }
};

export default function MBukePage() {
  return <MBuke />;
}
