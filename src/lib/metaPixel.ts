// Утиліти Meta Pixel. Працюють ТІЛЬКИ в браузері.
// ID зашитий у код (він і так публічний — видно у вихідному коді сторінки),
// NEXT_PUBLIC_META_PIXEL_ID лишається як перевизначення для тестового пікселя.

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export const PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "2221566288628656";

/** Ціни тарифів у грн — для value у подіях (дзеркало lib/data, без імпорту зайвого). */
const PLAN_VALUE_UAH: Record<string, number> = {
  lite: 350,
  pro: 500,
  vip: 1500,
};

export function planValueUah(planId: string): number | null {
  return PLAN_VALUE_UAH[planId] ?? null;
}

/** reference має формат `${planId}-${uuid}` — дістаємо тариф. */
export function planFromReference(reference: string): string | null {
  const p = reference.split("-")[0];
  return p in PLAN_VALUE_UAH ? p : null;
}

export function track(event: string, params?: Record<string, unknown>): void {
  if (!PIXEL_ID) return;
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  try {
    if (params) window.fbq("track", event, params);
    else window.fbq("track", event);
  } catch {
    // аналітика ніколи не має ламати UX
  }
}
