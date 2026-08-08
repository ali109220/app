import ManagedServices from "@/pages/ManagedServices";
import StructuredData from "@/site/StructuredData";
import { buildSolutionMetadata, buildSolutionSchemas } from "@/site/solutionSeo";

export const metadata = buildSolutionMetadata("managed-services");

export default function ManagedServicesPage() {
  return (
    <>
      <StructuredData data={buildSolutionSchemas("managed-services")} />
      <ManagedServices />
    </>
  );
}
