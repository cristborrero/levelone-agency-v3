import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Brand Identity",
  description: "Visual identities that give UK businesses a competitive edge. Logo systems, brand guidelines, and creative direction. Based in Surrey.",
  alternates: { canonical: "/services/brand-identity" },
};

const DELIVERABLES = [
  { title: "Logo System", description: "Primary logo, variations, and icon mark — built to work at any size, in any context, on any medium." },
  { title: "Color & Typography", description: "A color palette and type system that's coherent, distinctive, and consistently applied across every touchpoint." },
  { title: "Brand Guidelines", description: "A practical document your team can actually use — not a 60-page PDF nobody opens. Rules, examples, and the rationale behind them." },
  { title: "Brand Voice", description: "How your brand sounds in writing. Vocabulary, tone, personality — so everything you publish reads like it came from one person." },
  { title: "Stationery & Collateral", description: "Business cards, letterheads, email signatures, presentation templates. The things that show up in the real world." },
  { title: "Digital Asset Pack", description: "Social profile images, cover photos, email headers, ad templates — sized and ready for every platform." },
] as const;

const FAQS = [
  { q: "How is this different from a logo on Fiverr?", a: "A logo is a mark. A brand identity is a system — it's the logic behind how everything looks and sounds together. A cheap logo often costs more when you have to redo it because it doesn't scale, translate, or work." },
  { q: "Do we need brand strategy first?", a: "We build a working brand brief at the start of every identity project. If you already have a clear strategy, we start from there. If not, we develop it with you as part of the engagement." },
  { q: "Can you refresh an existing brand rather than rebuild?", a: "Yes. A refresh preserves what's working — recognition, brand equity — while resolving what isn't. We'll tell you honestly which is the right call after seeing your current assets." },
  { q: "What do we own at the end?", a: "Everything. All working files, all source files, full IP transfer on final payment. We don't hold anything back." },
] as const;

export default function BrandIdentityPage() {
  return (
    <>
      <PageHero
        overline="Service"
        title={"BRAND\nIDENTITY"}
        description="Visual identities that give your business an unfair advantage. Every element chosen with intent — we don't do decoration."
      />

      <section className="bg-brand-black py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-12 section-label">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-brand-accent">What&apos;s Included</span>
          </div>
          <div className="grid grid-cols-1 gap-px bg-brand-grey-900/25 md:grid-cols-2 lg:grid-cols-3">
            {DELIVERABLES.map((item, i) => (
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
                  { type: "Brand Refresh", range: "£1,800 – £3,500", detail: "Refine and modernise an existing identity without starting from scratch" },
                  { type: "Core Identity", range: "£2,500 – £6,000", detail: "Logo system, colors, typography, guidelines, digital assets" },
                  { type: "Full Brand System", range: "£5,000 – £14,000", detail: "Complete identity including strategy, voice, collateral, and launch assets" },
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
              <p className="mt-6 font-body text-xs text-brand-grey-700">Every engagement is quoted after a brief conversation.</p>
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
                {[{ label: "Web Design & Dev", href: "/services/web-design" }, { label: "Digital Marketing", href: "/services/digital-marketing" }].map((s) => (
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
