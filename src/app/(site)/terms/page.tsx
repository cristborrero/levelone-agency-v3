import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  robots: { index: false },
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className="bg-brand-black pb-24 pt-36 lg:pt-44">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <div className="mb-12">
          <span className="mb-4 block font-mono text-xs uppercase tracking-[0.15em] text-brand-accent">
            Legal
          </span>
          <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-brand-white">
            TERMS OF SERVICE
          </h1>
          <p className="mt-4 font-mono text-xs text-brand-grey-500">
            Last updated: March 2026
          </p>
        </div>

        <div className="space-y-10 font-body text-sm leading-relaxed text-brand-grey-300">
          <p>
            These terms govern the provision of services by Leonardo Martinez
            Mena trading as LevelOne Agency (&ldquo;LevelOne&rdquo;,
            &ldquo;we&rdquo;, &ldquo;us&rdquo;) to clients (&ldquo;you&rdquo;,
            &ldquo;the client&rdquo;). By engaging our services, you agree to
            these terms.
          </p>

          {[
            {
              title: "1. Services",
              content: "We provide digital agency services including web design and development, brand identity, digital marketing, and AI solutions. The specific scope, deliverables, timeline, and fees for each engagement are agreed in writing before work begins.",
            },
            {
              title: "2. Payment Terms",
              content: "Projects are typically invoiced with a 50% deposit before work begins and the balance upon completion or at agreed milestones. Invoices are due within 14 days of issue unless otherwise agreed. Late payments may incur interest under the Late Payment of Commercial Debts (Interest) Act 1998.",
            },
            {
              title: "3. Client Responsibilities",
              content: "Clients are responsible for providing accurate briefs, timely feedback, and any required content, assets, or access credentials. Delays caused by the client may affect delivery timelines and additional costs may apply.",
            },
            {
              title: "4. Intellectual Property",
              content: "Upon receipt of full payment, ownership of final deliverables transfers to the client. Working files, code libraries, and proprietary tools remain the property of LevelOne unless otherwise agreed in writing. LevelOne reserves the right to display completed work in its portfolio unless the client requests otherwise in writing.",
            },
            {
              title: "5. Confidentiality",
              content: "Both parties agree to keep confidential any proprietary information shared during the engagement. This obligation continues for 2 years after project completion.",
            },
            {
              title: "6. Liability",
              content: "Our total liability in connection with any project shall not exceed the fees paid by the client for that project. We are not liable for indirect, consequential, or loss-of-profit damages. We do not guarantee specific business outcomes from our work.",
            },
            {
              title: "7. Cancellation",
              content: "Either party may cancel a project with 14 days' written notice. The client is liable for payment of all work completed to the cancellation date. Deposits are non-refundable once work has begun.",
            },
            {
              title: "8. Governing Law",
              content: "These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.",
            },
            {
              title: "9. Contact",
              content: "Leonardo Martinez Mena t/a LevelOne Agency. Flat 5, Wayewood Lodge, Branksome Park Road, Camberley, GU15 2AE, United Kingdom. hello@leveloneagency.co.uk",
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
