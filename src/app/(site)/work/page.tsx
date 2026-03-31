import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/shared/PageHero";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects from LevelOne Agency — web design, e-commerce, brand identity, and digital builds for clients across the UK, Spain, and Latin America.",
  alternates: { canonical: "/work" },
};

const PROJECTS = [
  {
    slug: "real-cd-espana",
    title: "Real CD España",
    client: "Sports Club · Honduras",
    category: "Web Design & Brand Identity",
    year: "2024",
    summary:
      "Digital presence for one of Central America's most historic football clubs. A design built to match the prestige of an institution with over a century of history.",
    result: "Full digital identity for a national-level sports institution.",
    tags: ["Web Design", "Brand", "UI/UX"],
    accentColor: "#D4FF00",
    image: "/work/real-cd-espana.webp",
    featured: true,
    liveUrl: "https://realcdespana.com",
  },
  {
    slug: "toucan-photo-tours",
    title: "Toucan Photo Tours",
    client: "Eco-Tourism · Ecuador",
    category: "Full Digital Build",
    year: "2024",
    summary:
      "From zero to live — brand strategy, identity, website, and launch for a nature photography tour operator targeting international English-speaking clients.",
    result: "Complete business launch: brand, web, and digital presence from scratch.",
    tags: ["Branding", "Web Design", "Launch"],
    accentColor: "#00C896",
    image: "/work/toucan-photo-tours.webp",
    featured: false,
    liveUrl: "https://toucanphototours.com",
  },
  {
    slug: "carpimaster",
    title: "Carpimaster",
    client: "B2B Packaging · Spain",
    category: "Web Redesign",
    year: "2025",
    summary:
      "Complete redesign for an established packaging manufacturer — replacing a slow, outdated site that was actively losing them B2B clients with a fast, credible, conversion-focused presence.",
    result: "Modernised digital presence aligned with the quality of their physical product.",
    tags: ["WordPress", "Redesign", "B2B"],
    accentColor: "#FF6B35",
    image: "/work/carpimaster.webp",
    featured: false,
    liveUrl: "https://carpimaster.com",
  },
  {
    slug: "coldfrank",
    title: "Coldfrank",
    client: "Fashion E-commerce · Spain",
    category: "E-commerce Optimisation",
    year: "2024",
    summary:
      "Security hardening, performance optimisation, and conversion strategy for a Spanish streetwear brand — including popup campaigns and discount mechanics to increase revenue.",
    result: "Secured, optimised store with active conversion campaigns.",
    tags: ["E-commerce", "Security", "CRO"],
    accentColor: "#3B82F6",
    image: "/work/coldfrank.webp",
    featured: false,
    liveUrl: "https://coldfrank.com",
  },
] as const;

export default function WorkPage() {
  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  return (
    <>
      <PageHero
        overline="Selected Work"
        title="CASE STUDIES"
        description="A selection of projects across web design, e-commerce, branding, and digital strategy — each one built to solve a real business problem."
      />

      <section className="bg-brand-black py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">

          {/* Featured project */}
          {featured.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group relative mb-px flex flex-col overflow-hidden bg-brand-black transition-colors duration-500 hover:bg-brand-black-mid lg:flex-row lg:items-stretch"
            >
              <div className="accent-line" />
              <div className="relative aspect-video w-full overflow-hidden lg:aspect-auto lg:w-1/2">
                <Image
                  src={project.image}
                  alt={`${project.title} — ${project.category}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-brand-black/60 lg:bg-gradient-to-l lg:from-brand-black/20 lg:to-transparent" />
              </div>
              <div className="flex flex-1 flex-col justify-between p-10 lg:p-16">
                <div>
                  <div className="mb-4 flex items-center gap-6">
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.15em]"
                      style={{ color: project.accentColor }}
                    >
                      {project.category}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.08em] text-brand-grey-700">
                      {project.client} · {project.year}
                    </span>
                  </div>
                  <h2 className="mb-5 font-display text-[clamp(2rem,5vw,4rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-brand-white">
                    {project.title}
                  </h2>
                  <p className="mb-4 font-body text-base leading-relaxed text-brand-grey-300">
                    {project.summary}
                  </p>
                  <span
                    className="font-mono text-sm font-bold"
                    style={{ color: project.accentColor }}
                  >
                    {project.result}
                  </span>
                </div>
                <div className="mt-8 flex items-center gap-3 lg:mt-10">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-brand-grey-700/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-brand-grey-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ArrowUpRight
                    className="ml-auto h-6 w-6 flex-shrink-0 opacity-0 transition-all duration-300 group-hover:opacity-100"
                    style={{ color: project.accentColor }}
                    strokeWidth={2}
                  />
                </div>
              </div>
            </Link>
          ))}

          {/* Grid — remaining projects */}
          <div className="grid grid-cols-1 gap-px bg-brand-grey-900/20 md:grid-cols-3 mt-px">
            {rest.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group relative flex flex-col overflow-hidden bg-brand-black transition-colors duration-500 hover:bg-brand-black-mid"
              >
                <div className="accent-line" />
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.title} — ${project.category}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col justify-between p-8 lg:p-10">
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-grey-500">
                        {project.category}
                      </span>
                      <span className="font-mono text-[10px] text-brand-grey-700">
                        {project.year}
                      </span>
                    </div>
                    <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.1em] text-brand-grey-700">
                      {project.client}
                    </p>
                    <h3 className="mb-3 font-display text-xl font-bold uppercase leading-tight tracking-[-0.02em] text-brand-white">
                      {project.title}
                    </h3>
                    <p className="mb-6 font-body text-sm leading-relaxed text-brand-grey-300">
                      {project.summary}
                    </p>
                  </div>
                  <div className="flex items-end justify-between">
                    <span
                      className="font-mono text-xs font-bold"
                      style={{ color: project.accentColor }}
                    >
                      {project.result}
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:opacity-100"
                      style={{ color: project.accentColor }}
                      strokeWidth={2}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
