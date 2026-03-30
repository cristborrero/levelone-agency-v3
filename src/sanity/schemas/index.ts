import { post } from "./documents/post";
import { category } from "./documents/category";
import { author } from "./documents/author";
import { siteSettings } from "./singletons/siteSettings";
import { seo } from "./objects/seo";

export const schemaTypes = [
  // Documents
  post,
  category,
  author,
  // Singletons
  siteSettings,
  // Objects
  seo,
];
