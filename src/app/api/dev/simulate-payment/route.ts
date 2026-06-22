import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { tierForReference, createPurchaseToken } from "@/lib/coursesBot";
import { saveAccessLink } from "@/lib/accessLinkStore";

export const runtime = "nodejs";

// DEV-ONLY: симулює успішну оплату без Mono (бо локально вебхук Mono не дійде,
// а бойовий токен списав би реальні гроші). Робить те саме, що й вебхук:
// створює токен у боті й кладе персональну ссилку у сховище.
//
// GET  /api/dev/simulate-payment?plan=pro  -> створює і редіректить на /dyakuyu
// POST /api/dev/simulate-payment {planId}  -> повертає JSON {reference, telegram_link}

async function simulate(planId: string) {
  const reference = `${planId}-${randomUUID()}`;
  const tier = tierForReference(reference);
  if (!tier) {
    return { error: `unknown plan: ${planId}`, reference: null, link: null };
  }
  const result = await createPurchaseToken(reference, tier);
  if (result.telegram_link) await saveAccessLink(reference, result.telegram_link);
  return { error: null, reference, link: result.telegram_link ?? null };
}

function guard(): NextResponse | null {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  return null;
}

export async function GET(req: Request) {
  const blocked = guard();
  if (blocked) return blocked;

  const planId = new URL(req.url).searchParams.get("plan") ?? "pro";
  try {
    const { error, reference } = await simulate(planId);
    if (error || !reference) {
      return NextResponse.json({ error }, { status: 400 });
    }
    return NextResponse.redirect(new URL(`/dyakuyu?ref=${reference}`, req.url));
  } catch (err) {
    console.error("simulate-payment error", err);
    return NextResponse.json({ error: String(err) }, { status: 502 });
  }
}

export async function POST(req: Request) {
  const blocked = guard();
  if (blocked) return blocked;

  let planId = "pro";
  try {
    const body = (await req.json()) as { planId?: unknown };
    if (typeof body.planId === "string") planId = body.planId;
  } catch {
    // тіло необов'язкове — лишаємо дефолт
  }

  try {
    const { error, reference, link } = await simulate(planId);
    if (error || !reference) {
      return NextResponse.json({ error }, { status: 400 });
    }
    return NextResponse.json({
      reference,
      telegram_link: link,
      thankYouUrl: `/dyakuyu?ref=${reference}`,
    });
  } catch (err) {
    console.error("simulate-payment error", err);
    return NextResponse.json({ error: String(err) }, { status: 502 });
  }
}
