import BankingSystems from "@/pages/BankingSystems";
import StructuredData from "@/site/StructuredData";
import { buildSolutionMetadata, buildSolutionSchemas } from "@/site/solutionSeo";

export const metadata = buildSolutionMetadata("banking-systems");

export default function BankingSystemsPage() {
  return (
    <>
      <StructuredData data={buildSolutionSchemas("banking-systems")} />
      <BankingSystems />
    </>
  );
}
