"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const VALUES = [
  { name: "Precision", desc: "Every pixel and every line of code has a reason." },
  { name: "Audacity", desc: "We propose what others don't dare." },
  { name: "Velocity", desc: "Fast — without the shortcuts that cost you later." },
  { name: "Ownership", desc: "We treat your metrics like our own." },
] as const;

const STATS = [
  { value: "50+", label: "Projects Shipped" },
  { value: "12", label: "Industries Served" },
  { value: "8wk", label: "Avg. Delivery" },
  { value: "100%", label: "UK-Based" },
] as const;

export function AboutTeaser() {
  return (
    <section id="about" className="relative bg-brand-black-deep py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="section-label">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-brand-accent">
                About LevelOne
              </span>
            </div>
            <h2 className="mb-8 font-display text-[clamp(2rem,4vw,3.5rem)] font-bold uppercase leading-[1.02] tracking-[-0.03em] text-brand-white">
              WE DON&apos;T BUILD
              <br />
              WEBSITES.
              <br />
              <span className="text-brand-accent">WE BUILD EDGES.</span>
            </h2>
            <p className="mb-8 max-w-lg font-body text-base leading-relaxed text-brand-grey-300">
              LevelOne is a UK-based digital agency for mid-market businesses
              that have earned the right to be taken seriously online — and
              whose digital presence doesn&apos;t yet reflect that.
            </p>
            <p className="mb-10 max-w-lg font-body text-base leading-relaxed text-brand-grey-300">
              Based in Surrey. Working across the UK. Sharp design, modern
              engineering, AI-assisted delivery.
            </p>
            <Link
              href="/about"
              className="group inline-flex items-center gap-3 border-b border-brand-grey-700 pb-1 font-body text-sm font-medium text-brand-grey-300 transition-all duration-300 hover:border-brand-white hover:text-brand-white"
            >
              More about us
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
              />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col justify-end"
          >
            <div className="space-y-6 border-l border-brand-grey-900/40 pl-8">
              {VALUES.map((value, i) => (
                <motion.div
                  key={value.name}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.25 + i * 0.08,
                    duration: 0.5,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="group"
                >
                  <h4 className="mb-1 font-display text-sm font-bold uppercase tracking-[0.06em] text-brand-white transition-colors duration-300 group-hover:text-brand-accent">
                    {value.name}
                  </h4>
                  <p className="font-body text-sm text-brand-grey-500">
                    {value.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 grid grid-cols-2 gap-px bg-brand-grey-900/20 lg:mt-24 lg:grid-cols-4"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.08,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="bg-brand-black-deep p-8 text-center lg:p-10"
            >
              <span className="mb-2 block font-display text-3xl font-bold text-brand-accent lg:text-4xl">
                {stat.value}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-grey-500">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
