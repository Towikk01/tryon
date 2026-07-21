import { NextResponse } from "next/server";
import { verifyWebhook, type WebhookPayload } from "@/lib/monobank";
import { tierForReference, createPurchaseToken } from "@/lib/coursesBot";
import { saveAccessLink, getLead } from "@/lib/accessLinkStore";
import { notifyOwner, escapeHtml } from "@/lib/telegram";

export const runtime = "nodejs";

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
      const tier = tierForReference(reference);
      if (!tier) {
        accessNote = `\n⚠️ Невідомий тариф у reference: <code>${reference}</code>`;
      } else {
        try {
          const result = await createPurchaseToken(reference, tier);
          // Ловимо персональну ссилку й кладемо у сховище — звідти її забере
          // сторінка "дякуємо". Бот віддає її лише тут, при створенні токена.
          if (result.telegram_link) {
            await saveAccessLink(reference, result.telegram_link);
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

    // Підтягуємо контакт покупця, збережений на кроці checkout.
    let contactNote = "";
    if (reference) {
      try {
        const lead = await getLead(reference);
        if (lead) {
          contactNote =
            `\nІм'я: <b>${escapeHtml(lead.name)}</b>` +
            `\nEmail: <code>${escapeHtml(lead.email)}</code>` +
            `\nТелефон: <code>${escapeHtml(lead.phone)}</code>`;
        }
      } catch (err) {
        console.error("getLead failed (non-blocking)", err);
      }
    }

    await notifyOwner(
      `✅ <b>Оплата TryOn</b>\n` +
        `Сума: <b>${hrn} грн</b>` +
        contactNote +
        `\nЗамовлення: <code>${reference ?? "—"}</code>\n` +
        `Invoice: <code>${payload.invoiceId}</code>` +
        accessNote,
    );
  }

  // Завжди відповідаємо 200, щоб Mono не ретраїв безкінечно.
  return NextResponse.json({ ok: true });
}
