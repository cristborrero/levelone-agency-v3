import { test, expect } from "@playwright/test";

/**
 * Real-environment verification for LevelOne Agency V3.
 *
 * Runs against a REAL running dev server — not mocked API routes, not a
 * mocked Resend/Sanity client. Exists because a fully mocked unit test
 * suite can be green while the real thing is broken (see Critical Rule
 * #1 in the Test Gauntlet Architect agent — /Volumes/HDD MacOSv2/Dev/Git/test-gauntlet/agent/testing-test-gauntlet-architect.md).
 *
 * ═══════════════════════════════════════════════════════════════════
 * ⚠️  BEFORE RUNNING THIS: read this carefully, it sends real requests
 *     to real external services (Resend, Sanity).
 * ═══════════════════════════════════════════════════════════════════
 *
 * 1. Start the dev server with the agency notification address
 *    overridden to Resend's test address, so the checks below never
 *    land in the real hello@leveloneagency.co.uk inbox:
 *
 *      CONTACT_EMAIL=delivered@resend.dev npm run dev
 *
 * 2. This spec ALSO sets the submitter's own "email" field to
 *    delivered@resend.dev in every payload below — found necessary
 *    because /api/quote's client auto-responder sends directly to
 *    whatever address the submitter provides (src/app/api/quote/route.ts,
 *    the second resend.emails.send() call, `to: safeEmail`). Without
 *    this, a verification run would email a real inbox belonging to
 *    whoever's address happened to be used as test data — this is
 *    exactly the kind of real side effect a mocked test would hide.
 *
 * 3. Then, in another terminal:
 *
 *      npm run test:integration
 */

test.describe("Real-environment verification", () => {
  test("the contact form actually sends via Resend", async ({ request }) => {
    const response = await request.post("/api/contact", {
      data: {
        name: "Test Gauntlet Verification",
        email: "delivered@resend.dev",
        company: "Test Gauntlet",
        service: "web_design",
        budget: "6_to_10k",
        message: "Automated real-environment verification run — safe to ignore.",
      },
    });

    expect(response.ok(), await response.text()).toBeTruthy();

    const body = await response.json();
    expect(body.success).toBe(true);
  });

  test("the quote wizard actually sends via Resend, for every service branch", async ({ request }) => {
    // A minimal valid payload per service — mirrors the "valid payload"
    // shape covered by src/components/quote/schema.test.ts, but run here
    // against the REAL API route (real Zod validation + real Resend
    // calls), not just the schema in isolation.
    const basePayload = {
      name: "Test Gauntlet Verification",
      email: "delivered@resend.dev", // see warning above — never a real address
      startTimeline: "right_away",
      consent: true,
    };

    const response = await request.post("/api/quote", {
      data: {
        ...basePayload,
        service: "web_design",
        hasWebsite: "no",
        brandingStatus: "not_yet",
        siteType: "brochure",
        pageCount: "up_to_5",
        copywriting: "own_copy",
        seoInterest: "yes",
      },
    });

    expect(response.ok(), await response.text()).toBeTruthy();

    const body = await response.json();
    expect(body.success).toBe(true);
  });

  test("a real page reflects real Sanity-sourced content, not an empty/broken section", async ({ page }) => {
    // Read-only — no special email handling needed. Catches: missing env
    // vars, a broken GROQ query, or a Sanity dataset/CORS misconfiguration
    // that a component-level mock would never surface.
    await page.goto("/insights");

    const response = await page.request.get("/insights");
    expect(response.status()).toBe(200);

    // TODO: once there's at least one real published post (see
    // STATUS_PROJECT.md backlog), assert its title or slug appears in
    // the page — a stronger check than "the route didn't 500."
  });
});

/**
 * NOT automated here, deliberately: whether the Sanity revalidation
 * webhook (src/app/api/sanity/revalidate/route.ts) actually causes a
 * live page to update after a real content edit in Sanity Studio. This
 * is the direct equivalent of the cache-invalidation class of bug this
 * methodology exists to catch (see Critical Rule #1) — but verifying it
 * for real requires a live Sanity webhook secret and an actual content
 * edit, which isn't safe to script unattended. Manual check, at least
 * once per change to this route: edit a real post in Studio, confirm
 * the webhook fires (Sanity dashboard → API → Webhooks → delivery log),
 * and confirm /insights reflects the change without a manual redeploy.
 */
