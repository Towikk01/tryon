import { NextResponse } from "next/server";
import { getPurchaseLink } from "@/lib/coursesBot";

export const runtime = "nodejs";

// Проксі для сторінки "дякуємо": дістає персональну telegram-ссилку з бота
// за reference. Ключ бота лишається на сервері, у браузер не потрапляє.
export async function GET(req: Request) {
  const ref = new URL(req.url).searchParams.get("ref");
  if (!ref) {
    return NextResponse.json({ error: "ref is required" }, { status: 400 });
  }

  try {
    const link = await getPurchaseLink(ref);
    if (!link) {
      // Вебхук ще не відпрацював — клієнт спробує ще раз.
      return NextResponse.json({ ready: false }, { status: 202 });
    }
    return NextResponse.json({ ready: true, telegram_link: link });
  } catch (err) {
    console.error("access-link error", err);
    return NextResponse.json({ error: "internal" }, { status: 502 });
  }
}
