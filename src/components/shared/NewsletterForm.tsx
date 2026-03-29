"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("submitting");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("success");
      setEmail("");

      // Reset success message after 3 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          aria-label="Email for newsletter"
          disabled={status === "submitting" || status === "success"}
          className="w-full border border-brand-grey-700/40 border-r-0 bg-transparent px-4 py-3 font-body text-sm text-brand-white placeholder:text-brand-grey-700 outline-none transition-colors duration-300 focus:border-brand-accent disabled:opacity-50"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          disabled={status === "submitting" || status === "success"}
          className="flex-shrink-0 flex items-center justify-center bg-brand-accent px-5 py-3 font-display text-sm font-bold text-brand-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,255,0,0.15)] disabled:opacity-80 disabled:cursor-not-allowed w-14"
        >
          {status === "submitting" ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand-black border-t-transparent" />
          ) : status === "success" ? (
            <Check className="h-4 w-4" strokeWidth={3} />
          ) : (
            <ArrowRight className="h-4 w-4 -rotate-45" strokeWidth={2.5} />
          )}
        </button>
      </div>
      {status === "error" && (
        <p className="font-mono text-[10px] text-brand-error">
          Something went wrong. Please try again.
        </p>
      )}
      {status === "success" && (
        <p className="font-mono text-[10px] text-brand-success">
          Subscribed successfully!
        </p>
      )}
    </form>
  );
}
