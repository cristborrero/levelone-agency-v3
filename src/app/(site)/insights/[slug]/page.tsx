import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = { title: "Article" };

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <section className="bg-brand-black pb-24 pt-36 lg:pt-44">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <Link
          href="/insights"
          className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-brand-grey-500 transition-colors duration-300 hover:text-brand-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} /> Back to Insights
        </Link>
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.15em] text-brand-accent">
          Article
        </p>
        <h1 className="mb-8 font-display text-[clamp(2rem,5vw,4rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-brand-white">
          {slug.replace(/-/g, " ").toUpperCase()}
        </h1>
        <p className="mb-10 max-w-xl font-body text-base leading-relaxed text-brand-grey-300">
          Full article coming soon. Subscribe to our monthly digest to be
          notified when new content goes live.
        </p>
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 border border-brand-grey-700 px-8 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-brand-grey-300 transition-all duration-300 hover:border-brand-white hover:text-brand-white"
        >
          All Articles
        </Link>
      </div>
    </section>
  );
}
