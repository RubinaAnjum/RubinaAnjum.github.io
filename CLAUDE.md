# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
@AGENTS.md
## Commands

```bash
npm run dev      # start dev server (Turbopack) at http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint (next lint config)
```

No test suite is configured in v1.

## Detailed docs

See [`.ai/memory.md`](.ai/memory.md) for the full index. Individual docs (all in `.ai/`):

- [`stack.md`](.ai/stack.md) — package versions, dependency roles, breaking changes
- [`styling.md`](.ai/styling.md) — Tailwind v4 CSS-first config, all `@utility` classes
- [`content-layer.md`](.ai/content-layer.md) — `src/content/` SSoT schema
- [`components.md`](.ai/components.md) — component taxonomy, Server vs Client rules
- [`three-scene.md`](.ai/three-scene.md) — R3F nebula internals and extension guide
- [`contact-api.md`](.ai/contact-api.md) — POST route flow, env vars, Telegram escaping
- [`seo.md`](.ai/seo.md) — OG image, sitemap, robots, domain update checklist

## Stack versions (important)

- **Next.js 16.2.6** (App Router, Turbopack default) + **React 19** — both are bleeding-edge; consult `node_modules/next/dist/docs/` before using any Next.js API
- **Tailwind CSS v4** — CSS-first config: all design tokens live in the `@theme inline` block in `globals.css`, not in a JS config file
- **Framer Motion 12** — `useScroll`, `useTransform`, `motion.*` components used throughout sections

## Architecture

### Single-page structure

`src/app/page.tsx` is a simple composition of section components in order: Hero → About → Skills → Projects → Recognition → Contact. There are no other routes except the contact API.

### Content layer (`src/content/`)

**This is the only place to edit site data.** All text, lists, and structured data for every section live here as typed TypeScript exports:

| File | Drives |
|---|---|
| `profile.ts` | name, bio, roles, social links, stats |
| `skills.ts` | 6 skill category cards |
| `projects.ts` | featured project cards |
| `recognition.ts` | awards / recognition items |
| `nav.ts` | header anchor links |

### Component organization

```
components/
  sections/    — one file per page section (Hero, About, Skills, Projects, Recognition, Contact)
  three/       — R3F nebula hero scene, lazy-loaded via next/dynamic({ ssr: false })
  effects/     — purely decorative: GlowText, MagneticButton, GradientOrb, ParticleField
  shell/       — persistent chrome: Nav, Footer, ScrollProgress, CursorGlow
  ui/          — shadcn-style primitives (button.tsx uses class-variance-authority)
```

### Styling conventions

Tailwind v4 utilities are extended with custom `@utility` blocks in `globals.css`:
- `.glass` — glassmorphic card style (backdrop-blur + border)
- `.neon-*` — cyan/violet/pink text glow variants

Use `cn()` from `src/lib/utils.ts` (wraps `clsx` + `tailwind-merge`) for conditional class merging.

Brand colors (defined as CSS variables in `@theme`): `--color-cyan` (#22d3ee), `--color-violet` (#a855f7), `--color-pink` (#ec4899), `--color-emerald` (#10b981).

### Contact API (`src/app/api/contact/route.ts`)

POST handler with Zod validation. Both integrations are optional — the handler fires whichever are configured:

| Env var | Purpose |
|---|---|
| `RESEND_API_KEY` + `CONTACT_TO_EMAIL` | Email delivery via Resend |
| `CONTACT_FROM_EMAIL` | Sender address (defaults to `onboarding@resend.dev`) |
| `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` | Telegram ping on new submission |

If neither integration is set, submissions are logged to server console.

### Performance patterns

- R3F scene is `dynamic({ ssr: false })` — never make it server-rendered
- Framer / GSAP / canvas animations must respect `prefers-reduced-motion`
- Cursor glow only mounts on `(pointer: fine)` devices

### SEO files

`opengraph-image.tsx`, `robots.ts`, and `sitemap.ts` live directly in `src/app/`. The canonical domain is set in **`src/lib/site.ts`** — update `site.url` before deploying.
