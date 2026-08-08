import SoftwareManagementSystems from "@/pages/SoftwareManagementSystems";
import StructuredData from "@/site/StructuredData";
import { buildSolutionMetadata, buildSolutionSchemas } from "@/site/solutionSeo";

export const metadata = buildSolutionMetadata("software-management-systems");

export default function SoftwareManagementSystemsPage() {
  return (
    <>
      <StructuredData data={buildSolutionSchemas("software-management-systems")} />
      <SoftwareManagementSystems />
    </>
  );
}
