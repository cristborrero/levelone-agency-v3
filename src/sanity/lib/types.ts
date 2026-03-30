import type { PortableTextBlock } from "@portabletext/types";

// ─── Shared ───────────────────────────────────────────────────────────────────

export interface SanityImage {
  asset: {
    _id: string;
    url: string;
  };
  alt?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface SEOFields {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: {
    asset: {
      _id: string;
      url: string;
    };
  };
}

// ─── Documents ────────────────────────────────────────────────────────────────

export interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
}

export interface Author {
  _id: string;
  name: string;
  role?: string;
  image?: SanityImage;
  bio?: string;
}

export interface PostListItem {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  featured: boolean;
  publishedAt: string;
  categoryTitle: string;
  estimatedReadingTime: number;
  coverImage?: SanityImage;
}

export interface Post extends PostListItem {
  _updatedAt: string;
  body: PortableTextBlock[];
  category: Category;
  author: Author;
  seo?: SEOFields;
  relatedPosts: RelatedPost[];
}

export interface RelatedPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  estimatedReadingTime: number;
  categoryTitle: string;
  coverImage?: SanityImage;
}

// ─── Singletons ───────────────────────────────────────────────────────────────

export interface SiteSettings {
  title: string;
  description?: string;
  insightsOverline?: string;
  insightsTitle?: string;
  insightsDescription?: string;
  seo?: SEOFields;
}
