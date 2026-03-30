import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { ValueProp } from "@/components/home/ValueProp";
import { WorkPreview } from "@/components/home/WorkPreview";
import { ProcessSection } from "@/components/home/ProcessSection";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { InsightsPreview } from "@/components/home/InsightsPreview";
import { ContactCTA } from "@/components/home/ContactCTA";
import { sanityFetch } from "@/sanity/lib/live";
import { LATEST_POSTS_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "LevelOne Agency — Digital Agency, Surrey UK",
  description:
    "Premium web design, brand identity, and digital marketing for UK mid-market businesses. Based in Surrey.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  let posts: Parameters<typeof InsightsPreview>[0]["posts"] = [];
  try {
    const result = await sanityFetch({ query: LATEST_POSTS_QUERY });
    posts = (result.data ?? []) as typeof posts;
  } catch {
    // Sanity not configured yet — show empty insights
  }

  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <ValueProp />
      <WorkPreview />
      <ProcessSection />
      <AboutTeaser />
      <InsightsPreview posts={posts} />
      <ContactCTA />
    </>
  );
}
