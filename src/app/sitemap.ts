import type { MetadataRoute } from "next";

const BASE = "https://leveloneagency.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticRoutes = [
    "",
    "/services",
    "/services/web-design",
    "/services/brand-identity",
    "/services/digital-marketing",
    "/services/ai-solutions",
    "/work",
    "/about",
    "/insights",
    "/contact",
    "/get-a-quote",
  ].map((route) => ({
    url: `${BASE}${route}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : route.startsWith("/services") ? 0.9 : 0.8,
  }));

  const caseStudies = [
    "meridian-finance",
    "volta-energy",
    "novatech-ai",
  ].map((slug) => ({
    url: `${BASE}/work/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...caseStudies];
}
