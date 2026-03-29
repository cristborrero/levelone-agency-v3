import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";

const CASE_STUDIES = {
  "meridian-finance": {
    title: "Meridian Finance",
    client: "Fintech · London",
    category: "Web Design & Development",
    year: "2026",
    accentColor: "#D4FF00",
    image: "/work/meridian-finance.png",
    brief:
      "Meridian Finance needed to replace a legacy WordPress site that was actively losing them enterprise clients. Their onboarding process required 14 days of manual data entry, and their brand hadn't been updated since 2019. They came to us with a clear brief: make us look like we belong in the room with the big players — without the big-player budget.",
    approach: [
      {
        phase: "Discovery & Audit",
        detail:
          "Two-day deep dive into their existing customer journey. We identified 7 drop-off points in the onboarding flow and mapped out exactly where institutional clients were losing confidence.",
      },
      {
        phase: "Design System",
        detail:
          "Built a complete design language — dark-mode by default, data-dense but clean. Every component designed to handle real financial data, not lorem ipsum.",
      },
      {
        phase: "Development",
        detail:
          "Next.js 14 with Supabase for real-time dashboards. We built a headless CMS so their team could update compliance pages without touching code. Server-side rendering for instant page loads.",
      },
      {
        phase: "Launch & Handover",
        detail:
          "Phased rollout over two weeks. Full documentation, team training, and 30-day post-launch support window included.",
      },
    ],
    results: [
      { metric: "14 → 2 days", label: "Client onboarding time" },
      { metric: "340%", label: "Increase in qualified leads" },
      { metric: "2.1s", label: "Average page load time" },
      { metric: "£0", label: "Post-launch bug fixes (first 90 days)" },
    ],
    testimonial: {
      quote:
        "LevelOne understood our sector from day one. They didn't just build us a website — they gave us a platform that our sales team actually wants to show clients.",
      author: "James Whitfield",
      role: "COO, Meridian Finance",
    },
    stack: ["Next.js 14", "TypeScript", "Supabase", "Tailwind CSS", "Vercel", "Headless CMS"],
    nextProject: { slug: "volta-energy", title: "Volta Energy" },
  },
  "volta-energy": {
    title: "Volta Energy",
    client: "CleanTech · Surrey",
    category: "Brand Identity",
    year: "2025",
    accentColor: "#3B82F6",
    image: "/work/volta-energy.png",
    brief:
      "Volta Energy was a two-person cleantech startup with a breakthrough battery storage technology but no visual identity. They needed a brand that could hold its own in seed-round pitch decks alongside companies ten times their size — and a landing page that would convert investor traffic from their PR campaign.",
    approach: [
      {
        phase: "Brand Strategy",
        detail:
          "Competitive audit of 40+ cleantech brands globally. Identified that most competitors default to generic green gradients. We positioned Volta with a bolder, more architectural identity that signals engineering precision.",
      },
      {
        phase: "Visual Identity",
        detail:
          "Logo system with 6 responsive marks, full colour palette, typography scale, and iconography set. Everything documented in a 40-page brand guidelines PDF.",
      },
      {
        phase: "Motion Toolkit",
        detail:
          "Animated logo reveals, social media templates with parallax effects, and a pitch deck with embedded motion graphics for investor presentations.",
      },
      {
        phase: "Landing Page",
        detail:
          "Single-page site designed for one goal: get investors to book a call. Built in Next.js with Calendly integration and full analytics tracking.",
      },
    ],
    results: [
      { metric: "£340K", label: "Raised in seed round (1 month)" },
      { metric: "12%", label: "Landing page conversion rate" },
      { metric: "3 weeks", label: "Total delivery time" },
      { metric: "40 pages", label: "Brand guidelines document" },
    ],
    testimonial: {
      quote:
        "We walked into our seed pitch with the confidence of a Series B company. The brand LevelOne built gave us instant credibility.",
      author: "Dr. Amara Osei",
      role: "Founder, Volta Energy",
    },
    stack: ["Figma", "After Effects", "Next.js", "Calendly API", "Google Analytics"],
    nextProject: { slug: "novatech-ai", title: "NovaTech AI" },
  },
  "novatech-ai": {
    title: "NovaTech AI",
    client: "SaaS · Guildford",
    category: "AI Solutions & Web App",
    year: "2026",
    accentColor: "#FFB800",
    image: "/work/novatech-ai.png",
    brief:
      "NovaTech was drowning in support tickets. Their 4-person support team was handling 200+ tickets a day, and response times had ballooned to 48 hours. They needed an AI-powered triage and response system that could handle tier-1 queries automatically while routing complex issues to the right specialist — and they needed it live in 8 weeks.",
    approach: [
      {
        phase: "Technical Discovery",
        detail:
          "Analysed 6 months of ticket data to identify the 80/20 — 78% of support tickets fell into 12 categories that could be automated with high confidence.",
      },
      {
        phase: "AI Architecture",
        detail:
          "Built a hybrid system: fine-tuned language model for intent classification, combined with a knowledge-base retrieval system for generating responses grounded in their actual documentation.",
      },
      {
        phase: "Dashboard & Analytics",
        detail:
          "Real-time analytics dashboard showing resolution rate, sentiment analysis, ticket volume trends, and escalation patterns. Built to give the support lead full visibility without opening a single ticket.",
      },
      {
        phase: "Phased Rollout",
        detail:
          "Launched in shadow mode for 2 weeks (AI generates responses but humans approve). Once confidence thresholds were met, switched to autonomous mode with human-in-the-loop for edge cases.",
      },
    ],
    results: [
      { metric: "72%", label: "Reduction in ticket volume" },
      { metric: "48h → 4m", label: "Average response time" },
      { metric: "94%", label: "Customer satisfaction score" },
      { metric: "8 weeks", label: "Prototype to production" },
    ],
    testimonial: {
      quote:
        "Our support team went from firefighting to actually improving the product. The AI handles the routine; our team handles the relationships.",
      author: "Tom Bradley",
      role: "VP Product, NovaTech",
    },
    stack: ["React", "TypeScript", "Python", "OpenAI API", "Supabase", "Vercel"],
    nextProject: { slug: "meridian-finance", title: "Meridian Finance" },
  },
} as const;

type Slug = keyof typeof CASE_STUDIES;

export async function generateStaticParams() {
  return Object.keys(CASE_STUDIES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = CASE_STUDIES[slug as Slug];
  if (!cs) return { title: "Case Study" };
  return {
    title: `${cs.title} — Case Study`,
    description: cs.brief.slice(0, 160),
    alternates: { canonical: `/work/${slug}` },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = CASE_STUDIES[slug as Slug];

  if (!cs) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-black-deep pb-20 pt-36 lg:pb-28 lg:pt-44">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Link
            href="/work"
            className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-brand-grey-500 transition-colors duration-300 hover:text-brand-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} /> Back to Work
          </Link>
          <div className="mb-6 flex items-center gap-6">
            <span
              className="font-mono text-[10px] uppercase tracking-[0.15em]"
              style={{ color: cs.accentColor }}
            >
              {cs.category}
            </span>
            <span className="font-mono text-[10px] tracking-[0.08em] text-brand-grey-700">
              {cs.client} · {cs.year}
            </span>
          </div>
          <h1 className="mb-8 font-display text-[clamp(2.5rem,6vw,5rem)] font-bold uppercase leading-[0.93] tracking-[-0.04em] text-brand-white">
            {cs.title}
          </h1>
          <p className="mb-12 max-w-2xl font-body text-lg leading-relaxed text-brand-grey-300">
            {cs.brief}
          </p>

          {/* Hero image */}
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={cs.image}
              alt={`${cs.title} project showcase`}
              fill
              className="object-cover"
              sizes="(max-width: 1400px) 100vw, 1400px"
              priority
            />
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-brand-black py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="section-label">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-brand-accent">
              Our Approach
            </span>
          </div>
          <h2 className="mb-16 font-display text-[clamp(2rem,4vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-brand-white">
            HOW WE DID IT
          </h2>
          <div className="grid grid-cols-1 gap-px bg-brand-grey-900/20 md:grid-cols-2">
            {cs.approach.map((step, i) => (
              <div
                key={step.phase}
                className="bg-brand-black-deep p-8 lg:p-10"
              >
                <span className="mb-3 block font-mono text-xs tracking-[0.15em] text-brand-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-4 font-display text-lg font-bold uppercase tracking-[-0.02em] text-brand-white">
                  {step.phase}
                </h3>
                <p className="font-body text-sm leading-relaxed text-brand-grey-300">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="bg-brand-black-deep py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="section-label">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-brand-accent">
              Results
            </span>
          </div>
          <h2 className="mb-16 font-display text-[clamp(2rem,4vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-brand-white">
            THE NUMBERS
          </h2>
          <div className="grid grid-cols-2 gap-px bg-brand-grey-900/20 lg:grid-cols-4">
            {cs.results.map((result) => (
              <div key={result.label} className="bg-brand-black p-8 lg:p-10">
                <span
                  className="mb-2 block font-display text-3xl font-bold lg:text-4xl"
                  style={{ color: cs.accentColor }}
                >
                  {result.metric}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-grey-500">
                  {result.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-brand-black py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <div
              className="mx-auto mb-8 h-[2px] w-12"
              style={{ backgroundColor: cs.accentColor }}
            />
            <blockquote className="mb-8 font-display text-xl font-bold leading-snug text-brand-white lg:text-2xl">
              &ldquo;{cs.testimonial.quote}&rdquo;
            </blockquote>
            <p className="font-body text-sm text-brand-grey-300">
              <span className="font-semibold text-brand-white">
                {cs.testimonial.author}
              </span>{" "}
              — {cs.testimonial.role}
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-brand-black-deep py-16">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex flex-wrap items-center gap-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-grey-700">
              Tech Stack
            </span>
            {cs.stack.map((tech) => (
              <span
                key={tech}
                className="border border-brand-grey-700/30 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-brand-grey-500"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Next Project CTA */}
      <section className="bg-brand-black py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.15em] text-brand-grey-700">
                Next Project
              </span>
              <Link
                href={`/work/${cs.nextProject.slug}`}
                className="group inline-flex items-center gap-4 font-display text-3xl font-bold uppercase tracking-[-0.02em] text-brand-white transition-colors duration-300 hover:text-brand-accent lg:text-4xl"
              >
                {cs.nextProject.title}
                <ArrowRight
                  className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-2"
                  strokeWidth={2}
                />
              </Link>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-brand-accent px-9 py-4 font-display text-sm font-bold uppercase tracking-[0.15em] text-brand-black transition-all duration-300 hover:shadow-[0_0_60px_rgba(212,255,0,0.18)]"
            >
              Start Your Project
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
