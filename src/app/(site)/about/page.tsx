import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "LevelOne Agency is a Surrey-based digital agency building websites, brands, and digital strategies that give UK businesses a competitive edge.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  { name: "Precision", description: "Every pixel and every line of code has a reason. We don't ship work we wouldn't stand behind." },
  { name: "Audacity", description: "We propose what others don't dare. Conservative creative work is the most expensive kind." },
  { name: "Velocity", description: "Fast — without the shortcuts that cost you later. Eight weeks from brief to live is our baseline." },
  { name: "Ownership", description: "We treat your metrics like our own. If a launch doesn't perform, we stay until it does." },
  { name: "Evolution", description: "We reinvent before the market asks us to. The tools we use today are already different from last year's." },
] as const;

const CAPABILITIES = [
  "Next.js & React", "Headless CMS", "Brand Identity", "Motion Graphics",
  "SEO & Content", "Paid Media", "AI Workflows", "Analytics & Data",
  "E-commerce", "Video Production",
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        overline="About LevelOne"
        title={"WE DON'T BUILD\nWEBSITES."}
        titleAccent="WE BUILD EDGES."
        description="A UK digital agency for mid-market businesses that have earned the right to be taken seriously online — and whose digital presence doesn't yet reflect that."
      />

      <section className="bg-brand-black py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <p className="mb-6 font-body text-lg leading-relaxed text-brand-grey-300">
                LevelOne was built on a simple observation: the gap between what
                top-tier London agencies charge and what most UK businesses actually
                need is enormous. And in that gap, a lot of good businesses are left
                with mediocre digital work.
              </p>
              <p className="mb-6 font-body text-lg leading-relaxed text-brand-grey-300">
                We exist to close that gap. Not by cutting corners — by working
                smarter. AI-assisted delivery. Lean processes. A team that treats
                every project like it&apos;s the only one on the desk.
              </p>
              <p className="font-body text-lg leading-relaxed text-brand-grey-300">
                Based in Surrey. Working across the UK.
              </p>
            </div>
            <div className="space-y-8 border-l border-brand-grey-900/40 pl-8">
              {VALUES.map((v) => (
                <div key={v.name} className="group">
                  <h3 className="mb-1.5 font-display text-sm font-bold uppercase tracking-[0.06em] text-brand-white transition-colors duration-300 group-hover:text-brand-accent">
                    {v.name}
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-brand-grey-500">
                    {v.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-black-deep py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-12 section-label">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-brand-accent">
              Capabilities
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            {CAPABILITIES.map((cap) => (
              <span
                key={cap}
                className="border border-brand-grey-700/50 px-4 py-2 font-mono text-xs uppercase tracking-widest text-brand-grey-300 transition-all duration-300 hover:border-brand-accent/40 hover:text-brand-white"
              >
                {cap}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-black py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-brand-white">
              READY TO WORK TOGETHER?
            </h2>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 bg-brand-accent px-9 py-4 font-display text-sm font-bold uppercase tracking-[0.15em] text-brand-black transition-all duration-300 hover:shadow-[0_0_60px_rgba(212,255,0,0.18)]"
              >
                Start a Project
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 border border-brand-grey-700 px-9 py-4 font-mono text-xs uppercase tracking-[0.15em] text-brand-grey-300 transition-all duration-300 hover:border-brand-white hover:text-brand-white"
              >
                See Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
