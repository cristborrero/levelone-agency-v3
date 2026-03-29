import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { ValueProp } from "@/components/home/ValueProp";
import { WorkPreview } from "@/components/home/WorkPreview";
import { ProcessSection } from "@/components/home/ProcessSection";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { InsightsPreview } from "@/components/home/InsightsPreview";
import { ContactCTA } from "@/components/home/ContactCTA";

export const metadata: Metadata = {
  title: "LevelOne Agency — Digital Agency, Surrey UK",
  description:
    "Premium web design, brand identity, and digital marketing for UK mid-market businesses. Based in Surrey.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <ValueProp />
      <WorkPreview />
      <ProcessSection />
      <AboutTeaser />
      <InsightsPreview />
      <ContactCTA />
    </>
  );
}
