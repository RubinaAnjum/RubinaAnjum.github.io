# Contact API

**File:** `src/app/api/contact/route.ts`

## Flow

```
POST /api/contact
  → JSON parse (400 on failure)
  → Zod validation (422 on failure)
  → fire Resend email   (if RESEND_API_KEY + CONTACT_TO_EMAIL set)
  → fire Telegram ping  (if TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID set)
  → both skipped → console.log fallback (dev)
  → 200 { ok: true }
```

Resend and Telegram run concurrently via `Promise.allSettled` — one failing does not block the other.

## Zod schema

```ts
{
  name:  z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.string().trim().optional().or(z.literal("")),
  query: z.string().trim().min(10),
}
```

## Environment variables

| Variable | Required for | Default |
|---|---|---|
| `RESEND_API_KEY` | Email delivery | — |
| `CONTACT_TO_EMAIL` | Email delivery | — |
| `CONTACT_FROM_EMAIL` | Sender address | `Portfolio <onboarding@resend.dev>` |
| `TELEGRAM_BOT_TOKEN` | Telegram alerts | — |
| `TELEGRAM_CHAT_ID` | Telegram alerts | — |

All are optional. If none are set the route still returns `200 { ok: true }` (useful in development).

## Telegram formatting

Uses MarkdownV2 parse mode. The `escapeMd()` helper escapes all Telegram reserved characters (`_*[]()~\`>#+\-=|{}.!\\`) before interpolation — always use it when injecting user input into the message body.

## Adding a new delivery channel

Add a new `tasks.push(fetch(...))` block gated on its own env var check. Follow the same pattern: construct payload → push to `tasks[]` → `Promise.allSettled` handles execution. Never `await` individual fetches inline.
