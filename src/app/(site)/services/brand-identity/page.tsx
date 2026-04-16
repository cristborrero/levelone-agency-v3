import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { ServicePricingTiers, PricingTier } from "@/components/shared/ServicePricingTiers";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Brand Identity Design Surrey",
  description: "Stand out, be remembered. Brand identity for businesses that refuse to blend in. Based in Surrey.",
  alternates: { canonical: "/services/brand-identity" },
};

const BRAND_TIERS: PricingTier[] = [
  {
    name: "Logotype Refresh",
    price: "From £800",
    perfectFor: "Startups or consultants who need a professional, minimalist logo fast.",
    features: [
      "Custom wordmark or logomark (2 concepts)",
      "Primary colour palette",
      "Typography selection",
      "Delivered in formats for web & print",
      "Delivered in 1–2 weeks"
    ],
    ctaText: "Refresh your logo from £800",
    level: "starter"
  },
  {
    name: "Brand Identity Kit",
    price: "From £1,800",
    perfectFor: "Businesses looking to modernise their look and build trust with a cohesive identity.",
    features: [
      "Primary & secondary logo variations",
      "Complete colour palette & typography systems",
      "Brand Guidelines document (PDF)",
      "Social media templates (Canva or Figma)",
      "Delivered in 3–4 weeks"
    ],
    quote: "A professional brand is your fastest shortcut to trust.",
    ctaText: "Build your brand from £1,800",
    level: "growth"
  },
  {
    name: "Full Brand System",
    price: "From £3,500",
    perfectFor: "Companies rebranding for a major pivot, acquisition, or aggressive scaling.",
    features: [
      "Full Strategy: Positioning, Tone of Voice",
      "Extensive logo suite & brand assets",
      "Custom illustrations or icon set",
      "Print assets (business cards, letterheads)",
      "Comprehensive Digital Brand Book"
    ],
    ctaText: "Let's scope your brand system",
    level: "advanced"
  }
];

export default function BrandIdentityPage() {
  return (
    <>
      <PageHero
        overline="Service"
        title={"STAND OUT,\nBE REMEMBERED."}
        description="A great brand is more than a logo — it's how your business makes people feel. We create striking, cohesive brand identities that attract the right clients and justify premium pricing."
      />

      <section className="bg-brand-black py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-12 section-label">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-brand-accent">Investment Options</span>
          </div>
          
          <ServicePricingTiers tiers={BRAND_TIERS} />
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
                  { label: "Digital Marketing", href: "/services/digital-marketing" }
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
