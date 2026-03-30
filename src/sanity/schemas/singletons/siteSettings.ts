import { defineField, defineType } from "sanity";
import { CogIcon } from "lucide-react";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
      initialValue: "LevelOne Agency",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Default Meta Description",
      type: "text",
      rows: 3,
      description: "Fallback meta description used when pages don't specify their own.",
    }),
    defineField({
      name: "insightsOverline",
      title: "Insights Overline",
      type: "string",
      initialValue: "Insights",
      description: "Small label above the insights page title.",
    }),
    defineField({
      name: "insightsTitle",
      title: "Insights Page Title",
      type: "string",
      initialValue: "LATEST THINKING",
      description: "Main heading on the insights listing page.",
    }),
    defineField({
      name: "insightsDescription",
      title: "Insights Page Description",
      type: "text",
      rows: 2,
      initialValue: "Practical strategy, design, and technology thinking for UK business owners.",
      description: "Subtitle text on the insights listing page.",
    }),
    defineField({
      name: "seo",
      title: "Default SEO",
      type: "seo",
      description: "Default OG image and meta used as fallback across the site.",
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({
      title: title || "Site Settings",
      subtitle: "Global configuration",
    }),
  },
});
