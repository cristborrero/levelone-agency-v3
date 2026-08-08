# AGENTS.md

## Verification gauntlet — non-negotiable rule

No feature that writes to a real external system is considered done solely because its unit tests pass — even fully mocked ones with 100% coverage. It must additionally pass real-environment verification (`tests/verify-integration.spec.ts`) at least once before being marked complete.

Real external systems in this project, specifically:

- **Sanity CMS** — content is fetched live via `sanityFetch`/GROQ queries (`src/sanity/lib/queries.ts`). A broken query, a missing environment variable, or a revalidation webhook (`src/app/api/sanity/revalidate/route.ts`) that doesn't fire for a given content type can leave the live site showing stale or empty content while every mocked test stays green.
- **Resend (email)** — the contact form (`/api/contact`) and quote wizard (`/api/quote`) send real transactional email. Verification against this must use Resend's test address (`delivered@resend.dev`), never a real inbox — see `tests/verify-integration.spec.ts` for exact setup.
  - `/api/quote`'s client auto-responder sends **directly to whatever email address the submitter provides** (`to: safeEmail` in `src/app/api/quote/route.ts`) — there is no test-mode guard on this today. Any test, script, or manual QA pass against this route must use `delivered@resend.dev` (or another address you own) as the submitted email, never a placeholder like `test@example.com` or a real person's address, or it will land in their inbox.

Before trusting a suspiciously low (or suspiciously 0%) mutation-testing score from Stryker: apply one of the reported "escaped" mutations by hand directly to the source, then run `npm run test` without Stryker involved. If the test suite fails as expected, the tests are fine and Stryker's environment is the problem — don't spend time "improving tests" against a broken measurement. See `/Volumes/HDD MacOSv2/Dev/Git/test-gauntlet/CHECKLIST-environment-gotchas.md` for the full diagnostic order.

Full methodology: `/Volumes/HDD MacOSv2/Dev/Git/test-gauntlet/agent/testing-test-gauntlet-architect.md` (also installed as a Cursor rule — see `.cursor/rules/testing-test-gauntlet-architect.mdc`).

## Mutation-testing status

`stryker.config.json` currently mutates only `src/components/quote/schema.ts` — the first, cheapest pure-logic target. Baseline measured 2026-08-07: ~74% MSI, no environment issues (unlike the PHP side of Test Gauntlet, Stryker worked correctly here on the first real run). Most surviving mutants are error-message text (a UX concern, not a logic bug) or unused enum members/optional fields with no attached business rule — not a sign the tests are weak. Widen `mutate` to more files only once each new file's own tests are trusted, per Critical Rule #4.

