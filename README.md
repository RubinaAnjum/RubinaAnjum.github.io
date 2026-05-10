# Rubina Anjum — Portfolio

A futuristic, AI-powered personal portfolio for a Full Stack Developer & AI Engineer.
Built as a single-page experience with a R3F nebula hero, glassmorphic sections, and
scroll-driven motion. v1 is fully static — no DB, no auth, deploy-anywhere.

## Stack

- **Next.js 15+ (App Router)** + **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-first config, custom utilities)
- **Framer Motion** for component-level motion + `useScroll` progress bar
- **React Three Fiber** + **drei** — lazy-loaded particle nebula in the hero
- **Zod** validation on the contact form (client and server)
- **Resend** (optional) for email + **Telegram Bot API** (optional) for chat alerts
- `lucide-react` for icons, `next/font` for Inter + JetBrains Mono

## Project layout

```
src/
├── app/
│   ├── api/contact/route.ts   POST handler (Resend + Telegram, both optional)
│   ├── opengraph-image.tsx    Dynamic 1200×630 OG card
│   ├── robots.ts / sitemap.ts SEO basics
│   ├── globals.css            Tailwind v4 tokens, glass/neon utilities
│   ├── layout.tsx             Fonts, metadata, shell
│   └── page.tsx               Composes the section components
├── components/
│   ├── sections/              Hero, About, Skills, Projects, Contact, SectionHeader
│   ├── three/HeroScene.tsx    R3F nebula (lazy via next/dynamic)
│   ├── effects/               GlowText, MagneticButton, GradientOrb, ParticleField
│   ├── shell/                 Nav, Footer, ScrollProgress, CursorGlow
│   └── ui/button.tsx          shadcn-style variant button
├── content/                   Single source of truth — edit these to update the site
│   ├── profile.ts             Name, bio, roles, socials, stats
│   ├── skills.ts              6 categorized skill cards
│   ├── projects.ts            6 project cards
│   └── nav.ts                 Header anchor links
└── lib/                       cn(), site config
```

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Replace the placeholder content

Everything that's "yours" lives under `src/content/` and `public/`.

| What to replace            | Where                                   |
| -------------------------- | --------------------------------------- |
| Name, bio, socials, stats  | `src/content/profile.ts`                |
| Skill categories & levels  | `src/content/skills.ts`                 |
| Featured projects          | `src/content/projects.ts`               |
| Resume PDF                 | `public/resume-placeholder.pdf` (overwrite) |
| Avatar (optional)          | `public/avatar-placeholder.svg`         |
| Production URL             | `src/lib/site.ts` and `metadataBase` in `layout.tsx` |

## Contact form

The form posts to `/api/contact`. The handler is **integration-optional**:

- Set `RESEND_API_KEY` + `CONTACT_TO_EMAIL` to receive emails
- Set `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` to receive Telegram pings
- Set both — submissions go to both
- Set neither — submissions are logged to the server console (useful in dev)

See `.env.example` for full instructions on getting each token.

## Deploy on Vercel

```bash
npx vercel              # link & deploy preview
npx vercel --prod       # promote to production
```

Vercel auto-detects Next.js. Add the env vars in Project Settings → Environment Variables
if you want the contact form to deliver to email/Telegram in production.

## Performance notes

- The R3F scene is `dynamic({ ssr: false })` so SSR/LCP aren't blocked by 3D bundles
- `prefers-reduced-motion` short-circuits Framer / GSAP / canvas particle motion
- Custom cursor glow only mounts on `(pointer: fine)` devices
- Fonts loaded via `next/font` with `display: swap`

## Roadmap (intentionally outside v1)

- Experience timeline + Certifications gallery
- 3D Tech Stack Galaxy
- Blog (MDX)
- Admin panel + Postgres + auth (Prisma + NextAuth)
- AI chatbot grounded on project metadata
- Command palette (`⌘K`)
- i18n + currency localization
