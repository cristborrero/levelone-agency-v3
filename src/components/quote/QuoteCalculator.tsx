"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  MonitorSmartphone,
  ShoppingCart,
  PenTool,
  TrendingUp,
  Cpu,
  Layers,
  Check,
} from "lucide-react";
import Link from "next/link";

// ──────────────────────────────────────────────────────────────
// 1. Schema
// ──────────────────────────────────────────────────────────────

const quoteSchema = z.object({
  service: z.enum(
    [
      "marketing_website",
      "e_commerce",
      "brand_identity",
      "digital_marketing",
      "ai_solutions",
      "full_package",
    ],
    { required_error: "Please select a service type to continue." }
  ),
  features: z.array(z.string()).default([]),
  timeline: z.enum(["standard", "rush", "flexible"]).default("standard"),
  notes: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  consent: z.literal(true, {
    errorMap: () => ({
      message: "You must agree to our privacy policy to continue",
    }),
  }),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

// ──────────────────────────────────────────────────────────────
// 2. Pricing Engine
// ──────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: "marketing_website",
    label: "Web Design",
    icon: MonitorSmartphone,
    desc: "Corporate & marketing sites",
    min: 1200,
    max: 4500,
    type: "one-off",
  },
  {
    id: "e_commerce",
    label: "E-Commerce",
    icon: ShoppingCart,
    desc: "High-conversion stores",
    min: 2500,
    max: 8000,
    type: "one-off",
  },
  {
    id: "brand_identity",
    label: "Brand Identity",
    icon: PenTool,
    desc: "Logos, guidelines & strategy",
    min: 950,
    max: 3500,
    type: "one-off",
  },
  {
    id: "digital_marketing",
    label: "Digital Marketing",
    icon: TrendingUp,
    desc: "SEO & Ads management",
    min: 1500,
    max: 5000,
    type: "retainer",
  },
  {
    id: "ai_solutions",
    label: "AI Solutions",
    icon: Cpu,
    desc: "Custom automations & agents",
    min: 3500,
    max: 12000,
    type: "one-off",
  },
  {
    id: "full_package",
    label: "The Full Package",
    icon: Layers,
    desc: "End-to-end digital partner",
    min: 2500,
    max: 8000,
    type: "retainer",
  },
] as const;

type ServiceId = (typeof SERVICES)[number]["id"];

const FEATURES: Record<
  ServiceId,
  { id: string; label: string; minOut: number; maxOut: number }[]
> = {
  marketing_website: [
    { id: "cms", label: "CMS Integration (Blog/News)", minOut: 300, maxOut: 800 },
    { id: "booking", label: "Booking / Appointments System", minOut: 500, maxOut: 1200 },
    { id: "multilang", label: "Multiple Languages", minOut: 500, maxOut: 1500 },
    { id: "animations", label: "Advanced GSAP Animations", minOut: 400, maxOut: 1000 },
  ],
  e_commerce: [
    { id: "50plus", label: "50+ Products Setup", minOut: 1000, maxOut: 2500 },
    { id: "subs", label: "Subscriptions Engine", minOut: 800, maxOut: 2000 },
    { id: "multilang", label: "Multiple Languages", minOut: 500, maxOut: 1500 },
    { id: "erp", label: "ERP / Inventory Sync", minOut: 1500, maxOut: 4000 },
  ],
  brand_identity: [
    { id: "guidelines", label: "Full Brand Guidelines Deck", minOut: 300, maxOut: 800 },
    { id: "social", label: "Social Media Templates Kit", minOut: 250, maxOut: 600 },
    { id: "pitch", label: "Pitch Deck / Presentation", minOut: 400, maxOut: 900 },
  ],
  digital_marketing: [
    { id: "paid_ads", label: "Paid Ads Management", minOut: 500, maxOut: 500 },
    { id: "analytics", label: "Deep Analytics Dashboard", minOut: 300, maxOut: 300 },
    { id: "seo_content", label: "Ongoing SEO Content", minOut: 400, maxOut: 800 },
  ],
  ai_solutions: [
    { id: "voice", label: "Voice AI Integration", minOut: 1000, maxOut: 3000 },
    { id: "multi_agent", label: "Multi-Agent System", minOut: 1500, maxOut: 4000 },
    { id: "crm", label: "Deep CRM Integration", minOut: 800, maxOut: 2000 },
  ],
  full_package: [
    { id: "paid_ads", label: "Paid Ads Management", minOut: 500, maxOut: 500 },
    { id: "analytics", label: "Deep Analytics Dashboard", minOut: 300, maxOut: 300 },
  ],
};

const TIMELINES = [
  { id: "standard", label: "Standard", desc: "Normal delivery timeline", multiplier: 1 },
  { id: "flexible", label: "Flexible", desc: "No strict launch date — we fit you into our schedule", multiplier: 0.95 },
  { id: "rush", label: "Rush", desc: "Priority delivery — 25% premium", multiplier: 1.25 },
] as const;

// ──────────────────────────────────────────────────────────────
// 3. Animation Config (matching site's editorial easing)
// ──────────────────────────────────────────────────────────────

const EDITORIAL_EASE = [0.16, 1, 0.3, 1] as const;

const stepVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    y: dir > 0 ? 40 : -40,
    filter: "blur(4px)",
  }),
  center: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EDITORIAL_EASE },
  },
  exit: (dir: number) => ({
    opacity: 0,
    y: dir > 0 ? -40 : 40,
    filter: "blur(4px)",
    transition: { duration: 0.35, ease: EDITORIAL_EASE },
  }),
};

const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.5,
      ease: EDITORIAL_EASE,
    },
  }),
};

// ──────────────────────────────────────────────────────────────
// 4. Helpers
// ──────────────────────────────────────────────────────────────

const STEPS = ["Service", "Scope", "Timeline", "Details"];

const formatCurrency = (num: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(num);

const inputClass =
  "w-full border-b border-brand-grey-700 bg-transparent px-0 py-3 font-body text-base text-brand-white placeholder:text-brand-grey-700 outline-none transition-colors duration-300 focus:border-brand-accent";
const labelClass =
  "mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-brand-grey-500";
const errorClass = "mt-1.5 font-mono text-[10px] text-brand-error";

// ──────────────────────────────────────────────────────────────
// 5. Component
// ──────────────────────────────────────────────────────────────

export function QuoteCalculator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { errors },
    reset,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      features: [],
      timeline: "standard",
    },
    mode: "onTouched",
  });

  const selectedServiceId = watch("service");
  const selectedFeatures = watch("features");
  const selectedTimeline = watch("timeline");

  // Pricing
  const [estimatedRange, setEstimatedRange] = useState({
    min: 0,
    max: 0,
    type: "one-off",
  });

  useEffect(() => {
    if (!selectedServiceId) return;
    const serviceDef = SERVICES.find((s) => s.id === selectedServiceId);
    if (!serviceDef) return;

    let totalMin = serviceDef.min;
    let totalMax = serviceDef.max;

    const availableFeatures = FEATURES[selectedServiceId as ServiceId] || [];
    selectedFeatures.forEach((featId) => {
      const featDef = availableFeatures.find((f) => f.id === featId);
      if (featDef) {
        totalMin += featDef.minOut;
        totalMax += featDef.maxOut;
      }
    });

    const timelineDef = TIMELINES.find((t) => t.id === selectedTimeline);
    const multiplier = timelineDef ? timelineDef.multiplier : 1;

    setEstimatedRange({
      min: Math.round(totalMin * multiplier),
      max: Math.round(totalMax * multiplier),
      type: serviceDef.type,
    });
  }, [selectedServiceId, selectedFeatures, selectedTimeline]);

  // Reset features on service change
  useEffect(() => {
    setValue("features", []);
  }, [selectedServiceId, setValue]);

  // Navigation
  const nextStep = useCallback(async () => {
    let fieldsToValidate: (keyof QuoteFormData)[] = [];
    if (currentStep === 0) fieldsToValidate = ["service"];
    if (currentStep === 1) fieldsToValidate = ["features"];
    if (currentStep === 2) fieldsToValidate = ["timeline"];

    const valid = await trigger(fieldsToValidate);
    if (valid) {
      setDirection(1);
      setCurrentStep((p) => Math.min(p + 1, STEPS.length - 1));
    }
  }, [currentStep, trigger]);

  const prevStep = useCallback(() => {
    setDirection(-1);
    setCurrentStep((p) => Math.max(p - 1, 0));
  }, []);

  const onSubmit = async (data: QuoteFormData) => {
    setStatus("submitting");
    setErrorMessage("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, calculatedEstimate: estimatedRange }),
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData?.error || "Failed to submit");
      setStatus("success");
      reset();
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred.");
    }
  };

  // ────────────── RENDER ──────────────

  // Success state
  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: EDITORIAL_EASE }}
        className="flex min-h-[50vh] flex-col items-center justify-center text-center gap-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
          className="flex h-20 w-20 items-center justify-center border border-brand-success/30"
        >
          <CheckCircle className="h-10 w-10 text-brand-success" strokeWidth={1.5} />
        </motion.div>
        <div>
          <h3 className="font-display text-3xl md:text-4xl font-bold uppercase text-brand-white mb-4">
            Quote Submitted
          </h3>
          <p className="max-w-lg mx-auto font-body text-lg leading-relaxed text-brand-grey-300">
            We&apos;ve received your project brief. Our team will review your
            requirements and come back within one working day with a detailed
            proposal.
          </p>
        </div>
        <Link
          href="/services"
          className="mt-4 inline-flex items-center gap-2 border-b border-brand-grey-700 pb-0.5 font-body text-sm text-brand-grey-300 transition-all duration-300 hover:border-brand-white hover:text-brand-white"
        >
          Explore our services
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 relative items-start">
      {/* ════════════════════════════════════════════════════════
          LEFT: Form — Steps
          ════════════════════════════════════════════════════════ */}
      <div className="lg:col-span-7 xl:col-span-8 order-2 lg:order-1">
        {/* Step indicator */}
        <div className="mb-14">
          <div className="flex items-center gap-0">
            {STEPS.map((step, idx) => {
              const isDone = idx < currentStep;
              const isActive = idx === currentStep;
              return (
                <div key={step} className="flex items-center flex-1 last:flex-none">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-8 w-8 items-center justify-center border font-mono text-xs transition-all duration-500 ${
                        isActive
                          ? "border-brand-accent bg-brand-accent text-brand-black font-bold"
                          : isDone
                          ? "border-brand-accent/40 bg-brand-accent/10 text-brand-accent"
                          : "border-brand-grey-800 text-brand-grey-600"
                      }`}
                    >
                      {isDone ? (
                        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                      ) : (
                        String(idx + 1).padStart(2, "0")
                      )}
                    </span>
                    <span
                      className={`hidden sm:block font-mono text-[10px] uppercase tracking-[0.12em] transition-colors duration-500 ${
                        isActive
                          ? "text-brand-white"
                          : isDone
                          ? "text-brand-accent/60"
                          : "text-brand-grey-700"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                  {idx < STEPS.length - 1 && (
                    <div className="flex-1 mx-4">
                      <div className="h-px bg-brand-grey-800 relative">
                        <motion.div
                          className="absolute inset-y-0 left-0 bg-brand-accent/40"
                          initial={{ width: "0%" }}
                          animate={{ width: isDone ? "100%" : "0%" }}
                          transition={{ duration: 0.6, ease: EDITORIAL_EASE }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <AnimatePresence mode="wait" custom={direction}>
            {/* ──── STEP 0: SERVICE ──── */}
            {currentStep === 0 && (
              <motion.div
                key="step-0"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-10"
              >
                <div>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-brand-white uppercase tracking-tight mb-3">
                    What do you need?
                  </h2>
                  <p className="font-body text-brand-grey-300 max-w-lg">
                    Select the primary service for your project. This determines
                    the base investment range.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SERVICES.map((s, i) => {
                    const Icon = s.icon;
                    const isSelected = selectedServiceId === s.id;
                    return (
                      <motion.label
                        key={s.id}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={staggerItem}
                        className={`group relative flex flex-col p-6 cursor-pointer border transition-all duration-500 ${
                          isSelected
                            ? "border-brand-accent/60 bg-brand-accent/[0.04]"
                            : "border-brand-grey-800/60 hover:border-brand-grey-600"
                        }`}
                      >
                        <input
                          type="radio"
                          value={s.id}
                          {...register("service")}
                          className="sr-only"
                        />
                        {/* Accent top line */}
                        <motion.div
                          className="absolute top-0 left-0 right-0 h-px bg-brand-accent"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: isSelected ? 1 : 0 }}
                          transition={{ duration: 0.5, ease: EDITORIAL_EASE }}
                          style={{ transformOrigin: "left" }}
                        />

                        <div className="flex justify-between items-start mb-8">
                          <div
                            className={`p-3 transition-all duration-500 ${
                              isSelected
                                ? "text-brand-black bg-brand-accent"
                                : "text-brand-grey-300 bg-brand-grey-900/60 group-hover:bg-brand-grey-800"
                            }`}
                          >
                            <Icon className="w-5 h-5" strokeWidth={1.5} />
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-400 ${
                              isSelected
                                ? "border-brand-accent"
                                : "border-brand-grey-700"
                            }`}
                          >
                            <motion.div
                              className="w-2.5 h-2.5 rounded-full bg-brand-accent"
                              initial={{ scale: 0 }}
                              animate={{ scale: isSelected ? 1 : 0 }}
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                              }}
                            />
                          </div>
                        </div>
                        <span className="font-display font-bold text-brand-white text-lg tracking-tight mb-1">
                          {s.label}
                        </span>
                        <span className="font-body text-brand-grey-500 text-sm">
                          {s.desc}
                        </span>
                      </motion.label>
                    );
                  })}
                </div>
                {errors.service && (
                  <p className={errorClass}>{errors.service.message}</p>
                )}
              </motion.div>
            )}

            {/* ──── STEP 1: FEATURES ──── */}
            {currentStep === 1 && (
              <motion.div
                key="step-1"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-10"
              >
                <div>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-brand-white uppercase tracking-tight mb-3">
                    Scope & Requirements
                  </h2>
                  <p className="font-body text-brand-grey-300 max-w-lg">
                    Select any additional features or integrations you need. Each
                    will adjust the estimate in real-time.
                  </p>
                </div>

                <div className="space-y-3">
                  {selectedServiceId &&
                  FEATURES[selectedServiceId as ServiceId]?.length > 0 ? (
                    FEATURES[selectedServiceId as ServiceId].map((feat, i) => {
                      const isSelected = selectedFeatures.includes(feat.id);
                      return (
                        <motion.label
                          key={feat.id}
                          custom={i}
                          initial="hidden"
                          animate="visible"
                          variants={staggerItem}
                          className={`group flex items-center gap-5 p-5 cursor-pointer border transition-all duration-500 ${
                            isSelected
                              ? "border-brand-accent/40 bg-brand-accent/[0.03]"
                              : "border-brand-grey-800/60 hover:border-brand-grey-700"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 border flex items-center justify-center shrink-0 transition-all duration-300 ${
                              isSelected
                                ? "bg-brand-accent border-brand-accent"
                                : "border-brand-grey-600 group-hover:border-brand-grey-400"
                            }`}
                          >
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{
                                scale: isSelected ? 1 : 0,
                                opacity: isSelected ? 1 : 0,
                              }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 25,
                              }}
                            >
                              <Check
                                className="w-3 h-3 text-brand-black"
                                strokeWidth={3}
                              />
                            </motion.div>
                          </div>
                          <input
                            type="checkbox"
                            value={feat.id}
                            {...register("features")}
                            className="sr-only"
                          />
                          <div className="flex-1 flex items-center justify-between">
                            <span
                              className={`font-body text-base transition-colors duration-300 ${
                                isSelected
                                  ? "text-brand-white"
                                  : "text-brand-grey-400"
                              }`}
                            >
                              {feat.label}
                            </span>
                            <span className="font-mono text-[10px] text-brand-grey-600">
                              +{formatCurrency(feat.minOut)}
                            </span>
                          </div>
                        </motion.label>
                      );
                    })
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="py-12 border border-brand-grey-800/40 text-center"
                    >
                      <p className="font-body text-brand-grey-500">
                        No extra modifiers available for this service. Continue
                        to the next step.
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* ──── STEP 2: TIMELINE ──── */}
            {currentStep === 2 && (
              <motion.div
                key="step-2"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-10"
              >
                <div>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-brand-white uppercase tracking-tight mb-3">
                    Timeline
                  </h2>
                  <p className="font-body text-brand-grey-300 max-w-lg">
                    How soon do you need this? Rush delivery carries a premium
                    to ensure we dedicate the resources.
                  </p>
                </div>

                <div className="space-y-3">
                  {TIMELINES.map((t, i) => {
                    const isSelected = selectedTimeline === t.id;
                    return (
                      <motion.label
                        key={t.id}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={staggerItem}
                        className={`group flex items-center gap-5 p-6 cursor-pointer border transition-all duration-500 ${
                          isSelected
                            ? "border-brand-accent/60 bg-brand-accent/[0.04]"
                            : "border-brand-grey-800/60 hover:border-brand-grey-600"
                        }`}
                      >
                        <input
                          type="radio"
                          value={t.id}
                          {...register("timeline")}
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-400 ${
                            isSelected
                              ? "border-brand-accent"
                              : "border-brand-grey-700"
                          }`}
                        >
                          <motion.div
                            className="w-2.5 h-2.5 rounded-full bg-brand-accent"
                            initial={{ scale: 0 }}
                            animate={{ scale: isSelected ? 1 : 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 20,
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-display font-bold text-brand-white text-lg tracking-tight">
                              {t.label}
                            </span>
                            {t.id === "rush" && (
                              <span className="font-mono text-[9px] uppercase tracking-wider text-brand-warning bg-brand-warning/10 px-2 py-0.5">
                                +25%
                              </span>
                            )}
                            {t.id === "flexible" && (
                              <span className="font-mono text-[9px] uppercase tracking-wider text-brand-success bg-brand-success/10 px-2 py-0.5">
                                −5%
                              </span>
                            )}
                          </div>
                          <span className="font-body text-brand-grey-500 text-sm">
                            {t.desc}
                          </span>
                        </div>
                      </motion.label>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ──── STEP 3: CONTACT ──── */}
            {currentStep === 3 && (
              <motion.div
                key="step-3"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-8"
              >
                <div>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-brand-white uppercase tracking-tight mb-3">
                    Your Details
                  </h2>
                  <p className="font-body text-brand-grey-300 max-w-lg">
                    We&apos;ll use this to send your personalised project brief
                    and schedule the strategy session.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <motion.div
                    custom={0}
                    initial="hidden"
                    animate="visible"
                    variants={staggerItem}
                  >
                    <label htmlFor="quote-name" className={labelClass}>
                      Name *
                    </label>
                    <input
                      id="quote-name"
                      type="text"
                      placeholder="Your name"
                      className={inputClass}
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className={errorClass}>{errors.name.message}</p>
                    )}
                  </motion.div>
                  <motion.div
                    custom={1}
                    initial="hidden"
                    animate="visible"
                    variants={staggerItem}
                  >
                    <label htmlFor="quote-email" className={labelClass}>
                      Email *
                    </label>
                    <input
                      id="quote-email"
                      type="email"
                      placeholder="your@email.com"
                      className={inputClass}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className={errorClass}>{errors.email.message}</p>
                    )}
                  </motion.div>
                </div>

                <motion.div
                  custom={2}
                  initial="hidden"
                  animate="visible"
                  variants={staggerItem}
                >
                  <label htmlFor="quote-company" className={labelClass}>
                    Company (optional)
                  </label>
                  <input
                    id="quote-company"
                    type="text"
                    placeholder="Your company name"
                    className={inputClass}
                    {...register("company")}
                  />
                </motion.div>

                <motion.div
                  custom={3}
                  initial="hidden"
                  animate="visible"
                  variants={staggerItem}
                >
                  <label htmlFor="quote-notes" className={labelClass}>
                    Additional Context
                  </label>
                  <textarea
                    id="quote-notes"
                    rows={4}
                    placeholder="Current website, competitors, specific goals — the more context, the better."
                    className={`${inputClass} resize-none`}
                    {...register("notes")}
                  />
                </motion.div>

                <motion.div
                  custom={4}
                  initial="hidden"
                  animate="visible"
                  variants={staggerItem}
                >
                  <label className="flex items-start gap-3 font-body text-xs leading-relaxed text-brand-grey-500 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 shrink-0 appearance-none border border-brand-grey-700/60 bg-transparent transition-colors duration-200 checked:bg-brand-accent checked:border-brand-accent flex items-center justify-center relative after:absolute after:hidden checked:after:block after:content-[''] after:w-1 after:h-2 after:border-r-[1.5px] after:border-b-[1.5px] after:border-brand-black after:rotate-45 after:-translate-y-0.5"
                      {...register("consent")}
                    />
                    <span>
                      I agree to the processing of my personal data for the
                      purpose of handling this enquiry, subject to the{" "}
                      <Link
                        href="/privacy"
                        className="text-brand-grey-300 underline decoration-brand-grey-700/50 underline-offset-2 transition-colors hover:text-brand-accent hover:decoration-brand-accent"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>
                  {errors.consent && (
                    <p className={errorClass}>{errors.consent.message}</p>
                  )}
                </motion.div>

                {status === "error" && (
                  <p className="font-mono text-[10px] text-brand-error">
                    {errorMessage ||
                      "Something went wrong. Please try again or email us directly at hello@leveloneagency.co.uk"}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-10 mt-10 border-t border-brand-grey-900/40">
            {currentStep > 0 ? (
              <button
                type="button"
                onClick={prevStep}
                className="group flex items-center gap-3 font-mono text-xs uppercase tracking-[0.12em] text-brand-grey-500 hover:text-brand-white transition-colors duration-300"
              >
                <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                Back
              </button>
            ) : (
              <div />
            )}

            {currentStep < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                className="group relative inline-flex items-center gap-3 bg-brand-white text-brand-black px-8 py-3.5 font-display text-sm font-bold uppercase tracking-[0.1em] transition-all duration-300 hover:bg-brand-accent"
              >
                Continue
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2.5}
                />
              </button>
            ) : (
              <button
                type="submit"
                disabled={status === "submitting"}
                className="group relative inline-flex items-center gap-3 bg-brand-accent text-brand-black px-9 py-4 font-display text-sm font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:shadow-[0_0_60px_rgba(212,255,0,0.18)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? (
                  <>
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-brand-black border-t-transparent" />
                    Submitting…
                  </>
                ) : (
                  <>
                    Submit Project Brief
                    <ArrowRight
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                      strokeWidth={2.5}
                    />
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* ════════════════════════════════════════════════════════
          RIGHT: Sticky Estimate Panel
          ════════════════════════════════════════════════════════ */}
      <div className="lg:col-span-5 xl:col-span-4 order-1 lg:order-2 lg:sticky lg:top-32">
        <div className="relative border border-brand-grey-800/60 bg-brand-black-deep p-8 xl:p-10 overflow-hidden">
          {/* Subtle corner accents */}
          <div className="absolute top-0 left-0 w-8 h-px bg-brand-accent/40" />
          <div className="absolute top-0 left-0 w-px h-8 bg-brand-accent/40" />
          <div className="absolute bottom-0 right-0 w-8 h-px bg-brand-accent/40" />
          <div className="absolute bottom-0 right-0 w-px h-8 bg-brand-accent/40" />

          <div className="section-label mb-8 pb-4 border-b border-brand-grey-800/40">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-accent">
              Live Estimate
            </span>
          </div>

          <div className="space-y-6">
            {/* Service */}
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-[0.15em] text-brand-grey-600 mb-2">
                Project Type
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={selectedServiceId || "pending"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: EDITORIAL_EASE }}
                  className="block font-display text-lg text-brand-white"
                >
                  {selectedServiceId ? (
                    SERVICES.find((s) => s.id === selectedServiceId)?.label
                  ) : (
                    <span className="text-brand-grey-700 italic font-body text-base">
                      Pending Selection
                    </span>
                  )}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Features */}
            <AnimatePresence>
              {selectedFeatures.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: EDITORIAL_EASE }}
                >
                  <span className="block font-mono text-[10px] uppercase tracking-[0.15em] text-brand-grey-600 mb-2">
                    Added Scope
                  </span>
                  <ul className="space-y-1.5">
                    {selectedFeatures.map((featId) => {
                      const feat = FEATURES[
                        selectedServiceId as ServiceId
                      ]?.find((f) => f.id === featId);
                      if (!feat) return null;
                      return (
                        <motion.li
                          key={feat.id}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -8 }}
                          className="flex items-start gap-2 font-body text-sm text-brand-grey-300"
                        >
                          <span className="text-brand-accent mt-px text-xs">
                            +
                          </span>
                          {feat.label}
                        </motion.li>
                      );
                    })}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Estimate */}
            <div className="pt-6 border-t border-brand-grey-800/40">
              <span className="block font-mono text-[10px] uppercase tracking-[0.15em] text-brand-grey-500 mb-4">
                {estimatedRange.type === "retainer"
                  ? "Estimated Monthly Retainer"
                  : "Estimated Investment"}
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${estimatedRange.min}-${estimatedRange.max}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: EDITORIAL_EASE }}
                >
                  {estimatedRange.min > 0 ? (
                    <div className="flex flex-col gap-1">
                      <span className="font-display text-4xl xl:text-5xl font-bold tracking-tight text-brand-accent">
                        {formatCurrency(estimatedRange.min)}
                        {estimatedRange.type === "retainer" && (
                          <span className="text-lg xl:text-xl font-body font-normal text-brand-grey-400">
                            /mo
                          </span>
                        )}
                      </span>
                      <span className="font-mono text-sm text-brand-grey-500">
                        up to {formatCurrency(estimatedRange.max)}
                        {estimatedRange.type === "retainer" && "/mo"}
                      </span>
                    </div>
                  ) : (
                    <span className="font-display text-4xl font-bold tracking-tight text-brand-grey-800">
                      —
                    </span>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Disclaimer */}
            <div className="pt-6 border-t border-brand-grey-800/40">
              <p className="font-mono text-[10px] uppercase leading-relaxed text-brand-grey-600">
                * This calculator provides a rough estimate. A firm, fixed-price
                quote will be provided after our strategy session. No hourly
                surprises.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
