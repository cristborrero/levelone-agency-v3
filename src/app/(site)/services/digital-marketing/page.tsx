import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Marketing",
  description: "SEO, paid media, and content strategy for UK businesses. Data-driven campaigns that turn visibility into revenue. Based in Surrey.",
  alternates: { canonical: "/services/digital-marketing" },
};

const SERVICES = [
  { title: "SEO", description: "Technical SEO, on-page optimisation, content strategy, and link building. Sustainable rankings built on substance, not shortcuts." },
  { title: "Paid Search (PPC)", description: "Google and Microsoft Ads. Campaigns that pay for themselves. We manage the budget like it's our own money." },
  { title: "Paid Social", description: "Meta, LinkedIn, TikTok — wherever your audience spends time. Audiences built on data, not assumptions." },
  { title: "Content Strategy", description: "The plan behind what you publish. Topics, formats, cadence — aligned to what your audience is searching for and what competitors aren't doing." },
  { title: "Email Marketing", description: "Sequences and campaigns that convert subscribers into customers. Deliverability, segmentation, and copy that gets opened." },
  { title: "Analytics & Reporting", description: "Clear monthly reporting that tells you what's working, what isn't, and what we're doing about it. No dashboards designed to impress instead of inform." },
] as const;

export default function DigitalMarketingPage() {
  return (
    <>
      <PageHero
        overline="Service"
        title={"DIGITAL\nMARKETING"}
        description="Strategies that turn visibility into revenue. We build audiences that care, campaigns that convert, and reporting that tells the truth."
      />

      <section className="bg-brand-black py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-12 section-label">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-brand-accent">What We Do</span>
          </div>
          <div className="grid grid-cols-1 gap-px bg-brand-grey-900/25 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((item, i) => (
              <div key={item.title} className="group relative bg-brand-black p-8 transition-colors duration-500 hover:bg-brand-black-mid lg:p-10">
                <div className="accent-line" />
                <span className="mb-4 block font-mono text-xs tracking-[0.15em] text-brand-grey-700 transition-colors duration-300 group-hover:text-brand-accent">0{i + 1}</span>
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
                  { type: "SEO Retainer", range: "£1,200 – £3,500/mo", detail: "Technical audits, content, on-page, link building, monthly reporting" },
                  { type: "Paid Media Management", range: "£800 – £2,500/mo", detail: "Ad spend management, creative, optimisation — fee on top of media spend" },
                  { type: "Full Digital Retainer", range: "£2,500 – £5,000/mo", detail: "SEO + paid + content + email + reporting as a single managed service" },
                  { type: "One-off Projects", range: "From £1,500", detail: "Audits, strategy documents, campaign setups, content calendars" },
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
            </div>
            <div>
              <div className="mb-8 section-label">
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-brand-accent">Our Approach</span>
              </div>
              <div className="space-y-6">
                {[
                  { title: "We report what matters", body: "Impressions and clicks are vanity. Enquiries and revenue are what we're accountable to." },
                  { title: "No minimum 12-month lock-ins", body: "We work on rolling 3-month agreements. If we're not delivering, you can leave. That keeps us focused." },
                  { title: "We don't sell what we can't execute", body: "If you need influencer marketing or TV spots, there are better agencies for that. We do what we're excellent at." },
                  { title: "We need a working website first", body: "Marketing traffic sent to a broken or unconvincing website is wasted money. If your site needs work first, we'll say so." },
                ].map((item) => (
                  <div key={item.title} className="border-b border-brand-grey-900/40 pb-6 last:border-b-0">
                    <h4 className="mb-2 font-display text-sm font-bold uppercase tracking-[-0.01em] text-brand-white">{item.title}</h4>
                    <p className="font-body text-sm leading-relaxed text-brand-grey-300">{item.body}</p>
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
                {[{ label: "Web Design & Dev", href: "/services/web-design" }, { label: "AI Solutions", href: "/services/ai-solutions" }].map((s) => (
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
