import type { Metadata } from "next";
import Home from "@/pages/Home";

export const metadata: Metadata = {
  title: "Tayseer Innovations | AI & Digital Banking Solutions",
  description: "Tayseer Innovations delivers core banking, digital banking, AI, managed services and banking technology solutions across the region.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "Tayseer Innovations | AI & Digital Banking Solutions",
    description: "Future-ready banking technology, AI and digital solutions for financial institutions."
  }
};

export default function HomePage() {
  return <Home />;
}
