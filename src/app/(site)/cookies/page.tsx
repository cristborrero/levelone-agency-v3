import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  robots: { index: false },
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <section className="bg-brand-black pb-24 pt-36 lg:pt-44">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <div className="mb-12">
          <span className="mb-4 block font-mono text-xs uppercase tracking-[0.15em] text-brand-accent">
            Legal
          </span>
          <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-brand-white">
            COOKIE POLICY
          </h1>
          <p className="mt-4 font-mono text-xs text-brand-grey-500">
            Last updated: March 2026
          </p>
        </div>

        <div className="space-y-10 font-body text-sm leading-relaxed text-brand-grey-300">
          {[
            {
              title: "What are cookies?",
              content:
                "Cookies are small text files stored on your device by a website.",
            },
            {
              title: "Do we use cookies?",
              content:
                "LevelOne Agency uses Vercel Analytics for website performance monitoring. Vercel Analytics is a privacy-first, cookieless analytics solution — it does not set cookies, does not track individuals across websites, and does not collect personally identifiable information.",
            },
            {
              title: "Strictly necessary functionality",
              content:
                "Our contact and quote forms use temporary session data to prevent duplicate submissions. This data is not stored beyond your session.",
            },
            {
              title: "What we do NOT use",
              content:
                "We do not use advertising cookies, social media tracking pixels (Meta, Google Ads, LinkedIn), or any third-party behavioural tracking technologies.",
            },
            {
              title: "Your controls",
              content:
                "Since we do not set non-essential cookies, no cookie consent banner is required under PECR and the DUAA 2025. If this changes, we will update this policy and implement appropriate consent mechanisms before deploying any new tracking technologies.",
            },
            {
              title: "Contact",
              content:
                "hello@leveloneagency.co.uk | ICO: ico.org.uk",
            },
          ].map((section) => (
            <div key={section.title}>
              <h2 className="mb-3 font-display text-lg font-bold uppercase tracking-[-0.01em] text-brand-white">
                {section.title}
              </h2>
              <p>{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
