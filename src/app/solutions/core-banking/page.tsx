import type { Metadata } from "next";
import CoreBanking from "@/pages/CoreBanking";

export const metadata: Metadata = {
  title: "Core Banking",
  description: "Modern core banking capabilities for payments, remittance, consumer banking, security, analytics, financial management and treasury.",
  alternates: { canonical: "/solutions/core-banking" }
};

export default function CoreBankingPage() {
  return <CoreBanking />;
}
