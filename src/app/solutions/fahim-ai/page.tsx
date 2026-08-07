import type { Metadata } from "next";
import FahimAI from "@/pages/FahimAI";

export const metadata: Metadata = {
  title: "Fahim AI",
  description: "Fahim is Tayseer's agentic AI platform for intelligent onboarding, customer interaction, task execution and business operations.",
  alternates: { canonical: "/solutions/fahim-ai" }
};

export default function FahimAIPage() {
  return <FahimAI />;
}
