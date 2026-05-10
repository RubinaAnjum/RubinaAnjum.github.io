# Styling

## Tailwind v4 — CSS-first config

All design tokens live in the `@theme inline` block in `src/app/globals.css`. There is **no `tailwind.config.js`**. To add a new token, add a CSS custom property under `@theme inline`.

```css
@theme inline {
  --color-background: #05060a;
  --color-cyan: #22d3ee;
  --color-violet: #a855f7;
  --color-pink: #ec4899;
  --color-emerald: #10b981;
  --font-sans: var(--font-inter);
  --font-mono: var(--font-jetbrains);
}
```

Token names become Tailwind utilities automatically: `bg-background`, `text-cyan`, `font-mono`, etc.

## Custom `@utility` blocks

Defined at the bottom of `globals.css`. Use these class names directly in JSX:

| Class | Effect |
|---|---|
| `glass` | Semi-transparent card (backdrop-blur 16px) |
| `glass-strong` | Stronger glass (blur 24px) |
| `glass-frosted` | Heavy glass + drop shadow (blur 32px) |
| `neon-cyan` | Cyan text glow |
| `neon-violet` | Violet text glow |
| `neon-border` | Cyan outer glow border |
| `text-gradient` | Cyan → violet → pink gradient text |
| `text-gradient-soft` | Muted grey gradient text |
| `grid-bg` | Subtle grid dot pattern (masked ellipse) |
| `animate-shimmer` | Horizontal shimmer sweep |
| `animate-float` | Gentle vertical float (5 s) |
| `animate-gradient` | Shifting gradient background |
| `animate-pulse-soft` | Soft opacity pulse |

## Motion safety

`globals.css` enforces `prefers-reduced-motion` globally with `animation-duration: 0.01ms`. All Framer Motion and GSAP animations must also check this at the component level where applicable.

## Class merging

Use `cn()` from `src/lib/utils.ts` for all conditional or composed class strings. Never concatenate raw strings.
