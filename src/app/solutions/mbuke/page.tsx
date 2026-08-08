import MBuke from "@/pages/MBuke";
import StructuredData from "@/site/StructuredData";
import { buildSolutionMetadata, buildSolutionSchemas } from "@/site/solutionSeo";

export const metadata = buildSolutionMetadata("mbuke");

export default function MBukePage() {
  return (
    <>
      <StructuredData data={buildSolutionSchemas("mbuke")} />
      <MBuke />
    </>
  );
}
