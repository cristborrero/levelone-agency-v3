"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(SplitText, ScrambleTextPlugin, useGSAP);

// First 3 lines → ScrambleText
const SCRAMBLE_LINES = ["WE BUILD", "THE THING", "THEY WISH"];
// Last line → 3D char flip (accent color)
const FLIP_LINE = "THEY HAD.";

// Chars used during scramble — digital/code aesthetic
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&";

const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

const STATS = [
  { value: "50+", label: "Projects delivered" },
  { value: "8 wk", label: "Average delivery" },
  { value: "24h", label: "Response time" },
];

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  // Parallax + fade on scroll (Motion — unchanged)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useGSAP(
    () => {
      if (!headlineRef.current) return;

      gsap.matchMedia().add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduced } = context.conditions as { reduced: boolean };

          if (reduced) {
            // Reveal instantly — no motion
            headlineRef.current
              ?.querySelectorAll("[data-scramble], [data-flip]")
              .forEach((el) => gsap.set(el, { opacity: 1 }));
            return;
          }

          const scrambleEls =
            headlineRef.current!.querySelectorAll("[data-scramble]");
          const flipEl =
            headlineRef.current!.querySelector<HTMLElement>("[data-flip]");

          // ── Main timeline ──────────────────────────────────────────────
          const tl = gsap.timeline({ delay: 0.25 });

          // A: ScrambleText — lines 0, 1, 2 with stagger overlap
          scrambleEls.forEach((line, i) => {
            const target =
              line.getAttribute("data-text") ?? (line as HTMLElement).innerText;

            tl.to(
              line,
              {
                duration: 1.15,
                scrambleText: {
                  text: target,
                  chars: SCRAMBLE_CHARS,
                  speed: 0.38,       // slower = more dramatic chaos
                  revealDelay: 0.22, // % of duration before chars lock in
                  newClass: "scramble-active",
                },
                ease: "none",
              },
              i * 0.46 // each line starts 0.46s after the previous
            );
          });

          // B: 3D Flip — "THEY HAD." — char by char
          if (flipEl) {
            // Split into individual characters
            const split = SplitText.create(flipEl, { type: "chars" });

            // Set perspective on parent so 3D works
            gsap.set(flipEl, { perspective: 600 });

            // Start state: rotated -90° on X axis (below the baseline), invisible
            gsap.set(split.chars, {
              rotateX: -90,
              opacity: 0,
              filter: "blur(6px)",
              transformOrigin: "50% 100% -8px",
            });

            // Flip in + de-blur, char by char
            tl.to(
              split.chars,
              {
                rotateX: 0,
                opacity: 1,
                filter: "blur(0px)",
                duration: 0.72,
                ease: "expo.out",
                stagger: {
                  each: 0.052,
                  from: "start",
                },
              },
              ">-0.18" // slight overlap with end of scramble sequence
            );
          }
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden bg-brand-black-deep pb-16 pt-28 lg:pb-28"
    >
      {/* Grid lines */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{
              delay: i * 0.1,
              duration: 1.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute top-0 h-full w-px origin-top bg-brand-grey-900/25"
            style={{ left: `${(i + 1) * (100 / 6)}%` }}
          />
        ))}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.0, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute left-0 h-px w-full origin-left"
          style={{ top: "60%", backgroundColor: "rgba(212,255,0,0.08)" }}
        />
      </div>

      {/* Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 2, ease: "easeOut" }}
        className="pointer-events-none absolute -right-40 top-0 h-[700px] w-[700px] rounded-full blur-[140px]"
        style={{ backgroundColor: "rgba(212,255,0,0.04)" }}
        aria-hidden
      />

      <motion.div
        style={{ y: parallaxY, opacity }}
        className="relative z-10 mx-auto w-full max-w-[1400px] px-6 lg:px-10"
      >
        {/* Overline */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={FADE_UP}
          className="mb-8 flex items-center gap-4"
        >
          <span className="h-px w-12 bg-brand-accent" />
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-brand-accent">
            Digital Agency — Surrey, UK
          </span>
        </motion.div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="mb-10 max-w-6xl"
          aria-label="We build the thing they wish they had."
        >
          {/* Lines 0-2 → ScrambleText */}
          {SCRAMBLE_LINES.map((line) => (
            <span
              key={line}
              data-scramble
              data-text={line}
              aria-hidden="true"
              className="block font-display font-bold uppercase leading-[0.92] tracking-[-0.04em] text-[clamp(3.5rem,9vw,9rem)] text-brand-white"
            >
              {line}
            </span>
          ))}

          {/* Line 3 → 3D char flip, accent color */}
          <span
            data-flip
            aria-hidden="true"
            className="block font-display font-bold uppercase leading-[0.92] tracking-[-0.04em] text-[clamp(3.5rem,9vw,9rem)] text-brand-accent"
          >
            {FLIP_LINE}
          </span>
        </h1>

        {/* Sub */}
        <motion.p
          custom={0.85}
          initial="hidden"
          animate="visible"
          variants={FADE_UP}
          className="mb-14 max-w-lg font-body text-lg leading-relaxed text-brand-grey-300"
        >
          Agency-grade websites, brands, and digital strategy for UK businesses
          — without the London agency price tag. Based in Surrey.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={1.05}
          initial="hidden"
          animate="visible"
          variants={FADE_UP}
          className="flex flex-wrap items-center gap-6"
        >
          <Link
            href="/quote"
            className="group relative inline-flex items-center gap-3 bg-brand-accent px-9 py-4 font-display text-sm font-bold uppercase tracking-[0.15em] text-brand-black transition-all duration-300 hover:shadow-[0_0_60px_rgba(212,255,0,0.18)]"
          >
            Get a Quote
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2.5}
            />
          </Link>
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 border-b border-brand-grey-700 pb-0.5 font-body text-sm font-medium text-brand-grey-300 transition-all duration-300 hover:border-brand-white hover:text-brand-white"
          >
            See Our Work
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2}
            />
          </Link>
        </motion.div>

        {/* Trust Signals */}
        <motion.div
          custom={1.15}
          initial="hidden"
          animate="visible"
          variants={FADE_UP}
          className="mt-8 mb-12 lg:mb-0 flex flex-col items-center gap-2 text-center font-body text-sm font-normal leading-relaxed text-brand-grey-500 sm:items-start sm:text-left lg:flex-row lg:items-center lg:gap-0"
        >
          <span>
            <span className="font-mono text-[10px] text-brand-accent/80 mr-1.5">[01]</span>
            15+ Years Combined Experience{" "}
            <span className="hidden sm:inline lg:hidden px-1.5 text-brand-grey-700/50">//</span> Senior-Only Team
          </span>
          <span className="hidden px-3 text-brand-grey-700/50 lg:inline">//</span>
          <span>
            <span className="font-mono text-[10px] text-brand-accent/80 mr-1.5">[02]</span>
            International Portfolio{" "}
            <span className="hidden sm:inline lg:hidden px-1.5 text-brand-grey-700/50">//</span> UK, USA, Spain, LATAM
          </span>
          <span className="hidden px-3 text-brand-grey-700/50 lg:inline">//</span>
          <span>
            <span className="font-mono text-[10px] text-brand-accent/80 mr-1.5">[03]</span>
            Surrey-Based{" "}
            <span className="hidden sm:inline lg:hidden px-1.5 text-brand-grey-700/50">//</span>{" "}
            hello@leveloneagency.co.uk
          </span>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-12 flex flex-wrap gap-10 border-t border-brand-grey-900/40 pt-8 lg:mt-16 lg:gap-16"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-3">
              <span className="font-display text-2xl font-bold text-brand-accent">
                {stat.value}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-brand-grey-500">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <div className="h-9 w-px bg-brand-grey-700" />
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-brand-grey-500">
            Scroll
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
