import CoreBanking from "@/pages/CoreBanking";
import StructuredData from "@/site/StructuredData";
import { buildSolutionMetadata, buildSolutionSchemas } from "@/site/solutionSeo";

export const metadata = buildSolutionMetadata("core-banking");

export default function CoreBankingPage() {
  return (
    <>
      <StructuredData data={buildSolutionSchemas("core-banking")} />
      <CoreBanking />
    </>
  );
}
