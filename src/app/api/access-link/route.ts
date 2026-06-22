import { NextResponse } from "next/server";
import { getAccessLink } from "@/lib/accessLinkStore";

export const runtime = "nodejs";

// Сторінка "дякуємо" поллить цей роут за reference, поки вебхук Mono не покладе
// персональну telegram-ссилку у сховище. До того — 202 (ще не готово).
export async function GET(req: Request) {
  const ref = new URL(req.url).searchParams.get("ref");
  if (!ref) {
    return NextResponse.json({ error: "ref is required" }, { status: 400 });
  }

  const link = getAccessLink(ref);
  if (!link) {
    // Вебхук ще не відпрацював — клієнт спробує ще раз.
    return NextResponse.json({ ready: false }, { status: 202 });
  }
  return NextResponse.json({ ready: true, telegram_link: link });
}
