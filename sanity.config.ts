"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
// Vision tool removed — requires React canary (useEffectEvent)
// Use GROQ playground at sanity.io/manage instead
import { schemaTypes } from "./src/sanity/schemas";
import { structure } from "./src/sanity/structure";
import { resolve } from "./src/sanity/presentation/resolve";

const SINGLETON_TYPES = new Set(["siteSettings"]);

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  name: "levelone-studio",
  title: "LevelOne Agency",
  projectId,
  dataset,

  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      resolve,
    }),

  ],

  schema: {
    types: schemaTypes,
    // Block singletons from "New document" dialog
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },

  document: {
    // Restrict actions on singletons (no create, delete, duplicate)
    actions: (input, context) =>
      SINGLETON_TYPES.has(context.schemaType)
        ? input.filter(
            ({ action }) =>
              action &&
              ["publish", "discardChanges", "restore"].includes(action)
          )
        : input,
  },
});
