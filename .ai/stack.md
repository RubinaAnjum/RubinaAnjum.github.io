# Stack

## Runtime versions

| Package | Version | Notes |
|---|---|---|
| Next.js | 16.2.6 | App Router only; Turbopack is the default bundler |
| React | 19.2.4 | Concurrent features enabled by default |
| TypeScript | 5.x | Strict mode |
| Tailwind CSS | 4.x | CSS-first config — **no `tailwind.config.js`** |
| Framer Motion | 12.x | `useScroll`, `useTransform`, `motion.*` |
| React Three Fiber | 9.x | R3F v9 targets Three.js r168+ |
| Three.js | 0.184 | Used only in the hero nebula |
| Zod | 4.x | Zod v4 has breaking API changes from v3 |

## Key dependency roles

- **`class-variance-authority`** — variant definitions for `ui/button.tsx`
- **`clsx` + `tailwind-merge`** — merged into `cn()` in `src/lib/utils.ts`
- **`lucide-react`** — icon set; import individual icons, not the barrel
- **`gsap`** — installed but not yet used broadly; available for timeline animations
- **`resend`** — email SDK for the contact API (optional integration)
- **`@tailwindcss/postcss`** — Tailwind v4 PostCSS plugin (replaces `tailwindcss` CLI in v3)

## Dev tooling

- ESLint via `eslint-config-next` (flat config, ESLint 9)
- No Prettier, no test runner, no Storybook in v1
- Turbopack (`next dev` uses it automatically via `nextConfig.turbopack`)

## Breaking changes to watch

- Zod v4: `z.string().email()` replaces `z.string().email()` but `.parse` error shape changed
- Framer Motion 12: `AnimatePresence` `exitBeforeEnter` removed, use `mode="wait"`
- Next.js 16: `metadata` export API — always check `node_modules/next/dist/docs/` before using any Next.js API
