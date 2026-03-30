import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { RelatedPost } from "@/sanity/lib/types";

interface RelatedPostsProps {
  posts: RelatedPost[];
}

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-20 border-t border-brand-grey-900/50 pt-16">
      <h2 className="mb-10 font-display text-2xl font-bold uppercase tracking-[-0.02em] text-brand-white">
        Related Articles
      </h2>
      <div className="grid grid-cols-1 gap-px bg-brand-grey-900/25 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/insights/${post.slug.current}`}
            className="group relative flex flex-col bg-brand-black p-8 transition-colors duration-500 hover:bg-brand-black-mid lg:p-10"
          >
            <div className="accent-line" />
            <div className="mb-5 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-accent">
                {post.categoryTitle}
              </span>
              <span className="font-mono text-[10px] tracking-[0.08em] text-brand-grey-700">
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
    </section>
  );
}
