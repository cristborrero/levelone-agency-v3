# LevelOne Agency — Design Guidelines

> **Visual Language**: Dark Editorial Brutalist (Elevated)  
> **Brand Identity**: Premium, High-Craft, Transparent Tech Partner

---

## 1. Vision & Emotional Intent

LevelOne is the **UK's premium digital benchmark**. We reject the "slick & generic" agency look. Our design is an expression of confidence through restraint.

- **Editorial Precision**: Grid-based layouts, oversized typography, and meticulous white space (like *Kinfolk* or *Wallpaper**).
- **Brutalist Structure**: Exposed borders, mono labels, and raw high-contrast interaction.
- **Intent**: Every pixel must say: *"We are the best hands in the room."*

---

## 2. Color Palette

The color system is derived from deep contrast and a single, high-impact signature accent.

### Primary
- **Black (`#0A0A0A`)**: Background focus. Never use pure #000000.
- **Deep (`#050505`)**: For hero sections and case study high-contrast areas.
- **White (`#F5F0EB`)**: Warm/Antique white for all body text. Never pure white.
- **Grey (`#2A2A2A`)**: The grid line and divider color.

### Signature
- **Accent (`#D4FF00`)**: Lime/Neon Yellow. Use sparingly. Max 2–3 elements per viewport.
- **Muted Accent (`#B8D94D`)**: For hover states of buttons and links.

### Status
- **Success**: `#00D47E` | **Warning**: `#FFB800` | **Error**: `#FF3B3B`

---

## 3. Typography

A tension between the technical (Mono) and the industrial (Grotesque).

### Fonts
- **Display**: `Space Grotesk` (700+) — Bold, tight tracking.
- **Body**: `Inter` (400) — High legibility.
- **Mono**: `JetBrains Mono` (500) — Always uppercase for labels/metadata.

### Scale Rules (Clamp)
- **Hero Title**: `clamp(3.5rem, 9vw, 9rem)` — Hero text must be massive and confrontational.
- **Lead Text**: `1.125rem` (18px) for body lead-ins.
- **Monospaced Labels**: `0.75rem` with `tracking-[0.14em]` letter-spacing.

---

## 4. Interaction & Motion

Design should feel "alive" through subtle, high-performance micro-interactions.

- **GSAP Logic**: Use `ScrambleText` or `SplitText` for headline reveals. Smooth stagger-in for card lists.
- **Noise Overlay**: A fixed noise texture at `opacity: 0.035` must be present over the entire viewport to give a "premium printed" feel.
- **Border Hover**: Borders should transition from `#2A2A2A` to `#4A4A4A` on hover with a `duration-500`.

---

## 5. UI Components

### Section Rhythm
- **Padding**: Use `py-24` on mobile and `lg:py-32` on desktop.
- **Divider**: Use a 1px border (`border-brand-grey-900`) for section separation rather than background color changes.

### Containers
- **Max Width**: `1400px` (`max-w-[1400px]`).
- **Inner Padding**: `px-6 lg:px-10`.

---

## 6. Design Checklist for AI Agents

Before adding or modifying any UI component, verify against these non-negotiable rules:

### Never:
- **Never** use pure `#000000`. Use `brand-black` (#0A0A0A).
- **Never** add a second `h1` to a page.
- **Never** use a border-radius > `2px` (unless it's an image explicitly styled as a pill).
- **Never** use bright gradients.

### Always:
- **Always** ensure the `Noise Overlay` is active in the layout.
- **Always** use `Space Grotesk` with `tracking-[-0.04em]` for display headlines.
- **Always** apply a 1px border (`border-brand-grey-900`) for section separation.
- **Always** prioritize negative space. If in doubt, add more padding.
- **Always** verify that interactive elements have a clear `hover` transition (color/border).
