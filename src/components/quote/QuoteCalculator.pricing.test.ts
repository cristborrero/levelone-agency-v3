import { describe, expect, it } from "vitest";
import {
  calcAiSolutions,
  calcBrandIdentity,
  calcDigitalMarketing,
  calcEcommerce,
  calcFullPackage,
  calcWebDesign,
  calculateEstimate,
} from "./QuoteCalculator";

/**
 * Pure pricing-logic tests for the quote calculator. These functions
 * determine the price a real prospect sees, so precision matters — exact
 * numbers, not just "returns something truthy."
 */

describe("calcWebDesign", () => {
  it("uses the base range for the selected site type, with no addons/pages/copy/seo", () => {
    const result = calcWebDesign({ siteType: "brochure" });

    expect(result).toEqual({ min: 1200, max: 2500, type: "one-off" });
  });

  it("sums the cost of each selected addon", () => {
    const result = calcWebDesign({ siteType: "brochure", webAddons: ["blog", "newsletter"] });

    // brochure (1200/2500) + blog (300/700) + newsletter (200/500)
    expect(result).toEqual({ min: 1700, max: 3700, type: "one-off" });
  });

  it("silently ignores an addon id that isn't in the price table", () => {
    const result = calcWebDesign({ siteType: "brochure", webAddons: ["not-a-real-addon"] });

    expect(result).toEqual({ min: 1200, max: 2500, type: "one-off" });
  });

  it("adds the page-count tier on top of the base", () => {
    const result = calcWebDesign({ siteType: "brochure", pageCount: "up_to_20" });

    // brochure (1200/2500) + up_to_20 (600/1200)
    expect(result).toEqual({ min: 1800, max: 3700, type: "one-off" });
  });

  it("adds a flat amount for new copywriting, but not for reusing existing copy", () => {
    const withNewCopy = calcWebDesign({ siteType: "brochure", copywriting: "new_copy" });
    const withOwnCopy = calcWebDesign({ siteType: "brochure", copywriting: "own_copy" });

    expect(withNewCopy).toEqual({ min: 1800, max: 4000, type: "one-off" });
    expect(withOwnCopy).toEqual({ min: 1200, max: 2500, type: "one-off" });
  });

  it("adds a flat amount for SEO interest", () => {
    const result = calcWebDesign({ siteType: "brochure", seoInterest: "yes" });

    expect(result).toEqual({ min: 1700, max: 4000, type: "one-off" });
  });

  it("applies a 25% fast-track multiplier, rounded, on top of everything else", () => {
    const result = calcWebDesign({ siteType: "brochure", fastTrack: "yes" });

    // 1200 * 1.25 = 1500, 2500 * 1.25 = 3125
    expect(result).toEqual({ min: 1500, max: 3125, type: "one-off" });
  });

  it("returns a zero base when no siteType is selected at all", () => {
    const result = calcWebDesign({});

    expect(result).toEqual({ min: 0, max: 0, type: "one-off" });
  });
});

describe("calcEcommerce", () => {
  it("uses the base range for the selected platform", () => {
    const result = calcEcommerce({ ecommercePlatform: "woocommerce_shopify" });

    expect(result).toEqual({ min: 2500, max: 5000, type: "one-off" });
  });

  it("sums selected features and adds the product-scale tier", () => {
    const result = calcEcommerce({
      ecommercePlatform: "woocommerce_shopify",
      ecommerceFeatures: ["subscriptions"],
      productScale: "up_to_200",
    });

    // 2500/5000 base + subscriptions 800/2000 + up_to_200 500/1000
    expect(result).toEqual({ min: 3800, max: 8000, type: "one-off" });
  });

  it("applies the fast-track multiplier", () => {
    const result = calcEcommerce({ ecommercePlatform: "custom", fastTrack: "yes" });

    // 5000 * 1.25 = 6250, 12000 * 1.25 = 15000
    expect(result).toEqual({ min: 6250, max: 15000, type: "one-off" });
  });
});

describe("calcBrandIdentity", () => {
  it("uses the base package range and sums deliverables", () => {
    const result = calcBrandIdentity({ brandPackage: "logo_only", brandDeliverables: ["stationery"] });

    // 950/1500 + 200/500
    expect(result).toEqual({ min: 1150, max: 2000, type: "one-off" });
  });

  it("does NOT apply a fast-track multiplier, even if fastTrack is 'yes'", () => {
    // Deliberate: the source comment says "creative quality can't be
    // rushed the same way" — fastTrack must have zero effect here.
    const withFastTrack = calcBrandIdentity({ brandPackage: "logo_only", fastTrack: "yes" });
    const withoutFastTrack = calcBrandIdentity({ brandPackage: "logo_only" });

    expect(withFastTrack).toEqual(withoutFastTrack);
    expect(withFastTrack).toEqual({ min: 950, max: 1500, type: "one-off" });
  });
});

describe("calcDigitalMarketing", () => {
  it("sums selected channels and adds content cost", () => {
    const result = calcDigitalMarketing({ marketingChannels: ["technical_seo"], contentNeeded: "yes" });

    // technical_seo 500/800 + content "yes" 400/800
    expect(result).toEqual({ min: 900, max: 1600, type: "retainer" });
  });

  it("adds half as much content cost for 'partial' as for 'yes'", () => {
    const result = calcDigitalMarketing({ marketingChannels: ["technical_seo"], contentNeeded: "partial" });

    expect(result).toEqual({ min: 700, max: 1200, type: "retainer" });
  });

  it("falls back to a flat baseline when nothing is selected at all", () => {
    const result = calcDigitalMarketing({});

    expect(result).toEqual({ min: 800, max: 2500, type: "retainer" });
  });

  it("is always a retainer, never a one-off", () => {
    const result = calcDigitalMarketing({ marketingChannels: ["technical_seo"] });

    expect(result.type).toBe("retainer");
  });
});

describe("calcAiSolutions", () => {
  it("sums capabilities and integrations together", () => {
    const result = calcAiSolutions({
      aiCapabilities: ["readiness_audit"],
      aiIntegrations: ["crm"],
    });

    // readiness_audit 1200/2500 + crm 500/1500
    expect(result).toEqual({ min: 1700, max: 4000, type: "one-off" });
  });

  it("falls back to the audit baseline when nothing is selected", () => {
    const result = calcAiSolutions({});

    expect(result).toEqual({ min: 1200, max: 3500, type: "one-off" });
  });

  it("applies the fast-track multiplier on top of a real selection", () => {
    const result = calcAiSolutions({ aiCapabilities: ["chatbot_assistant"], fastTrack: "yes" });

    // 3500 * 1.25 = 4375, 7000 * 1.25 = 8750
    expect(result).toEqual({ min: 4375, max: 8750, type: "one-off" });
  });
});

describe("calcFullPackage", () => {
  it("returns the flat base range by default", () => {
    const result = calcFullPackage({});

    expect(result).toEqual({ min: 3000, max: 6000, type: "retainer" });
  });

  it("adds a premium for simultaneous priority", () => {
    const result = calcFullPackage({ fullPackagePriority: "simultaneous" });

    expect(result).toEqual({ min: 4000, max: 8000, type: "retainer" });
  });

  it("does not add the premium for any other priority", () => {
    const result = calcFullPackage({ fullPackagePriority: "web_first" });

    expect(result).toEqual({ min: 3000, max: 6000, type: "retainer" });
  });
});

describe("calculateEstimate — dispatcher", () => {
  it.each([
    ["web_design", { siteType: "brochure" }, { min: 1200, max: 2500, type: "one-off" }],
    ["e_commerce", { ecommercePlatform: "woocommerce_shopify" }, { min: 2500, max: 5000, type: "one-off" }],
    ["brand_identity", { brandPackage: "logo_only" }, { min: 950, max: 1500, type: "one-off" }],
    ["full_package", {}, { min: 3000, max: 6000, type: "retainer" }],
  ] as const)("routes %s to the matching pricing function", (service, extra, expected) => {
    const result = calculateEstimate({ service, ...extra });

    expect(result).toEqual(expected);
  });

  it("returns a zero estimate for an unrecognized/missing service", () => {
    const result = calculateEstimate({});

    expect(result).toEqual({ min: 0, max: 0, type: "one-off" });
  });
});
