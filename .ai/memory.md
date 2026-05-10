---
name: Portfolio AI Docs Index
description: Master index of all .ai/ knowledge docs for this project
type: reference
---

# .ai/ Knowledge Index

| Doc | What it covers |
|---|---|
| [stack.md](stack.md) | Package versions, dependency roles, breaking changes to watch |
| [styling.md](styling.md) | Tailwind v4 CSS-first config, all `@utility` classes, motion safety |
| [content-layer.md](content-layer.md) | `src/content/` as SSoT — schema for every content file |
| [components.md](components.md) | Component taxonomy, Server vs Client rules, shell vs sections |
| [three-scene.md](three-scene.md) | R3F nebula internals, canvas settings, how to extend the scene |
| [contact-api.md](contact-api.md) | POST `/api/contact` flow, Zod schema, env vars, Telegram escaping |
| [seo.md](seo.md) | OG image, sitemap, robots.txt, where to update the production domain |

## Quick facts

- **Content edits** → `src/content/*.ts` only, no component changes needed
- **New Tailwind token** → add to `@theme inline` block in `globals.css`
- **New utility class** → add `@utility` block in `globals.css`
- **Production domain** → `src/lib/site.ts` → `site.url`
- **Contact delivery** → set env vars (`RESEND_API_KEY`, `TELEGRAM_BOT_TOKEN`, etc.)
- **R3F scene** → always loaded with `dynamic({ ssr: false })`, never SSR
- **Next.js APIs** → read `node_modules/next/dist/docs/` before using; v16 has breaking changes
