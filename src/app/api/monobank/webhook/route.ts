import { NextResponse } from "next/server";
import { verifyWebhook, type WebhookPayload } from "@/lib/monobank";

export const runtime = "nodejs";

async function notifyOwner(text: string): Promise<void> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_OWNER_CHAT_ID;
  if (!botToken || !chatId) {
    console.warn("Telegram notify skipped: env not set");
    return;
  }
  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
    });
  } catch (err) {
    console.error("Telegram notify failed", err);
  }
}

export async function POST(req: Request) {
  // Важливо: читаємо СИРЕ тіло — підпис рахується саме по ньому.
  const rawBody = await req.text();
  const xSign = req.headers.get("x-sign") ?? "";

  const valid = await verifyWebhook(rawBody, xSign);
  if (!valid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: WebhookPayload;
  try {
    payload = JSON.parse(rawBody) as WebhookPayload;
  } catch {
    return NextResponse.json({ error: "Bad payload" }, { status: 400 });
  }

  if (payload.status === "success") {
    const hrn = (payload.amount / 100).toFixed(2);
    await notifyOwner(
      `✅ <b>Нова оплата TryOn</b>\n` +
        `Сума: <b>${hrn} грн</b>\n` +
        `Замовлення: <code>${payload.reference ?? "—"}</code>\n` +
        `Invoice: <code>${payload.invoiceId}</code>`,
    );
  }

  // Завжди відповідаємо 200, щоб Mono не ретраїв безкінечно.
  return NextResponse.json({ ok: true });
}
