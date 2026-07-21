import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { createInvoice } from "@/lib/monobank";
import { saveInvoiceId, saveLead } from "@/lib/accessLinkStore";
import { notifyOwner, escapeHtml } from "@/lib/telegram";
import { pricing } from "@/lib/data";

export const runtime = "nodejs";

function siteOrigin(req: Request): string {
  // На Vercel задаємо NEXT_PUBLIC_BASE_URL явно (прод-домен).
  // Інакше відновлюємо з заголовків проксі.
  const fromEnv = process.env.NEXT_PUBLIC_BASE_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, "");

  const h = req.headers;
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "https";
  if (host) return `${proto}://${host}`;

  return new URL(req.url).origin;
}

// М'яка валідація контактів — не блокуємо оплату через надто суворі правила,
// але відсікаємо очевидно порожні / некоректні значення.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function normalizePhone(raw: string): string {
  return raw.replace(/[^\d+]/g, "");
}
function isValidPhone(raw: string): boolean {
  const digits = raw.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Невірний запит" }, { status: 400 });
  }

  // Обрізаємо довжину ДО валідації: захист від роздутих значень
  // (ліміт повідомлення Telegram — 4096 символів, Redis теж не гумовий).
  const planId = body.planId;
  const name = typeof body.name === "string" ? body.name.trim().slice(0, 100) : "";
  const email = typeof body.email === "string" ? body.email.trim().slice(0, 254) : "";
  const phoneRaw = typeof body.phone === "string" ? body.phone.trim().slice(0, 30) : "";
  const phone = normalizePhone(phoneRaw);

  const plan = pricing.find((p) => p.id === planId);
  if (!plan) {
    return NextResponse.json({ error: "Тариф не знайдено" }, { status: 404 });
  }

  if (name.length < 2) {
    return NextResponse.json({ error: "Вкажіть ім'я" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Некоректний email" }, { status: 400 });
  }
  if (!isValidPhone(phone)) {
    return NextResponse.json({ error: "Некоректний номер телефону" }, { status: 400 });
  }

  const origin = siteOrigin(req);
  // reference — наш id замовлення, повертається у вебхуці.
  // Формат `${plan.id}-${uuid}`: префікс дає тариф, uuid робить його
  // непідбираним (за ним потім тягнеться персональна ссилка з бота).
  const reference = `${plan.id}-${randomUUID()}`;

  // Зберігаємо контакт ДО оплати — щоб було зрозуміло, кому видавати доступ,
  // і щоб лід не загубився, навіть якщо оплата не завершиться.
  try {
    await saveLead(reference, { name, email, phone });
  } catch (err) {
    console.error("saveLead failed (non-blocking)", err);
  }

  // Повідомляємо власника про нову заявку одразу (лід до оплати).
  // ВАЖЛИВО: чекаємо на відправку — на Vercel функція заморожується одразу
  // після відповіді, і fire-and-forget запит міг би загубитися.
  await notifyOwner(
    `🆕 <b>Нова заявка TryOn</b> (ще не оплачено)\n` +
      `Тариф: <b>${escapeHtml(plan.name)}</b> — ${plan.price} ${plan.currency}\n` +
      `Ім'я: <b>${escapeHtml(name)}</b>\n` +
      `Email: <code>${escapeHtml(email)}</code>\n` +
      `Телефон: <code>${escapeHtml(phone)}</code>\n` +
      `Замовлення: <code>${escapeHtml(reference)}</code>`,
  );

  try {
    const invoice = await createInvoice({
      amount: plan.amount,
      reference,
      destination: `TryOn — тариф ${plan.name}`,
      // ref у redirect — щоб сторінка "дякуємо" знала, яку ссилку показати
      redirectUrl: `${origin}/dyakuyu?ref=${reference}`,
      webHookUrl: `${origin}/api/monobank/webhook`,
    });

    // Зберігаємо invoiceId, щоб сторінка "дякуємо" могла сама перевірити статус
    // оплати в Mono й видати доступ, не покладаючись лише на вебхук.
    try {
      await saveInvoiceId(reference, invoice.invoiceId);
    } catch (err) {
      console.error("saveInvoiceId failed (non-blocking)", err);
    }

    return NextResponse.json({ pageUrl: invoice.pageUrl });
  } catch (err) {
    console.error("checkout error", err);
    return NextResponse.json(
      { error: "Не вдалося створити оплату" },
      { status: 502 },
    );
  }
}
