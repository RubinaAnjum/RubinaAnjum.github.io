import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.string().trim().optional().or(z.literal("")),
  query: z.string().trim().min(10),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 422 });
  }
  const { name, email, phone, query } = parsed.data;

  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;

  const tasks: Promise<unknown>[] = [];

  if (resendKey && toEmail) {
    tasks.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          reply_to: email,
          subject: `Portfolio inquiry from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "—"}\n\n${query}`,
        }),
      }),
    );
  }

  if (telegramToken && telegramChatId) {
    const text = [
      "📨 *New portfolio inquiry*",
      `*Name:* ${escapeMd(name)}`,
      `*Email:* ${escapeMd(email)}`,
      phone ? `*Phone:* ${escapeMd(phone)}` : null,
      "",
      escapeMd(query),
    ]
      .filter(Boolean)
      .join("\n");
    tasks.push(
      fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text,
          parse_mode: "MarkdownV2",
        }),
      }),
    );
  }

  if (tasks.length === 0) {
    // dev fallback — log to server console so the form is still useful locally
    console.log("[contact] (no integrations configured)", parsed.data);
  } else {
    await Promise.allSettled(tasks);
  }

  return NextResponse.json({ ok: true });
}

function escapeMd(s: string) {
  // Telegram MarkdownV2 reserved characters
  return s.replace(/([_*[\]()~`>#+\-=|{}.!\\])/g, "\\$1");
}
