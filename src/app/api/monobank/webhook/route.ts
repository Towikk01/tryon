import { NextResponse } from "next/server";
import { verifyWebhook, type WebhookPayload } from "@/lib/monobank";
import { coursesForReference, createPurchaseToken } from "@/lib/coursesBot";
import { saveAccessLink } from "@/lib/accessLinkStore";

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
    const reference = payload.reference;

    // Видаємо доступ: створюємо одноразовий токен у боті.
    // reference використовуємо як payment_id (унікальний, ідемпотентний).
    let accessNote = "";
    if (reference) {
      const courseIds = coursesForReference(reference);
      if (!courseIds) {
        accessNote = `\n⚠️ Невідомий тариф у reference: <code>${reference}</code>`;
      } else {
        try {
          const result = await createPurchaseToken(reference, courseIds);
          // Ловимо персональну ссилку й кладемо у сховище — звідти її забере
          // сторінка "дякуємо". Бот віддає її лише тут, при створенні токена.
          if (result.telegram_link) {
            saveAccessLink(reference, result.telegram_link);
          }
          accessNote = result.created
            ? "\n🔑 Токен доступу створено"
            : "\n🔁 Токен уже існував (дубль вебхука)";
        } catch (err) {
          console.error("createPurchaseToken failed", err);
          accessNote = "\n❌ Не вдалося створити токен доступу — перевір бота";
        }
      }
    } else {
      accessNote = "\n⚠️ Вебхук без reference — токен не створено";
    }

    await notifyOwner(
      `✅ <b>Нова оплата TryOn</b>\n` +
        `Сума: <b>${hrn} грн</b>\n` +
        `Замовлення: <code>${reference ?? "—"}</code>\n` +
        `Invoice: <code>${payload.invoiceId}</code>` +
        accessNote,
    );
  }

  // Завжди відповідаємо 200, щоб Mono не ретраїв безкінечно.
  return NextResponse.json({ ok: true });
}
