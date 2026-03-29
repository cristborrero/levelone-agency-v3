"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-brand-black-deep py-24 lg:py-32">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        style={{ backgroundColor: "rgba(212,255,0,0.05)" }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="section-label">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-brand-accent">
                Ready?
              </span>
            </div>
            <h2 className="font-display text-[clamp(2.5rem,6vw,6rem)] font-bold uppercase leading-[0.92] tracking-[-0.04em] text-brand-white">
              LET&apos;S BUILD
              <br />
              SOMETHING
              <br />
              <span className="text-brand-accent">THAT LASTS.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col gap-4"
          >
            <p className="max-w-xs font-body text-base leading-relaxed text-brand-grey-300">
              Tell us about your project. We&apos;ll come back within one working day
              — a considered response, not an auto-reply.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 bg-brand-accent px-9 py-4 font-display text-sm font-bold uppercase tracking-[0.15em] text-brand-black transition-all duration-300 hover:shadow-[0_0_60px_rgba(212,255,0,0.18)]"
              >
                Start a Project
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2.5}
                />
              </Link>
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 border border-brand-grey-700 px-9 py-4 font-mono text-xs uppercase tracking-[0.15em] text-brand-grey-300 transition-all duration-300 hover:border-brand-white hover:text-brand-white"
              >
                Get a Quote
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
