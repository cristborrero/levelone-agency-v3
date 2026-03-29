import Link from "next/link";
import Image from "next/image";
import { NewsletterForm } from "@/components/shared/NewsletterForm";

const SERVICES_LINKS = [
  { label: "Web Design & Dev", href: "/services/web-design" },
  { label: "Brand Identity", href: "/services/brand-identity" },
  { label: "Digital Marketing", href: "/services/digital-marketing" },
  { label: "AI Solutions", href: "/services/ai-solutions" },
];

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
  { label: "Get a Quote", href: "/quote" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-brand-black-deep">
      <div className="h-[1px] w-full bg-brand-grey-900/50" />
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-20">

        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link href="/" className="mb-6 inline-block" aria-label="LevelOne Agency">
              <Image
                src="/logo.svg"
                alt="LevelOne Agency"
                width={140}
                height={22}
                className="h-5 w-auto opacity-70 transition-opacity duration-300 hover:opacity-100"
              />
            </Link>
            <p className="mb-8 max-w-xs font-body text-sm leading-relaxed text-brand-grey-500">
              UK digital agency building websites, brands, and content for
              ambitious mid-market businesses. Based in Surrey.
            </p>
            <a
              href="mailto:hello@leveloneagency.co.uk"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-brand-grey-300 transition-colors duration-300 hover:text-brand-accent"
            >
              <span className="h-[1px] w-4 bg-current" />
              hello@leveloneagency.co.uk
            </a>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-brand-white">
              Services
            </h4>
            <ul className="space-y-3">
              {SERVICES_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-brand-grey-500 transition-colors duration-300 hover:text-brand-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-brand-white">
              Company
            </h4>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-brand-grey-500 transition-colors duration-300 hover:text-brand-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4">
            <h4 className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-brand-white">
              Monthly Digest
            </h4>
            <p className="mb-5 font-body text-sm leading-relaxed text-brand-grey-500">
              Strategy, design, and AI insights. No spam. Unsubscribe any time.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-brand-grey-900/40 pt-10 space-y-6">
          <p className="font-body text-xs leading-relaxed text-brand-grey-700 max-w-2xl">
            LevelOne Agency is a trading name of Leonardo Martinez Mena.
            Registered address: Flat 5, Wayewood Lodge, Branksome Park Road,
            Camberley, GU15 2AE, United Kingdom. Contact:{" "}
            <a
              href="mailto:hello@leveloneagency.co.uk"
              className="hover:text-brand-grey-300 transition-colors duration-300"
            >
              hello@leveloneagency.co.uk
            </a>
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-brand-grey-700">
                © {year} LevelOne Agency
              </span>
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-mono text-[10px] uppercase tracking-[0.1em] text-brand-grey-700 transition-colors duration-300 hover:text-brand-grey-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-brand-grey-700">
              Built with precision. Powered by ambition.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
