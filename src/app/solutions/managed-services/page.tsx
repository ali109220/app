import type { Metadata } from "next";
import ManagedServices from "@/pages/ManagedServices";

export const metadata: Metadata = {
  title: "Managed Services",
  description: "Managed technology services for Temenos T24, big data, security, ATM and STM operations, and cloud infrastructure.",
  alternates: { canonical: "/solutions/managed-services" }
};

export default function ManagedServicesPage() {
  return <ManagedServices />;
}
