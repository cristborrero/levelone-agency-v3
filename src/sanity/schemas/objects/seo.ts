import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description: "Override the page title for search engines (max 60 characters).",
      validation: (rule) => rule.max(60).warning("Keep under 60 characters for best SEO results."),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "Brief page summary for search results (max 160 characters).",
      validation: (rule) => rule.max(160).warning("Keep under 160 characters for best SEO results."),
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      description: "Image for social sharing (recommended 1200×630px).",
      options: { hotspot: true },
    }),
  ],
});
