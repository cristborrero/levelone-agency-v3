import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description: "Web design & development, brand identity, digital marketing, and AI solutions for UK businesses. Based in Surrey.",
  alternates: { canonical: "/services" },
};

const SERVICES = [
  {
    number: "01", title: "Web Design & Development", href: "/services/web-design",
    description: "Websites that work as hard as you do. Designed to convert visitors into customers combining strategy, design and technology.",
    deliverables: ["Custom websites & WordPress", "Mobile-first responsive design", "SEO-optimised architecture", "CMS-powered content management", "Landing pages"],
    from: "£1,200",
  },
  {
    number: "02", title: "E-Commerce", href: "/services/e-commerce",
    description: "Sell more online with stores built to perform. From WooCommerce to fully custom headless storefronts tailored to your customer journey.",
    deliverables: ["WooCommerce & Shopify stores", "Custom checkout experiences", "Payment gateway integration", "Inventory management", "Subscription portals"],
    from: "£3,000",
  },
  {
    number: "03", title: "Brand Identity", href: "/services/brand-identity",
    description: "Stand out and be remembered. Cohesive brand identities that attract the right clients and justify premium pricing.",
    deliverables: ["Logotypes & logomarks", "Full brand identity systems", "Brand guidelines & positioning", "Typography & colour palettes", "Social media & print collateral"],
    from: "£800",
  },
  {
    number: "04", title: "Digital Marketing", href: "/services/digital-marketing",
    description: "Stop guessing, start growing. Data-driven marketing engines combining SEO, paid ads, and content that deliver qualified traffic.",
    deliverables: ["Technical & content SEO", "Google Ads & Pay-Per-Click", "Social Media Advertising", "Conversion Rate Optimisation", "Analytics & reporting"],
    from: "£1,500/mo",
  },
  {
    number: "05", title: "AI Solutions", href: "/services/ai-solutions",
    description: "Work smarter, not harder. Practical, revenue-generating AI automations for businesses that want to do more with less.",
    deliverables: ["AI Readiness Audits", "Custom Chatbots & Assistants", "End-to-end workflow automation", "CRM & AI tool integrations", "Data extraction & processing"],
    from: "£1,200",
  },
  {
    number: "06", title: "The Full Package", href: "/services/full-package",
    description: "The all-in-one digital department. We combine brand, web, marketing, and AI into one seamless strategy for ambitious companies.",
    deliverables: ["Complete Brand transformation", "High-performance websites", "Omni-channel marketing strategy", "AI process automation", "Dedicated account direction"],
    from: "£5,000",
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      <PageHero
        overline="What We Do"
        title="SERVICES"
        description="Not generalists pretending to be specialists. Each service we offer is one we do at a level worth paying for."
      />
      <section className="bg-brand-black py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-px bg-brand-grey-900/25 lg:grid-cols-2">
            {SERVICES.map((service) => (
              <Link
                key={service.number}
                href={service.href}
                className="group relative flex flex-col justify-between bg-brand-black p-10 transition-colors duration-500 hover:bg-brand-black-mid lg:p-12"
              >
                <div className="accent-line" />
                <div className="mb-10">
                  <div className="mb-6 flex items-start justify-between">
                    <span className="font-mono text-xs tracking-[0.15em] text-brand-grey-700 transition-colors duration-300 group-hover:text-brand-accent">
                      {service.number}
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-brand-accent opacity-0 transition-all duration-300 group-hover:opacity-100" strokeWidth={2} />
                  </div>
                  <h2 className="mb-5 font-display text-2xl font-bold uppercase leading-tight tracking-[-0.02em] text-brand-white lg:text-3xl">
                    {service.title}
                  </h2>
                  <p className="mb-8 font-body text-base leading-relaxed text-brand-grey-300">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-center gap-3 font-body text-sm text-brand-grey-500 transition-colors duration-300 group-hover:text-brand-grey-300">
                        <span className="h-px w-4 bg-brand-accent flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-end justify-between border-t border-brand-grey-900/40 pt-6">
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.15em] text-brand-grey-700 mb-1">Starting from</span>
                    <span className="font-display text-xl font-bold text-brand-accent">{service.from}</span>
                  </div>
                  <span className="font-mono text-xs uppercase tracking-[0.1em] text-brand-grey-500 transition-colors duration-300 group-hover:text-brand-white">
                    Learn more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
