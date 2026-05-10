# Content Layer

## Single source of truth

All site copy, structured data, and configuration lives in `src/content/`. Components read from here and never hard-code text. To update the site, edit these files — no component changes required.

## Files

### `profile.ts`
Exports `profile` as `const`. Contains personal info consumed by Hero and About sections:
- `name`, `initials`, `title`, `tagline`, `location`, `email`, `resumeUrl`
- `yearsOfExperience`, `projectsCompleted`, `technologiesMastered` — displayed as stats
- `roles[]` — strings cycled in the animated typewriter/role switcher
- `bio[]` — paragraph strings rendered in About
- `traits[]` — `{ label, icon }` with icon names mapping to lucide-react exports
- `socials[]` — `{ label, href, icon }` for the social link row

Typed unions `SocialIcon` and `TraitIcon` constrain icon names to what's actually imported in components.

### `skills.ts`
Array of skill category cards: `{ title, icon, level, color, skills[] }`. The `level` (1–10) and `color` drive visual indicator styles in the Skills section.

### `projects.ts`
Array of project cards: `{ title, description, tags[], links, featured }`. `links` holds separate `demo` and `source` URLs. `featured` controls display prominence.

### `recognition.ts`
Array of award/recognition items: `{ title, org, year, description, icon }`.

### `nav.ts`
Array of `{ label, href }` used by the Nav shell component. `href` values are in-page anchors (`#about`, `#skills`, etc.).

## Adding content

Always update types when adding new fields. Use `as const` on the exported object so TypeScript infers literal types and prevents typos in icon names.
