"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    id: "01",
    slug: "meridian-finance",
    title: "Meridian Finance",
    client: "Fintech · London",
    category: "Web Design & Development",
    year: "2026",
    description:
      "Full digital transformation for a London fintech. Headless CMS, real-time dashboards, brand identity built for institutional trust.",
    result: "Client onboarding from 14 days → 2 days.",
    tags: ["Next.js", "Supabase", "Branding"],
    accentColor: "#D4FF00",
    image: "/work/meridian-finance.png",
    gridSpan: "md:col-span-2 md:row-span-2",
  },
  {
    id: "02",
    slug: "volta-energy",
    title: "Volta Energy",
    client: "CleanTech · Surrey",
    category: "Brand Identity",
    year: "2025",
    description:
      "Complete visual identity for a sustainable energy startup — logo system, motion toolkit, and launch campaign.",
    result: "£340K raised in seed round the month after launch.",
    tags: ["Identity", "Motion", "Strategy"],
    accentColor: "#3B82F6",
    image: "/work/volta-energy.png",
    gridSpan: "md:col-span-1 md:row-span-2",
  },
  {
    id: "03",
    slug: "novatech-ai",
    title: "NovaTech AI",
    client: "SaaS · Guildford",
    category: "AI Solutions & Web App",
    year: "2026",
    description:
      "AI-powered customer support platform with real-time analytics — prototype to production in 8 weeks.",
    result: "72% reduction in support ticket volume.",
    tags: ["React", "AI", "Dashboard"],
    accentColor: "#FFB800",
    image: "/work/novatech-ai.png",
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
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-brand-grey-300 transition-colors duration-300 hover:text-brand-white"
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
              {/* Project image as background */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={project.image}
                  alt={`${project.title} — ${project.category}`}
                  fill
                  className="object-cover opacity-30 transition-all duration-700 group-hover:opacity-50 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/70 to-transparent" />
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
                        className="border border-brand-grey-700/30 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-brand-grey-500 transition-colors duration-300 group-hover:border-brand-grey-700/60 group-hover:text-brand-grey-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ArrowUpRight
                    className="h-5 w-5 flex-shrink-0 opacity-0 transition-all duration-300 group-hover:opacity-100"
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
