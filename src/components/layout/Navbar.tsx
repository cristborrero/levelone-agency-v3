"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { X, Menu } from "lucide-react";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
] as const;

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  useEffect(() => { setIsMobileOpen(false); }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className={[
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-brand-black/92 backdrop-blur-md border-b border-brand-grey-900/60"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex h-20 items-center justify-between">

            {/* Logo */}
            <Link href="/" aria-label="LevelOne Agency — Home" className="group relative flex items-center">
              <Image
                src="/logo.svg"
                alt="LevelOne Agency"
                width={140}
                height={22}
                className="h-5 w-auto"
                priority
              />
              {/* Accent underline — same behaviour as nav links */}
              <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-brand-accent transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* Desktop nav */}
            <div className="hidden items-center gap-10 md:flex">
              {NAV_LINKS.map((link) => {
                const isActive =
                  pathname === link.href ||
                  pathname.startsWith(link.href + "/");
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={[
                      "group relative font-mono text-xs uppercase tracking-[0.1em] transition-colors duration-300",
                      isActive
                        ? "text-brand-white"
                        : "text-brand-grey-300 hover:text-brand-white",
                    ].join(" ")}
                  >
                    {link.label}
                    <span
                      className={[
                        "absolute -bottom-1 left-0 h-[2px] bg-brand-accent transition-all duration-300",
                        isActive ? "w-full" : "w-0 group-hover:w-full",
                      ].join(" ")}
                    />
                  </Link>
                );
              })}
              <Link
                href="/contact"
                className="border border-brand-accent bg-transparent px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.15em] text-brand-accent transition-all duration-300 hover:bg-brand-accent hover:text-brand-black"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMobileOpen((v) => !v)}
              className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden text-brand-white"
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col items-start justify-center bg-brand-black-deep px-10 md:hidden"
          >
            {/* Logo in mobile menu */}
            <div className="absolute top-6 left-10">
              <Image
                src="/logo.svg"
                alt="LevelOne Agency"
                width={120}
                height={19}
                className="h-4 w-auto opacity-60"
              />
            </div>

            <nav className="space-y-6 w-full">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -32 }}
                  transition={{
                    delay: i * 0.07,
                    duration: 0.35,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    className="block font-display text-5xl font-bold uppercase tracking-tight text-brand-white transition-colors duration-200 hover:text-brand-accent"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.38, duration: 0.35 }}
              className="mt-12"
            >
              <Link
                href="/contact"
                className="inline-block border border-brand-accent px-8 py-3.5 font-mono text-sm font-bold uppercase tracking-[0.15em] text-brand-accent transition-all duration-300 hover:bg-brand-accent hover:text-brand-black"
              >
                Start a Project →
              </Link>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="absolute bottom-16 left-10 right-10 h-[1px] origin-left bg-brand-grey-900"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.55 }}
              className="absolute bottom-8 left-10 font-mono text-[10px] uppercase tracking-[0.15em] text-brand-grey-500"
            >
              hello@leveloneagency.co.uk
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
