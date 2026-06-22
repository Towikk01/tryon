// Сховище reference -> telegram_link.
//
// Бот віддає персональну ссилку ЛИШЕ в момент створення токена (POST /api/tokens).
// Ми ловимо її у вебхуці й кладемо сюди, а сторінка "дякуємо" читає звідси.
//
// Прод (Vercel = serverless, кілька інстансів, холодний старт): in-memory НЕ
// переживе. Тому якщо задані UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN —
// використовуємо Upstash Redis через REST (без додаткових пакетів). Інакше
// фолбек у пам'ять процесу (ок для локалки / одного інстансу).

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

// Ссилка потрібна лише в перші хвилини після оплати — TTL година з запасом.
const TTL_SECONDS = 3600;
const KEY_PREFIX = "accesslink:";

const useUpstash = Boolean(UPSTASH_URL && UPSTASH_TOKEN);

// --- In-memory фолбек (через globalThis, щоб пережити hot-reload у next dev) ---
const globalForStore = globalThis as unknown as {
  __accessLinks?: Map<string, string>;
};
const memStore = globalForStore.__accessLinks ?? new Map<string, string>();
if (!globalForStore.__accessLinks) globalForStore.__accessLinks = memStore;

async function upstashCommand(command: (string | number)[]): Promise<unknown> {
  const res = await fetch(UPSTASH_URL as string, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Upstash command failed: ${res.status} ${await res.text()}`);
  }
  const data = (await res.json()) as { result?: unknown };
  return data.result ?? null;
}

export async function saveAccessLink(reference: string, telegramLink: string): Promise<void> {
  if (useUpstash) {
    await upstashCommand(["SET", KEY_PREFIX + reference, telegramLink, "EX", TTL_SECONDS]);
    return;
  }
  memStore.set(reference, telegramLink);
}

export async function getAccessLink(reference: string): Promise<string | null> {
  if (useUpstash) {
    const result = await upstashCommand(["GET", KEY_PREFIX + reference]);
    return typeof result === "string" ? result : null;
  }
  return memStore.get(reference) ?? null;
}
