import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export interface PricingTier {
  name: string;
  price: string;
  perfectFor: string;
  features: string[];
  quote?: string;
  ctaText: string;
  ctaLink?: string;
  level: "starter" | "growth" | "advanced";
}

interface ServicePricingTiersProps {
  tiers: PricingTier[];
}

export function ServicePricingTiers({ tiers }: ServicePricingTiersProps) {
  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      {tiers.map((tier) => {
        // Visual hierarchy logic based on level
        const isHighlight = tier.level === "growth";
        const isAdvanced = tier.level === "advanced";

        const borderClass = isHighlight
          ? "border-brand-accent shadow-[0_0_40px_rgba(212,255,0,0.05)]"
          : isAdvanced
          ? "border-brand-grey-700 bg-brand-black-deep/50"
          : "border-brand-grey-800 bg-brand-black-mid";

        const labelColor = isHighlight
          ? "text-brand-accent bg-brand-accent/10"
          : isAdvanced
          ? "text-brand-white bg-brand-white/10"
          : "text-brand-grey-400 bg-brand-grey-800/50";

        return (
          <div
            key={tier.name}
            className={`relative flex flex-col items-start gap-8 border p-6 transition-all duration-300 hover:border-brand-grey-600 md:p-10 lg:flex-row lg:items-stretch lg:gap-14 ${borderClass}`}
          >
            {/* Left Column: Core Info */}
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <div className="mb-6 inline-block px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] sm:text-xs">
                  <span className={labelColor + " rounded-full px-3 py-1"}>
                    {tier.level === "starter" ? "Entry Level" : tier.level === "growth" ? "Recommended" : "Enterprise"}
                  </span>
                </div>
                
                <h3 className="mb-2 font-display text-2xl font-bold uppercase tracking-tight text-brand-white md:text-3xl">
                  {tier.name}
                </h3>
                <p className="mb-8 font-display text-xl font-medium text-brand-accent md:text-2xl">
                  {tier.price}
                </p>

                <div className="mb-8">
                  <p className="mb-2 font-mono text-xs uppercase tracking-[0.1em] text-brand-grey-500">
                    Perfect For
                  </p>
                  <p className="font-body text-base leading-relaxed text-brand-grey-300">
                    {tier.perfectFor}
                  </p>
                </div>
              </div>

              {tier.quote && (
                <blockquote className="mt-auto border-l-2 border-brand-accent/50 pl-5 italic">
                  <p className="font-body text-sm leading-relaxed text-brand-grey-400">
                    "{tier.quote}"
                  </p>
                </blockquote>
              )}
            </div>

            {/* Right Column: Features & CTA */}
            <div className="flex flex-1 flex-col bg-brand-black/40 p-6 md:p-8">
              <p className="mb-6 font-mono text-xs uppercase tracking-[0.1em] text-brand-grey-500">
                What's Included
              </p>
              <ul className="mb-10 flex-1 space-y-4">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        isHighlight ? "text-brand-accent" : "text-brand-grey-500"
                      }`}
                      strokeWidth={2.5}
                    />
                    <span className="font-body text-sm text-brand-grey-200">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={tier.ctaLink || "/quote"}
                className={`group inline-flex items-center gap-3 w-full justify-between border px-6 py-4 font-display text-sm font-bold uppercase tracking-[0.1em] transition-all duration-300 ${
                  isHighlight
                    ? "border-brand-accent bg-brand-accent text-brand-black hover:bg-brand-accent/90"
                    : "border-brand-grey-700 text-brand-white hover:border-brand-white"
                }`}
              >
                {tier.ctaText}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2.5}
                />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
