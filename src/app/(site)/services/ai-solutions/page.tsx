import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { ServicePricingTiers, PricingTier } from "@/components/shared/ServicePricingTiers";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Solutions & Automation Surrey",
  description: "Work smarter, not harder. AI solutions that save time and cut costs. Practical, revenue-generating automations. Based in Surrey.",
  alternates: { canonical: "/services/ai-solutions" },
};

const AI_TIERS: PricingTier[] = [
  {
    name: "AI Readiness Audit",
    price: "From £1,200",
    perfectFor: "Consultancies and agencies aware of AI but unsure where to start without wasting money.",
    features: [
      "Deep dive into current operational bottlenecks",
      "Process mapping for 3 core departments",
      "Identification of immediate AI ROI opportunities",
      "Software & tool recommendations",
      "Delivered as an actionable roadmap"
    ],
    ctaText: "Book an AI audit from £1,200",
    level: "starter"
  },
  {
    name: "Custom AI Chatbot",
    price: "From £3,500",
    perfectFor: "E-Commerce or service businesses drowning in repetitive customer support queries.",
    features: [
      "Custom GPT / Claude trained on your company data",
      "Website integration (widget or dedicated page)",
      "Lead qualification & appointment booking flows",
      "Handover protocol to human agents",
      "1 month of managed optimisation"
    ],
    quote: "A sales assistant that works 24/7, never sleeps, and knows your entire catalogue.",
    ctaText: "Build your AI bot from £3,500",
    level: "growth"
  },
  {
    name: "Full Workflow Automation",
    price: "From £7,500",
    perfectFor: "Operations-heavy businesses looking to cut administrative bloat and scale without hiring.",
    features: [
      "End-to-end process automation (Make / Zapier)",
      "CRM, Email, and accounting integrations",
      "Document processing & AI data extraction",
      "Custom internal dashboards & reporting",
      "Staff training & handover"
    ],
    ctaText: "Let's scope your automation",
    level: "advanced"
  }
];

export default function AiSolutionsPage() {
  return (
    <>
      <PageHero
        overline="Service"
        title={"WORK SMARTER,\nNOT HARDER."}
        description="AI isn't just a buzzword; it's a competitive advantage. We build practical, revenue-generating AI automations for businesses that want to do more with less. No hype, just ROI."
      />

      <section className="bg-brand-black py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-12 section-label">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-brand-accent">Investment Options</span>
          </div>
          
          <ServicePricingTiers tiers={AI_TIERS} />
        </div>
      </section>

      <section className="bg-brand-black-deep py-20 lg:py-28 border-t border-brand-grey-900/40">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center">
          <h2 className="font-display text-2xl md:text-4xl font-bold uppercase tracking-tight text-brand-white mb-6">
            Predictable pricing. No hourly surprises. Without the London agency price tag.
          </h2>
          <p className="font-body text-base text-brand-grey-300 mb-10">
            We believe in complete transparency. Every engagement starts with a focused strategy session to define your goals and scope—so we can provide clear, fixed pricing from day one. No ambiguity, no scope creep, no unexpected costs.
          </p>
          <Link href="/quote" className="group inline-flex items-center gap-3 bg-brand-white px-9 py-4 font-display text-sm font-bold uppercase tracking-[0.15em] text-brand-black transition-all duration-300 hover:bg-brand-accent">
            Calculate Your Quote <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
          </Link>
        </div>
      </section>

      <section className="bg-brand-black py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.15em] text-brand-grey-500">Related Services</p>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "Web Design", href: "/services/web-design" }, 
                  { label: "Full Package", href: "/services/full-package" }
                ].map((s) => (
                  <Link key={s.label} href={s.href} className="group inline-flex items-center gap-2 border border-brand-grey-700/50 px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-brand-grey-300 transition-all duration-300 hover:border-brand-accent/40 hover:text-brand-white">
                    {s.label} <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:opacity-100" strokeWidth={2} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
