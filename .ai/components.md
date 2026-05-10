# Components

## Directory taxonomy

```
src/components/
  sections/    page sections — one file per section
  three/       R3F canvas scene (hero only)
  effects/     decorative, non-semantic visual overlays
  shell/       persistent page chrome
  ui/          reusable primitives
  icons/       custom SVG icon components
```

## Sections (`sections/`)

Each file exports a single named component used once in `src/app/page.tsx`. Order: Hero → About → Skills → Projects → Recognition → Contact. Section components own their own layout and import from `src/content/` directly.

`section-header.tsx` is a shared sub-component for the title + subtitle pattern used at the top of each section.

## Shell (`shell/`)

Always mounted — rendered in `layout.tsx`, not `page.tsx`:
- **`Nav`** — sticky header with anchor links from `content/nav.ts`; hides on scroll-down
- **`Footer`** — bottom bar
- **`ScrollProgress`** — thin progress bar at top of viewport driven by `useScroll`
- **`CursorGlow`** — pointer-following radial glow; mounts only on `(pointer: fine)` via media query check

## Effects (`effects/`)

Purely visual, no semantic content. Safe to remove without breaking functionality:
- **`GlowText`** — wraps text in an animated glow span
- **`MagneticButton`** — mouse-attraction effect using GSAP `quickTo`
- **`GradientOrb`** — CSS-animated blurred gradient blob
- **`ParticleField`** — canvas-based floating particles (respects `prefers-reduced-motion`)

## UI primitives (`ui/`)

`button.tsx` follows the shadcn pattern: `cva()` defines `variant` and `size` props; `cn()` merges classes. Extend variants here, never override with inline styles.

## Icons (`icons/`)

`brand.tsx` houses SVG icons for third-party brands not in lucide-react (e.g., framework logos).

## Client vs Server

Sections are Server Components by default. Add `"use client"` only when using hooks, browser APIs, or Framer Motion `motion.*` components.
