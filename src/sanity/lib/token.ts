/**
 * Server-only Sanity API read token.
 * Used for draft mode reads and `defineLive` subscriptions.
 * Never import this in client components.
 */
export const token = process.env.SANITY_API_READ_TOKEN;
