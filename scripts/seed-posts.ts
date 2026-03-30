/**
 * Seed script — migrates the 5 hardcoded insight posts into Sanity.
 *
 * Usage:
 *   npx tsx scripts/seed-posts.ts
 *
 * Requires:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_WRITE_TOKEN   (token with Editor / write access)
 */

import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    "❌  Missing env vars. Ensure NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_API_WRITE_TOKEN are set in .env.local"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-03-30",
  useCdn: false,
});

// ─── Categories ──────────────────────────────────────────────────────────────

interface CategorySeed {
  _id: string;
  _type: "category";
  title: string;
  slug: { _type: "slug"; current: string };
  description: string;
}

const categories: CategorySeed[] = [
  {
    _id: "category-web-strategy",
    _type: "category",
    title: "Web Strategy",
    slug: { _type: "slug", current: "web-strategy" },
    description: "Digital strategy, conversion optimisation, and web architecture insights.",
  },
  {
    _id: "category-branding",
    _type: "category",
    title: "Branding",
    slug: { _type: "slug", current: "branding" },
    description: "Brand identity, positioning, and visual communication expertise.",
  },
  {
    _id: "category-ai-automation",
    _type: "category",
    title: "AI & Automation",
    slug: { _type: "slug", current: "ai-automation" },
    description: "Practical AI tools and automation strategies for UK businesses.",
  },
  {
    _id: "category-seo",
    _type: "category",
    title: "SEO",
    slug: { _type: "slug", current: "seo" },
    description: "Search engine optimisation, local SEO, and organic growth strategies.",
  },
];

// ─── Author ──────────────────────────────────────────────────────────────────

const author = {
  _id: "author-levelone",
  _type: "author" as const,
  name: "LevelOne Agency",
  role: "Digital Strategy Team",
};

// ─── Posts ────────────────────────────────────────────────────────────────────

interface PostSeed {
  _type: "post";
  title: string;
  slug: { _type: "slug"; current: string };
  excerpt: string;
  publishedAt: string;
  featured: boolean;
  category: { _type: "reference"; _ref: string };
  author: { _type: "reference"; _ref: string };
  body: Array<{
    _type: "block";
    _key: string;
    style: string;
    markDefs: never[];
    children: Array<{ _type: "span"; _key: string; text: string; marks: never[] }>;
  }>;
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
}

function makeBlock(
  text: string,
  style: "normal" | "h2" = "normal",
  key: string
): PostSeed["body"][number] {
  return {
    _type: "block",
    _key: key,
    style,
    markDefs: [],
    children: [{ _type: "span", _key: `${key}-s`, text, marks: [] }],
  };
}

const posts: PostSeed[] = [
  {
    _type: "post",
    title: "Why Your Website Is Losing You Clients (And How to Fix It in 30 Days)",
    slug: { _type: "slug", current: "why-your-website-is-losing-you-clients" },
    excerpt:
      "Most UK business websites were built to look good in a pitch, not to convert visitors into enquiries. Here's the diagnosis and the fix.",
    publishedAt: "2026-03-12T09:00:00Z",
    featured: true,
    category: { _type: "reference", _ref: "category-web-strategy" },
    author: { _type: "reference", _ref: "author-levelone" },
    body: [
      makeBlock("The hidden cost of a pretty but broken website", "h2", "b1"),
      makeBlock(
        "Most business websites in the UK were designed to impress stakeholders at the approval stage, not to convert the people who actually land on them. The result? Beautiful portfolios that haemorrhage potential clients every single day.",
        "normal",
        "b2"
      ),
      makeBlock("What a conversion-ready website actually looks like", "h2", "b3"),
      makeBlock(
        "A website that converts has three things: a clear value proposition above the fold, an obvious next step on every page, and social proof that removes friction. Most agency sites fail on at least two of these.",
        "normal",
        "b4"
      ),
      makeBlock("The 30-day fix", "h2", "b5"),
      makeBlock(
        "Start with analytics. Identify where users drop off, fix those three pages first, add a single clear CTA, and measure for 14 days before making more changes. Small, data-driven tweaks always beat redesigns.",
        "normal",
        "b6"
      ),
    ],
    seo: {
      metaTitle: "Why Your Website Is Losing You Clients | LevelOne Agency",
      metaDescription:
        "Discover why most UK business websites fail to convert — and a practical 30-day plan to fix the most common issues.",
    },
  },
  {
    _type: "post",
    title: "Brand Identity vs Brand Image: The £50K Mistake Most SMEs Make",
    slug: { _type: "slug", current: "brand-identity-vs-brand-image" },
    excerpt:
      "Identity is what you say about yourself. Image is what the market believes. The gap between them is where money gets left on the table.",
    publishedAt: "2026-03-04T09:00:00Z",
    featured: false,
    category: { _type: "reference", _ref: "category-branding" },
    author: { _type: "reference", _ref: "author-levelone" },
    body: [
      makeBlock("Understanding the identity–image gap", "h2", "c1"),
      makeBlock(
        "Brand identity is the intentional set of signals you create: logo, tone, values, visual system. Brand image is what the market actually perceives. When these two diverge, you are spending money reinforcing the wrong message.",
        "normal",
        "c2"
      ),
      makeBlock("Why SMEs are most vulnerable", "h2", "c3"),
      makeBlock(
        "Large enterprises have brand managers tracking perception. SMEs typically set their brand once and forget it. Over three to five years, market context shifts while the brand stands still — creating a costly gap.",
        "normal",
        "c4"
      ),
      makeBlock("Closing the gap", "h2", "c5"),
      makeBlock(
        "Run an annual brand audit: survey 10 clients, compare their language to your website copy, and align the two. This single exercise saves more than any rebrand.",
        "normal",
        "c6"
      ),
    ],
    seo: {
      metaTitle: "Brand Identity vs Brand Image | LevelOne Agency",
      metaDescription:
        "Learn the difference between brand identity and brand image — and why ignoring the gap costs UK SMEs tens of thousands.",
    },
  },
  {
    _type: "post",
    title: "5 AI Tools That Actually Save UK Small Businesses Time in 2026",
    slug: { _type: "slug", current: "ai-tools-for-uk-small-business" },
    excerpt:
      "Not the hype. Not the press releases. These are the tools we use with clients that produce measurable time savings within the first month.",
    publishedAt: "2026-02-24T09:00:00Z",
    featured: false,
    category: { _type: "reference", _ref: "category-ai-automation" },
    author: { _type: "reference", _ref: "author-levelone" },
    body: [
      makeBlock("Cutting through the AI noise", "h2", "d1"),
      makeBlock(
        "Every week there's a new AI tool promising to revolutionise your business. The reality is that 90% of them solve problems you don't have. Here are the five that our UK clients actually use daily.",
        "normal",
        "d2"
      ),
      makeBlock("The tools that deliver", "h2", "d3"),
      makeBlock(
        "From AI-powered email triage to automated invoice processing, we've tested dozens and narrowed it down to the five with the fastest time-to-value for small teams. Each one pays for itself within the first month.",
        "normal",
        "d4"
      ),
      makeBlock("How to evaluate an AI tool", "h2", "d5"),
      makeBlock(
        "Before adopting any AI tool, ask three questions: Does it integrate with my existing stack? Can I measure time saved? Is the data handling GDPR-compliant? If any answer is no, move on.",
        "normal",
        "d6"
      ),
    ],
    seo: {
      metaTitle: "5 AI Tools for UK Small Businesses in 2026 | LevelOne Agency",
      metaDescription:
        "Practical, tested AI tools that save UK small businesses real time — no hype, just results from our client work.",
    },
  },
  {
    _type: "post",
    title: "Local SEO for Surrey Businesses: A Practical 2026 Guide",
    slug: { _type: "slug", current: "seo-for-surrey-businesses" },
    excerpt:
      "Ranking for local searches in Surrey is more achievable than most business owners think. This is what works, based on real client results.",
    publishedAt: "2026-02-18T09:00:00Z",
    featured: false,
    category: { _type: "reference", _ref: "category-seo" },
    author: { _type: "reference", _ref: "author-levelone" },
    body: [
      makeBlock("Why local SEO matters more than ever", "h2", "e1"),
      makeBlock(
        "Google's local pack drives over 40% of clicks for service-based searches. If you're a Surrey business not appearing in the top three map results, you are invisible to your highest-intent audience.",
        "normal",
        "e2"
      ),
      makeBlock("The fundamentals that move the needle", "h2", "e3"),
      makeBlock(
        "Google Business Profile optimisation, consistent NAP citations, and locally-relevant content are the three pillars. Get these right before spending a penny on ads.",
        "normal",
        "e4"
      ),
      makeBlock("Advanced tactics for competitive niches", "h2", "e5"),
      makeBlock(
        "For competitive sectors like legal, dental, or property, build location-specific landing pages, earn links from local publications, and use schema markup for your service areas.",
        "normal",
        "e6"
      ),
    ],
    seo: {
      metaTitle: "Local SEO for Surrey Businesses 2026 | LevelOne Agency",
      metaDescription:
        "A practical guide to local SEO for Surrey businesses. Based on real results, not theory.",
    },
  },
  {
    _type: "post",
    title: "Next.js vs WordPress in 2026: Which Is Right for Your Business?",
    slug: { _type: "slug", current: "nextjs-vs-wordpress-for-business" },
    excerpt:
      "The honest answer isn't one-size-fits-all. Here's how to decide based on your business needs, not technology fashion.",
    publishedAt: "2026-02-10T09:00:00Z",
    featured: false,
    category: { _type: "reference", _ref: "category-web-strategy" },
    author: { _type: "reference", _ref: "author-levelone" },
    body: [
      makeBlock("The real question isn't which is better", "h2", "f1"),
      makeBlock(
        "WordPress powers 40% of the web. Next.js is the fastest-growing framework. But the right choice depends on your team, your budget, and your growth trajectory — not which technology is trending on Twitter.",
        "normal",
        "f2"
      ),
      makeBlock("When WordPress wins", "h2", "f3"),
      makeBlock(
        "If you need a content-heavy site, your team includes non-technical editors, and you want access to thousands of plugins, WordPress is still the pragmatic choice. It's mature, well-supported, and fast enough for most use cases.",
        "normal",
        "f4"
      ),
      makeBlock("When Next.js wins", "h2", "f5"),
      makeBlock(
        "If you need blazing performance, a custom user experience, tight integrations with modern APIs, and you have developer support available, Next.js gives you an edge that WordPress can't match.",
        "normal",
        "f6"
      ),
    ],
    seo: {
      metaTitle: "Next.js vs WordPress 2026 | LevelOne Agency",
      metaDescription:
        "An honest comparison of Next.js and WordPress for UK businesses. No bias, just practical decision criteria.",
    },
  },
];

// ─── Site Settings singleton ─────────────────────────────────────────────────

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings" as const,
  title: "LevelOne Agency",
  description: "Premium digital agency based in Surrey, UK.",
  insightsOverline: "Insights",
  insightsTitle: "LATEST THINKING",
  insightsDescription:
    "Practical strategy, design, and technology thinking for UK business owners.",
  seo: {
    metaTitle: "Insights | LevelOne Agency",
    metaDescription:
      "Digital strategy, design, and AI insights from LevelOne Agency. Practical thinking for UK business owners.",
  },
};

// ─── Execute ─────────────────────────────────────────────────────────────────

async function seed() {
  console.log("🌱 Starting Sanity seed…\n");

  const tx = client.transaction();

  // Categories
  for (const cat of categories) {
    tx.createOrReplace(cat);
    console.log(`  📁 Category: ${cat.title}`);
  }

  // Author
  tx.createOrReplace(author);
  console.log(`  👤 Author: ${author.name}`);

  // Posts
  for (const post of posts) {
    tx.create(post);
    console.log(`  📝 Post: ${post.title.slice(0, 50)}…`);
  }

  // Site Settings
  tx.createOrReplace(siteSettings);
  console.log(`  ⚙️  Site Settings`);

  console.log("\n⏳ Committing transaction…");
  const result = await tx.commit();
  console.log(`\n✅ Seed complete! ${result.results.length} documents created/updated.`);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});
