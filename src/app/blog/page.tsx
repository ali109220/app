import type { Metadata } from "next";
import Blog from "@/pages/Blog";
import { POSTS } from "@/pages/blogData";
import StructuredData from "@/site/StructuredData";

const siteUrl = "https://tayseer.me";

export const metadata: Metadata = {
  title: "FinTech, AI & Digital Banking Insights",
  description: "Explore Tayseer Innovations insights on FinTech, open banking, AI, digital banking and financial technology trends across the UAE, Saudi Arabia and the Middle East.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "/blog",
    title: "FinTech, AI & Digital Banking Insights | Tayseer Innovations",
    description: "Insights on FinTech, open banking, AI and digital banking across the Middle East.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Tayseer Innovations insights" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "FinTech, AI & Digital Banking Insights | Tayseer Innovations",
    description: "Insights on FinTech, open banking, AI and digital banking across the Middle East.",
    images: ["/opengraph-image"]
  }
};

export default function BlogPage() {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteUrl}/blog#collection`,
    name: "Tayseer Innovations Blog",
    url: `${siteUrl}/blog`,
    description: metadata.description,
    isPartOf: { "@id": `${siteUrl}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: POSTS.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteUrl}/blog/${post.slug}`,
        name: post.title
      }))
    }
  };

  return (
    <>
      <StructuredData data={blogSchema} />
      <Blog />
    </>
  );
}
