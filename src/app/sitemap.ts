import type { MetadataRoute } from "next";
import { POSTS } from "@/pages/blogData";
import { SITE_URL } from "@/lib/site";
export const dynamic = "force-static";

const staticRoutes = [
  { path: "", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/solutions", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/solutions/core-banking", changeFrequency: "monthly" as const, priority: 0.85 },
  { path: "/solutions/fahim-ai", changeFrequency: "monthly" as const, priority: 0.85 },
  { path: "/solutions/mbuke", changeFrequency: "monthly" as const, priority: 0.85 },
  { path: "/solutions/managed-services", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/solutions/banking-systems", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/solutions/software-management-systems", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/connect", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/careers", changeFrequency: "weekly" as const, priority: 0.6 },
  { path: "/blog", changeFrequency: "weekly" as const, priority: 0.75 },
  { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.2 },
  { path: "/terms", changeFrequency: "yearly" as const, priority: 0.2 }
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));

  const articleEntries: MetadataRoute.Sitemap = POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.65
  }));

  return [...staticEntries, ...articleEntries];
}
