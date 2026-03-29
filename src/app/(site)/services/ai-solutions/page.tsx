import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Solutions",
  description: "AI workflows, chatbots, and automation for UK businesses. Measurable time savings and competitive edge — not buzzwords. Based in Surrey.",
  alternates: { canonical: "/services/ai-solutions" },
};

const SOLUTIONS = [
  { title: "AI Chatbots & Assistants", description: "Trained on your business — your products, your FAQs, your tone. Deployed on your website, WhatsApp, or internal tools. Handles routine enquiries so your team doesn't have to." },
  { title: "Workflow Automation", description: "The repetitive tasks your team does manually every day. We map them, then automate them — using the right tool for the job, not the most impressive one." },
  { title: "AI-Assisted Content Systems", description: "Content pipelines that use AI to draft, structure, and publish at scale — with human oversight built in. Efficient production of quality content." },
  { title: "CRM & Tool Integrations", description: "Your CRM, your email platform, your project management tool — connected so data flows without manual intervention." },
  { title: "Custom AI Applications", description: "Bespoke tools built on GPT-4, Claude, or open-source models — trained on your data, deployed in your environment." },
  { title: "AI Audit & Strategy", description: "Not sure where AI fits in your operation? We audit your current processes, identify the highest-ROI automation opportunities, and deliver a prioritised roadmap." },
] as const;

export default function AISolutionsPage() {
  return (
    <>
      <PageHero
        overline="Service"
        title={"AI\nSOLUTIONS"}
        description="AI workflows, chatbots, and automation built for your specific operation. Not buzzwords — measurable competitive edge you can track from month one."
      />

      <section className="bg-brand-black py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-12 section-label">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-brand-accent">What We Build</span>
          </div>
          <div className="grid grid-cols-1 gap-px bg-brand-grey-900/25 md:grid-cols-2 lg:grid-cols-3">
            {SOLUTIONS.map((item, i) => (
              <div key={item.title} className="group relative bg-brand-black p-8 transition-colors duration-500 hover:bg-brand-black-mid lg:p-10">
                <div className="accent-line" />
                <span className="mb-4 block font-mono text-xs tracking-[0.15em] text-brand-grey-700 transition-colors duration-300 group-hover:text-brand-accent">0{i + 1}</span>
                <h3 className="mb-3 font-display text-lg font-bold uppercase tracking-[-0.01em] text-brand-white">{item.title}</h3>
                <p className="font-body text-sm leading-relaxed text-brand-grey-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-black-deep py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="mb-8 section-label">
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-brand-accent">Investment</span>
              </div>
              <div className="space-y-6">
                {[
                  { type: "AI Audit & Roadmap", range: "£800 – £1,500", detail: "One-off discovery: map your processes, identify opportunities, prioritised plan" },
                  { type: "Chatbot or Assistant", range: "£2,000 – £8,000", detail: "Custom-trained, deployed, integrated with your existing tools and tone" },
                  { type: "Workflow Automation", range: "£1,500 – £6,000", detail: "End-to-end automation of a defined business process, tested and documented" },
                  { type: "AI Retainer", range: "£600 – £2,000/mo", detail: "Ongoing monitoring, optimisation, and expansion as your AI systems evolve" },
                ].map((item) => (
                  <div key={item.type} className="border-b border-brand-grey-900/40 pb-6 last:border-b-0">
                    <div className="flex items-baseline justify-between gap-4 mb-1 flex-wrap">
                      <span className="font-display text-base font-bold uppercase tracking-[-0.01em] text-brand-white">{item.type}</span>
                      <span className="font-display text-sm font-bold text-brand-accent whitespace-nowrap">{item.range}</span>
                    </div>
                    <p className="font-body text-sm text-brand-grey-500">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-8 section-label">
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-brand-accent">What We Don&apos;t Do</span>
              </div>
              <div className="space-y-6">
                {[
                  { title: "We don't sell AI for AI's sake", body: "If automation won't save you meaningful time or money within 6 months, we'll tell you that before taking your budget." },
                  { title: "We don't use generic templates at custom prices", body: "Every solution is built around your actual process — not a template with your logo on it." },
                  { title: "We don't disappear after build", body: "AI systems need monitoring and iteration. The initial build is the starting point, not the finish line." },
                  { title: "We don't require you to understand AI", body: "You don't need to know how it works. You need to know it works. That's what we're responsible for." },
                ].map((item) => (
                  <div key={item.title} className="border-b border-brand-grey-900/40 pb-6 last:border-b-0">
                    <h4 className="mb-2 font-display text-sm font-bold uppercase tracking-[-0.01em] text-brand-white">{item.title}</h4>
                    <p className="font-body text-sm leading-relaxed text-brand-grey-300">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-black py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.15em] text-brand-grey-500">Related Services</p>
              <div className="flex flex-wrap gap-3">
                {[{ label: "Web Design & Dev", href: "/services/web-design" }, { label: "Digital Marketing", href: "/services/digital-marketing" }].map((s) => (
                  <Link key={s.label} href={s.href} className="group inline-flex items-center gap-2 border border-brand-grey-700/50 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.1em] text-brand-grey-300 transition-all duration-300 hover:border-brand-accent/40 hover:text-brand-white">
                    {s.label} <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:opacity-100" strokeWidth={2} />
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/contact" className="group inline-flex items-center gap-3 bg-brand-accent px-9 py-4 font-display text-sm font-bold uppercase tracking-[0.15em] text-brand-black transition-all duration-300 hover:shadow-[0_0_60px_rgba(212,255,0,0.18)]">
              Start a Project <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
