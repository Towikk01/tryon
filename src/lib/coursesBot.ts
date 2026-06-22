// Клієнт до CoursesSalesBot API. Викликається ЛИШЕ на сервері —
// COURSES_BOT_API_KEY не повинен потрапити у браузер.

const API_URL = process.env.COURSES_BOT_API_URL;
const API_KEY = process.env.COURSES_BOT_API_KEY;

// Усі тарифи дають доступ до одного спільного каналу курсу.
// id курсу має існувати в боті (створюється через POST /api/courses).
const SHARED_COURSE_ID = process.env.COURSES_BOT_COURSE_ID ?? "tryon";

const PLAN_COURSES: Record<string, string[]> = {
  lite: [SHARED_COURSE_ID],
  pro: [SHARED_COURSE_ID],
  vip: [SHARED_COURSE_ID],
};

/** reference має формат `${plan.id}-${...}` — звідси дістаємо тариф. */
export function coursesForReference(reference: string): string[] | null {
  const planId = reference.split("-")[0];
  return PLAN_COURSES[planId] ?? null;
}

function config(): { url: string; key: string } {
  if (!API_URL) throw new Error("COURSES_BOT_API_URL is not set");
  if (!API_KEY) throw new Error("COURSES_BOT_API_KEY is not set");
  return { url: API_URL.replace(/\/$/, ""), key: API_KEY };
}

type CreateTokenResult = {
  /** true, якщо токен щойно створено; false — якщо вже існував (дубль вебхука). */
  created: boolean;
  telegram_link?: string;
};

/**
 * Створює одноразовий токен покупки. Ідемпотентно за payment_id:
 * повторний виклик (ретрай вебхука Mono) повертає created=false без помилки.
 */
export async function createPurchaseToken(
  paymentId: string,
  courseIds: string[],
): Promise<CreateTokenResult> {
  const { url, key } = config();

  const res = await fetch(`${url}/api/tokens`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-API-Key": key },
    body: JSON.stringify({ payment_id: paymentId, course_ids: courseIds }),
    cache: "no-store",
  });

  if (res.status === 409) {
    // Токен для цього payment_id вже створено — нормально для ретраю вебхука.
    return { created: false };
  }
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Bot create token failed: ${res.status} ${text}`);
  }

  const data = (await res.json()) as { telegram_link: string };
  return { created: true, telegram_link: data.telegram_link };
}
