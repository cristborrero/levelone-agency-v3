import { z } from "zod";

export type ServiceId =
  | "web_design"
  | "e_commerce"
  | "brand_identity"
  | "digital_marketing"
  | "ai_solutions"
  | "full_package";

export const quoteSchema = z.object({
  // ── Step 1 — Service + inline context ──
  service: z.enum(
    ["web_design", "e_commerce", "brand_identity", "digital_marketing", "ai_solutions", "full_package"],
    { required_error: "Please select a service to continue." }
  ),
  hasWebsite:     z.enum(["yes", "no"]).optional(),
  brandingStatus: z.enum(["not_yet", "logo_only", "logo_with_guidelines", "needs_branding"]).optional(),
  startTimeline:  z.enum(["exploring", "3_to_6_months", "1_to_3_months", "right_away", "finishing"]).optional(),

  // ── Web Design ──
  siteType:    z.enum(["brochure", "interactive", "enterprise"]).optional(),
  webAddons:   z.array(z.string()).default([]),
  pageCount:   z.enum(["up_to_5", "up_to_10", "up_to_20", "up_to_50", "up_to_100"]).optional(),
  copywriting: z.enum(["own_copy", "same_as_current", "new_copy"]).optional(),
  seoInterest: z.enum(["yes", "no"]).optional(),

  // ── E-Commerce ──
  ecommercePlatform: z.enum(["woocommerce_shopify", "custom"]).optional(),
  ecommerceFeatures: z.array(z.string()).default([]),
  productScale:      z.enum(["up_to_50", "up_to_200", "up_to_500", "unlimited"]).optional(),

  // ── Brand Identity ──
  brandPackage:      z.enum(["logo_only", "full_brand", "brand_refresh"]).optional(),
  brandDeliverables: z.array(z.string()).default([]),

  // ── Digital Marketing ──
  marketingChannels: z.array(z.string()).default([]),
  adSpendBudget:     z.enum(["500_1k", "1k_3k", "3k_5k", "5k_plus"]).optional(),
  contentNeeded:     z.enum(["yes", "partial", "no"]).optional(),

  // ── AI Solutions ──
  aiCapabilities: z.array(z.string()).default([]),
  aiIntegrations: z.array(z.string()).default([]),

  // ── Full Package ──
  fullPackagePriority: z.enum(["brand_first", "web_first", "marketing_first", "simultaneous"]).optional(),

  // ── Final Details (shared) ──
  budgetBracket: z.enum(["no_budget", "6_to_10k", "10_to_15k", "15_to_20k", "20_to_30k", "30k_plus", "other"]).optional(),
  fastTrack:     z.enum(["yes", "no"]).optional(),
  name:          z.string().min(2, "Name must be at least 2 characters"),
  email:         z.string().email("Please enter a valid email address"),
  company:       z.string().optional(),
  additionalDetails: z.string().optional(),
  wantsCall: z.enum(["yes", "no"]).optional(),
  phone:     z.string().optional(),
  consent:   z.literal(true, { errorMap: () => ({ message: "You must agree to our privacy policy to continue" }) }),
  calculatedEstimate: z.object({
    min: z.number(),
    max: z.number(),
    type: z.enum(["one-off", "retainer"]),
  }).optional(),
}).superRefine((data, ctx) => {
  const service = data.service;
  
  // Enforce context questions if service requires them
  if (service === "web_design" || service === "e_commerce" || service === "full_package") {
    if (!data.hasWebsite) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["hasWebsite"], message: "Please select if you have a website" });
    }
  }
  if (service === "web_design" || service === "e_commerce" || service === "brand_identity" || service === "full_package") {
    if (!data.brandingStatus) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["brandingStatus"], message: "Please select your branding status" });
    }
  }
  if (!data.startTimeline) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["startTimeline"], message: "Please select when you want to start" });
  }

  // Service specific validations
  if (service === "web_design") {
    if (!data.siteType) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["siteType"], message: "Please select a website type" });
    }
    if (!data.pageCount) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["pageCount"], message: "Please select page count" });
    }
    if (!data.copywriting) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["copywriting"], message: "Please select copywriting preference" });
    }
    if (!data.seoInterest) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["seoInterest"], message: "Please select SEO preference" });
    }
  }

  if (service === "e_commerce") {
    if (!data.ecommercePlatform) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["ecommercePlatform"], message: "Please select store platform" });
    }
    if (!data.productScale) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["productScale"], message: "Please select product scale" });
    }
  }

  if (service === "brand_identity") {
    if (!data.brandPackage) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["brandPackage"], message: "Please select a brand package" });
    }
  }

  if (service === "digital_marketing") {
    if (data.marketingChannels.length === 0) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["marketingChannels"], message: "Please select at least one marketing channel" });
    }
    if (!data.adSpendBudget) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["adSpendBudget"], message: "Please select marketing budget" });
    }
    if (!data.contentNeeded) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["contentNeeded"], message: "Please select content requirement" });
    }
  }

  if (service === "ai_solutions") {
    if (data.aiCapabilities.length === 0) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["aiCapabilities"], message: "Please select at least one capability" });
    }
  }

  if (service === "full_package") {
    if (!data.fullPackagePriority) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["fullPackagePriority"], message: "Please select activation priority" });
    }
  }

  // Phone validation when call is requested
  if (data.wantsCall === "yes" && !data.phone?.trim()) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["phone"], message: "Please provide a phone number for us to call you" });
  }
});

export type QuoteFormData = z.infer<typeof quoteSchema>;
