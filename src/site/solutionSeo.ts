import type { Metadata } from "next";

const siteUrl = "https://tayseer.me";
const socialImage = "/opengraph-image";

export type SolutionSeoKey =
  | "solutions"
  | "core-banking"
  | "fahim-ai"
  | "mbuke"
  | "managed-services"
  | "banking-systems"
  | "software-management-systems";

type SolutionSeo = {
  name: string;
  title: string;
  description: string;
  path: string;
  serviceType?: string;
  keywords: string[];
};

export const solutionSeo: Record<SolutionSeoKey, SolutionSeo> = {
  solutions: {
    name: "Banking & FinTech Solutions",
    title: "Banking & FinTech Solutions",
    description: "Explore Tayseer Innovations' core banking, digital banking, AI, managed services, banking systems and financial technology solutions for institutions across the Middle East.",
    path: "/solutions",
    keywords: ["banking solutions", "FinTech solutions", "digital banking solutions", "banking technology", "financial technology"]
  },
  "core-banking": {
    name: "Core Banking Platform",
    title: "Enterprise Core Banking Platform",
    description: "Modernize banking operations with Tayseer Innovations' enterprise core banking capabilities for payments, remittance, consumer banking, treasury, analytics and financial management.",
    path: "/solutions/core-banking",
    serviceType: "Core Banking Platform",
    keywords: ["core banking platform", "core banking software", "banking platform", "banking modernization", "banking transformation"]
  },
  "fahim-ai": {
    name: "Fahim AI",
    title: "Fahim AI — Agentic AI for Banking & Business",
    description: "Fahim AI is Tayseer Innovations' agentic AI platform for intelligent onboarding, customer engagement, task execution and operational automation across banking and enterprise workflows.",
    path: "/solutions/fahim-ai",
    serviceType: "Agentic AI Platform",
    keywords: ["AI for banking", "agentic AI", "banking AI", "AI customer engagement", "financial services AI"]
  },
  mbuke: {
    name: "MBuke Digital Banking",
    title: "MBuke White-Label Digital Banking Platform",
    description: "Launch modern digital banking experiences with MBuke, Tayseer Innovations' white-label platform for onboarding, payments, transfers, analytics, agent banking and offline access.",
    path: "/solutions/mbuke",
    serviceType: "Digital Banking Platform",
    keywords: ["digital banking platform", "white label mobile banking", "mobile banking platform", "agent banking", "digital banking solution"]
  },
  "managed-services": {
    name: "Managed Technology Services",
    title: "Managed Banking & Technology Services",
    description: "Strengthen banking technology operations with managed services for Temenos T24, cloud infrastructure, cybersecurity, big data, ATM and self-service environments.",
    path: "/solutions/managed-services",
    serviceType: "Managed Technology Services",
    keywords: ["managed banking services", "Temenos T24 services", "banking managed services", "cloud managed services", "banking IT services"]
  },
  "banking-systems": {
    name: "Banking Systems",
    title: "Banking Systems & Self-Service Technology",
    description: "Modernize branch and self-service operations with banking systems for ATMs, STMs, cash processing, card processing, biometrics and intelligent banking hardware.",
    path: "/solutions/banking-systems",
    serviceType: "Banking Systems Integration",
    keywords: ["banking systems", "ATM solutions", "self service banking", "banking hardware", "banking systems integration"]
  },
  "software-management-systems": {
    name: "Software Management Systems",
    title: "Software Engineering & Management Systems",
    description: "Improve software delivery with Tayseer Innovations' engineering capabilities across APIs, CI/CD, version control, authorization, development tooling and log management.",
    path: "/solutions/software-management-systems",
    serviceType: "Software Engineering Services",
    keywords: ["software management systems", "banking software development", "API development", "CI/CD services", "enterprise software engineering"]
  }
};

export function buildSolutionMetadata(key: SolutionSeoKey): Metadata {
  const item = solutionSeo[key];
  return {
    title: item.title,
    description: item.description,
    keywords: item.keywords,
    alternates: { canonical: item.path },
    openGraph: {
      type: "website",
      url: item.path,
      siteName: "Tayseer Innovations",
      title: `${item.title} | Tayseer Innovations`,
      description: item.description,
      images: [{ url: socialImage, width: 1200, height: 630, alt: `${item.name} — Tayseer Innovations` }]
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.title} | Tayseer Innovations`,
      description: item.description,
      images: [socialImage]
    }
  };
}

export function buildSolutionSchemas(key: Exclude<SolutionSeoKey, "solutions">) {
  const item = solutionSeo[key];
  const pageUrl = `${siteUrl}${item.path}`;
  const pageId = `${pageUrl}#webpage`;
  const serviceId = `${pageUrl}#service`;

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": pageId,
    url: pageUrl,
    name: item.title,
    description: item.description,
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": serviceId },
    breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    inLanguage: "en"
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": serviceId,
    name: item.name,
    serviceType: item.serviceType,
    description: item.description,
    url: pageUrl,
    mainEntityOfPage: { "@id": pageId },
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: ["Saudi Arabia", "United Arab Emirates", "Middle East"],
    category: "Financial Technology",
    audience: { "@type": "BusinessAudience", audienceType: "Financial institutions and enterprise technology teams" }
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Solutions", item: `${siteUrl}/solutions` },
      { "@type": "ListItem", position: 3, name: item.name, item: pageUrl }
    ]
  };

  return [webPage, service, breadcrumb];
}

export function buildSolutionsIndexSchemas() {
  const items = Object.entries(solutionSeo)
    .filter(([key]) => key !== "solutions")
    .map(([, item], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: `${siteUrl}${item.path}`
    }));

  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${siteUrl}/solutions#page`,
      url: `${siteUrl}/solutions`,
      name: solutionSeo.solutions.name,
      description: solutionSeo.solutions.description,
      isPartOf: { "@id": `${siteUrl}/#website` }
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Tayseer Innovations Solutions",
      itemListElement: items
    }
  ];
}
