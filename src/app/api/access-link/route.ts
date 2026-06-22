import { NextResponse } from "next/server";
import { getAccessLink, getInvoiceId, saveAccessLink } from "@/lib/accessLinkStore";
import { getInvoiceStatus } from "@/lib/monobank";
import { tierForReference, createPurchaseToken } from "@/lib/coursesBot";

export const runtime = "nodejs";

// Сторінка "дякуємо" поллить цей роут за reference. Логіка не покладається на
// вебхук Mono: якщо ссилки ще немає — самі питаємо Mono про статус інвойсу і,
// якщо оплачено, створюємо токен у боті й кладемо персональну ссилку.
export async function GET(req: Request) {
  const ref = new URL(req.url).searchParams.get("ref");
  if (!ref) {
    return NextResponse.json({ error: "ref is required" }, { status: 400 });
  }

  // 1. Ссилка вже готова (поклав вебхук або попередній полл) — віддаємо.
  const existing = await getAccessLink(ref);
  if (existing) {
    return NextResponse.json({ ready: true, telegram_link: existing });
  }

  // 2. Знаходимо invoiceId, щоб перевірити оплату напряму.
  const invoiceId = await getInvoiceId(ref);
  if (!invoiceId) {
    // Немає мапінгу (старий інвойс / інший store) — чекаємо на вебхук.
    return NextResponse.json({ ready: false }, { status: 202 });
  }

  try {
    const invoice = await getInvoiceStatus(invoiceId);
    if (invoice.status !== "success") {
      // Ще не оплачено (created/processing/hold) або неуспіх — клієнт спробує ще.
      return NextResponse.json({ ready: false }, { status: 202 });
    }

    // 3. Оплачено — створюємо токен у боті (ідемпотентно за payment_id=ref).
    const tier = tierForReference(ref);
    if (!tier) {
      return NextResponse.json({ ready: false }, { status: 202 });
    }

    const result = await createPurchaseToken(ref, tier);
    if (result.telegram_link) {
      await saveAccessLink(ref, result.telegram_link);
      return NextResponse.json({ ready: true, telegram_link: result.telegram_link });
    }

    // created=false (токен уже існував) — ссилку мав покласти попередній виклик.
    const stored = await getAccessLink(ref);
    if (stored) {
      return NextResponse.json({ ready: true, telegram_link: stored });
    }
    return NextResponse.json({ ready: false }, { status: 202 });
  } catch (err) {
    console.error("access-link status check failed", err);
    return NextResponse.json({ ready: false }, { status: 202 });
  }
}
