# SEO & Metadata

## Files

| File | Purpose |
|---|---|
| `src/lib/site.ts` | Single source for `url`, `name`, `themeColor` |
| `src/app/layout.tsx` | Static `metadata` export + `metadataBase` |
| `src/app/opengraph-image.tsx` | Dynamic 1200×630 OG card via Next.js Image Response |
| `src/app/robots.ts` | Generates `robots.txt` |
| `src/app/sitemap.ts` | Generates `sitemap.xml` |

## `src/lib/site.ts`

```ts
export const site = {
  url: "https://rubina-anjum.dev",   // ← update before deploying
  name: "Rubina Anjum — Portfolio",
  themeColor: "#05060a",
};
```

This is the **only place** to change the production domain. It feeds `metadataBase` in `layout.tsx`, the canonical URL in `opengraph-image.tsx`, and the sitemap origin.

## `layout.tsx` metadata

Uses the Next.js 15+ `Metadata` type. `metadataBase` is set to `new URL(site.url)` so all relative OG/twitter image paths resolve correctly. Change `title`, `description`, and `keywords` here for the site-wide defaults.

## OG image (`opengraph-image.tsx`)

Uses `ImageResponse` from `next/og`. Returns a 1200×630 canvas rendered server-side at request time. Fonts for the OG card are loaded via `fetch` inside the file (not `next/font`). Modify the JSX inside `ImageResponse` to change the card design.

## `robots.ts`

Exports a `robots()` function returning a `MetadataRoute.Robots` object. Currently allows all crawlers and points to the sitemap.

## `sitemap.ts`

Exports a `sitemap()` function returning a `MetadataRoute.Sitemap` array. In v1 it lists only the root URL. Add new routes here if pages are added in the future.

## Before deploying

1. Update `site.url` in `src/lib/site.ts`
2. Confirm `metadataBase` in `layout.tsx` reflects the same domain
