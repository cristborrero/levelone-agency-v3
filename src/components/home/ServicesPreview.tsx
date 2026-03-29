"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const SERVICES = [
  {
    number: "01",
    title: "Web Design & Development",
    href: "/services/web-design",
    description:
      "High-performance sites built on Next.js. Optimised for speed, search, and conversion — not just aesthetics.",
    tags: ["Next.js", "React", "Headless", "E-commerce"],
  },
  {
    number: "02",
    title: "Brand Identity",
    href: "/services/brand-identity",
    description:
      "Visual identities that give your business an unfair advantage. Every element chosen with intent.",
    tags: ["Strategy", "Identity", "Print", "Guidelines"],
  },
  {
    number: "03",
    title: "Digital Marketing",
    href: "/services/digital-marketing",
    description:
      "Strategies that turn visibility into revenue. Audiences that care, campaigns that convert, reporting that tells the truth.",
    tags: ["SEO", "Paid Media", "Content", "Analytics"],
  },
  {
    number: "04",
    title: "AI Solutions",
    href: "/services/ai-solutions",
    description:
      "AI workflows, chatbots, and automation built for your specific operation. Measurable competitive edge.",
    tags: ["Chatbots", "Automation", "Integrations", "Data"],
  },
] as const;

export function ServicesPreview() {
  return (
    <section id="services" className="relative bg-brand-black py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16 flex flex-col gap-6 lg:mb-20 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <div className="section-label">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-brand-accent">
                What We Do
              </span>
            </div>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-brand-white">
              SERVICES
            </h2>
          </div>
          <div className="flex flex-col gap-4 lg:items-end">
            <p className="max-w-sm font-body text-base leading-relaxed text-brand-grey-300 lg:text-right">
              Not generalists pretending to be specialists. Each service we
              offer is one we do at a level worth paying for.
            </p>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-brand-grey-300 transition-colors duration-300 hover:text-brand-white"
            >
              All services
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-px bg-brand-grey-900/25 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                delay: i * 0.1,
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <Link
                href={service.href}
                className="group relative flex h-full flex-col justify-between bg-brand-black p-8 transition-colors duration-500 hover:bg-brand-black-mid lg:p-10"
              >
                <div className="accent-line" />
                <div>
                  <span className="mb-6 block font-mono text-xs tracking-[0.15em] text-brand-grey-700 transition-colors duration-300 group-hover:text-brand-accent">
                    {service.number}
                  </span>
                  <h3 className="mb-4 font-display text-xl font-bold uppercase leading-tight tracking-[-0.02em] text-brand-white lg:text-2xl">
                    {service.title}
                  </h3>
                  <p className="mb-8 font-body text-sm leading-relaxed text-brand-grey-300">
                    {service.description}
                  </p>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-brand-grey-700/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-brand-grey-500 transition-all duration-300 group-hover:border-brand-accent/30 group-hover:text-brand-grey-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ArrowUpRight
                    className="h-5 w-5 flex-shrink-0 text-brand-accent opacity-0 transition-all duration-300 group-hover:opacity-100"
                    strokeWidth={2}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
