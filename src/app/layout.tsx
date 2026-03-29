import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://leveloneagency.co.uk"
  ),
  title: {
    default: "LevelOne Agency — Digital Agency, Surrey UK",
    template: "%s — LevelOne Agency",
  },
  description:
    "Premium web design, brand identity, and digital marketing for UK mid-market businesses. Based in Surrey.",
  keywords: [
    "digital agency surrey",
    "web design surrey",
    "web design uk",
    "brand identity uk",
    "digital marketing surrey",
    "next.js agency uk",
    "ai solutions uk",
  ],
  authors: [{ name: "LevelOne Agency" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://leveloneagency.co.uk",
    siteName: "LevelOne Agency",
    title: "LevelOne Agency — Digital Agency, Surrey UK",
    description:
      "Premium web design, brand identity, and digital marketing for UK mid-market businesses. Based in Surrey.",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "LevelOne Agency — Digital Agency, Surrey UK",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LevelOne Agency — Digital Agency, Surrey UK",
    description:
      "Premium web design, brand identity, and digital marketing for UK mid-market businesses.",
    images: ["/og-image.webp"],
  },
  robots: { index: true, follow: true },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "LevelOne Agency",
  url: "https://leveloneagency.co.uk",
  email: "hello@leveloneagency.co.uk",
  telephone: "+447762481366",
  logo: "https://leveloneagency.co.uk/logo.svg",
  image: "https://leveloneagency.co.uk/og-image.webp",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Flat 5, Wayewood Lodge, Branksome Park Road",
    addressLocality: "Camberley",
    addressRegion: "Surrey",
    postalCode: "GU15 2AE",
    addressCountry: "GB",
  },
  areaServed: {
    "@type": "Country",
    name: "United Kingdom",
  },
  priceRange: "£3,500–£25,000",
  description:
    "Premium web design, brand identity, digital marketing, and AI solutions for UK mid-market businesses. Based in Surrey — senior-only team, fixed-price projects.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Design & Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Brand Identity" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Marketing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Solutions" } },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-GB"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
