import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { QuoteCalculator } from "@/components/quote/QuoteCalculator";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Interactive budget calculator for your next web, branding, or digital project with LevelOne Agency. Get a live estimate.",
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  return (
    <>
      <PageHero
        overline="Project Scope"
        title={"CALCULATE YOUR\nPROJECT"}
        titleAccent="LIVE."
        description="Select your requirements below to get a live estimate of the investment required. Predictable pricing. No hourly surprises."
      />

      <section className="bg-brand-black pb-20 lg:pb-32 -mt-10 lg:-mt-16">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <QuoteCalculator />
        </div>
      </section>
    </>
  );
}
