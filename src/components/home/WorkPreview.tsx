"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    id: "01",
    slug: "real-cd-espana",
    title: "Real CD España",
    client: "Sports Club · Honduras",
    category: "Web Design & Brand Identity",
    year: "2024",
    description:
      "Digital presence for one of Central America's most historic football clubs — dark, bold, built to match the prestige of a century-old institution.",
    result: "Full digital identity for a national-level sports institution.",
    tags: ["Web Design", "Brand", "UI/UX"],
    accentColor: "#D4FF00",
    image: "/work/real-cd-espana.webp",
    gridSpan: "md:col-span-2 md:row-span-2",
  },
  {
    id: "02",
    slug: "toucan-photo-tours",
    title: "Toucan Photo Tours",
    client: "Eco-Tourism · Ecuador",
    category: "Full Digital Build",
    year: "2024",
    description:
      "From zero to live — brand, website, and launch strategy for a nature photography tour operator targeting international clients.",
    result: "Complete business launch from idea to live brand.",
    tags: ["Branding", "Web Design", "Launch"],
    accentColor: "#00C896",
    image: "/work/toucan-photo-tours.webp",
    gridSpan: "md:col-span-1 md:row-span-2",
  },
  {
    id: "03",
    slug: "carpimaster",
    title: "Carpimaster",
    client: "B2B Packaging · Spain",
    category: "Web Redesign",
    year: "2025",
    description:
      "Complete redesign for an established packaging manufacturer — replacing a slow, outdated site that was losing them B2B clients.",
    result: "Modernised, fast, conversion-focused B2B presence.",
    tags: ["WordPress", "Redesign", "B2B"],
    accentColor: "#FF6B35",
    image: "/work/carpimaster.webp",
    gridSpan: "md:col-span-1 md:row-span-2",
  },
] as const;

export function WorkPreview() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="work" className="relative bg-brand-black-deep py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16 flex flex-col gap-4 lg:mb-20 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <div className="section-label">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-brand-accent">
                Selected Work
              </span>
            </div>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-brand-white">
              CASE STUDIES
            </h2>
          </div>
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-brand-grey-300 transition-colors duration-300 hover:text-brand-white"
          >
            View all work
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
          </Link>
        </motion.div>

        <div className="grid auto-rows-[280px] grid-cols-1 gap-px bg-brand-grey-900/20 md:grid-cols-2 md:auto-rows-[320px]">
          {PROJECTS.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                delay: i * 0.08,
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`group relative cursor-pointer overflow-hidden bg-brand-black ${project.gridSpan}`}
            >
              {/* Background image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={project.image}
                  alt={`${project.title} — ${project.category}`}
                  fill
                  className="object-cover opacity-40 transition-all duration-700 group-hover:opacity-60 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-brand-black via-brand-black/60 to-transparent" />
              </div>

              {/* Accent top bar */}
              <div
                className="absolute inset-x-0 top-0 z-10 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{ backgroundColor: project.accentColor }}
              />

              <AnimatePresence>
                {hoveredId === project.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="pointer-events-none absolute inset-0 z-[1]"
                    style={{
                      background: `radial-gradient(ellipse at 80% 80%, ${project.accentColor}0A 0%, transparent 65%)`,
                    }}
                  />
                )}
              </AnimatePresence>

              <Link
                href={`/work/${project.slug}`}
                className="relative z-10 flex h-full flex-col justify-between p-8 lg:p-10"
                aria-label={`Case study: ${project.title}`}
              >
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-grey-400 transition-colors duration-300 group-hover:text-brand-grey-300">
                      {project.client}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.08em] text-brand-grey-500">
                      {project.year}
                    </span>
                  </div>
                  <span
                    className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] transition-colors duration-300"
                    style={{
                      color:
                        hoveredId === project.id
                          ? project.accentColor
                          : "var(--color-brand-grey-500)",
                    }}
                  >
                    {project.category}
                  </span>
                  <h3 className="mb-3 font-display text-xl font-bold uppercase leading-tight tracking-[-0.02em] text-brand-white lg:text-2xl">
                    {project.title}
                  </h3>
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={
                      hoveredId === project.id
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 8 }
                    }
                    transition={{ duration: 0.3 }}
                    className="max-w-md font-body text-sm leading-relaxed text-brand-grey-300"
                  >
                    {project.description}
                  </motion.p>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-brand-grey-700/30 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-brand-grey-500 transition-colors duration-300 group-hover:border-brand-grey-700/60 group-hover:text-brand-grey-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ArrowUpRight
                    className="h-5 w-5 shrink-0 opacity-0 transition-all duration-300 group-hover:opacity-100"
                    style={{ color: project.accentColor }}
                    strokeWidth={2}
                  />
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
