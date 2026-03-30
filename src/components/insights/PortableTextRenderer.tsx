import {
  PortableText,
  type PortableTextComponents as PTComponents,
} from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

const components: PTComponents = {
  block: {
    h2: ({ children, value }) => {
      const text =
        value.children
          ?.map((c) => ("text" in c ? (c as { text: string }).text : ""))
          .join("") ?? "";
      const id = slugify(text);
      return (
        <h2
          id={id}
          className="mb-4 mt-12 font-display text-3xl font-bold tracking-[-0.02em] text-brand-white first:mt-0"
        >
          <a href={`#${id}`} className="no-underline hover:underline">
            {children}
          </a>
        </h2>
      );
    },
    h3: ({ children, value }) => {
      const text =
        value.children
          ?.map((c) => ("text" in c ? (c as { text: string }).text : ""))
          .join("") ?? "";
      const id = slugify(text);
      return (
        <h3
          id={id}
          className="mb-3 mt-10 font-display text-2xl font-bold tracking-[-0.01em] text-brand-white"
        >
          <a href={`#${id}`} className="no-underline hover:underline">
            {children}
          </a>
        </h3>
      );
    },
    h4: ({ children }) => (
      <h4 className="mb-3 mt-8 font-display text-xl font-semibold text-brand-white">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mb-6 font-body text-base leading-relaxed text-brand-grey-300">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-2 border-brand-accent pl-6 font-body italic text-brand-grey-300">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-brand-white">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-brand-grey-900/50 px-1.5 py-0.5 font-mono text-sm text-brand-accent">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const href = value?.href || "#";
      const isExternal =
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:");

      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-accent underline underline-offset-2 transition-colors duration-200 hover:text-brand-white"
          >
            {children}
          </a>
        );
      }

      return (
        <Link
          href={href}
          className="text-brand-accent underline underline-offset-2 transition-colors duration-200 hover:text-brand-white"
        >
          {children}
        </Link>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const imageUrl = urlFor(value).width(1200).quality(90).auto("format").url();
      return (
        <figure className="my-10">
          <div className="relative aspect-video overflow-hidden rounded-sm">
            <Image
              src={imageUrl}
              alt={value.alt || "Article image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center font-mono text-xs text-brand-grey-500">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    code: ({ value }) => (
      <pre className="my-8 overflow-x-auto rounded-sm border border-brand-grey-900/50 bg-brand-black-deep p-5">
        <code className="font-mono text-sm leading-relaxed text-brand-grey-300">
          {value.code}
        </code>
      </pre>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 ml-5 list-disc space-y-2 font-body text-base text-brand-grey-300">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 ml-5 list-decimal space-y-2 font-body text-base text-brand-grey-300">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),
  },
};

interface PortableTextRendererProps {
  value: PortableTextBlock[];
}

export function PortableTextRenderer({ value }: PortableTextRendererProps) {
  return <PortableText value={value} components={components} />;
}
