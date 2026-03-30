import type { StructureResolver } from "sanity/structure";
import { CogIcon, FileTextIcon, TagIcon, UserIcon } from "lucide-react";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // ── Singleton: Site Settings ──
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings")
        ),

      S.divider(),

      // ── Editorial ──
      S.listItem()
        .title("Posts")
        .icon(FileTextIcon)
        .child(
          S.documentTypeList("post")
            .title("All Posts")
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
        ),

      S.listItem()
        .title("Categories")
        .icon(TagIcon)
        .child(S.documentTypeList("category").title("Categories")),

      S.listItem()
        .title("Authors")
        .icon(UserIcon)
        .child(S.documentTypeList("author").title("Authors")),
    ]);
