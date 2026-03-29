import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Get a Quote",
  description: "Get a no-obligation quote from LevelOne Agency. Tell us your project basics and we'll respond within one working day.",
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  return (
    <>
      <PageHero
        overline="Quick Quote"
        title="GET A QUOTE"
        description="Give us the basics and we'll come back with a straight answer on timing and budget. No obligation, no auto-replies."
      />
      <section className="bg-brand-black py-20 lg:py-28">
        <div className="mx-auto max-w-2xl px-6 lg:px-10">
          <p className="mb-8 font-body text-base leading-relaxed text-brand-grey-300">
            For a detailed quote, use our full contact form — we respond within
            one working day with a considered breakdown of scope, timeline, and
            investment.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 bg-brand-accent px-9 py-4 font-display text-sm font-bold uppercase tracking-[0.15em] text-brand-black transition-all duration-300 hover:shadow-[0_0_60px_rgba(212,255,0,0.18)]"
            >
              Go to Contact Form
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2.5}
              />
            </Link>
            <a
              href="mailto:hello@leveloneagency.co.uk?subject=Quote Request"
              className="inline-flex items-center gap-2 border border-brand-grey-700 px-9 py-4 font-mono text-xs uppercase tracking-[0.15em] text-brand-grey-300 transition-all duration-300 hover:border-brand-white hover:text-brand-white"
            >
              Email Directly
            </a>
          </div>

          <div className="mt-16 border-t border-brand-grey-900/40 pt-10">
            <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.15em] text-brand-grey-500">
              Typical Starting Budgets
            </p>
            <div className="space-y-4">
              {[
                { service: "Marketing Website", range: "£3,500 – £8,000" },
                { service: "Brand Identity", range: "£2,500 – £6,000" },
                { service: "Digital Marketing Retainer", range: "£1,200 – £3,500/mo" },
                { service: "AI Solutions", range: "£2,000 – £8,000" },
                { service: "Full Digital Package", range: "£8,000 – £25,000" },
              ].map((item) => (
                <div
                  key={item.service}
                  className="flex items-center justify-between border-b border-brand-grey-900/30 pb-4 last:border-b-0"
                >
                  <span className="font-body text-sm text-brand-grey-300">{item.service}</span>
                  <span className="font-display text-sm font-bold text-brand-accent">{item.range}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 font-body text-xs text-brand-grey-700">
              All projects are quoted individually after a brief conversation.
              These ranges reflect typical scope — simpler or more complex
              projects will vary.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
