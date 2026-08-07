import type { Metadata } from "next";
import BankingSystems from "@/pages/BankingSystems";

export const metadata: Metadata = {
  title: "Banking Systems",
  description: "Advanced banking hardware and self-service solutions including ATMs, STMs, cash processing, card processing and biometrics.",
  alternates: { canonical: "/solutions/banking-systems" }
};

export default function BankingSystemsPage() {
  return <BankingSystems />;
}
