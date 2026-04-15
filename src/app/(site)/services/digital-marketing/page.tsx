import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { ServicePricingTiers, PricingTier } from "@/components/shared/ServicePricingTiers";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Marketing Agency Surrey",
  description: "Stop guessing, start growing. Data-driven marketing that delivers ROI. SEO, paid ads, and content that drive qualified traffic. Based in Surrey.",
  alternates: { canonical: "/services/digital-marketing" },
};

const MARKETING_TIERS: PricingTier[] = [
  {
    name: "SEO Foundation Sprint",
    price: "From £1,500",
    perfectFor: "Businesses with a great website but no traffic. A one-off sprint to fix technical issues and set a baseline for organic growth.",
    features: [
      "Comprehensive technical SEO audit & fixes",
      "Keyword mapping for core pages",
      "On-page metadata & H1–H3 structuring",
      "Google Search Console & Analytics setup",
      "Delivered in 2–3 weeks"
    ],
    ctaText: "Get your SEO sprint from £1,500",
    level: "starter"
  },
  {
    name: "Growth Marketing Retainer",
    price: "From £1,500/mo",
    perfectFor: "Companies ready to acquire customers predictably through managed search and social channels.",
    features: [
      "Ongoing SEO (content & technical) OR Paid Ads management",
      "Monthly performance reporting & strategy calls",
      "A/B testing & Conversion Rate Optimisation (CRO)",
      "Ad creative & copywriting",
      "Requires minimum 3-month commitment"
    ],
    quote: "Marketing isn't an expense; it's a predictable revenue engine.",
    ctaText: "Start growing from £1,500/mo",
    level: "growth"
  },
  {
    name: "Full Omni-Channel Scaling",
    price: "From £3,500/mo",
    perfectFor: "Aggressive growth focused brands doing £1M+ looking to dominate their market.",
    features: [
      "Multi-channel: SEO, Google Ads, Meta Ads & LinkedIn Ads",
      "Advanced attribution tracking & bespoke dashboards",
      "Dedicated account manager & weekly catch-ups",
      "Full creative strategy (video, static, copy)",
      "Proactive budget reallocation for highest ROI"
    ],
    ctaText: "Let's scale your business",
    level: "advanced"
  }
];

export default function DigitalMarketingPage() {
  return (
    <>
      <PageHero
        overline="Service"
        title={"STOP GUESSING,\nSTART GROWING."}
        description="Beautiful websites don't generate revenue unless people see them. We build comprehensive marketing engines combining SEO, paid ads, and content to drive qualified traffic and generate real leads."
      />

      <section className="bg-brand-black py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-12 section-label">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-brand-accent">Investment Options</span>
          </div>
          
          <ServicePricingTiers tiers={MARKETING_TIERS} />
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
                  { label: "E-Commerce", href: "/services/e-commerce" }
                ].map((s) => (
                  <Link key={s.label} href={s.href} className="group inline-flex items-center gap-2 border border-brand-grey-700/50 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.1em] text-brand-grey-300 transition-all duration-300 hover:border-brand-accent/40 hover:text-brand-white">
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
