import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { ContactForm } from "@/components/shared/ContactForm";
import { MapPin, Mail, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with LevelOne Agency. Based in Surrey, working with businesses across the UK. Reply within one working day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        overline="Get In Touch"
        title={"LET'S BUILD\nSOMETHING"}
        titleAccent="THAT LASTS."
        description="Whether you're an existing client, a potential partner, or just have a question — we'd love to hear from you. Reply within one working day."
      />

      <section className="bg-brand-black py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">

          {/* Quote CTA Banner */}
          <div className="mb-16 border border-brand-accent/20 bg-brand-accent/[0.03] p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h3 className="font-display text-lg font-bold uppercase text-brand-white mb-2">
                Looking for a project quote?
              </h3>
              <p className="font-body text-sm text-brand-grey-400 max-w-md">
                Use our interactive budget calculator to get a live estimate for your project — scope, timeline, and investment in under 2 minutes.
              </p>
            </div>
            <Link
              href="/quote"
              className="group inline-flex items-center gap-3 shrink-0 bg-brand-accent px-8 py-3.5 font-display text-sm font-bold uppercase tracking-[0.1em] text-brand-black transition-all duration-300 hover:shadow-[0_0_60px_rgba(212,255,0,0.18)]"
            >
              Get a Quote
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            <ContactForm />

            <div className="flex flex-col gap-10 lg:pt-2">
              <a
                href="https://wa.me/447762481366?text=Hi%20LevelOne!"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 border border-brand-grey-700 p-6 transition-all duration-300 hover:border-brand-accent hover:bg-brand-accent/[0.03]"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center bg-[#25D366]/10 transition-colors duration-300 group-hover:bg-[#25D366]/20">
                  <svg className="h-6 w-6 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <span className="mb-1 block font-display text-sm font-bold uppercase tracking-[0.05em] text-brand-white">
                    WhatsApp
                  </span>
                  <span className="font-mono text-xs text-brand-grey-500">
                    Direct line — reply in &lt;24h
                  </span>
                </div>
              </a>

              <a
                href="mailto:hello@leveloneagency.co.uk"
                className="group flex items-center gap-5 border border-brand-grey-700/40 p-6 transition-all duration-300 hover:border-brand-grey-700"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center bg-brand-grey-900/50">
                  <Mail className="h-5 w-5 text-brand-grey-300" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="mb-1 block font-display text-sm font-bold uppercase tracking-[0.05em] text-brand-white">
                    hello@leveloneagency.co.uk
                  </span>
                  <span className="font-mono text-xs text-brand-grey-500">
                    For proposals &amp; formal enquiries
                  </span>
                </div>
              </a>

              <div className="space-y-6 pt-2">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-accent" strokeWidth={1.5} />
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.15em] text-brand-grey-500 mb-1">Based In</span>
                    <span className="font-body text-sm text-brand-white">Surrey, United Kingdom</span>
                    <span className="block font-body text-xs text-brand-grey-500 mt-0.5">Working with clients across the UK &amp; internationally</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-accent" strokeWidth={1.5} />
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.15em] text-brand-grey-500 mb-1">Response Time</span>
                    <span className="font-body text-sm text-brand-white">Within one working day</span>
                    <span className="block font-body text-xs text-brand-grey-500 mt-0.5">Monday to Friday, 9am – 6pm GMT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
