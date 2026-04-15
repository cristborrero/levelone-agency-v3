import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { ServicePricingTiers, PricingTier } from "@/components/shared/ServicePricingTiers";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Full Digital Agency Package Surrey",
  description: "The all-in-one digital department for ambitious brands. Combining brand, web, marketing, and AI into one seamless strategy. Based in Surrey.",
  alternates: { canonical: "/services/full-package" },
};

const PACKAGE_TIERS: PricingTier[] = [
  {
    name: "Launch Package",
    price: "From £5,000",
    perfectFor: "Funded startups or new ventures needing a complete, professional launch pad.",
    features: [
      "Brand Identity Kit (Logo, Colours, Type)",
      "Custom Marketing Website (up to 8 pages)",
      "Copywriting & Tone of Voice setup",
      "Basic SEO & Analytics foundation",
      "Delivered in 4–6 weeks"
    ],
    ctaText: "Launch your business from £5,000",
    level: "starter"
  },
  {
    name: "Growth Package",
    price: "From £10,000",
    perfectFor: "Established businesses (1M+ revenue) undergoing a transformation or aggressive push.",
    features: [
      "Full Brand Re-positioning & System",
      "High-Performance Custom Website or E-Com",
      "3 Months SEO & Content Strategy included",
      "Automated lead capture & CRM integration",
      "Delivered in 8–12 weeks"
    ],
    quote: "Stop managing freelancers. We act as your entire digital department.",
    ctaText: "Start the Growth Package from £10,000",
    level: "growth"
  },
  {
    name: "The LevelOne Partnership",
    price: "From £20,000+",
    perfectFor: "Market leaders looking to digitise completely, integrating AI, bespoke apps, and omni-channel marketing.",
    features: [
      "Everything in Growth, plus:",
      "Custom Web Application / Portal development",
      "AI Workflow Automation across the company",
      "Dedicated account direction & priority SLA",
      "Monthly Omni-channel marketing retainer built-in"
    ],
    ctaText: "Let's discuss a partnership",
    level: "advanced"
  }
];

export default function FullPackagePage() {
  return (
    <>
      <PageHero
        overline="Service"
        title={"THE FULL\nPACKAGE."}
        description="Why manage 5 different freelancers when you can have one unified team? The Full Package is our premium offering — combining brand, web, marketing, and AI into one seamless strategy. Built for businesses ready to dominate."
      />

      <section className="bg-brand-black py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-12 section-label">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-brand-accent">Investment Options</span>
          </div>
          
          <ServicePricingTiers tiers={PACKAGE_TIERS} />
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
                  { label: "Brand Identity", href: "/services/brand-identity" }, 
                  { label: "Web Design", href: "/services/web-design" },
                  { label: "Digital Marketing", href: "/services/digital-marketing" },
                  { label: "AI Solutions", href: "/services/ai-solutions" }
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
