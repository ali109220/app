import type { Metadata } from "next";
import SoftwareManagementSystems from "@/pages/SoftwareManagementSystems";

export const metadata: Metadata = {
  title: "Software Management Systems",
  description: "Software management capabilities covering version control, development tools, APIs, log management, authorization and CI/CD.",
  alternates: { canonical: "/solutions/software-management-systems" }
};

export default function SoftwareManagementSystemsPage() {
  return <SoftwareManagementSystems />;
}
