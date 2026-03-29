"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const POSTS = [
  {
    slug: "why-your-website-is-losing-you-clients",
    category: "Web Strategy",
    title: "Why Your Website Is Losing You Clients (And How to Fix It in 30 Days)",
    excerpt:
      "Most UK business websites were built to look good in a pitch, not to convert visitors into enquiries. Here's the diagnosis and the fix.",
    date: "12 Mar 2026",
    readTime: "5 min read",
  },
  {
    slug: "brand-identity-vs-brand-image",
    category: "Branding",
    title: "Brand Identity vs Brand Image: The £50K Mistake Most SMEs Make",
    excerpt:
      "Identity is what you say about yourself. Image is what the market believes. The gap between them is where money gets left on the table.",
    date: "4 Mar 2026",
    readTime: "7 min read",
  },
  {
    slug: "ai-tools-for-uk-small-business",
    category: "AI & Automation",
    title: "5 AI Tools That Actually Save UK Small Businesses Time in 2026",
    excerpt:
      "Not the hype. Not the press releases. These are the tools we use with clients that produce measurable time savings within the first month.",
    date: "24 Feb 2026",
    readTime: "6 min read",
  },
] as const;

export function InsightsPreview() {
  return (
    <section className="relative bg-brand-black py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16 flex flex-col gap-4 lg:mb-20 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <div className="section-label">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-brand-accent">
                Insights
              </span>
            </div>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-brand-white">
              LATEST THINKING
            </h2>
          </div>
          <Link
            href="/insights"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-brand-grey-300 transition-colors duration-300 hover:text-brand-white"
          >
            All articles
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-px bg-brand-grey-900/25 md:grid-cols-3">
          {POSTS.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                delay: i * 0.1,
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <Link
                href={`/insights/${post.slug}`}
                className="group relative flex h-full flex-col bg-brand-black p-8 transition-colors duration-500 hover:bg-brand-black-mid lg:p-10"
              >
                <div className="accent-line" />
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-accent">
                    {post.category}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.08em] text-brand-grey-700">
                    {post.readTime}
                  </span>
                </div>
                <h3 className="mb-4 font-display text-xl font-bold leading-snug tracking-[-0.01em] text-brand-white">
                  {post.title}
                </h3>
                <p className="mb-8 flex-1 font-body text-sm leading-relaxed text-brand-grey-300">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.08em] text-brand-grey-700">
                    {post.date}
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 text-brand-accent opacity-0 transition-all duration-300 group-hover:opacity-100"
                    strokeWidth={2}
                  />
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
