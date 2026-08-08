import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticle from "@/pages/BlogArticle";
import { getPost, POSTS } from "@/pages/blogData";
import StructuredData from "@/site/StructuredData";

const siteUrl = "https://tayseer.me";

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article Not Found", robots: { index: false, follow: false } };

  const description = post.excerpt.trim().replace(/,$/, ".");
  const publishedTime = new Date(post.date).toISOString();

  return {
    title: post.title,
    description,
    authors: [{ name: "Tayseer Innovations" }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `/blog/${post.slug}`,
      siteName: "Tayseer Innovations",
      title: post.title,
      description,
      publishedTime,
      authors: ["Tayseer Innovations"],
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: post.title }]
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: ["/opengraph-image"]
    }
  };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const articleUrl = `${siteUrl}/blog/${post.slug}`;
  const publishedTime = new Date(post.date).toISOString();
  const description = post.excerpt.trim().replace(/,$/, ".");

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${articleUrl}#article`,
    headline: post.title,
    description,
    datePublished: publishedTime,
    dateModified: publishedTime,
    mainEntityOfPage: articleUrl,
    author: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "Tayseer Innovations" },
    publisher: { "@id": `${siteUrl}/#organization` },
    image: `${siteUrl}/opengraph-image`,
    inLanguage: "en"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: articleUrl }
    ]
  };

  return (
    <>
      <StructuredData data={[articleSchema, breadcrumbSchema]} />
      <BlogArticle slug={slug} />
    </>
  );
}
