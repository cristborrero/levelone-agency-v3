import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { ServicePricingTiers, PricingTier } from "@/components/shared/ServicePricingTiers";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "E-Commerce Development Surrey",
  description: "Sell more online. E-commerce stores built to perform, not just look good. Fixed price. No hourly surprises. Based in Surrey.",
  alternates: { canonical: "/services/e-commerce" },
};

const ECOMMERCE_TIERS: PricingTier[] = [
  {
    name: "WooCommerce Starter Store",
    price: "From £3,000",
    perfectFor: "Product businesses launching their first online store or migrating from platforms like Etsy or Squarespace.",
    features: [
      "Up to 30 products, WooCommerce setup",
      "Payment gateway integration (Stripe/PayPal)",
      "Product filtering, cart and checkout optimised",
      "Basic SEO + speed optimisation",
      "Delivered in 3–4 weeks"
    ],
    ctaText: "Launch your store from £3,000",
    level: "starter"
  },
  {
    name: "Growth E-Commerce Store",
    price: "From £6,000",
    perfectFor: "Established product brands ready to scale online.",
    features: [
      "Up to 200+ products with category architecture",
      "Custom design, branded checkout experience",
      "Email automation hooks (Klaviyo/Mailchimp)",
      "Shipping integrations, inventory management",
      "Conversion-focused UX"
    ],
    ctaText: "Build your growth store from £6,000",
    level: "growth"
  },
  {
    name: "Advanced E-Commerce Platform",
    price: "From £14,000",
    perfectFor: "Multi-category retailers, subscription businesses or brands expanding into new markets.",
    features: [
      "Custom platform (Shopify custom / headless / Next.js + Stripe)",
      "Advanced product logic, subscriptions, bundles",
      "Multi-currency or multi-language",
      "ERP/CRM integrations",
      "Performance + SEO audit built-in"
    ],
    ctaText: "Let's scope your platform",
    level: "advanced"
  }
];

export default function EcommercePage() {
  return (
    <>
      <PageHero
        overline="Service"
        title={"SELL MORE\nONLINE."}
        description="From WooCommerce to fully custom storefronts, we build online shops that drive sales. Every project starts with your customer journey — then we build backwards. Fixed price. No hourly surprises."
      />

      <section className="bg-brand-black py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-12 section-label">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-brand-accent">Investment Options</span>
          </div>
          
          <ServicePricingTiers tiers={ECOMMERCE_TIERS} />
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
                  { label: "Digital Marketing", href: "/services/digital-marketing" },
                  { label: "Brand Identity", href: "/services/brand-identity" }
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
