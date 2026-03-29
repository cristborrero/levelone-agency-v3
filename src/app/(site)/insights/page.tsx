import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Insights",
  description: "Digital strategy, design, and AI insights from LevelOne Agency. Practical thinking for UK business owners.",
  alternates: { canonical: "/insights" },
};

const POSTS = [
  { slug: "why-your-website-is-losing-you-clients", category: "Web Strategy", title: "Why Your Website Is Losing You Clients (And How to Fix It in 30 Days)", excerpt: "Most UK business websites were built to look good in a pitch, not to convert visitors into enquiries. Here's the diagnosis and the fix.", date: "12 Mar 2026", readTime: "5 min", featured: true },
  { slug: "brand-identity-vs-brand-image", category: "Branding", title: "Brand Identity vs Brand Image: The £50K Mistake Most SMEs Make", excerpt: "Identity is what you say about yourself. Image is what the market believes. The gap between them is where money gets left on the table.", date: "4 Mar 2026", readTime: "7 min", featured: false },
  { slug: "ai-tools-for-uk-small-business", category: "AI & Automation", title: "5 AI Tools That Actually Save UK Small Businesses Time in 2026", excerpt: "Not the hype. Not the press releases. These are the tools we use with clients that produce measurable time savings within the first month.", date: "24 Feb 2026", readTime: "6 min", featured: false },
  { slug: "seo-for-surrey-businesses", category: "SEO", title: "Local SEO for Surrey Businesses: A Practical 2026 Guide", excerpt: "Ranking for local searches in Surrey is more achievable than most business owners think. This is what works, based on real client results.", date: "18 Feb 2026", readTime: "8 min", featured: false },
  { slug: "nextjs-vs-wordpress-for-business", category: "Web Strategy", title: "Next.js vs WordPress in 2026: Which Is Right for Your Business?", excerpt: "The honest answer isn't one-size-fits-all. Here's how to decide based on your business needs, not technology fashion.", date: "10 Feb 2026", readTime: "9 min", featured: false },
] as const;

export default function InsightsPage() {
  const featured = POSTS.find((p) => p.featured);
  const rest = POSTS.filter((p) => !p.featured);

  return (
    <>
      <PageHero
        overline="Insights"
        title="LATEST THINKING"
        description="Practical strategy, design, and technology thinking for UK business owners."
      />

      <section className="bg-brand-black py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          {featured && (
            <Link
              href={`/insights/${featured.slug}`}
              className="group relative mb-px flex flex-col bg-brand-black p-10 transition-colors duration-500 hover:bg-brand-black-mid lg:p-16"
            >
              <div className="accent-line" />
              <div className="mb-4 flex items-center gap-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-accent">{featured.category}</span>
                <span className="font-mono text-[10px] tracking-[0.08em] text-brand-grey-700">{featured.date} · {featured.readTime} read</span>
              </div>
              <h2 className="mb-5 max-w-3xl font-display text-[clamp(1.8rem,4vw,3.5rem)] font-bold leading-tight tracking-[-0.02em] text-brand-white">
                {featured.title}
              </h2>
              <p className="mb-6 max-w-2xl font-body text-base leading-relaxed text-brand-grey-300">{featured.excerpt}</p>
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-brand-grey-300 transition-colors duration-300 group-hover:text-brand-white">
                Read article <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
            </Link>
          )}

          <div className="grid grid-cols-1 gap-px bg-brand-grey-900/25 md:grid-cols-2 mt-px">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/insights/${post.slug}`}
                className="group relative flex flex-col bg-brand-black p-8 transition-colors duration-500 hover:bg-brand-black-mid lg:p-10"
              >
                <div className="accent-line" />
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-accent">{post.category}</span>
                  <span className="font-mono text-[10px] text-brand-grey-700">{post.readTime} read</span>
                </div>
                <h3 className="mb-4 font-display text-xl font-bold leading-snug tracking-[-0.01em] text-brand-white">{post.title}</h3>
                <p className="mb-8 flex-1 font-body text-sm leading-relaxed text-brand-grey-300">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.08em] text-brand-grey-700">{post.date}</span>
                  <ArrowUpRight className="h-4 w-4 text-brand-accent opacity-0 transition-all duration-300 group-hover:opacity-100" strokeWidth={2} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
