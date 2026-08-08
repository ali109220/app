import Solutions from "@/pages/Solutions";
import StructuredData from "@/site/StructuredData";
import { buildSolutionMetadata, buildSolutionsIndexSchemas } from "@/site/solutionSeo";

export const metadata = buildSolutionMetadata("solutions");

export default function SolutionsPage() {
  return (
    <>
      <StructuredData data={buildSolutionsIndexSchemas()} />
      <Solutions />
    </>
  );
}
