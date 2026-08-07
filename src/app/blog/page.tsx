import type { Metadata } from "next";
import Blog from "@/pages/Blog";

export const metadata: Metadata = {
  title: "Blogs and Resources",
  alternates: { canonical: "/blog" }
};

export default function BlogPage() {
  return <Blog />;
}
