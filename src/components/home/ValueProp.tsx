"use client";

import { motion } from "motion/react";
import { Building2, Users, Cpu, Receipt } from "lucide-react";

const ADVANTAGES = [
  {
    icon: Building2,
    title: "No London Office",
    description:
      "Surrey-based, remote-first. Zero rent markup shows up in your quote, not ours.",
  },
  {
    icon: Users,
    title: "Senior-Only Team",
    description:
      "No junior handoffs. Every project is led by experienced strategists and developers.",
  },
  {
    icon: Cpu,
    title: "AI-Assisted Delivery",
    description:
      "We use AI to accelerate production — not to replace craft. Speed without shortcuts.",
  },
  {
    icon: Receipt,
    title: "Fixed-Price Projects",
    description:
      "Scoped, quoted, locked. You know the investment before we start. No hourly creep.",
  },
] as const;

export function ValueProp() {
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
              The Model
            </span>
          </div>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-brand-white">
              WHY WE COST LESS
              <br />
              <span className="text-brand-accent">NOT LESS GOOD.</span>
            </h2>
            <p className="max-w-sm font-body text-base leading-relaxed text-brand-grey-300 lg:text-right">
              London agency quality without the London agency overhead. The
              difference is structure — not skill.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-px bg-brand-grey-900/20 sm:grid-cols-2 lg:grid-cols-4">
          {ADVANTAGES.map((advantage, i) => (
            <motion.div
              key={advantage.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                delay: i * 0.1,
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="group relative bg-brand-black-deep p-8 lg:p-10"
            >
              <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-brand-accent transition-transform duration-500 group-hover:scale-x-100" />
              <advantage.icon
                className="mb-6 h-6 w-6 text-brand-accent"
                strokeWidth={1.5}
              />
              <h3 className="mb-3 font-display text-lg font-bold uppercase tracking-[-0.02em] text-brand-white">
                {advantage.title}
              </h3>
              <p className="font-body text-sm leading-relaxed text-brand-grey-300">
                {advantage.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
