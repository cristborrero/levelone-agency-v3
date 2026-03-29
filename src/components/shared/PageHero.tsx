"use client";

import { motion } from "motion/react";

interface PageHeroProps {
  overline: string;
  title: string;
  titleAccent?: string;
  description?: string;
}

export function PageHero({ overline, title, titleAccent, description }: PageHeroProps) {
  const lines = title.split("\n");

  return (
    <section className="relative overflow-hidden bg-brand-black-deep pb-16 pt-36 lg:pb-24 lg:pt-44">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: i * 0.08, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 h-full w-px origin-top bg-brand-grey-900/20"
            style={{ left: `${(i + 1) * (100 / 5)}%` }}
          />
        ))}
      </div>

      <div
        className="pointer-events-none absolute -right-20 top-0 h-[400px] w-[400px] rounded-full blur-[100px]"
        style={{ backgroundColor: "rgba(212,255,0,0.04)" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="section-label mb-6"
        >
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-brand-accent">
            {overline}
          </span>
        </motion.div>

        <h1 className="mb-6 max-w-4xl">
          {lines.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                className="block font-display font-bold uppercase leading-[0.93] tracking-[-0.04em] text-brand-white text-[clamp(2.8rem,7vw,6.5rem)]"
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{
                  delay: 0.1 + i * 0.1,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
          {titleAccent && (
            <span className="block overflow-hidden">
              <motion.span
                className="block font-display font-bold uppercase leading-[0.93] tracking-[-0.04em] text-brand-accent text-[clamp(2.8rem,7vw,6.5rem)]"
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{
                  delay: 0.1 + lines.length * 0.1,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {titleAccent}
              </motion.span>
            </span>
          )}
        </h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-xl font-body text-lg leading-relaxed text-brand-grey-300"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
