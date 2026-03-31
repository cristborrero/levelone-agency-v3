// SIN "use client" al inicio

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { schemaTypes } from "./src/sanity/schemas";
import { structure } from "./src/sanity/structure";
import { resolve } from "./src/sanity/presentation/resolve";

const SINGLETON_TYPES = new Set(["siteSettings"]);

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");

const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
if (!dataset) throw new Error("Missing NEXT_PUBLIC_SANITY_DATASET");

export default defineConfig({
  name: "levelone-studio",
  title: "LevelOne Agency",
  projectId,
  dataset,
  basePath: "/studio",    // ← AÑADIR ESTO

  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: "/api/draft-mode/enable",
        },
        origin: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      },
      resolve,
    }),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },

  document: {
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