import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-start justify-center bg-brand-black-deep px-6 lg:px-10">
      <div className="mx-auto max-w-[1400px] w-full">
        <span className="mb-6 block font-mono text-xs uppercase tracking-[0.15em] text-brand-accent">
          404
        </span>
        <h1 className="mb-6 font-display text-[clamp(3rem,10vw,9rem)] font-bold uppercase leading-[0.9] tracking-[-0.04em] text-brand-white">
          PAGE NOT
          <br />
          <span className="text-brand-accent">FOUND.</span>
        </h1>
        <p className="mb-10 max-w-sm font-body text-base leading-relaxed text-brand-grey-300">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-3 bg-brand-accent px-9 py-4 font-display text-sm font-bold uppercase tracking-[0.15em] text-brand-black transition-all duration-300 hover:shadow-[0_0_60px_rgba(212,255,0,0.18)]"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-brand-grey-700 px-9 py-4 font-mono text-xs uppercase tracking-[0.15em] text-brand-grey-300 transition-all duration-300 hover:border-brand-white hover:text-brand-white"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
