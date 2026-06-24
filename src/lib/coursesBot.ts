// Клієнт до CoursesSalesBot API. Викликається ЛИШЕ на сервері —
// COURSES_BOT_API_KEY не повинен потрапити у браузер.

const API_URL = process.env.COURSES_BOT_API_URL;
const API_KEY = process.env.COURSES_BOT_API_KEY;

// Тарифи, які знає бот. Префікс reference (`${plan.id}-...`) має збігатися з цими id.
const VALID_TIERS = new Set(["lite", "pro", "vip"]);

/** reference має формат `${plan.id}-${uuid}` — звідси дістаємо тариф (lite|pro|vip). */
export function tierForReference(reference: string): string | null {
  const tier = reference.split("-")[0];
  return VALID_TIERS.has(tier) ? tier : null;
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
 * Створює одноразовий токен покупки під тариф. Ідемпотентно за payment_id:
 * повторний виклик (ретрай вебхука Mono) повертає created=false без помилки.
 * Тривалість доступу (30/90 днів) визначає бот за тарифом.
 */
export async function createPurchaseToken(
  paymentId: string,
  tier: string,
): Promise<CreateTokenResult> {
  const { url, key } = config();

  const res = await fetch(`${url}/api/tokens`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": key,
      // ngrok free інакше може віддати HTML-заглушку замість відповіді бота.
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify({ payment_id: paymentId, tier }),
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
