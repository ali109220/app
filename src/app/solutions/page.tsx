import type { Metadata } from "next";
import Solutions from "@/pages/Solutions";

export const metadata: Metadata = {
  title: "Solutions",
  description: "Explore Tayseer Innovations solutions across core banking, AI, digital banking, managed services and banking systems.",
  alternates: { canonical: "/solutions" }
};

export default function SolutionsPage() {
  return <Solutions />;
}
