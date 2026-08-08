import { describe, expect, it } from "vitest";
import { quoteSchema } from "./schema";

/**
 * quoteSchema has a substantial superRefine() with per-service conditional
 * requirements (see src/components/quote/schema.ts). Each branch below is
 * tested in isolation — starting from a known-valid payload for that
 * service, then breaking exactly one field at a time — so a mutation to
 * any single condition (an `if` flipped, an array-length check removed, a
 * field left out of a service's required set) has a test that would catch
 * it specifically, not just "the form as a whole is broken."
 */

function issuePaths(result: ReturnType<typeof quoteSchema.safeParse>): string[] {
  if (result.success) {
    return [];
  }

  return result.error.issues.map((issue) => issue.path.join("."));
}

const sharedRequiredFields = {
  name: "Jane Doe",
  email: "jane@example.com",
  consent: true as const,
};

function validPayloadFor(service: string, overrides: Record<string, unknown> = {}) {
  const base: Record<string, unknown> = {
    service,
    startTimeline: "right_away",
    ...sharedRequiredFields,
  };

  switch (service) {
    case "web_design":
      Object.assign(base, {
        hasWebsite: "no",
        brandingStatus: "not_yet",
        siteType: "brochure",
        pageCount: "up_to_5",
        copywriting: "own_copy",
        seoInterest: "yes",
      });
      break;
    case "e_commerce":
      Object.assign(base, {
        hasWebsite: "no",
        brandingStatus: "not_yet",
        ecommercePlatform: "woocommerce_shopify",
        productScale: "up_to_50",
      });
      break;
    case "brand_identity":
      Object.assign(base, {
        brandingStatus: "not_yet",
        brandPackage: "logo_only",
      });
      break;
    case "digital_marketing":
      Object.assign(base, {
        hasWebsite: "no",
        marketingChannels: ["seo"],
        adSpendBudget: "500_1k",
        contentNeeded: "no",
      });
      break;
    case "ai_solutions":
      Object.assign(base, {
        hasWebsite: "no",
        aiCapabilities: ["chatbot"],
      });
      break;
    case "full_package":
      Object.assign(base, {
        hasWebsite: "no",
        brandingStatus: "not_yet",
        fullPackagePriority: "web_first",
      });
      break;
  }

  return { ...base, ...overrides };
}

describe("quoteSchema — a known-valid payload passes for every service", () => {
  const services = [
    "web_design",
    "e_commerce",
    "brand_identity",
    "digital_marketing",
    "ai_solutions",
    "full_package",
  ];

  it.each(services)("%s", (service) => {
    const result = quoteSchema.safeParse(validPayloadFor(service));

    expect(result.success, JSON.stringify(!result.success ? issuePaths(result) : [])).toBe(true);
  });
});

describe("quoteSchema — startTimeline is required for every service (shared rule)", () => {
  it("rejects a payload missing startTimeline regardless of service", () => {
    const result = quoteSchema.safeParse(validPayloadFor("web_design", { startTimeline: undefined }));

    expect(issuePaths(result)).toContain("startTimeline");
  });
});

describe("quoteSchema — hasWebsite is required only for the services that ask for it", () => {
  it.each(["web_design", "e_commerce", "full_package"])(
    "%s requires hasWebsite",
    (service) => {
      const result = quoteSchema.safeParse(validPayloadFor(service, { hasWebsite: undefined }));

      expect(issuePaths(result)).toContain("hasWebsite");
    }
  );

  it.each(["brand_identity", "digital_marketing", "ai_solutions"])(
    "%s does NOT require hasWebsite",
    (service) => {
      const result = quoteSchema.safeParse(validPayloadFor(service, { hasWebsite: undefined }));

      expect(issuePaths(result)).not.toContain("hasWebsite");
    }
  );
});

describe("quoteSchema — brandingStatus is required only for the services that ask for it", () => {
  it.each(["web_design", "e_commerce", "brand_identity", "full_package"])(
    "%s requires brandingStatus",
    (service) => {
      const result = quoteSchema.safeParse(validPayloadFor(service, { brandingStatus: undefined }));

      expect(issuePaths(result)).toContain("brandingStatus");
    }
  );

  it.each(["digital_marketing", "ai_solutions"])(
    "%s does NOT require brandingStatus",
    (service) => {
      const result = quoteSchema.safeParse(validPayloadFor(service, { brandingStatus: undefined }));

      expect(issuePaths(result)).not.toContain("brandingStatus");
    }
  );
});

describe("quoteSchema — service-specific required fields", () => {
  it("web_design requires siteType, pageCount, copywriting, seoInterest", () => {
    const result = quoteSchema.safeParse(
      validPayloadFor("web_design", {
        siteType: undefined,
        pageCount: undefined,
        copywriting: undefined,
        seoInterest: undefined,
      })
    );

    const paths = issuePaths(result);
    expect(paths).toEqual(
      expect.arrayContaining(["siteType", "pageCount", "copywriting", "seoInterest"])
    );
  });

  it("e_commerce requires ecommercePlatform and productScale", () => {
    const result = quoteSchema.safeParse(
      validPayloadFor("e_commerce", { ecommercePlatform: undefined, productScale: undefined })
    );

    expect(issuePaths(result)).toEqual(
      expect.arrayContaining(["ecommercePlatform", "productScale"])
    );
  });

  it("brand_identity requires brandPackage", () => {
    const result = quoteSchema.safeParse(validPayloadFor("brand_identity", { brandPackage: undefined }));

    expect(issuePaths(result)).toContain("brandPackage");
  });

  it("full_package requires fullPackagePriority", () => {
    const result = quoteSchema.safeParse(
      validPayloadFor("full_package", { fullPackagePriority: undefined })
    );

    expect(issuePaths(result)).toContain("fullPackagePriority");
  });
});

describe("quoteSchema — array-based requirements (must be non-empty, not just present)", () => {
  it("digital_marketing rejects an empty marketingChannels array", () => {
    const result = quoteSchema.safeParse(validPayloadFor("digital_marketing", { marketingChannels: [] }));

    expect(issuePaths(result)).toContain("marketingChannels");
  });

  it("digital_marketing accepts a non-empty marketingChannels array", () => {
    const result = quoteSchema.safeParse(
      validPayloadFor("digital_marketing", { marketingChannels: ["seo", "ppc"] })
    );

    expect(issuePaths(result)).not.toContain("marketingChannels");
  });

  it("digital_marketing also requires adSpendBudget and contentNeeded", () => {
    const result = quoteSchema.safeParse(
      validPayloadFor("digital_marketing", { adSpendBudget: undefined, contentNeeded: undefined })
    );

    expect(issuePaths(result)).toEqual(expect.arrayContaining(["adSpendBudget", "contentNeeded"]));
  });

  it("ai_solutions rejects an empty aiCapabilities array", () => {
    const result = quoteSchema.safeParse(validPayloadFor("ai_solutions", { aiCapabilities: [] }));

    expect(issuePaths(result)).toContain("aiCapabilities");
  });

  it("ai_solutions accepts a non-empty aiCapabilities array", () => {
    const result = quoteSchema.safeParse(
      validPayloadFor("ai_solutions", { aiCapabilities: ["chatbot"] })
    );

    expect(issuePaths(result)).not.toContain("aiCapabilities");
  });
});

describe("quoteSchema — phone is required only when a call is requested", () => {
  it("rejects wantsCall=yes with no phone", () => {
    const result = quoteSchema.safeParse(
      validPayloadFor("web_design", { wantsCall: "yes", phone: undefined })
    );

    expect(issuePaths(result)).toContain("phone");
  });

  it("rejects wantsCall=yes with a phone that's only whitespace", () => {
    const result = quoteSchema.safeParse(validPayloadFor("web_design", { wantsCall: "yes", phone: "   " }));

    expect(issuePaths(result)).toContain("phone");
  });

  it("accepts wantsCall=yes with a real phone number", () => {
    const result = quoteSchema.safeParse(
      validPayloadFor("web_design", { wantsCall: "yes", phone: "+44 7700 900000" })
    );

    expect(issuePaths(result)).not.toContain("phone");
  });

  it("does not require phone when wantsCall is not 'yes'", () => {
    const result = quoteSchema.safeParse(
      validPayloadFor("web_design", { wantsCall: "no", phone: undefined })
    );

    expect(issuePaths(result)).not.toContain("phone");
  });
});

describe("quoteSchema — error messages are real, user-facing text, not just field paths", () => {
  // Representative sample, not exhaustive — see mutation-testing results:
  // most surviving mutants blank out one of these messages, which is a
  // real UX regression (a blank error shown to a real user) even though
  // the schema.ts change doesn't affect which field fails.
  it("service requires an explicit selection with a real message", () => {
    const result = quoteSchema.safeParse(validPayloadFor("web_design", { service: undefined }));

    expect(result.success).toBe(false);
    if (!result.success) {
      const serviceIssue = result.error.issues.find((issue) => issue.path.join(".") === "service");
      expect(serviceIssue?.message).toBe("Please select a service to continue.");
    }
  });

  it("consent has a real message, not a blank one", () => {
    const result = quoteSchema.safeParse(validPayloadFor("web_design", { consent: false }));

    expect(result.success).toBe(false);
    if (!result.success) {
      const consentIssue = result.error.issues.find((issue) => issue.path.join(".") === "consent");
      expect(consentIssue?.message).toBe("You must agree to our privacy policy to continue");
    }
  });

  it("phone-required-for-call has a real message, not a blank one", () => {
    const result = quoteSchema.safeParse(
      validPayloadFor("web_design", { wantsCall: "yes", phone: undefined })
    );

    expect(result.success).toBe(false);
    if (!result.success) {
      const phoneIssue = result.error.issues.find((issue) => issue.path.join(".") === "phone");
      expect(phoneIssue?.message).toBe("Please provide a phone number for us to call you");
    }
  });
});

describe("quoteSchema — shared final-details validation", () => {
  it("rejects a name shorter than 2 characters", () => {
    const result = quoteSchema.safeParse(validPayloadFor("web_design", { name: "J" }));

    expect(issuePaths(result)).toContain("name");
  });

  it("rejects an invalid email address", () => {
    const result = quoteSchema.safeParse(validPayloadFor("web_design", { email: "not-an-email" }));

    expect(issuePaths(result)).toContain("email");
  });

  it("rejects consent: false", () => {
    const result = quoteSchema.safeParse(validPayloadFor("web_design", { consent: false }));

    expect(issuePaths(result)).toContain("consent");
  });

  it("rejects a missing service value entirely", () => {
    const result = quoteSchema.safeParse(validPayloadFor("web_design", { service: undefined }));

    expect(issuePaths(result)).toContain("service");
  });
});
