import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/shared/PageHero";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies and selected projects from LevelOne Agency. Web design, branding, and digital campaigns for UK businesses.",
  alternates: { canonical: "/work" },
};

const PROJECTS = [
  {
    slug: "meridian-finance",
    title: "Meridian Finance",
    client: "Fintech · London",
    category: "Web Design & Development",
    year: "2026",
    summary: "Full digital transformation for a London fintech — headless CMS, real-time dashboards, brand identity built for institutional trust.",
    result: "Client onboarding from 14 days → 2 days.",
    tags: ["Next.js", "Supabase", "Brand Identity"],
    accentColor: "#D4FF00",
    image: "/work/meridian-finance.png",
    featured: true,
  },
  {
    slug: "volta-energy",
    title: "Volta Energy",
    client: "CleanTech · Surrey",
    category: "Brand Identity",
    year: "2025",
    summary: "Complete visual identity for a sustainable energy startup — logo system, motion toolkit, and launch campaign.",
    result: "£340K raised in seed round the month after launch.",
    tags: ["Identity", "Motion", "Strategy"],
    accentColor: "#3B82F6",
    image: "/work/volta-energy.png",
    featured: false,
  },
  {
    slug: "novatech-ai",
    title: "NovaTech AI",
    client: "SaaS · Guildford",
    category: "AI Solutions & Web App",
    year: "2026",
    summary: "AI-powered customer support platform with real-time analytics — from prototype to production in 8 weeks.",
    result: "72% reduction in support ticket volume.",
    tags: ["React", "AI/ML", "Dashboard"],
    accentColor: "#FFB800",
    image: "/work/novatech-ai.png",
    featured: false,
  },
] as const;

export default function WorkPage() {
  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);
  return (
    <>
      <PageHero overline="Selected Work" title="CASE STUDIES" description="A selection of projects where we made a measurable difference." />
      <section className="bg-brand-black py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          {featured.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group relative mb-px flex flex-col overflow-hidden bg-brand-black transition-colors duration-500 hover:bg-brand-black-mid lg:flex-row lg:items-stretch"
            >
              <div className="accent-line" />
              {/* Featured image */}
              <div className="relative aspect-video w-full overflow-hidden lg:aspect-auto lg:w-1/2">
                <Image
                  src={project.image}
                  alt={`${project.title} case study`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-brand-black/60 lg:bg-gradient-to-l lg:from-brand-black/30 lg:to-transparent" />
              </div>
              {/* Content */}
              <div className="flex flex-1 flex-col justify-between p-10 lg:p-16">
                <div>
                  <div className="mb-4 flex items-center gap-6">
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: project.accentColor }}>{project.category}</span>
                    <span className="font-mono text-[10px] tracking-[0.08em] text-brand-grey-700">{project.client} · {project.year}</span>
                  </div>
                  <h2 className="mb-5 font-display text-[clamp(2rem,5vw,4rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-brand-white">{project.title}</h2>
                  <p className="mb-4 font-body text-base leading-relaxed text-brand-grey-300">{project.summary}</p>
                  <span className="font-mono text-sm font-bold" style={{ color: project.accentColor }}>{project.result}</span>
                </div>
                <div className="mt-8 flex items-center gap-3 lg:mt-10">
                  <div className="flex flex-wrap gap-2">{project.tags.map((tag) => (<span key={tag} className="border border-brand-grey-700/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-brand-grey-500">{tag}</span>))}</div>
                  <ArrowUpRight className="ml-auto h-6 w-6 flex-shrink-0 opacity-0 transition-all duration-300 group-hover:opacity-100" style={{ color: project.accentColor }} strokeWidth={2} />
                </div>
              </div>
            </Link>
          ))}
          <div className="grid grid-cols-1 gap-px bg-brand-grey-900/20 md:grid-cols-2 mt-px">
            {rest.map((project) => (
              <Link key={project.slug} href={`/work/${project.slug}`} className="group relative flex flex-col overflow-hidden bg-brand-black transition-colors duration-500 hover:bg-brand-black-mid">
                <div className="accent-line" />
                {/* Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.title} project`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent" />
                </div>
                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-8 lg:p-10">
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-grey-500">{project.category}</span>
                      <span className="font-mono text-[10px] text-brand-grey-700">{project.year}</span>
                    </div>
                    <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.1em] text-brand-grey-500">{project.client}</p>
                    <h3 className="mb-4 font-display text-2xl font-bold uppercase leading-tight tracking-[-0.02em] text-brand-white">{project.title}</h3>
                    <p className="mb-6 font-body text-sm leading-relaxed text-brand-grey-300">{project.summary}</p>
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="font-mono text-xs font-bold" style={{ color: project.accentColor }}>{project.result}</span>
                    <ArrowUpRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:opacity-100" style={{ color: project.accentColor }} strokeWidth={2} />
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
