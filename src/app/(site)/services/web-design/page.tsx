import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { ServicePricingTiers, PricingTier } from "@/components/shared/ServicePricingTiers";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Web Design & Development Surrey",
  description: "Websites that work as hard as you do — built for Surrey businesses ready to grow. Your website is your best salesperson, combined strategy, design and tech.",
  alternates: { canonical: "/services/web-design" },
};

const WEB_DESIGN_TIERS: PricingTier[] = [
  {
    name: "WordPress Business Site",
    price: "From £1,200",
    perfectFor: "Local businesses, sole traders and small teams that need a professional online presence — fast.",
    features: [
      "Up to 6 pages, mobile-first responsive design",
      "Premium theme customised to your brand",
      "On-page SEO setup + Google Analytics",
      "Contact forms, Google Maps, social links",
      "Delivered in 2–3 weeks"
    ],
    quote: "You don't need to spend a fortune to look like you mean business.",
    ctaText: "Get your WordPress site from £1,200",
    level: "starter"
  },
  {
    name: "Business Growth Website (Custom)",
    price: "From £3,500",
    perfectFor: "SMEs and B2B businesses that need more than a brochure — a site built to rank, convert and scale.",
    features: [
      "8–15 pages, custom design (no templates)",
      "CMS-powered content management",
      "SEO-optimised architecture + blog setup",
      "CRM/email tool integrations",
      "Delivered in 4–6 weeks"
    ],
    quote: "Strategy-first websites for businesses serious about their digital presence.",
    ctaText: "Start your custom website from £3,500",
    level: "growth"
  },
  {
    name: "Digital Platform (Advanced Custom)",
    price: "From £8,000",
    perfectFor: "Companies that need a high-performance digital platform — multi-language, complex integrations, or web applications.",
    features: [
      "20+ pages or bespoke functionality",
      "Headless / Next.js architecture available",
      "Custom components, advanced SEO, performance-first build",
      "API integrations (CRM, ERP, booking systems, etc.)",
      "Full QA, staging environment, handover & training"
    ],
    ctaText: "Let's scope your platform",
    level: "advanced"
  }
];

export default function WebDesignPage() {
  return (
    <>
      <PageHero
        overline="Service"
        title={"WEBSITES THAT\nWORK HARDER."}
        description="Your website is your best salesperson. We design and build sites that convert visitors into customers — combining strategy, design and technology in a fixed-price, no-surprise process. Based in Surrey, serving ambitious businesses across the UK."
      />

      <section className="bg-brand-black py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-12 section-label">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-brand-accent">Investment Options</span>
          </div>
          
          <ServicePricingTiers tiers={WEB_DESIGN_TIERS} />
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
                  { label: "E-Commerce", href: "/services/e-commerce" }, 
                  { label: "Brand Identity", href: "/services/brand-identity" }, 
                  { label: "Digital Marketing", href: "/services/digital-marketing" }
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
