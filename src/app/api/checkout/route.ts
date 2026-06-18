import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { createInvoice } from "@/lib/monobank";
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

export async function POST(req: Request) {
  let planId: unknown;
  try {
    ({ planId } = await req.json());
  } catch {
    return NextResponse.json({ error: "Невірний запит" }, { status: 400 });
  }

  const plan = pricing.find((p) => p.id === planId);
  if (!plan) {
    return NextResponse.json({ error: "Тариф не знайдено" }, { status: 404 });
  }

  const origin = siteOrigin(req);
  // reference — наш id замовлення, повертається у вебхуці.
  // Формат `${plan.id}-${uuid}`: префікс дає тариф, uuid робить його
  // непідбираним (за ним потім тягнеться персональна ссилка з бота).
  const reference = `${plan.id}-${randomUUID()}`;

  try {
    const invoice = await createInvoice({
      amount: plan.amount,
      reference,
      destination: `TryOn — тариф ${plan.name}`,
      // ref у redirect — щоб сторінка "дякуємо" знала, яку ссилку показати
      redirectUrl: `${origin}/dyakuyu?ref=${reference}`,
      webHookUrl: `${origin}/api/monobank/webhook`,
    });

    return NextResponse.json({ pageUrl: invoice.pageUrl });
  } catch (err) {
    console.error("checkout error", err);
    return NextResponse.json(
      { error: "Не вдалося створити оплату" },
      { status: 502 },
    );
  }
}
