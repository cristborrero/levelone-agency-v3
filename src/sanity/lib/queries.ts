import { defineQuery } from "next-sanity";

// ─── Insights Listing Page ────────────────────────────────────────────────────
export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featured,
    publishedAt,
    "categoryTitle": category->title,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200),
    coverImage {
      asset->{_id, url},
      alt,
      hotspot
    }
  }
`);

// ─── Static Params ────────────────────────────────────────────────────────────
export const POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(publishedAt)].slug.current
`);

// ─── Single Post by Slug ──────────────────────────────────────────────────────
export const POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    _updatedAt,
    title,
    slug,
    excerpt,
    publishedAt,
    featured,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200),
    body,
    coverImage {
      asset->{_id, url},
      alt,
      hotspot
    },
    category->{
      _id,
      title,
      slug
    },
    author->{
      _id,
      name,
      role,
      image {
        asset->{_id, url},
        hotspot
      },
      bio
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage {
        asset->{_id, url}
      }
    },
    "relatedPosts": *[
      _type == "post"
      && slug.current != $slug
      && category._ref == ^.category._ref
      && defined(publishedAt)
    ] | order(publishedAt desc) [0...3] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200),
      "categoryTitle": category->title,
      coverImage {
        asset->{_id, url},
        alt,
        hotspot
      }
    }
  }
`);

// ─── Homepage Preview (Latest 3) ─────────────────────────────────────────────
export const LATEST_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(publishedAt)] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "categoryTitle": category->title,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200)
  }
`);

// ─── Site Settings ────────────────────────────────────────────────────────────
export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_id == "siteSettings"][0] {
    title,
    description,
    insightsOverline,
    insightsTitle,
    insightsDescription,
    seo {
      metaTitle,
      metaDescription,
      ogImage {
        asset->{_id, url}
      }
    }
  }
`);

// ─── Sitemap ──────────────────────────────────────────────────────────────────
export const ALL_POST_SLUGS_WITH_DATES = defineQuery(`
  *[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
    "slug": slug.current,
    "lastModified": _updatedAt
  }
`);
