import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Web Design & Development",
  description: "High-performance websites built on Next.js for UK businesses. Optimised for speed, SEO, and conversion. Based in Surrey.",
  alternates: { canonical: "/services/web-design" },
};

const WHAT_WE_BUILD = [
  { title: "Marketing Websites", description: "Your primary sales tool. Fast, conversion-optimised, and built to rank. We don't do brochure sites that just sit there." },
  { title: "E-commerce Stores", description: "WooCommerce, Shopify, or headless — whatever fits your operation. Built to sell, not just to look good." },
  { title: "Web Applications", description: "Dashboards, portals, booking systems, SaaS tools. Complex functionality without complexity in the UX." },
  { title: "Headless CMS Builds", description: "Next.js frontend, Sanity or similar backend. Blazing-fast delivery, total editorial control." },
] as const;

const TECH = ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Supabase", "Sanity CMS", "Vercel", "Cloudflare"] as const;

const PROCESS = [
  { step: "01", title: "Technical Discovery", description: "We audit your current setup, understand your tech constraints, and scope the right solution — not the most expensive one." },
  { step: "02", title: "Architecture & Design", description: "Wireframes, component library, design system. All approved before a single line of production code." },
  { step: "03", title: "Build & Optimise", description: "Clean, tested code. Lighthouse score targets set upfront. Core Web Vitals built in from the start." },
  { step: "04", title: "Launch & Handover", description: "Staged deployment, QA across devices, full documentation. You own everything." },
] as const;

const FAQS = [
  { q: "Do you work with WordPress?", a: "Yes, when it's the right tool. For content-heavy sites or clients who need non-technical editing, WordPress with a headless setup can be the correct choice. We'll tell you honestly which approach fits your situation." },
  { q: "How long does a website project take?", a: "A standard marketing site takes 6–8 weeks from brief to launch. E-commerce and web apps are typically 8–14 weeks depending on scope. We set a fixed timeline upfront and hold to it." },
  { q: "What happens after launch?", a: "We offer ongoing retainer support covering updates, performance monitoring, and iterative improvements. You're not left with a finished product and no one to call." },
  { q: "Do you do SEO?", a: "Technical SEO is built into every build — proper structure, schema markup, Core Web Vitals, sitemap. For ongoing content and link-building strategy, that's a separate service." },
] as const;

export default function WebDesignPage() {
  return (
    <>
      <PageHero
        overline="Service"
        title={"WEB DESIGN &\nDEVELOPMENT"}
        description="High-performance websites built on Next.js. Optimised for speed, search, and conversion — not just aesthetics. We build sites that work as hard as the business behind them."
      />

      <section className="bg-brand-black py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-12 section-label">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-brand-accent">What We Build</span>
          </div>
          <div className="grid grid-cols-1 gap-px bg-brand-grey-900/25 md:grid-cols-2">
            {WHAT_WE_BUILD.map((item, i) => (
              <div key={item.title} className="group relative bg-brand-black p-8 transition-colors duration-500 hover:bg-brand-black-mid lg:p-10">
                <div className="accent-line" />
                <span className="mb-4 block font-mono text-xs tracking-[0.15em] text-brand-grey-700 transition-colors duration-300 group-hover:text-brand-accent">0{i + 1}</span>
                <h3 className="mb-3 font-display text-xl font-bold uppercase tracking-[-0.02em] text-brand-white">{item.title}</h3>
                <p className="font-body text-sm leading-relaxed text-brand-grey-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-black-deep py-14 lg:py-18">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="section-label mb-0">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-brand-accent">Tech Stack</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {TECH.map((tech) => (
                <span key={tech} className="border border-brand-grey-700/50 px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-brand-grey-300 transition-all duration-300 hover:border-brand-accent/40 hover:text-brand-white">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-black py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-12 section-label">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-brand-accent">Our Process</span>
          </div>
          <div className="grid grid-cols-1 gap-px bg-brand-grey-900/25 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((item) => (
              <div key={item.step} className="relative bg-brand-black p-8 lg:p-10">
                <span className="mb-4 block font-mono text-xs tracking-[0.15em] text-brand-accent">{item.step}</span>
                <h3 className="mb-3 font-display text-lg font-bold uppercase tracking-[-0.01em] text-brand-white">{item.title}</h3>
                <p className="font-body text-sm leading-relaxed text-brand-grey-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-black-deep py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="mb-8 section-label">
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-brand-accent">Investment</span>
              </div>
              <div className="space-y-6">
                {[
                  { type: "Marketing Website", range: "£3,500 – £8,000", detail: "5–10 pages, CMS, contact forms, SEO foundation" },
                  { type: "E-commerce Store", range: "£6,000 – £18,000", detail: "Product management, payments, inventory, fulfilment" },
                  { type: "Web Application", range: "£12,000 – £40,000+", detail: "Custom functionality, user accounts, integrations, dashboards" },
                  { type: "Monthly Support", range: "£400 – £1,200/mo", detail: "Updates, monitoring, performance, iterative improvements" },
                ].map((item) => (
                  <div key={item.type} className="border-b border-brand-grey-900/40 pb-6 last:border-b-0">
                    <div className="flex items-baseline justify-between gap-4 mb-1 flex-wrap">
                      <span className="font-display text-base font-bold uppercase tracking-[-0.01em] text-brand-white">{item.type}</span>
                      <span className="font-display text-sm font-bold text-brand-accent whitespace-nowrap">{item.range}</span>
                    </div>
                    <p className="font-body text-sm text-brand-grey-500">{item.detail}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 font-body text-xs text-brand-grey-700">All projects are quoted individually after a discovery conversation.</p>
            </div>
            <div>
              <div className="mb-8 section-label">
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-brand-accent">Common Questions</span>
              </div>
              <div className="space-y-6">
                {FAQS.map((faq) => (
                  <div key={faq.q} className="border-b border-brand-grey-900/40 pb-6 last:border-b-0">
                    <h4 className="mb-2 font-display text-sm font-bold uppercase tracking-[-0.01em] text-brand-white">{faq.q}</h4>
                    <p className="font-body text-sm leading-relaxed text-brand-grey-300">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-black py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.15em] text-brand-grey-500">Related Services</p>
              <div className="flex flex-wrap gap-3">
                {[{ label: "Brand Identity", href: "/services/brand-identity" }, { label: "Digital Marketing", href: "/services/digital-marketing" }, { label: "AI Solutions", href: "/services/ai-solutions" }].map((s) => (
                  <Link key={s.label} href={s.href} className="group inline-flex items-center gap-2 border border-brand-grey-700/50 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.1em] text-brand-grey-300 transition-all duration-300 hover:border-brand-accent/40 hover:text-brand-white">
                    {s.label} <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:opacity-100" strokeWidth={2} />
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/contact" className="group inline-flex items-center gap-3 bg-brand-accent px-9 py-4 font-display text-sm font-bold uppercase tracking-[0.15em] text-brand-black transition-all duration-300 hover:shadow-[0_0_60px_rgba(212,255,0,0.18)]">
              Start a Project <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
