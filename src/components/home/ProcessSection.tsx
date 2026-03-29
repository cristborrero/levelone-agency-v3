"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

const STEPS = [
  {
    number: "01",
    title: "DISCOVER",
    description:
      "We audit what you have, identify what's costing you, and define what winning looks like for your sector.",
    duration: "Week 1",
  },
  {
    number: "02",
    title: "STRATEGY",
    description:
      "Scope, architecture, tech stack, and KPIs — locked in writing before a single pixel moves.",
    duration: "Week 2",
  },
  {
    number: "03",
    title: "DESIGN",
    description:
      "High-fidelity concepts approved by you before we write a line of code. No surprises.",
    duration: "Weeks 3–4",
  },
  {
    number: "04",
    title: "BUILD",
    description:
      "Clean code, modern frameworks, performance-first. Fast — without the shortcuts that cost you later.",
    duration: "Weeks 4–7",
  },
  {
    number: "05",
    title: "LAUNCH",
    description:
      "Deployment, QA, analytics, and handover. Then ongoing support to keep the momentum.",
    duration: "Week 8+",
  },
] as const;

export function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative bg-brand-black py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16 lg:mb-20"
        >
          <div className="section-label">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-brand-accent">
              How We Work
            </span>
          </div>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-brand-white">
              OUR PROCESS
            </h2>
            <p className="max-w-sm font-body text-base leading-relaxed text-brand-grey-300 lg:text-right">
              Five phases. Zero ambiguity. From first call to live launch in as
              little as 8 weeks.
            </p>
          </div>
        </motion.div>

        {/* Desktop */}
        <div ref={ref} className="hidden lg:block">
          <div className="relative mb-10 h-px w-full bg-brand-grey-900/50">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{
                duration: 1.6,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.2,
              }}
              className="absolute inset-y-0 left-0 w-full origin-left bg-brand-accent"
            />
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.2, duration: 0.35 }}
                className="absolute top-1/2 -translate-y-1/2"
                style={{ left: `${i * 25}%` }}
              >
                <div className="flex h-4 w-4 items-center justify-center bg-brand-accent">
                  <div className="h-1.5 w-1.5 bg-brand-black" />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-5 gap-px">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.5 + i * 0.12,
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="border-l border-brand-grey-900/30 py-2 pl-6 pr-4 first:border-l-0 first:pl-0"
              >
                <span className="mb-3 block font-mono text-xs tracking-[0.15em] text-brand-accent">
                  {step.number}
                </span>
                <h3 className="mb-3 font-display text-lg font-bold uppercase tracking-[-0.02em] text-brand-white">
                  {step.title}
                </h3>
                <p className="mb-5 font-body text-sm leading-relaxed text-brand-grey-300">
                  {step.description}
                </p>
                <span className="inline-block border border-brand-grey-700/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-brand-grey-500">
                  {step.duration}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="lg:hidden">
          <div className="relative border-l-2 border-brand-grey-900/40 pl-8">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute bottom-0 left-[-1px] top-0 w-0.5 origin-top bg-brand-accent"
            />
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="relative mb-12 last:mb-0"
              >
                <div className="absolute -left-[calc(2rem+5px)] top-0 flex h-4 w-4 items-center justify-center bg-brand-accent">
                  <div className="h-1.5 w-1.5 bg-brand-black" />
                </div>
                <span className="mb-2 block font-mono text-xs tracking-[0.15em] text-brand-accent">
                  {step.number}
                </span>
                <h3 className="mb-2 font-display text-xl font-bold uppercase tracking-[-0.02em] text-brand-white">
                  {step.title}
                </h3>
                <p className="mb-4 font-body text-sm leading-relaxed text-brand-grey-300">
                  {step.description}
                </p>
                <span className="inline-block border border-brand-grey-700/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-brand-grey-500">
                  {step.duration}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
