import type { MetadataRoute } from "next";
import { groq } from "next-sanity";
import { createClient } from "next-sanity";

const BASE = "https://leveloneagency.co.uk";

const SITEMAP_POSTS_QUERY = groq`
  *[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
    "slug": slug.current,
    "lastModified": _updatedAt
  }
`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  // Fetch dynamic insight posts from Sanity
  let insightEntries: MetadataRoute.Sitemap = [];
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
    if (projectId && dataset) {
      const sitemapClient = createClient({
        projectId,
        dataset,
        apiVersion: "2026-03-30",
        useCdn: true,
      });
      const posts: Array<{ slug: string; lastModified: string }> =
        await sitemapClient.fetch(SITEMAP_POSTS_QUERY);

      insightEntries = posts.map((post) => ({
        url: `${BASE}/insights/${post.slug}`,
        lastModified: post.lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
    }
  } catch {
    // Silently fail — static sitemap still works without Sanity
  }

  return [...staticRoutes, ...caseStudies, ...insightEntries];
}
