import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { sanityFetch } from "@/sanity/lib/live";
import { POST_BY_SLUG_QUERY, POST_SLUGS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
import type { Post } from "@/sanity/lib/types";
import { PortableTextRenderer } from "@/components/insights/PortableTextRenderer";
import { AuthorCard } from "@/components/insights/AuthorCard";
import { RelatedPosts } from "@/components/insights/RelatedPosts";

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<string[]>(POST_SLUGS_QUERY);
    return (slugs ?? []).map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await sanityFetch({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
    stega: false,
  });
  const post = data as Post | null;

  if (!post) return { title: "Article Not Found" };

  const ogImage = post.seo?.ogImage?.asset?.url
    ? post.seo.ogImage.asset.url
    : post.coverImage?.asset?.url
      ? urlFor(post.coverImage).width(1200).height(630).url()
      : undefined;

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    alternates: { canonical: `/insights/${post.slug.current}` },
    openGraph: {
      type: "article",
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
      authors: [post.author?.name].filter(Boolean) as string[],
    },
  };
}

export default async function InsightArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await sanityFetch({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
  });
  const post = data as Post | null;

  if (!post) notFound();

  const readTime = Math.max(1, post.estimatedReadingTime);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage?.asset?.url
      ? urlFor(post.coverImage).width(1200).height(630).url()
      : undefined,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt,
    author: {
      "@type": "Person",
      name: post.author?.name,
    },
    publisher: {
      "@type": "Organization",
      name: "LevelOne Agency",
      logo: {
        "@type": "ImageObject",
        url: "https://leveloneagency.co.uk/logo.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://leveloneagency.co.uk/insights/${post.slug.current}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="bg-brand-black pb-24 pt-36 lg:pt-44">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          {/* Back link */}
          <Link
            href="/insights"
            className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-brand-grey-500 transition-colors duration-300 hover:text-brand-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} /> Back to
            Insights
          </Link>

          {/* Category badge */}
          {post.category && (
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.15em] text-brand-accent">
              {post.category.title}
            </p>
          )}

          {/* Title */}
          <h1 className="mb-6 font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.95] tracking-[-0.03em] text-brand-white">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="mb-10 flex flex-wrap items-center gap-6">
            {post.author && <AuthorCard author={post.author} />}
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] tracking-[0.08em] text-brand-grey-700">
                {formatDate(post.publishedAt)}
              </span>
              <span className="font-mono text-[10px] tracking-[0.08em] text-brand-grey-700">
                {readTime} min read
              </span>
            </div>
          </div>

          {/* Cover image */}
          {post.coverImage?.asset && (
            <div className="relative mb-12 aspect-video overflow-hidden rounded-sm">
              <Image
                src={urlFor(post.coverImage).width(1400).quality(90).auto("format").url()}
                alt={post.coverImage.alt || post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 720px"
              />
            </div>
          )}

          {/* Body */}
          {post.body && (
            <div className="prose-brand">
              <PortableTextRenderer value={post.body} />
            </div>
          )}

          {/* Related posts */}
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <RelatedPosts posts={post.relatedPosts} />
          )}
        </div>
      </article>
    </>
  );
}
