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
          {[
            {
              title: "1. WHO WE ARE",
              content:
                "LevelOne Agency is a trading name of Leonardo Martinez Mena, registered address: Flat 5, Wayewood Lodge, Branksome Park Road, Camberley, GU15 2AE, United Kingdom. Email: hello@leveloneagency.co.uk. These terms govern all services provided by LevelOne Agency to clients.",
            },
            {
              title: "2. SERVICES AND SCOPE OF WORK",
              content:
                "All projects are defined in a written Statement of Work (SOW) or project proposal agreed by both parties before work begins. Any request outside the agreed scope constitutes a Change Request and is subject to a separate quote. The price shown in any proposal includes all mandatory charges \u2014 there are no hidden fees added after agreement (in compliance with the DMCC Act 2024).",
            },
            {
              title: "3. FIXED-PRICE PROJECTS",
              content:
                "Project fees are fixed as stated in the SOW. Payment terms: 50% deposit upon project commencement, 50% upon delivery, unless otherwise agreed in writing. Invoices are due within 14 days of issue.",
            },
            {
              title: "4. INTELLECTUAL PROPERTY",
              content:
                "All deliverables (code, designs, content, brand assets) remain the intellectual property of LevelOne Agency until full payment is received. Upon full payment, all rights are transferred to the client. LevelOne Agency retains the right to display completed work in its portfolio unless the client requests otherwise in writing.",
            },
            {
              title: "5. AI-ASSISTED SERVICES",
              content:
                "LevelOne Agency uses AI tools to assist in delivery. All AI-generated outputs are reviewed and validated by our team before delivery. The client is responsible for reviewing all deliverables before use in production or public-facing communications. LevelOne Agency does not guarantee specific outcomes from AI workflows or automation systems.",
            },
            {
              title: "6. CLIENT RESPONSIBILITIES",
              content:
                "The client agrees to provide timely feedback, content, and approvals as required. Delays caused by the client may affect delivery timelines. LevelOne Agency is not liable for delays resulting from late client input.",
            },
            {
              title: "7. RETAINER AND SUBSCRIPTION SERVICES",
              content:
                "For ongoing monthly retainers: clients receive a renewal reminder every 6 months. Clients may cancel with 30 days' written notice. A 14-day cooling-off period applies from the start of any new subscription or upon transition from a trial to a paid plan, during which a full refund will be issued upon written request to hello@leveloneagency.co.uk. (Compliant with DMCC Act 2024 subscription provisions, Spring 2026.)",
            },
            {
              title: "8. REVIEWS AND TESTIMONIALS",
              content:
                "Any testimonials or case studies published by LevelOne Agency reflect genuine client experiences. We do not commission, incentivise, or publish fabricated reviews. (Compliant with DMCC Act 2024.)",
            },
            {
              title: "9. LIMITATION OF LIABILITY",
              content:
                "LevelOne Agency's total liability shall not exceed the total fees paid by the client for the specific project in question. We are not liable for indirect, consequential, or reputational losses.",
            },
            {
              title: "10. GOVERNING LAW",
              content:
                "These terms are governed by the laws of England and Wales. Disputes will be resolved through mediation before any court proceedings.",
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
