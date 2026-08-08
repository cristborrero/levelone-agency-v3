"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight, ArrowLeft, CheckCircle,
  MonitorSmartphone, ShoppingCart, PenTool, TrendingUp, Cpu, Layers,
  Check, HelpCircle, X, Phone,
} from "lucide-react";
import Link from "next/link";

import { quoteSchema, type QuoteFormData, type ServiceId } from "./schema";

// ════════════════════════════════════════════════════════════════════
// 3. SERVICE CONFIGURATION
//    Each service owns its step sequence and context questions.
//    No two services share the same logical step ID.
// ════════════════════════════════════════════════════════════════════

const SERVICES: { id: ServiceId; label: string; icon: React.ElementType; desc: string }[] = [
  { id: "web_design",        label: "Web Design & Dev",   icon: MonitorSmartphone, desc: "Websites that convert visitors into customers"  },
  { id: "e_commerce",        label: "E-Commerce",          icon: ShoppingCart,     desc: "High-conversion online stores"                  },
  { id: "brand_identity",    label: "Brand Identity",      icon: PenTool,          desc: "Logos, guidelines & brand strategy"             },
  { id: "digital_marketing", label: "Digital Marketing",   icon: TrendingUp,       desc: "SEO, Ads & data-driven growth"                  },
  { id: "ai_solutions",      label: "AI Solutions",        icon: Cpu,              desc: "Custom automations & AI agents"                 },
  { id: "full_package",      label: "The Full Package",    icon: Layers,           desc: "Your complete digital department"               },
];

// Context questions shown inline after service selection — per-service flags
const CONTEXT_QS: Record<ServiceId, { hasWebsite: boolean; brandingStatus: boolean; startTimeline: boolean }> = {
  web_design:        { hasWebsite: true,  brandingStatus: true,  startTimeline: true },
  e_commerce:        { hasWebsite: true,  brandingStatus: true,  startTimeline: true },
  brand_identity:    { hasWebsite: false, brandingStatus: true,  startTimeline: true },  // no website Q for pure brand
  digital_marketing: { hasWebsite: true,  brandingStatus: false, startTimeline: true },  // no brand Q for marketing
  ai_solutions:      { hasWebsite: true,  brandingStatus: false, startTimeline: true },  // no brand Q for AI
  full_package:      { hasWebsite: true,  brandingStatus: true,  startTimeline: true },
};

// Each service has UNIQUE step IDs — zero shared IDs (except "service" and "details")
const SERVICE_STEPS: Record<ServiceId, { label: string; id: string }[]> = {
  web_design: [
    { label: "Service",       id: "service"     },
    { label: "Site Type",     id: "wd_site_type" },
    { label: "Functionality", id: "wd_addons"    },
    { label: "Scope",         id: "wd_scope"     },
    { label: "Details",       id: "details"      },
  ],
  e_commerce: [
    { label: "Service",  id: "service"     },
    { label: "Platform", id: "ec_platform" },
    { label: "Features", id: "ec_features" },
    { label: "Scale",    id: "ec_scale"    },
    { label: "Details",  id: "details"     },
  ],
  brand_identity: [
    { label: "Service",      id: "service"     },
    { label: "Package",      id: "bi_package"  },
    { label: "Deliverables", id: "bi_extras"   },
    { label: "Details",      id: "details"     },
  ],
  digital_marketing: [
    { label: "Service",  id: "service"     },
    { label: "Channels", id: "dm_channels" },
    { label: "Scope",    id: "dm_scope"    },
    { label: "Details",  id: "details"     },
  ],
  ai_solutions: [
    { label: "Service",      id: "service"        },
    { label: "Capabilities", id: "ai_capabilities" },
    { label: "Integration",  id: "ai_integration"  },
    { label: "Details",      id: "details"         },
  ],
  full_package: [
    { label: "Service",   id: "service"    },
    { label: "Scope",     id: "fp_scope"   },
    { label: "Details",   id: "details"    },
  ],
};

// Services that support Fast Track (one-off projects)
const FAST_TRACK_SERVICES: ServiceId[] = ["web_design", "e_commerce", "brand_identity", "ai_solutions"];

const STEP_FIELDS: Record<ServiceId, Record<string, string[]>> = {
  web_design: {
    service: ["service", "hasWebsite", "brandingStatus", "startTimeline"],
    wd_site_type: ["siteType"],
    wd_addons: ["webAddons"],
    wd_scope: ["pageCount", "copywriting", "seoInterest"],
    details: ["name", "email", "budgetBracket", "fastTrack", "wantsCall", "phone", "consent"],
  },
  e_commerce: {
    service: ["service", "hasWebsite", "brandingStatus", "startTimeline"],
    ec_platform: ["ecommercePlatform"],
    ec_features: ["ecommerceFeatures"],
    ec_scale: ["productScale"],
    details: ["name", "email", "budgetBracket", "fastTrack", "wantsCall", "phone", "consent"],
  },
  brand_identity: {
    service: ["service", "brandingStatus", "startTimeline"],
    bi_package: ["brandPackage"],
    bi_extras: ["brandDeliverables"],
    details: ["name", "email", "budgetBracket", "wantsCall", "phone", "consent"],
  },
  digital_marketing: {
    service: ["service", "hasWebsite", "startTimeline"],
    dm_channels: ["marketingChannels"],
    dm_scope: ["adSpendBudget", "contentNeeded"],
    details: ["name", "email", "budgetBracket", "wantsCall", "phone", "consent"],
  },
  ai_solutions: {
    service: ["service", "hasWebsite", "startTimeline"],
    ai_capabilities: ["aiCapabilities"],
    ai_integration: ["aiIntegrations"],
    details: ["name", "email", "budgetBracket", "fastTrack", "wantsCall", "phone", "consent"],
  },
  full_package: {
    service: ["service", "hasWebsite", "brandingStatus", "startTimeline"],
    fp_scope: ["fullPackagePriority"],
    details: ["name", "email", "budgetBracket", "wantsCall", "phone", "consent"],
  },
};

// ════════════════════════════════════════════════════════════════════
// 4. PRICING ENGINE — one function per service, zero cross-mixing
// ════════════════════════════════════════════════════════════════════

export type EstimateResult = { min: number; max: number; type: "one-off" | "retainer" };

// ── Web Design ──
const WD_BASE = { brochure: { min: 1200, max: 2500 }, interactive: { min: 2500, max: 4500 }, enterprise: { min: 6000, max: 15000 } };
const WD_ADDONS: Record<string, { min: number; max: number }> = {
  blog: { min: 300, max: 700 }, booking_system: { min: 500, max: 1200 },
  crm_integration: { min: 700, max: 1800 }, api_integration: { min: 800, max: 2000 },
  multilingual: { min: 500, max: 1500 }, newsletter: { min: 200, max: 500 },
  online_forum: { min: 800, max: 2000 }, quiz_logic: { min: 400, max: 1000 },
  site_search: { min: 300, max: 700 }, social_feed: { min: 200, max: 600 },
  user_accounts: { min: 600, max: 1500 }, ai_chat_bot: { min: 1200, max: 3000 },
};
const WD_PAGES: Record<string, { min: number; max: number }> = {
  up_to_5: { min: 0, max: 0 }, up_to_10: { min: 300, max: 600 },
  up_to_20: { min: 600, max: 1200 }, up_to_50: { min: 1500, max: 3000 }, up_to_100: { min: 3000, max: 6000 },
};

export function calcWebDesign(d: Partial<QuoteFormData>): EstimateResult {
  const base = d.siteType ? WD_BASE[d.siteType] : null;
  let min = base?.min ?? 0;
  let max = base?.max ?? 0;
  (d.webAddons ?? []).forEach((id) => { if (WD_ADDONS[id]) { min += WD_ADDONS[id].min; max += WD_ADDONS[id].max; } });
  if (d.pageCount && WD_PAGES[d.pageCount]) { min += WD_PAGES[d.pageCount].min; max += WD_PAGES[d.pageCount].max; }
  if (d.copywriting === "new_copy") { min += 600; max += 1500; }
  if (d.seoInterest === "yes") { min += 500; max += 1500; }
  if (d.fastTrack === "yes") { min = Math.round(min * 1.25); max = Math.round(max * 1.25); }
  return { min, max, type: "one-off" };
}

// ── E-Commerce ──
const EC_PLATFORM = { woocommerce_shopify: { min: 2500, max: 5000 }, custom: { min: 5000, max: 12000 } };
const EC_FEATURES: Record<string, { min: number; max: number }> = {
  subscriptions: { min: 800, max: 2000 }, erp_inventory: { min: 1500, max: 4000 },
  multilingual: { min: 500, max: 1500 }, custom_checkout: { min: 600, max: 1500 },
  payment_gateways: { min: 300, max: 800 }, abandoned_cart: { min: 400, max: 1000 },
};
const EC_SCALE: Record<string, { min: number; max: number }> = {
  up_to_50: { min: 0, max: 0 }, up_to_200: { min: 500, max: 1000 },
  up_to_500: { min: 1500, max: 3000 }, unlimited: { min: 3000, max: 6000 },
};

export function calcEcommerce(d: Partial<QuoteFormData>): EstimateResult {
  const base = d.ecommercePlatform ? EC_PLATFORM[d.ecommercePlatform] : null;
  let min = base?.min ?? 0;
  let max = base?.max ?? 0;
  (d.ecommerceFeatures ?? []).forEach((id) => { if (EC_FEATURES[id]) { min += EC_FEATURES[id].min; max += EC_FEATURES[id].max; } });
  if (d.productScale && EC_SCALE[d.productScale]) { min += EC_SCALE[d.productScale].min; max += EC_SCALE[d.productScale].max; }
  if (d.fastTrack === "yes") { min = Math.round(min * 1.25); max = Math.round(max * 1.25); }
  return { min, max, type: "one-off" };
}

// ── Brand Identity ──
const BI_PACKAGES = { logo_only: { min: 950, max: 1500 }, full_brand: { min: 1500, max: 3500 }, brand_refresh: { min: 800, max: 1800 } };
const BI_EXTRAS: Record<string, { min: number; max: number }> = {
  brand_guidelines: { min: 300, max: 800 }, social_templates: { min: 250, max: 600 },
  pitch_deck: { min: 400, max: 900 }, stationery: { min: 200, max: 500 }, email_signature: { min: 100, max: 250 },
};

export function calcBrandIdentity(d: Partial<QuoteFormData>): EstimateResult {
  const base = d.brandPackage ? BI_PACKAGES[d.brandPackage] : null;
  let min = base?.min ?? 0;
  let max = base?.max ?? 0;
  (d.brandDeliverables ?? []).forEach((id) => { if (BI_EXTRAS[id]) { min += BI_EXTRAS[id].min; max += BI_EXTRAS[id].max; } });
  // No fast track — creative quality can't be rushed the same way
  return { min, max, type: "one-off" };
}

// ── Digital Marketing ──
const DM_CHANNELS: Record<string, { min: number; max: number }> = {
  technical_seo: { min: 500, max: 800 }, content_seo: { min: 400, max: 700 },
  google_ads: { min: 500, max: 500 }, social_ads: { min: 500, max: 500 },
  cro: { min: 400, max: 800 }, analytics: { min: 300, max: 300 },
};

export function calcDigitalMarketing(d: Partial<QuoteFormData>): EstimateResult {
  let min = 0; let max = 0;
  (d.marketingChannels ?? []).forEach((id) => { if (DM_CHANNELS[id]) { min += DM_CHANNELS[id].min; max += DM_CHANNELS[id].max; } });
  if (d.contentNeeded === "yes")     { min += 400; max += 800; }
  if (d.contentNeeded === "partial") { min += 200; max += 400; }
  if (min === 0) { min = 800; max = 2500; } // baseline before any selection
  return { min, max, type: "retainer" };
}

// ── AI Solutions ──
const AI_CAPS: Record<string, { min: number; max: number }> = {
  readiness_audit: { min: 1200, max: 2500 }, chatbot_assistant: { min: 3500, max: 7000 },
  workflow_automation: { min: 5000, max: 12000 }, data_processing: { min: 3000, max: 8000 },
  multi_agent: { min: 8000, max: 20000 },
};
const AI_INTEGRATIONS: Record<string, { min: number; max: number }> = {
  crm: { min: 500, max: 1500 }, website: { min: 300, max: 800 },
  api_custom: { min: 800, max: 2000 }, data_sources: { min: 600, max: 1500 }, email_platform: { min: 300, max: 700 },
};

export function calcAiSolutions(d: Partial<QuoteFormData>): EstimateResult {
  let min = 0; let max = 0;
  (d.aiCapabilities ?? []).forEach((id) => { if (AI_CAPS[id]) { min += AI_CAPS[id].min; max += AI_CAPS[id].max; } });
  (d.aiIntegrations ?? []).forEach((id) => { if (AI_INTEGRATIONS[id]) { min += AI_INTEGRATIONS[id].min; max += AI_INTEGRATIONS[id].max; } });
  if (min === 0) { min = 1200; max = 3500; } // default to audit baseline
  if (d.fastTrack === "yes") { min = Math.round(min * 1.25); max = Math.round(max * 1.25); }
  return { min, max, type: "one-off" };
}

// ── Full Package ──
export function calcFullPackage(d: Partial<QuoteFormData>): EstimateResult {
  let min = 3000; let max = 6000;
  if (d.fullPackagePriority === "simultaneous") { min += 1000; max += 2000; }
  return { min, max, type: "retainer" };
}

export function calculateEstimate(d: Partial<QuoteFormData>): EstimateResult {
  switch (d.service) {
    case "web_design":        return calcWebDesign(d);
    case "e_commerce":        return calcEcommerce(d);
    case "brand_identity":    return calcBrandIdentity(d);
    case "digital_marketing": return calcDigitalMarketing(d);
    case "ai_solutions":      return calcAiSolutions(d);
    case "full_package":      return calcFullPackage(d);
    default:                  return { min: 0, max: 0, type: "one-off" };
  }
}

// ════════════════════════════════════════════════════════════════════
// 5. ANIMATION CONFIG
// ════════════════════════════════════════════════════════════════════

const EASE = [0.16, 1, 0.3, 1] as const;

const stepVariants = {
  enter:  (dir: number) => ({ opacity: 0, y: dir > 0 ? 40 : -40, filter: "blur(4px)" }),
  center: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE } },
  exit:   (dir: number) => ({ opacity: 0, y: dir > 0 ? -40 : 40, filter: "blur(4px)", transition: { duration: 0.35, ease: EASE } }),
};

const stagger = {
  hidden:  { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.45, ease: EASE } }),
};

// ════════════════════════════════════════════════════════════════════
// 6. UI PRIMITIVES
// ════════════════════════════════════════════════════════════════════

const fmt = (n: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(n);

const inputCls  = "w-full border-b border-brand-grey-700 bg-transparent px-0 py-3 font-body text-base text-brand-white placeholder:text-brand-grey-700 outline-none transition-colors duration-300 focus:border-brand-accent";
const labelCls  = "mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-brand-grey-500";
const errorCls  = "mt-1.5 font-mono text-[10px] text-brand-error";
const headingCls = "font-display text-lg font-bold text-brand-white uppercase tracking-tight mb-4";

// ── Tooltip ──
function Tooltip({ label, text }: { label: string; text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-flex">
      <button type="button" onClick={() => setOpen(!open)} className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-brand-grey-600 hover:text-brand-grey-300 transition-colors">
        <HelpCircle className="w-3.5 h-3.5" />{label}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-0 z-20 mb-2 w-72 border border-brand-grey-700 bg-brand-black-deep p-4 shadow-2xl"
          >
            <button type="button" onClick={() => setOpen(false)} className="absolute top-2 right-2 text-brand-grey-600 hover:text-brand-white transition-colors">
              <X className="w-3 h-3" />
            </button>
            <p className="font-body text-xs leading-relaxed text-brand-grey-300 pr-4">{text}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

// ── Checkbox pill (multi-select) ──
function Pill({ label, price, isSelected, onClick, index = 0 }: {
  label: string; price?: string; isSelected: boolean; onClick: () => void; index?: number;
}) {
  return (
    <motion.button
      type="button" custom={index} initial="hidden" animate="visible" variants={stagger} onClick={onClick}
      className={`relative inline-flex items-center gap-3 px-4 py-2.5 border transition-all duration-300 text-left ${
        isSelected ? "border-brand-accent/60 bg-brand-accent/5 text-brand-white" : "border-brand-grey-800/60 text-brand-grey-400 hover:border-brand-grey-600 hover:text-brand-white"
      }`}
    >
      <span className={`w-3.5 h-3.5 border flex items-center justify-center shrink-0 transition-all duration-200 ${isSelected ? "bg-brand-accent border-brand-accent" : "border-brand-grey-600"}`}>
        {isSelected && <Check className="w-2 h-2 text-brand-black" strokeWidth={3} />}
      </span>
      <span className="font-body text-sm">{label}</span>
      {price && <span className="ml-1 font-mono text-[10px] text-brand-grey-600">{price}</span>}
    </motion.button>
  );
}

// ── Radio pill (single-select, inline) ──
function RadioPill({ label, sub, isSelected, onClick, index = 0 }: {
  label: string; sub?: string; isSelected: boolean; onClick: () => void; index?: number;
}) {
  return (
    <motion.button
      type="button" custom={index} initial="hidden" animate="visible" variants={stagger} onClick={onClick}
      className={`relative flex flex-col px-4 py-3 border transition-all duration-300 text-left ${
        isSelected ? "border-brand-accent/60 bg-brand-accent/5 text-brand-white" : "border-brand-grey-800/60 text-brand-grey-400 hover:border-brand-grey-600 hover:text-brand-grey-200"
      }`}
    >
      <motion.div className="absolute top-0 left-0 right-0 h-px bg-brand-accent" initial={{ scaleX: 0 }} animate={{ scaleX: isSelected ? 1 : 0 }} transition={{ duration: 0.4, ease: EASE }} style={{ transformOrigin: "left" }} />
      <div className="flex items-center justify-between gap-4">
        <span className="font-display font-bold text-[14px] tracking-tight">{label}</span>
        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${isSelected ? "border-brand-accent" : "border-brand-grey-700"}`}>
          <motion.div className="w-2 h-2 rounded-full bg-brand-accent" initial={{ scale: 0 }} animate={{ scale: isSelected ? 1 : 0 }} transition={{ type: "spring", stiffness: 350, damping: 20 }} />
        </div>
      </div>
      {sub && <span className="font-body text-xs text-brand-grey-500 mt-0.5">{sub}</span>}
    </motion.button>
  );
}

// ── Large card (site type, package, platform, priority) ──
function CardOption({ label, sub, badge, isSelected, onClick, index = 0 }: {
  label: string; sub: string; badge?: string; isSelected: boolean; onClick: () => void; index?: number;
}) {
  return (
    <motion.button
      type="button" custom={index} initial="hidden" animate="visible" variants={stagger} onClick={onClick}
      className={`relative flex flex-col p-5 border transition-all duration-400 text-left ${
        isSelected ? "border-brand-accent/60 bg-brand-accent/4" : "border-brand-grey-800/60 hover:border-brand-grey-600"
      }`}
    >
      <motion.div className="absolute top-0 left-0 right-0 h-px bg-brand-accent" initial={{ scaleX: 0 }} animate={{ scaleX: isSelected ? 1 : 0 }} transition={{ duration: 0.4, ease: EASE }} style={{ transformOrigin: "left" }} />
      <div className="flex items-start justify-between gap-3 mb-2">
        <span className="font-display font-bold text-brand-white text-base tracking-tight">{label}</span>
        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${isSelected ? "border-brand-accent" : "border-brand-grey-700"}`}>
          <motion.div className="w-2 h-2 rounded-full bg-brand-accent" initial={{ scale: 0 }} animate={{ scale: isSelected ? 1 : 0 }} transition={{ type: "spring", stiffness: 350, damping: 20 }} />
        </div>
      </div>
      <span className="font-body text-brand-grey-500 text-sm mb-3">{sub}</span>
      {badge && <span className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">{badge}</span>}
    </motion.button>
  );
}

// ── Service card (Step 1 grid) ──
function ServiceCard({ id, label, icon: Icon, desc, isSelected, onClick, index }: {
  id: string; label: string; icon: React.ElementType; desc: string; isSelected: boolean; onClick: () => void; index: number;
}) {
  return (
    <motion.button
      type="button" custom={index} initial="hidden" animate="visible" variants={stagger} onClick={onClick}
      className={`group relative flex flex-col p-4 border transition-all duration-500 text-left ${isSelected ? "border-brand-accent/60 bg-brand-accent/4" : "border-brand-grey-800/60 hover:border-brand-grey-600"}`}
    >
      <motion.div className="absolute top-0 left-0 right-0 h-px bg-brand-accent" initial={{ scaleX: 0 }} animate={{ scaleX: isSelected ? 1 : 0 }} transition={{ duration: 0.5, ease: EASE }} style={{ transformOrigin: "left" }} />
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 transition-all duration-500 ${isSelected ? "text-brand-black bg-brand-accent" : "text-brand-grey-300 bg-brand-grey-900/60 group-hover:bg-brand-grey-800"}`}>
          <Icon className="w-5 h-5" strokeWidth={1.5} />
        </div>
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isSelected ? "border-brand-accent" : "border-brand-grey-700"}`}>
          <motion.div className="w-2.5 h-2.5 rounded-full bg-brand-accent" initial={{ scale: 0 }} animate={{ scale: isSelected ? 1 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} />
        </div>
      </div>
      <span className="font-display font-bold text-brand-white text-base tracking-tight mb-0.5">{label}</span>
      <span className="font-body text-brand-grey-500 text-xs">{desc}</span>
    </motion.button>
  );
}

// ════════════════════════════════════════════════════════════════════
// 7. MAIN COMPONENT
// ════════════════════════════════════════════════════════════════════

export function QuoteCalculator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [estimate, setEstimate] = useState<EstimateResult>({ min: 0, max: 0, type: "one-off" });

  const {
    register, handleSubmit, watch, trigger, setValue,
    formState: { errors }, reset, clearErrors,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      webAddons: [], ecommerceFeatures: [], brandDeliverables: [],
      marketingChannels: [], aiCapabilities: [], aiIntegrations: [],
      fastTrack: "no", wantsCall: "no",
    },
    mode: "onTouched",
  });

  const v = watch();
  const serviceId = v.service as ServiceId | undefined;

  // Derive active steps — falls back to web_design shape for initial layout
  const activeSteps = serviceId ? SERVICE_STEPS[serviceId] : SERVICE_STEPS.web_design;
  const logicalStep = activeSteps[currentStep]?.id ?? "service";
  const showFastTrack = serviceId ? FAST_TRACK_SERVICES.includes(serviceId) : false;

  // Reset to step 0 and clear service-specific fields on service change
  useEffect(() => {
    if (!serviceId) return;
    setCurrentStep(0);
    clearErrors();
    // Clear all service-specific fields
    (["siteType", "webAddons", "pageCount", "copywriting", "seoInterest",
      "ecommercePlatform", "ecommerceFeatures", "productScale",
      "brandPackage", "brandDeliverables",
      "marketingChannels", "adSpendBudget", "contentNeeded",
      "aiCapabilities", "aiIntegrations",
      "fullPackagePriority"] as const).forEach((key) => {
      if (Array.isArray(v[key])) setValue(key, [] as never);
      else setValue(key, undefined as never);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceId]);

  // Live estimate
  useEffect(() => {
    setEstimate(calculateEstimate(v));
  }, [
    v.service, v.siteType, v.webAddons, v.pageCount, v.copywriting, v.seoInterest,
    v.ecommercePlatform, v.ecommerceFeatures, v.productScale,
    v.brandPackage, v.brandDeliverables,
    v.marketingChannels, v.contentNeeded,
    v.aiCapabilities, v.aiIntegrations,
    v.fullPackagePriority, v.fastTrack,
  ]);

  const nextStep = useCallback(async () => {
    if (!serviceId) return;
    const currentLogicalId = activeSteps[currentStep]?.id;
    const fieldsToValidate = STEP_FIELDS[serviceId]?.[currentLogicalId] ?? [];
    const valid = await trigger(fieldsToValidate as any);
    if (valid) {
      setDirection(1);
      setCurrentStep((p) => Math.min(p + 1, activeSteps.length - 1));
    }
  }, [currentStep, trigger, activeSteps, serviceId]);

  const prevStep = useCallback(() => {
    setDirection(-1);
    setCurrentStep((p) => Math.max(p - 1, 0));
  }, []);

  const toggle = (field: keyof QuoteFormData, id: string) => {
    const cur = (v[field] as string[]) ?? [];
    setValue(field, (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]) as never, { shouldValidate: true });
  };

  const onSubmit = async (data: QuoteFormData) => {
    setStatus("submitting");
    setErrorMessage("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, calculatedEstimate: estimate }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to submit");
      setStatus("success");
      reset();
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "An unexpected error occurred.");
    }
  };

  // ── Success ──
  if (status === "success") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: EASE }}
        className="flex min-h-[50vh] flex-col items-center justify-center text-center gap-8">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
          className="flex h-20 w-20 items-center justify-center border border-brand-success/30">
          <CheckCircle className="h-10 w-10 text-brand-success" strokeWidth={1.5} />
        </motion.div>
        <div>
          <h3 className="font-display text-3xl md:text-4xl font-bold uppercase text-brand-white mb-4">Brief Received</h3>
          <p className="max-w-lg mx-auto font-body text-lg leading-relaxed text-brand-grey-300">
            We&apos;ve logged your project details. Our team reviews every submission personally and will come back within one working day with a tailored proposal.
          </p>
        </div>
        <Link href="/services" className="mt-4 inline-flex items-center gap-2 border-b border-brand-grey-700 pb-0.5 font-body text-sm text-brand-grey-300 transition-all duration-300 hover:border-brand-white hover:text-brand-white">
          Explore our services <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
        </Link>
      </motion.div>
    );
  }

  const ctx = serviceId ? CONTEXT_QS[serviceId] : null;

  return (
    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 relative items-start">

      {/* ════ LEFT: Form ════ */}
      <div className="lg:col-span-7 xl:col-span-8 order-2 lg:order-1">

        {/* Step indicator */}
        <div className="mb-10">
          <div className="flex items-center">
            {activeSteps.map((step, idx) => {
              const isDone = idx < currentStep;
              const isActive = idx === currentStep;
              return (
                <div key={step.id} className="flex items-center flex-1 last:flex-none">
                  <div className="flex items-center gap-3">
                    <span className={`flex h-8 w-8 items-center justify-center border font-mono text-xs transition-all duration-500 ${
                      isActive ? "border-brand-accent bg-brand-accent text-brand-black font-bold"
                      : isDone  ? "border-brand-accent/40 bg-brand-accent/10 text-brand-accent"
                                : "border-brand-grey-800 text-brand-grey-600"
                    }`}>
                      {isDone ? <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> : String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className={`hidden sm:block font-mono text-[10px] uppercase tracking-[0.12em] transition-colors duration-500 ${
                      isActive ? "text-brand-white" : isDone ? "text-brand-accent/60" : "text-brand-grey-700"
                    }`}>{step.label}</span>
                  </div>
                  {idx < activeSteps.length - 1 && (
                    <div className="flex-1 mx-4">
                      <div className="h-px bg-brand-grey-800 relative">
                        <motion.div className="absolute inset-y-0 left-0 bg-brand-accent/40" initial={{ width: "0%" }} animate={{ width: isDone ? "100%" : "0%" }} transition={{ duration: 0.6, ease: EASE }} />
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

            {/* ══════════════════════════════════════════════════════
                STEP: service — shared by all services
                Context questions are filtered per-service by CONTEXT_QS
                ══════════════════════════════════════════════════════ */}
            {logicalStep === "service" && (
              <motion.div key="step-service" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-10">
                <div>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-brand-white uppercase tracking-tight mb-3">What do you need?</h2>
                  <p className="font-body text-brand-grey-300 max-w-lg">Select the primary service for your project — this determines the entire estimation flow.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SERVICES.map((s, i) => (
                    <ServiceCard key={s.id} id={s.id} label={s.label} icon={s.icon} desc={s.desc} isSelected={serviceId === s.id} onClick={() => setValue("service", s.id, { shouldValidate: true })} index={i} />
                  ))}
                </div>
                {errors.service && <p className={errorCls}>{errors.service.message}</p>}

                {/* Context questions — only appear after service is picked, filtered per service */}
                <AnimatePresence>
                  {serviceId && ctx && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.45, ease: EASE }} className="space-y-8 overflow-hidden pt-2">

                      {ctx.hasWebsite && (
                        <div>
                          <p className={headingCls}>Do you have a website already?</p>
                          <div className="flex flex-wrap gap-3">
                            {[{ id: "yes", label: "Yes" }, { id: "no", label: "No" }].map(({ id, label }, i) => (
                              <RadioPill key={id} label={label} isSelected={v.hasWebsite === id} onClick={() => setValue("hasWebsite", id as "yes" | "no", { shouldValidate: true })} index={i} />
                            ))}
                          </div>
                          {errors.hasWebsite && <p className={errorCls}>{errors.hasWebsite.message}</p>}
                        </div>
                      )}

                      {ctx.brandingStatus && (
                        <div>
                          <p className={headingCls}>Do you currently have branding with brand guidelines?</p>
                          <div className="flex flex-wrap gap-3">
                            {[
                              { id: "not_yet",              label: "Not yet"                   },
                              { id: "logo_only",            label: "Logo only"                 },
                              { id: "logo_with_guidelines", label: "Logo with brand guidelines" },
                              { id: "needs_branding",       label: "I require new branding"    },
                            ].map(({ id, label }, i) => (
                              <RadioPill key={id} label={label} isSelected={v.brandingStatus === id} onClick={() => setValue("brandingStatus", id as QuoteFormData["brandingStatus"], { shouldValidate: true })} index={i} />
                            ))}
                          </div>
                          {errors.brandingStatus && <p className={errorCls}>{errors.brandingStatus.message}</p>}
                        </div>
                      )}

                      {ctx.startTimeline && (
                        <div>
                          <p className={headingCls}>When are you looking to start?</p>
                          <div className="flex flex-wrap gap-3">
                            {[
                              { id: "exploring",     label: "Exploring ideas"      },
                              { id: "3_to_6_months", label: "Next 3 to 6 months"   },
                              { id: "1_to_3_months", label: "1 to 3 months"        },
                              { id: "right_away",    label: "Right away"           },
                              { id: "finishing",     label: "Need help finishing"  },
                            ].map(({ id, label }, i) => (
                              <RadioPill key={id} label={label} isSelected={v.startTimeline === id} onClick={() => setValue("startTimeline", id as QuoteFormData["startTimeline"], { shouldValidate: true })} index={i} />
                            ))}
                          </div>
                          {errors.startTimeline && <p className={errorCls}>{errors.startTimeline.message}</p>}
                        </div>
                      )}

                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* ══════════════════════════════════════════════════════
                WEB DESIGN — Step 2: Site Type
                ══════════════════════════════════════════════════════ */}
            {logicalStep === "wd_site_type" && (
              <motion.div key="wd_site_type" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-brand-white uppercase tracking-tight mb-3">Site Type</h2>
                  <p className="font-body text-brand-grey-300 max-w-lg">Select what best describes your website requirements.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { id: "brochure",    label: "Brochure",    sub: "Personal sites & small businesses — clean, fast, focused on conversion.",      badge: "From £1,200" },
                    { id: "interactive", label: "Interactive", sub: "Engaging digital experiences with advanced animations and dynamic content.",    badge: "From £2,500" },
                    { id: "enterprise",  label: "Enterprise",  sub: "Large-scale corporate platforms with complex architecture and integrations.",    badge: "From £6,000" },
                  ].map(({ id, label, sub, badge }, i) => (
                    <CardOption key={id} label={label} sub={sub} badge={badge} isSelected={v.siteType === id} onClick={() => setValue("siteType", id as QuoteFormData["siteType"], { shouldValidate: true })} index={i} />
                  ))}
                </div>
                {errors.siteType && <p className={errorCls}>{errors.siteType.message}</p>}
              </motion.div>
            )}

            {/* ══════════════════════════════════════════════════════
                WEB DESIGN — Step 3: Functionality Add-ons
                ══════════════════════════════════════════════════════ */}
            {logicalStep === "wd_addons" && (
              <motion.div key="wd_addons" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-brand-white uppercase tracking-tight mb-3">Additional Functionality</h2>
                  <p className="font-body text-brand-grey-300 max-w-lg">Select any features your site requires. Each adjusts the estimate in real-time. Skip if none apply.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {[
                    { id: "blog",            label: "Blog",               price: "+£300"   },
                    { id: "booking_system",  label: "Booking System",     price: "+£500"   },
                    { id: "crm_integration", label: "CRM Integration",    price: "+£700"   },
                    { id: "api_integration", label: "API Integration",    price: "+£800"   },
                    { id: "multilingual",    label: "Multilingual",       price: "+£500"   },
                    { id: "newsletter",      label: "Newsletter",         price: "+£200"   },
                    { id: "online_forum",    label: "Online Forum",       price: "+£800"   },
                    { id: "quiz_logic",      label: "Quiz / Lead Quiz",   price: "+£400"   },
                    { id: "site_search",     label: "Site Search",        price: "+£300"   },
                    { id: "social_feed",     label: "Social Feed",        price: "+£200"   },
                    { id: "user_accounts",   label: "User Accounts",      price: "+£600"   },
                    { id: "ai_chat_bot",     label: "AI Chat Bot",        price: "+£1,200" },
                  ].map(({ id, label, price }, i) => (
                    <Pill key={id} label={label} price={price} isSelected={(v.webAddons ?? []).includes(id)} onClick={() => toggle("webAddons", id)} index={i} />
                  ))}
                </div>
                {(v.webAddons ?? []).length > 0 && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">
                    {(v.webAddons ?? []).length} feature{(v.webAddons ?? []).length > 1 ? "s" : ""} selected
                  </motion.p>
                )}
              </motion.div>
            )}

            {/* ══════════════════════════════════════════════════════
                WEB DESIGN — Step 4: Scope
                ══════════════════════════════════════════════════════ */}
            {logicalStep === "wd_scope" && (
              <motion.div key="wd_scope" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-10">
                <div>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-brand-white uppercase tracking-tight mb-3">Scope & Content</h2>
                  <p className="font-body text-brand-grey-300 max-w-lg">Help us understand the size and content needs of your project.</p>
                </div>
                <div>
                  <p className={headingCls}>Number of webpages required</p>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { id: "up_to_5",   label: "Up to 5"   },
                      { id: "up_to_10",  label: "Up to 10"  },
                      { id: "up_to_20",  label: "Up to 20"  },
                      { id: "up_to_50",  label: "Up to 50"  },
                      { id: "up_to_100", label: "Up to 100" },
                    ].map(({ id, label }, i) => (
                      <RadioPill key={id} label={label} isSelected={v.pageCount === id} onClick={() => setValue("pageCount", id as QuoteFormData["pageCount"], { shouldValidate: true })} index={i} />
                    ))}
                  </div>
                  {errors.pageCount && <p className={errorCls}>{errors.pageCount.message}</p>}
                </div>
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <p className={headingCls.replace(" mb-4", "")}>Copywriting</p>
                    <Tooltip label="What is copywriting?" text="Copywriting is the craft of writing persuasive, on-brand website text — headlines, service descriptions, calls-to-action and more. Professional copy converts visitors into clients and is optimised for both humans and search engines." />
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { id: "own_copy",        label: "I have my own copy"                },
                      { id: "same_as_current", label: "Use content from my current site"  },
                      { id: "new_copy",        label: "I need new copy written"           },
                    ].map(({ id, label }, i) => (
                      <RadioPill key={id} label={label} isSelected={v.copywriting === id} onClick={() => setValue("copywriting", id as QuoteFormData["copywriting"], { shouldValidate: true })} index={i} />
                    ))}
                  </div>
                  {errors.copywriting && <p className={errorCls}>{errors.copywriting.message}</p>}
                </div>
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <p className={headingCls.replace(" mb-4", "")}>Are you interested in SEO?</p>
                    <Tooltip label="What is SEO?" text="Search Engine Optimisation (SEO) improves your website's visibility in Google. It includes keyword research, content strategy, technical audits, and link building — all aimed at bringing you consistent organic traffic." />
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { id: "yes", label: "Yes — include SEO"   },
                      { id: "no",  label: "Not right now"       },
                    ].map(({ id, label }, i) => (
                      <RadioPill key={id} label={label} isSelected={v.seoInterest === id} onClick={() => setValue("seoInterest", id as QuoteFormData["seoInterest"], { shouldValidate: true })} index={i} />
                    ))}
                  </div>
                  {errors.seoInterest && <p className={errorCls}>{errors.seoInterest.message}</p>}
                </div>
              </motion.div>
            )}

            {/* ══════════════════════════════════════════════════════
                E-COMMERCE — Step 2: Platform
                ══════════════════════════════════════════════════════ */}
            {logicalStep === "ec_platform" && (
              <motion.div key="ec_platform" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-brand-white uppercase tracking-tight mb-3">Store Platform</h2>
                  <p className="font-body text-brand-grey-300 max-w-lg">Choose the platform that best fits your store&apos;s needs and scale.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: "woocommerce_shopify", label: "WooCommerce / Shopify", sub: "Battle-tested platforms with rich plugin ecosystems — the smart default for most stores.", badge: "From £2,500" },
                    { id: "custom",              label: "Custom Build",           sub: "Fully bespoke storefront — unlimited control, built precisely to your workflow and scale.",  badge: "From £5,000" },
                  ].map(({ id, label, sub, badge }, i) => (
                    <CardOption key={id} label={label} sub={sub} badge={badge} isSelected={v.ecommercePlatform === id} onClick={() => setValue("ecommercePlatform", id as QuoteFormData["ecommercePlatform"], { shouldValidate: true })} index={i} />
                  ))}
                </div>
                {errors.ecommercePlatform && <p className={errorCls}>{errors.ecommercePlatform.message}</p>}
              </motion.div>
            )}

            {/* ══════════════════════════════════════════════════════
                E-COMMERCE — Step 3: Store Features
                ══════════════════════════════════════════════════════ */}
            {logicalStep === "ec_features" && (
              <motion.div key="ec_features" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-brand-white uppercase tracking-tight mb-3">Store Features</h2>
                  <p className="font-body text-brand-grey-300 max-w-lg">Select the eCommerce capabilities your store needs. Skip if the base platform covers everything.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {[
                    { id: "subscriptions",    label: "Subscriptions / Recurring",     price: "+£800"   },
                    { id: "erp_inventory",    label: "ERP / Inventory Sync",           price: "+£1,500" },
                    { id: "multilingual",     label: "Multilingual / Multi-currency",  price: "+£500"   },
                    { id: "custom_checkout",  label: "Custom Checkout Experience",     price: "+£600"   },
                    { id: "payment_gateways", label: "Multiple Payment Gateways",      price: "+£300"   },
                    { id: "abandoned_cart",   label: "Abandoned Cart Recovery",        price: "+£400"   },
                  ].map(({ id, label, price }, i) => (
                    <Pill key={id} label={label} price={price} isSelected={(v.ecommerceFeatures ?? []).includes(id)} onClick={() => toggle("ecommerceFeatures", id)} index={i} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* ══════════════════════════════════════════════════════
                E-COMMERCE — Step 4: Product Scale
                ══════════════════════════════════════════════════════ */}
            {logicalStep === "ec_scale" && (
              <motion.div key="ec_scale" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-brand-white uppercase tracking-tight mb-3">Product Scale</h2>
                  <p className="font-body text-brand-grey-300 max-w-lg">How many products will your store carry at launch? This affects setup and migration time.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: "up_to_50",  label: "Up to 50 products",   sub: "Small catalogue — focused, curated range.",                  badge: "Included" },
                    { id: "up_to_200", label: "Up to 200 products",  sub: "Growing catalogue — moderate setup and data migration.",      badge: "+£500"     },
                    { id: "up_to_500", label: "Up to 500 products",  sub: "Large catalogue — structured import and QA process.",         badge: "+£1,500"   },
                    { id: "unlimited", label: "500+ / Enterprise",   sub: "High-volume store — custom data pipeline and feed system.",   badge: "+£3,000"   },
                  ].map(({ id, label, sub, badge }, i) => (
                    <CardOption key={id} label={label} sub={sub} badge={badge} isSelected={v.productScale === id} onClick={() => setValue("productScale", id as QuoteFormData["productScale"], { shouldValidate: true })} index={i} />
                  ))}
                </div>
                {errors.productScale && <p className={errorCls}>{errors.productScale.message}</p>}
              </motion.div>
            )}

            {/* ══════════════════════════════════════════════════════
                BRAND IDENTITY — Step 2: Package
                ══════════════════════════════════════════════════════ */}
            {logicalStep === "bi_package" && (
              <motion.div key="bi_package" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-brand-white uppercase tracking-tight mb-3">Brand Package</h2>
                  <p className="font-body text-brand-grey-300 max-w-lg">Select the branding scope that best fits where you are in your business journey.</p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { id: "logo_only",     label: "Logo & Core Identity",  sub: "Logomark, logotype, colour palette, and primary typography — the essential visual foundation.",                          badge: "From £950"  },
                    { id: "full_brand",    label: "Full Brand Identity",    sub: "Complete visual system: logo, colour, typography, tone of voice, usage guidelines, and all supporting brand assets.",  badge: "From £1,500" },
                    { id: "brand_refresh", label: "Brand Refresh",          sub: "Evolve an existing brand — modernise visuals while preserving the brand equity and recognition you&apos;ve built.",    badge: "From £800"  },
                  ].map(({ id, label, sub, badge }, i) => (
                    <CardOption key={id} label={label} sub={sub} badge={badge} isSelected={v.brandPackage === id} onClick={() => setValue("brandPackage", id as QuoteFormData["brandPackage"], { shouldValidate: true })} index={i} />
                  ))}
                </div>
                {errors.brandPackage && <p className={errorCls}>{errors.brandPackage.message}</p>}
              </motion.div>
            )}

            {/* ══════════════════════════════════════════════════════
                BRAND IDENTITY — Step 3: Additional Deliverables
                ══════════════════════════════════════════════════════ */}
            {logicalStep === "bi_extras" && (
              <motion.div key="bi_extras" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-brand-white uppercase tracking-tight mb-3">Additional Deliverables</h2>
                  <p className="font-body text-brand-grey-300 max-w-lg">Select any extra brand assets alongside your core identity package. All optional.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {[
                    { id: "brand_guidelines", label: "Full Brand Guidelines Deck", price: "+£300" },
                    { id: "social_templates", label: "Social Media Templates",     price: "+£250" },
                    { id: "pitch_deck",       label: "Pitch Deck / Presentation",  price: "+£400" },
                    { id: "stationery",       label: "Print Stationery",           price: "+£200" },
                    { id: "email_signature",  label: "Email Signature",            price: "+£100" },
                  ].map(({ id, label, price }, i) => (
                    <Pill key={id} label={label} price={price} isSelected={(v.brandDeliverables ?? []).includes(id)} onClick={() => toggle("brandDeliverables", id)} index={i} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* ══════════════════════════════════════════════════════
                DIGITAL MARKETING — Step 2: Channels
                ══════════════════════════════════════════════════════ */}
            {logicalStep === "dm_channels" && (
              <motion.div key="dm_channels" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-brand-white uppercase tracking-tight mb-3">Marketing Channels</h2>
                  <p className="font-body text-brand-grey-300 max-w-lg">Select the channels you want to activate. These form your monthly retainer scope.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {[
                    { id: "technical_seo", label: "Technical SEO",        price: "+£500/mo" },
                    { id: "content_seo",   label: "Content SEO",          price: "+£400/mo" },
                    { id: "google_ads",    label: "Google Ads / PPC",     price: "+£500/mo" },
                    { id: "social_ads",    label: "Social Media Ads",     price: "+£500/mo" },
                    { id: "cro",           label: "Conversion Rate Opt.", price: "+£400/mo" },
                    { id: "analytics",     label: "Analytics Dashboard",  price: "+£300/mo" },
                  ].map(({ id, label, price }, i) => (
                    <Pill key={id} label={label} price={price} isSelected={(v.marketingChannels ?? []).includes(id)} onClick={() => toggle("marketingChannels", id)} index={i} />
                  ))}
                </div>
                {errors.marketingChannels && <p className={errorCls}>{errors.marketingChannels.message}</p>}
                {(v.marketingChannels ?? []).length > 0 && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">
                    {(v.marketingChannels ?? []).length} channel{(v.marketingChannels ?? []).length > 1 ? "s" : ""} selected
                  </motion.p>
                )}
              </motion.div>
            )}

            {/* ══════════════════════════════════════════════════════
                DIGITAL MARKETING — Step 3: Campaign Scope
                ══════════════════════════════════════════════════════ */}
            {logicalStep === "dm_scope" && (
              <motion.div key="dm_scope" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-10">
                <div>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-brand-white uppercase tracking-tight mb-3">Campaign Scope</h2>
                  <p className="font-body text-brand-grey-300 max-w-lg">A few more details to help us build the right marketing proposal.</p>
                </div>
                <div>
                  <p className={headingCls}>Available monthly ad spend</p>
                  <p className="font-body text-sm text-brand-grey-500 mb-4">This is the budget you invest directly in ads — separate from our management fee.</p>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { id: "500_1k",  label: "£500 – £1K/mo"  },
                      { id: "1k_3k",   label: "£1K – £3K/mo"   },
                      { id: "3k_5k",   label: "£3K – £5K/mo"   },
                      { id: "5k_plus", label: "£5K+/mo"        },
                    ].map(({ id, label }, i) => (
                      <RadioPill key={id} label={label} isSelected={v.adSpendBudget === id} onClick={() => setValue("adSpendBudget", id as QuoteFormData["adSpendBudget"], { shouldValidate: true })} index={i} />
                    ))}
                  </div>
                  {errors.adSpendBudget && <p className={errorCls}>{errors.adSpendBudget.message}</p>}
                </div>
                <div>
                  <p className={headingCls}>Do you need content creation?</p>
                  <p className="font-body text-sm text-brand-grey-500 mb-4">Blog posts, ad creatives, and social copy — produced and managed by our team.</p>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { id: "yes",     label: "Yes — include content creation"  },
                      { id: "partial", label: "Some — we have partial content"   },
                      { id: "no",      label: "No — we produce our own content"  },
                    ].map(({ id, label }, i) => (
                      <RadioPill key={id} label={label} isSelected={v.contentNeeded === id} onClick={() => setValue("contentNeeded", id as QuoteFormData["contentNeeded"], { shouldValidate: true })} index={i} />
                    ))}
                  </div>
                  {errors.contentNeeded && <p className={errorCls}>{errors.contentNeeded.message}</p>}
                </div>
              </motion.div>
            )}

            {/* ══════════════════════════════════════════════════════
                AI SOLUTIONS — Step 2: Capabilities
                ══════════════════════════════════════════════════════ */}
            {logicalStep === "ai_capabilities" && (
              <motion.div key="ai_capabilities" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-brand-white uppercase tracking-tight mb-3">AI Capabilities</h2>
                  <p className="font-body text-brand-grey-300 max-w-lg">Select the AI capabilities your business needs. You can combine multiple.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {[
                    { id: "readiness_audit",     label: "AI Readiness Audit",            price: "+£1,200"  },
                    { id: "chatbot_assistant",   label: "Chatbot / AI Assistant",        price: "+£3,500"  },
                    { id: "workflow_automation", label: "Enterprise Workflow Automation", price: "+£5,000"  },
                    { id: "data_processing",     label: "Data Extraction & Processing",  price: "+£3,000"  },
                    { id: "multi_agent",         label: "Multi-Agent AI System",         price: "+£8,000"  },
                  ].map(({ id, label, price }, i) => (
                    <Pill key={id} label={label} price={price} isSelected={(v.aiCapabilities ?? []).includes(id)} onClick={() => toggle("aiCapabilities", id)} index={i} />
                  ))}
                </div>
                {errors.aiCapabilities && <p className={errorCls}>{errors.aiCapabilities.message}</p>}
              </motion.div>
            )}

            {/* ══════════════════════════════════════════════════════
                AI SOLUTIONS — Step 3: Integration
                ══════════════════════════════════════════════════════ */}
            {logicalStep === "ai_integration" && (
              <motion.div key="ai_integration" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-brand-white uppercase tracking-tight mb-3">Systems to Integrate</h2>
                  <p className="font-body text-brand-grey-300 max-w-lg">Which existing tools and platforms need to connect with your AI solution?</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {[
                    { id: "crm",            label: "CRM (HubSpot, Salesforce…)", price: "+£500" },
                    { id: "website",        label: "Website / CMS",              price: "+£300" },
                    { id: "api_custom",     label: "Custom APIs",                price: "+£800" },
                    { id: "data_sources",   label: "Data Sources / Databases",   price: "+£600" },
                    { id: "email_platform", label: "Email Platform",             price: "+£300" },
                  ].map(({ id, label, price }, i) => (
                    <Pill key={id} label={label} price={price} isSelected={(v.aiIntegrations ?? []).includes(id)} onClick={() => toggle("aiIntegrations", id)} index={i} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* ══════════════════════════════════════════════════════
                FULL PACKAGE — Step 2: Activation Priority
                ══════════════════════════════════════════════════════ */}
            {logicalStep === "fp_scope" && (
              <motion.div key="fp_scope" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-brand-white uppercase tracking-tight mb-3">Activation Priority</h2>
                  <p className="font-body text-brand-grey-300 max-w-lg">The Full Package covers Brand, Website, Marketing, and AI — all under one dedicated team. What matters most to activate first?</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: "brand_first",     label: "Brand First",       sub: "Establish a cohesive identity before everything else — the right foundation for all digital channels."        },
                    { id: "web_first",       label: "Website First",     sub: "Get a high-performance digital presence live and converting as fast as possible."                             },
                    { id: "marketing_first", label: "Marketing First",   sub: "Start driving qualified leads immediately while the full strategy and assets are being built."                 },
                    { id: "simultaneous",    label: "Full Activation",   sub: "Launch all departments simultaneously — maximum velocity, dedicated project leadership, maximum investment."   },
                  ].map(({ id, label, sub }, i) => (
                    <CardOption key={id} label={label} sub={sub} isSelected={v.fullPackagePriority === id} onClick={() => setValue("fullPackagePriority", id as QuoteFormData["fullPackagePriority"], { shouldValidate: true })} index={i} />
                  ))}
                </div>
                {errors.fullPackagePriority && <p className={errorCls}>{errors.fullPackagePriority.message}</p>}
              </motion.div>
            )}

            {/* ══════════════════════════════════════════════════════
                DETAILS — Shared final step across all services
                ══════════════════════════════════════════════════════ */}
            {logicalStep === "details" && (
              <motion.div key="details" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-brand-white uppercase tracking-tight mb-3">Final Details</h2>
                  <p className="font-body text-brand-grey-300 max-w-lg">Every submission is reviewed personally. We&apos;ll come back within one working day with a tailored proposal.</p>
                </div>

                {/* Budget */}
                <div>
                  <p className={headingCls}>Do you have a budget allocated?</p>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { id: "no_budget",  label: "Not yet"      },
                      { id: "6_to_10k",   label: "£6K – £10K"  },
                      { id: "10_to_15k",  label: "£10K – £15K" },
                      { id: "15_to_20k",  label: "£15K – £20K" },
                      { id: "20_to_30k",  label: "£20K – £30K" },
                      { id: "30k_plus",   label: "£30K+"       },
                      { id: "other",      label: "Other"       },
                    ].map(({ id, label }, i) => (
                      <RadioPill key={id} label={label} isSelected={v.budgetBracket === id} onClick={() => setValue("budgetBracket", id as QuoteFormData["budgetBracket"], { shouldValidate: true })} index={i} />
                    ))}
                  </div>
                </div>

                {/* Fast Track — only for one-off services */}
                {showFastTrack && (
                  <div>
                    <p className={headingCls}>Fast track your project?</p>
                    <p className="font-body text-sm text-brand-grey-500 mb-4">Finish significantly faster with agile delivery and dedicated resource allocation — 25% premium applied.</p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { id: "no",  label: "Standard timeline"   },
                        { id: "yes", label: "Yes — fast track it" },
                      ].map(({ id, label }, i) => (
                        <RadioPill key={id} label={label} isSelected={v.fastTrack === id} onClick={() => setValue("fastTrack", id as "yes" | "no", { shouldValidate: true })} index={i} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 pt-4 border-t border-brand-grey-900/40">
                  <motion.div custom={0} initial="hidden" animate="visible" variants={stagger}>
                    <label htmlFor="quote-name" className={labelCls}>Name *</label>
                    <input id="quote-name" type="text" placeholder="Your name" className={inputCls} {...register("name")} />
                    {errors.name && <p className={errorCls}>{errors.name.message}</p>}
                  </motion.div>
                  <motion.div custom={1} initial="hidden" animate="visible" variants={stagger}>
                    <label htmlFor="quote-email" className={labelCls}>Email *</label>
                    <input id="quote-email" type="email" placeholder="your@email.com" className={inputCls} {...register("email")} />
                    {errors.email && <p className={errorCls}>{errors.email.message}</p>}
                  </motion.div>
                </div>

                <motion.div custom={2} initial="hidden" animate="visible" variants={stagger}>
                  <label htmlFor="quote-company" className={labelCls}>Company (optional)</label>
                  <input id="quote-company" type="text" placeholder="Your company name" className={inputCls} {...register("company")} />
                </motion.div>

                <motion.div custom={3} initial="hidden" animate="visible" variants={stagger}>
                  <label htmlFor="quote-details" className={labelCls}>Additional Details</label>
                  <textarea id="quote-details" rows={4} placeholder="Current website, competitors, specific goals — the more context the better." className={`${inputCls} resize-none`} {...register("additionalDetails")} />
                </motion.div>

                {/* Call preference */}
                <motion.div custom={4} initial="hidden" animate="visible" variants={stagger} className="space-y-4">
                  <p className={headingCls.replace(" mb-4", "")}>Do you want us to call you to discuss your estimate?</p>
                  <div className="flex flex-wrap gap-3">
                    {[{ id: "no", label: "No" }, { id: "yes", label: "Yes — call me" }].map(({ id, label }, i) => (
                      <RadioPill key={id} label={label} isSelected={v.wantsCall === id} onClick={() => setValue("wantsCall", id as "yes" | "no", { shouldValidate: true })} index={i} />
                    ))}
                  </div>
                  <AnimatePresence>
                    {v.wantsCall === "yes" && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35, ease: EASE }} className="overflow-hidden">
                        <div className="flex items-center gap-3 pt-2">
                          <Phone className="w-4 h-4 text-brand-accent shrink-0" strokeWidth={1.5} />
                          <input type="tel" placeholder="+44 7700 000000" className={inputCls} {...register("phone")} />
                        </div>
                        {errors.phone && <p className={errorCls}>{errors.phone.message}</p>}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Consent */}
                <motion.div custom={5} initial="hidden" animate="visible" variants={stagger}>
                  <label className="flex items-start gap-3 font-body text-xs leading-relaxed text-brand-grey-500 cursor-pointer">
                    <input type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 appearance-none border border-brand-grey-700/60 bg-transparent transition-colors duration-200 checked:bg-brand-accent checked:border-brand-accent" {...register("consent")} />
                    <span>
                      I agree to the processing of my personal data for the purpose of handling this enquiry, subject to the{" "}
                      <Link href="/privacy" className="text-brand-grey-300 underline decoration-brand-grey-700/50 underline-offset-2 transition-colors hover:text-brand-accent hover:decoration-brand-accent">Privacy Policy</Link>.
                    </span>
                  </label>
                  {errors.consent && <p className={errorCls}>{errors.consent.message}</p>}
                </motion.div>

                {status === "error" && (
                  <p className="font-mono text-[10px] text-brand-error">{errorMessage || "Something went wrong. Please try again or email us at hello@leveloneagency.co.uk"}</p>
                )}
              </motion.div>
            )}

          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-10 mt-10 border-t border-brand-grey-900/40">
            {currentStep > 0 ? (
              <button type="button" onClick={prevStep} className="group flex items-center gap-3 font-mono text-xs uppercase tracking-[0.12em] text-brand-grey-500 hover:text-brand-white transition-colors duration-300">
                <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" /> Back
              </button>
            ) : <div />}

            {currentStep < activeSteps.length - 1 ? (
              <button type="button" onClick={nextStep} className="group relative inline-flex items-center gap-3 bg-brand-white text-brand-black px-8 py-3.5 font-display text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:bg-brand-accent">
                Continue <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
              </button>
            ) : (
              <button type="submit" disabled={status === "submitting"} className="group relative inline-flex items-center gap-3 bg-brand-accent text-brand-black px-9 py-4 font-display text-sm font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:shadow-[0_0_60px_rgba(212,255,0,0.18)] disabled:opacity-50 disabled:cursor-not-allowed">
                {status === "submitting"
                  ? (<><span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-brand-black border-t-transparent" />Sending…</>)
                  : (<>Request My Estimate <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} /></>)}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* ════ RIGHT: Sticky Estimate Panel ════ */}
      <div className="lg:col-span-5 xl:col-span-4 order-1 lg:order-2 lg:sticky lg:top-32">
        <div className="relative border border-brand-grey-800/60 bg-brand-black-deep p-8 xl:p-10 overflow-hidden">
          <div className="absolute top-0 left-0 w-8 h-px bg-brand-accent/40" />
          <div className="absolute top-0 left-0 w-px h-8 bg-brand-accent/40" />
          <div className="absolute bottom-0 right-0 w-8 h-px bg-brand-accent/40" />
          <div className="absolute bottom-0 right-0 w-px h-8 bg-brand-accent/40" />

          <div className="mb-8 pb-4 border-b border-brand-grey-800/40">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-accent">Live Estimate</span>
          </div>

          <div className="space-y-6">
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-[0.15em] text-brand-grey-600 mb-2">Selected Service</span>
              <AnimatePresence mode="wait">
                <motion.span key={serviceId ?? "pending"} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease: EASE }} className="block font-display text-lg text-brand-white">
                  {serviceId ? SERVICES.find((s) => s.id === serviceId)?.label : <span className="text-brand-grey-700 italic font-body text-base">Pending selection</span>}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="pt-6 border-t border-brand-grey-800/40">
              <span className="block font-mono text-[10px] uppercase tracking-[0.15em] text-brand-grey-500 mb-4">
                {estimate.type === "retainer" ? "Estimated Monthly Retainer" : "Estimated Investment"}
              </span>
              <AnimatePresence mode="wait">
                <motion.div key={`${estimate.min}-${estimate.max}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4, ease: EASE }}>
                  {estimate.min > 0 ? (
                    <div className="flex flex-col gap-1">
                      <span className="font-display text-4xl xl:text-5xl font-bold tracking-tight text-brand-accent">
                        {fmt(estimate.min)}{estimate.type === "retainer" && <span className="text-lg font-body font-normal text-brand-grey-400">/mo</span>}
                      </span>
                      <span className="font-mono text-sm text-brand-grey-500">up to {fmt(estimate.max)}{estimate.type === "retainer" && "/mo"}</span>
                    </div>
                  ) : (
                    <span className="font-display text-4xl font-bold tracking-tight text-brand-grey-800">—</span>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {v.fastTrack === "yes" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                  <span className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-brand-warning bg-brand-warning/10 px-3 py-1">⚡ Fast Track +25%</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-6 border-t border-brand-grey-800/40">
              <ul className="space-y-3 mb-6">
                {["Fixed Price Guarantee", "Senior-Only Execution", "No Hidden Surprises"].map((badge) => (
                  <li key={badge} className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.15em] text-brand-white">
                    <CheckCircle className="w-4 h-4 text-brand-accent" strokeWidth={1.5} /> {badge}
                  </li>
                ))}
              </ul>
              <p className="font-mono text-[9px] uppercase leading-relaxed text-brand-grey-600">
                * This calculator provides a realistic estimate. A firm, fixed-price quote will be provided after our strategy session.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
