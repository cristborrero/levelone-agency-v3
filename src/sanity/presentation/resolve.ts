import { defineLocations } from "sanity/presentation";

export const resolve = {
  locations: {
    post: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Untitled",
            href: `/insights/${doc?.slug}`,
          },
          {
            title: "All Insights",
            href: "/insights",
          },
        ],
      }),
    }),
    siteSettings: defineLocations({
      message: "This document is used on all pages",
      tone: "caution",
    }),
  },
};
