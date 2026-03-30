import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { PostListItem, SiteSettings } from "@/sanity/lib/types";

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { data: settings } = await sanityFetch({
      query: SITE_SETTINGS_QUERY,
      stega: false,
    });
    const s = settings as SiteSettings | null;

    return {
      title: s?.seo?.metaTitle || "Insights",
      description:
        s?.seo?.metaDescription ||
        "Digital strategy, design, and AI insights from LevelOne Agency. Practical thinking for UK business owners.",
      alternates: { canonical: "/insights" },
    };
  } catch {
    return {
      title: "Insights",
      description:
        "Digital strategy, design, and AI insights from LevelOne Agency. Practical thinking for UK business owners.",
      alternates: { canonical: "/insights" },
    };
  }
}

export default async function InsightsPage() {
  let posts: PostListItem[] = [];
  let settings: SiteSettings | null = null;

  try {
    const [{ data: postsData }, { data: settingsData }] = await Promise.all([
      sanityFetch({ query: POSTS_QUERY }),
      sanityFetch({ query: SITE_SETTINGS_QUERY }),
    ]);
    posts = (postsData ?? []) as PostListItem[];
    settings = settingsData as SiteSettings | null;
  } catch {
    // Sanity not configured yet — render with default data
  }

  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p._id !== featured?._id);

  return (
    <>
      <PageHero
        overline={settings?.insightsOverline ?? "Insights"}
        title={settings?.insightsTitle ?? "LATEST THINKING"}
        description={
          settings?.insightsDescription ??
          "Practical strategy, design, and technology thinking for UK business owners."
        }
      />

      <section className="bg-brand-black py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          {featured && (
            <Link
              href={`/insights/${featured.slug.current}`}
              className="group relative mb-px flex flex-col bg-brand-black p-10 transition-colors duration-500 hover:bg-brand-black-mid lg:p-16"
            >
              <div className="accent-line" />
              <div className="mb-4 flex items-center gap-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-accent">
                  {featured.categoryTitle}
                </span>
                <span className="font-mono text-[10px] tracking-[0.08em] text-brand-grey-700">
                  {formatDate(featured.publishedAt)} ·{" "}
                  {Math.max(1, featured.estimatedReadingTime)} min read
                </span>
              </div>
              <h2 className="mb-5 max-w-3xl font-display text-[clamp(1.8rem,4vw,3.5rem)] font-bold leading-tight tracking-[-0.02em] text-brand-white">
                {featured.title}
              </h2>
              <p className="mb-6 max-w-2xl font-body text-base leading-relaxed text-brand-grey-300">
                {featured.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-brand-grey-300 transition-colors duration-300 group-hover:text-brand-white">
                Read article{" "}
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
            </Link>
          )}

          <div className="mt-px grid grid-cols-1 gap-px bg-brand-grey-900/25 md:grid-cols-2">
            {rest.map((post) => (
              <Link
                key={post._id}
                href={`/insights/${post.slug.current}`}
                className="group relative flex flex-col bg-brand-black p-8 transition-colors duration-500 hover:bg-brand-black-mid lg:p-10"
              >
                <div className="accent-line" />
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-accent">
                    {post.categoryTitle}
                  </span>
                  <span className="font-mono text-[10px] text-brand-grey-700">
                    {Math.max(1, post.estimatedReadingTime)} min read
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
                    {formatDate(post.publishedAt)}
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 text-brand-accent opacity-0 transition-all duration-300 group-hover:opacity-100"
                    strokeWidth={2}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
