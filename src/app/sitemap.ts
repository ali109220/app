import type { MetadataRoute } from "next";

const routes = [
  "", "/solutions", "/solutions/core-banking", "/solutions/fahim-ai", "/solutions/mbuke",
  "/solutions/managed-services", "/solutions/banking-systems", "/solutions/software-management-systems",
  "/about", "/connect", "/careers", "/blog", "/privacy", "/terms"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((route) => ({
    url: `https://tayseer.me${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/solutions") ? 0.8 : 0.6
  }));
}
