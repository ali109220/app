import type { Metadata } from "next";
import About from "@/pages/About";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Tayseer Innovations, its mission, values, regional footprint and technology partner ecosystem.",
  alternates: { canonical: "/about" }
};

export default function AboutPage() {
  return <About />;
}
