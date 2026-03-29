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
    description: "High-performance websites built on Next.js. Optimised for speed, search, and conversion — not just aesthetics.",
    deliverables: ["Custom Next.js websites", "E-commerce (WooCommerce, Shopify)", "Headless CMS integration", "Performance & Core Web Vitals", "Ongoing maintenance"],
    from: "£3,500",
  },
  {
    number: "02", title: "Brand Identity", href: "/services/brand-identity",
    description: "Visual identities that give your business an unfair advantage. Every element chosen with intent.",
    deliverables: ["Logo system & variations", "Color & typography system", "Brand guidelines document", "Business stationery", "Social media templates"],
    from: "£2,500",
  },
  {
    number: "03", title: "Digital Marketing", href: "/services/digital-marketing",
    description: "Strategies that turn visibility into revenue. Audiences that care, campaigns that convert, reporting that tells the truth.",
    deliverables: ["SEO strategy & implementation", "Google & Meta paid ads", "Content strategy", "Email marketing", "Monthly reporting"],
    from: "£1,200/mo",
  },
  {
    number: "04", title: "AI Solutions", href: "/services/ai-solutions",
    description: "AI workflows, chatbots, and automation built for your specific operation. Measurable competitive edge you can track.",
    deliverables: ["Custom AI chatbots", "Workflow automation", "CRM & tool integrations", "AI-assisted content systems", "Analytics & reporting"],
    from: "£2,000",
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
