import FahimAI from "@/pages/FahimAI";
import StructuredData from "@/site/StructuredData";
import { buildSolutionMetadata, buildSolutionSchemas } from "@/site/solutionSeo";

export const metadata = buildSolutionMetadata("fahim-ai");

export default function FahimAIPage() {
  return (
    <>
      <StructuredData data={buildSolutionSchemas("fahim-ai")} />
      <FahimAI />
    </>
  );
}
