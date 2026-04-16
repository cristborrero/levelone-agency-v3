import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";

const CASE_STUDIES = {
  "real-cd-espana": {
    title: "Real CD España",
    client: "Sports Club · Honduras",
    category: "Web Design & Brand Identity",
    year: "2024",
    accentColor: "#D4FF00",
    image: "/work/real-cd-espana.webp",
    liveUrl: "https://realcdespana.com",
    brief:
      "Real Club Deportivo España is one of Central America's oldest and most celebrated football clubs — a national institution with over a century of history and a passionate fanbase across Honduras and the diaspora. Despite that legacy, their digital presence didn't reflect it. The brief was clear: build a site that matches the prestige of the club and gives fans a destination they're proud to share.",
    approach: [
      {
        phase: "Design Direction",
        detail:
          "The visual language needed to communicate tradition, pride, and modernity simultaneously. We built a dark, high-contrast design system using the club's identity colours — bold typography, sharp grid structure, and purposeful use of photography to let the club's history speak for itself.",
      },
      {
        phase: "UI & Component Design",
        detail:
          "Every section — hero, app download, news feed, ticketing — was designed as a standalone module built to scale as the club's digital presence grows. Mobile-first throughout, given the majority of the fanbase accesses via smartphone.",
      },
      {
        phase: "App Integration",
        detail:
          "A central goal was driving downloads of the club's official mobile app. We designed dedicated app promotion sections with App Store and Google Play CTAs embedded naturally into the content flow — not treated as afterthought banners.",
      },
      {
        phase: "Performance & Handover",
        detail:
          "Optimised for fast load across variable connection speeds — a key requirement for a Central American audience. Full asset handover to the club's internal team with documentation for ongoing management.",
      },
    ],
    results: [
      { metric: "100+", label: "Years of history represented" },
      { metric: "Mobile-first", label: "Design approach" },
      { metric: "2 platforms", label: "App Store & Google Play" },
      { metric: "Full handover", label: "Assets & documentation" },
    ],
    testimonial: {
      quote:
        "The site finally looks like it belongs to a club of our stature. Our fans notice the difference — and so do our sponsors.",
      author: "Communications Department",
      role: "Real Club Deportivo España",
    },
    stack: ["HTML", "CSS", "JavaScript", "Responsive Design", "Figma", "App Store Integration"],
    nextProject: { slug: "toucan-photo-tours", title: "Toucan Photo Tours" },
  },

  "toucan-photo-tours": {
    title: "Toucan Photo Tours",
    client: "Eco-Tourism · Ecuador",
    category: "Full Digital Build",
    year: "2024",
    accentColor: "#00C896",
    image: "/work/toucan-photo-tours.webp",
    liveUrl: "https://toucanphototours.com",
    brief:
      "Toucan Photo Tours didn't exist yet. The idea was a nature and wildlife photography tour operator based in Ecuador, targeting international travellers — primarily English-speaking photographers and adventure tourists looking for immersive experiences in South America's most biodiverse ecosystems. The engagement started with business strategy and ended with a live, operational brand and website.",
    approach: [
      {
        phase: "Business Ideation & Strategy",
        detail:
          "We began before a single pixel was designed. That meant defining the business model, the target customer (international English-speaking photographers and eco-tourists), the tour offerings, pricing structure, route planning, and competitive positioning in the eco-tourism market.",
      },
      {
        phase: "Brand Identity",
        detail:
          "Built from zero — name, logo, colour palette, typography, and brand personality. The identity needed to feel premium enough for international clients while remaining connected to the natural world it was selling. The result: a warm, nature-forward brand with enough sophistication to compete in the English-language eco-tourism market.",
      },
      {
        phase: "Website Design & Development",
        detail:
          "A conversion-focused website showcasing tours, wildlife photography, and booking information. Designed with an English-speaking international audience as the primary user — clear CTAs driving enquiries, detailed tour pages, and a gallery that sells the experience before the client even reads the copy.",
      },
      {
        phase: "Content, Copy & Photography Direction",
        detail:
          "Tour itineraries, route descriptions, wildlife guides, and photography tips — all written and structured to serve both SEO and the genuine curiosity of the target customer. Full photographic direction for hero and gallery sections.",
      },
    ],
    results: [
      { metric: "0 → live", label: "Business built from scratch" },
      { metric: "Full brand", label: "Name, logo, identity, guidelines" },
      { metric: "EN-first", label: "International audience targeting" },
      { metric: "End-to-end", label: "Strategy through to launch" },
    ],
    testimonial: {
      quote:
        "We went from an idea to a fully operational business with a brand and website we're proud to show international clients. Everything was thought through — not just the design.",
      author: "Founder",
      role: "Toucan Photo Tours",
    },
    stack: ["WordPress", "Custom Theme", "Figma", "Copywriting", "Brand Design", "SEO"],
    nextProject: { slug: "carpimaster", title: "Carpimaster" },
  },

  "carpimaster": {
    title: "Carpimaster",
    client: "B2B Packaging · Spain",
    category: "Web Redesign",
    year: "2025",
    accentColor: "#FF6B35",
    image: "/work/carpimaster.webp",
    liveUrl: "https://carpimaster.com",
    brief:
      "Carpimaster manufactures high-quality branded packaging for businesses across Spain. The quality of their physical product is excellent — but their website told a completely different story. It was slow, visually dated, hard to navigate, and failing to convert the B2B clients they were attracting through sales and referrals. The site was actively costing them business. The brief: rebuild it properly.",
    approach: [
      {
        phase: "Audit & Diagnosis",
        detail:
          "Before touching the design, we audited the existing site thoroughly — page speed, UX flow, content structure, and conversion pathways. The diagnosis: slow load times, no clear hierarchy, a product catalogue that buried the work, and a design that signalled 'small supplier' rather than 'serious manufacturer'.",
      },
      {
        phase: "Full Visual Redesign",
        detail:
          "A complete visual rebuild — new layout system, updated colour application, professional typography, and a hero section that leads with the quality of the product. Every page redesigned with a B2B buyer in mind: someone who needs to quickly assess capability, trust the supplier, and find a way to get in touch.",
      },
      {
        phase: "Performance Optimisation",
        detail:
          "Rebuilt on an optimised WordPress stack. Image compression, caching configuration, and clean code reduced load times dramatically. A slow site signals an unreliable supplier — a fast one signals a professional operation.",
      },
      {
        phase: "Content & Catalogue Structure",
        detail:
          "Restructured the product catalogue to showcase the range clearly. Improved the contact and quote request flow so that potential B2B clients could take action without friction.",
      },
    ],
    results: [
      { metric: "Full rebuild", label: "Design, content & structure" },
      { metric: "Much faster", label: "Page load performance" },
      { metric: "B2B-focused", label: "Conversion-oriented UX" },
      { metric: "Self-managed", label: "Easy WordPress CMS" },
    ],
    testimonial: {
      quote:
        "The difference is night and day. We now send clients to our website with confidence — before, we almost hoped they wouldn't look it up.",
      author: "Management Team",
      role: "Carpimaster",
    },
    stack: ["WordPress", "Custom Theme", "Figma", "Performance Optimisation", "SEO", "Copywriting"],
    nextProject: { slug: "coldfrank", title: "Coldfrank" },
  },

  "coldfrank": {
    title: "Coldfrank",
    client: "Fashion E-commerce · Spain",
    category: "E-commerce Optimisation",
    year: "2024",
    accentColor: "#3B82F6",
    image: "/work/coldfrank.webp",
    liveUrl: "https://coldfrank.com",
    brief:
      "Coldfrank is a Spanish streetwear brand manufacturing hoodies, jackets, and knitwear locally. Their store was live and making sales — but it had accumulated security vulnerabilities, performance debt, and had no systematic approach to converting visitors into buyers. Revenue was below what the brand's quality warranted. The engagement covered three areas: security, performance, and active conversion strategy.",
    approach: [
      {
        phase: "Security Audit & Hardening",
        detail:
          "A thorough security audit identified multiple vulnerabilities across the store's codebase and plugin stack. We resolved each one systematically — patching exploits, hardening authentication, updating dependencies, and implementing ongoing monitoring. An unsecured store is a liability for both the brand and its customers.",
      },
      {
        phase: "Performance Optimisation",
        detail:
          "Audit of page speed across product pages, collection pages, and checkout. Image optimisation, script deferral, and caching improvements reduced load times and improved the overall shopping experience — particularly on mobile, where the majority of traffic arrived.",
      },
      {
        phase: "Conversion Campaigns",
        detail:
          "Designed and implemented a suite of popup campaigns targeting different stages of the customer journey — welcome discounts for new visitors, exit-intent offers for abandoning carts, and loyalty triggers for returning customers. Each campaign built around the brand's tone and visual identity.",
      },
      {
        phase: "Discount & Promotion Mechanics",
        detail:
          "Set up a structured discount and promotion framework — limited-time offers, bundle incentives, and seasonal campaigns — with clear rules to protect margin while driving volume. Integrated with the store's existing customer flow.",
      },
    ],
    results: [
      { metric: "0 critical", label: "Vulnerabilities post-hardening" },
      { metric: "Faster load", label: "Across all key pages" },
      { metric: "Active CRO", label: "Popup & discount system live" },
      { metric: "Made in Spain", label: "Brand integrity maintained" },
    ],
    testimonial: {
      quote:
        "We had no idea how exposed the store was until Cristian walked us through it. Now we have security we trust and campaigns that actually convert.",
      author: "Founder",
      role: "Coldfrank",
    },
    stack: ["Shopify", "Liquid", "JavaScript", "Security Audit", "CRO", "Email Marketing"],
    nextProject: { slug: "real-cd-espana", title: "Real CD España" },
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
            className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-brand-grey-500 transition-colors duration-300 hover:text-brand-white"
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

          <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-2xl font-body text-lg leading-relaxed text-brand-grey-300">
              {cs.brief}
            </p>
            <a
              href={cs.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center gap-2 border border-brand-grey-700 px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-brand-grey-300 transition-all duration-300 hover:border-brand-white hover:text-brand-white"
            >
              View Live Site
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
              />
            </a>
          </div>

          {/* Hero image */}
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={cs.image}
              alt={`${cs.title} — project showcase`}
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
              <div key={step.phase} className="bg-brand-black-deep p-8 lg:p-10">
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
            THE OUTCOME
          </h2>
          <div className="grid grid-cols-2 gap-px bg-brand-grey-900/20 lg:grid-cols-4">
            {cs.results.map((result) => (
              <div key={result.label} className="bg-brand-black p-8 lg:p-10">
                <span
                  className="mb-2 block font-display text-2xl font-bold lg:text-3xl"
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

      {/* Stack */}
      <section className="bg-brand-black-deep py-16">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex flex-wrap items-center gap-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-grey-700">
              Tools & Stack
            </span>
            {cs.stack.map((tech) => (
              <span
                key={tech}
                className="border border-brand-grey-700/30 px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-brand-grey-500"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Next Project */}
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
