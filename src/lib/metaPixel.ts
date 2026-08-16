// Утиліти Meta Pixel. Працюють ТІЛЬКИ в браузері.
// ID зашитий у код (він і так публічний — видно у вихідному коді сторінки),
// NEXT_PUBLIC_META_PIXEL_ID лишається як перевизначення для тестового пікселя.

import { pricing } from "@/lib/data";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export const PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "2221566288628656";

export type Plan = {
  /** id тарифу: lite | pro | vip */
  id: string;
  /** людська назва: Lite | Pro | VIP */
  name: string;
  /** ціна в гривнях (amount у data.ts — копійки) */
  valueUah: number;
};

/** Джерело правди по тарифах — те саме `pricing`, з якого створюється інвойс Mono. */
export function planById(id: string): Plan | null {
  const p = pricing.find((x) => x.id === id);
  return p ? { id: p.id, name: p.name, valueUah: p.amount / 100 } : null;
}

/** reference має формат `${planId}-${uuid}` — дістаємо тариф. */
export function planFromReference(reference: string): Plan | null {
  return planById(reference.split("-")[0]);
}

/**
 * Параметри події для Meta: сума динамічна за тарифом, валюта UAH,
 * плюс ідентифікація товару (content_ids / content_name), щоб у Events Manager
 * було видно, який саме пакет купили.
 */
export function planParams(plan: Plan): Record<string, unknown> {
  return {
    value: plan.valueUah,
    currency: "UAH",
    content_ids: [plan.id],
    content_type: "product",
    content_name: plan.name,
    contents: [{ id: plan.id, quantity: 1, item_price: plan.valueUah }],
    num_items: 1,
  };
}

export function track(
  event: string,
  params?: Record<string, unknown>,
  /** eventID — дедуп на боці Meta (знадобиться, якщо додамо Conversions API). */
  eventId?: string,
): void {
  if (!PIXEL_ID) return;
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  try {
    const args: unknown[] = ["track", event];
    if (params) args.push(params);
    if (eventId) {
      if (!params) args.push({});
      args.push({ eventID: eventId });
    }
    window.fbq(...args);
  } catch {
    // аналітика ніколи не має ламати UX
  }
}
