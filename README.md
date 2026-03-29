# LevelOne Agency — V3

> **Premium digital agency website built with Next.js 15, Tailwind CSS v4, and Motion.**  
> Dark Editorial Brutalist design system. Multi-page architecture. Production-ready.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-Private-red?style=flat-square)]()

---

## Overview

LevelOne Agency V3 is a complete rebuild of the agency's digital presence — replacing a single-page landing with a full multi-route website engineered to position the agency at the level of top-tier UK digital studios.

**Live URL:** [leveloneagency.co.uk](https://leveloneagency.co.uk) *(coming soon)*  
**Staging:** Vercel preview deployments on every push to `main`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, RSC) |
| Language | TypeScript 5.7 (strict mode) |
| Styling | Tailwind CSS v4 (`@theme inline` tokens) |
| Animation | Motion (Framer Motion) v12 |
| Email | Resend v4 |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Analytics | Vercel Analytics + Speed Insights |
| Deployment | Vercel |
| Content | Static arrays → MDX (planned V2) |

---

## Project Structure

```
levelone-agency-v3/
├── docs/                          # Project documentation
│   ├── PROJECT-BRIEF.md           # Master brief — all agents defer to this
│   ├── ADR-001-stack.md           # Architecture Decision Record: stack
│   ├── DESIGN-SYSTEM.md           # Design tokens, components, rules
│   └── COPY-GUIDE.md              # Voice, tone, approved copy per page
│
├── brand/
│   └── assets/                    # Source brand files
│       └── logo-levelone-agency.svg
│
├── public/
│   ├── logo.svg                   # Production logo (from brand/assets)
│   └── images/                    # Project images, OG image
│
├── src/
│   ├── app/
│   │   ├── (site)/                # Route group — shared Navbar + Footer
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx           # / — Home
│   │   │   ├── work/              # /work + /work/[slug]
│   │   │   ├── services/          # /services + 4 service pages
│   │   │   ├── about/             # /about
│   │   │   ├── insights/          # /insights + /insights/[slug]
│   │   │   ├── contact/           # /contact
│   │   │   ├── quote/             # /quote
│   │   │   ├── privacy/           # /privacy
│   │   │   └── terms/             # /terms
│   │   ├── api/
│   │   │   └── contact/           # POST — contact form → Resend
│   │   ├── globals.css            # Design system tokens + base styles
│   │   ├── layout.tsx             # Root layout: fonts, metadata, JSON-LD
│   │   ├── icon.png               # Favicon (auto-detected by Next.js)
│   │   └── not-found.tsx          # 404 page
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx         # Fixed nav, scroll state, mobile menu
│   │   │   └── Footer.tsx         # Legal copy, newsletter, links
│   │   ├── home/
│   │   │   ├── HeroSection.tsx    # Full-viewport hero, parallax, clip reveal
│   │   │   ├── ServicesPreview.tsx
│   │   │   ├── WorkPreview.tsx    # Asymmetric case study grid
│   │   │   ├── ProcessSection.tsx # Animated horizontal timeline
│   │   │   ├── AboutTeaser.tsx
│   │   │   ├── InsightsPreview.tsx
│   │   │   └── ContactCTA.tsx
│   │   └── shared/
│   │       ├── PageHero.tsx       # Reusable hero for inner pages
│   │       └── ContactForm.tsx    # Validated form (Zod + RHF)
│   │
│   └── lib/
│       └── metadata.ts            # Shared metadata + JSON-LD helpers
│
├── .env.example                   # Environment variable template
├── next.config.ts
├── next-sitemap.config.js         # Sitemap + robots.txt (postbuild)
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
# Clone / navigate to the project
cd "/Volumes/HDD MacOSv2/03 UK Agency/11 LevelOne Agency UK/levelone-agency-v3"

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local — add your RESEND_API_KEY

# Start development server (Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Production URL: `https://leveloneagency.co.uk` |
| `RESEND_API_KEY` | Yes (prod) | From [resend.com](https://resend.com) — free tier: 3,000 emails/mo |

> Without `RESEND_API_KEY`, the contact form logs submissions to the console instead of sending email. Safe for development.

### Scripts

```bash
npm run dev          # Development server with Turbopack
npm run build        # Production build + sitemap generation
npm run start        # Serve production build
npm run lint         # ESLint
npm run type-check   # TypeScript check (no emit)
```

---

## Design System

### Colour Palette

| Token | Hex | Usage |
|---|---|---|
| `brand-black` | `#0A0A0A` | Primary background |
| `brand-black-deep` | `#050505` | Hero, case study backgrounds |
| `brand-black-mid` | `#141414` | Card hover states |
| `brand-white` | `#F5F0EB` | All body text (warm white) |
| `brand-accent` | `#D4FF00` | Lime yellow — the signature colour |
| `brand-grey-500` | `#6B6B6B` | Secondary text |
| `brand-grey-300` | `#9A9A9A` | Tertiary text, descriptions |

### Typography

| Role | Font | Weight |
|---|---|---|
| Display / Headlines | Space Grotesk | 700 |
| Body | Inter | 400–500 |
| Labels / Mono | JetBrains Mono | 400–500 |

### Key CSS Utilities

```css
.overline          /* Accent line + uppercase label */
.accent-line       /* Top border that slides in on group hover */
```

---

## Site Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/work` | Portfolio / Case Studies |
| `/work/[slug]` | Individual Case Study |
| `/services` | Services Overview |
| `/services/web-design` | Web Design & Development |
| `/services/brand-identity` | Brand Identity |
| `/services/digital-marketing` | Digital Marketing |
| `/services/ai-solutions` | AI Solutions |
| `/about` | About Us |
| `/insights` | Blog / Resources |
| `/insights/[slug]` | Blog Post |
| `/contact` | Contact & Enquiries |
| `/quote` | Quick Quote |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Service |

---

## Deployment

The project is configured for zero-config Vercel deployment.

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set production env vars in Vercel dashboard:
# NEXT_PUBLIC_SITE_URL=https://leveloneagency.co.uk
# RESEND_API_KEY=re_xxxxxxxxxxxx
```

Connect `leveloneagency.co.uk` in the Vercel dashboard under **Domains**.

---

## Legal

LevelOne Agency is a trading name of **Leonardo Martinez Mena**.  
Registered address: Flat 5, Wayewood Lodge, Branksome Park Road, Camberley, GU15 2AE, United Kingdom.  
Contact: hello@leveloneagency.co.uk

---

## Documentation

Full project documentation lives in `/docs/`:

- [`PROJECT-BRIEF.md`](./docs/PROJECT-BRIEF.md) — Master brief, design direction, copy principles
- [`ADR-001-stack.md`](./docs/ADR-001-stack.md) — Architecture decisions and rationale
- [`DESIGN-SYSTEM.md`](./docs/DESIGN-SYSTEM.md) — Design tokens, component patterns, animation rules
- [`COPY-GUIDE.md`](./docs/COPY-GUIDE.md) — Brand voice, approved copy, banned phrases
- [`STATUS_PROJECT.md`](./STATUS_PROJECT.md) — Live project status and task tracker
