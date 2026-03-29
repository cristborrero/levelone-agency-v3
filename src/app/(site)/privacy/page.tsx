import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: false },
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="bg-brand-black pb-24 pt-36 lg:pt-44">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <div className="mb-12">
          <span className="mb-4 block font-mono text-xs uppercase tracking-[0.15em] text-brand-accent">
            Legal
          </span>
          <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-brand-white">
            PRIVACY POLICY
          </h1>
          <p className="mt-4 font-mono text-xs text-brand-grey-500">
            Last updated: March 2026
          </p>
        </div>

        <div className="space-y-10 font-body text-sm leading-relaxed text-brand-grey-300">
          <p>
            LevelOne Agency is a trading name of Leonardo Martinez Mena
            (&ldquo;we&rdquo;, &ldquo;us&rdquo;). We are committed to protecting
            your personal data in accordance with the UK GDPR and the Data
            Protection Act 2018.
          </p>

          {[
            {
              title: "1. Who We Are",
              content: "Data controller: Leonardo Martinez Mena. Trading as: LevelOne Agency. Address: Flat 5, Wayewood Lodge, Branksome Park Road, Camberley, GU15 2AE, United Kingdom. Email: hello@leveloneagency.co.uk",
            },
            {
              title: "2. What Data We Collect",
              content: "Name and email address (via contact and quote forms), company name and project details where provided, IP address and browser information via analytics, and communication history.",
            },
            {
              title: "3. How We Use Your Data",
              content: "To respond to your enquiries and provide our services; to send relevant updates if you have subscribed to our newsletter; to improve our website using aggregated analytics; and to meet our legal and contractual obligations.",
            },
            {
              title: "4. Legal Basis for Processing",
              content: "We process your data under: performance of a contract or pre-contractual steps (enquiries and services); legitimate interests (analytics and service improvement); and consent (newsletter subscriptions).",
            },
            {
              title: "5. Data Retention",
              content: "Enquiry data is retained for up to 2 years. Client project data is retained for 6 years for tax and legal purposes. You may request deletion at any time, subject to legal obligations. Newsletter subscribers: retained until unsubscribe + 30 days.",
            },
            {
              title: "6. International Transfers",
              content: "Vercel Inc. and Resend Inc. are based in the USA. Data transfers are governed by the International Data Transfer Agreement (IDTA). We have conducted a Transfer Risk Assessment (TRA) confirming that protections offered are not materially inferior to UK standards, as required by the DUAA 2025.",
            },
            {
              title: "7. Your Rights",
              content: "Under UK GDPR, you have the right to access, correct, delete, restrict, or port your personal data, and to object to processing. Contact us at hello@leveloneagency.co.uk. You may also lodge a complaint with the ICO at ico.org.uk. We will respond to all requests within 30 days. Under the DUAA 2025, we may request additional information to verify your identity or clarify the scope of your request, which may pause the response timeline. We are only required to conduct searches that are reasonable and proportionate.",
            },
            {
              title: "8. Cookies",
              content: "Our website uses Vercel Analytics, which is cookie-free and does not track individuals across sites. We do not use advertising cookies or third-party tracking.",
            },
            {
              title: "9. Changes to This Policy",
              content: "We may update this policy from time to time. Material changes will be noted with an updated date above.",
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
