"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().min(1, "Please select a budget range"),
  message: z.string().min(10, "Please tell us a bit more about your project (min. 10 chars)"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must agree to our privacy policy to continue" }),
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

const SERVICES = [
  "Web Design & Development",
  "E-Commerce",
  "Brand Identity",
  "Digital Marketing",
  "AI Solutions",
  "Full Digital Package",
  "Other / Not sure yet",
];

const BUDGETS = [
  "Under £1,000",
  "£1,000 – £3,000",
  "£3,000 – £8,000",
  "£8,000 – £15,000",
  "£15,000+",
];

const inputClass =
  "w-full border-b border-brand-grey-700 bg-transparent px-0 py-3 font-body text-base text-brand-white placeholder:text-brand-grey-700 outline-none transition-colors duration-300 focus:border-brand-accent";
const labelClass =
  "mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-brand-grey-500";
const errorClass = "mt-1.5 font-mono text-[10px] text-brand-error";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      service: "",
      budget: "",
      message: "",
      consent: false as unknown as true,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("submitting");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      const responseData = await res.json();
      
      if (!res.ok) {
        throw new Error(
          responseData?.error?.message || 
          responseData?.error || 
          "Failed to send message"
        );
      }
      
      setStatus("success");
      reset();
    } catch (error: any) {
      console.error("Form submission error:", error);
      setStatus("error");
      setErrorMessage(error.message || "An unexpected error occurred.");
    }
  };

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex min-h-[400px] flex-col items-start justify-center gap-4"
        >
          <CheckCircle className="h-10 w-10 text-brand-success" strokeWidth={1.5} />
          <h3 className="font-display text-2xl font-bold uppercase text-brand-white">
            Message Received
          </h3>
          <p className="max-w-sm font-body text-base leading-relaxed text-brand-grey-300">
            We&apos;ll be back within one working day — a considered response, not
            an auto-reply.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-2 border border-brand-grey-700 px-6 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-brand-grey-300 transition-all duration-300 hover:border-brand-white hover:text-brand-white"
          >
            Send Another
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8"
          noValidate
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={labelClass}>Name *</label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                className={inputClass}
                {...register("name")}
              />
              {errors.name && <p className={errorClass}>{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>Email *</label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                className={inputClass}
                {...register("email")}
              />
              {errors.email && <p className={errorClass}>{errors.email.message}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="company" className={labelClass}>Company (optional)</label>
            <input
              id="company"
              type="text"
              placeholder="Your company name"
              className={inputClass}
              {...register("company")}
            />
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <label htmlFor="service" className={labelClass}>Service needed *</label>
              <select
                id="service"
                className={`${inputClass} appearance-none cursor-pointer`}
                defaultValue=""
                {...register("service")}
              >
                <option value="" disabled className="bg-brand-black">Select a service</option>
                {SERVICES.map((s) => (
                  <option key={s} value={s} className="bg-brand-black">{s}</option>
                ))}
              </select>
              {errors.service && <p className={errorClass}>{errors.service.message}</p>}
            </div>
            <div>
              <label htmlFor="budget" className={labelClass}>Budget range *</label>
              <select
                id="budget"
                className={`${inputClass} appearance-none cursor-pointer`}
                defaultValue=""
                {...register("budget")}
              >
                <option value="" disabled className="bg-brand-black">Select a range</option>
                {BUDGETS.map((b) => (
                  <option key={b} value={b} className="bg-brand-black">{b}</option>
                ))}
              </select>
              {errors.budget && <p className={errorClass}>{errors.budget.message}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="message" className={labelClass}>Tell us about your project *</label>
            <textarea
              id="message"
              rows={5}
              placeholder="Goals, timeline, current situation — the more context, the better our response."
              className={`${inputClass} resize-none`}
              {...register("message")}
            />
            {errors.message && <p className={errorClass}>{errors.message.message}</p>}
          </div>

          <div>
            <label className="flex items-start gap-3 font-body text-xs leading-relaxed text-brand-grey-500 cursor-pointer">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 shrink-0 appearance-none border border-brand-grey-700/60 bg-transparent transition-colors duration-200 checked:bg-brand-accent checked:border-brand-accent flex items-center justify-center relative after:absolute after:hidden checked:after:block after:content-[''] after:w-1 after:h-2 after:border-r-[1.5px] after:border-b-[1.5px] after:border-brand-black after:rotate-45 after:-translate-y-0.5"
                {...register("consent")}
              />
              <span>
                I agree to the processing of my personal data for the purpose of handling this enquiry, subject to the{" "}
                <Link
                  href="/privacy"
                  className="text-brand-grey-300 underline decoration-brand-grey-700/50 underline-offset-2 transition-colors hover:text-brand-accent hover:decoration-brand-accent"
                >
                  Privacy Policy
                </Link>.
              </span>
            </label>
            {errors.consent && <p className={errorClass}>{errors.consent.message}</p>}
          </div>

          {status === "error" && (
            <p className="font-mono text-[10px] text-brand-error">
              {errorMessage ? `Error: ${errorMessage}` : "Something went wrong. Please try again or email us directly at hello@leveloneagency.co.uk"}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="group relative inline-flex items-center gap-3 bg-brand-accent px-9 py-4 font-display text-sm font-bold uppercase tracking-[0.15em] text-brand-black transition-all duration-300 hover:shadow-[0_0_60px_rgba(212,255,0,0.18)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-brand-black border-t-transparent" />
                Sending…
              </>
            ) : (
              <>
                Send Message
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2.5}
                />
              </>
            )}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
