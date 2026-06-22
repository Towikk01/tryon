// Сховище двох речей за reference:
//   accesslink:<ref>  -> персональна telegram_link (видається після оплати)
//   invoice:<ref>     -> invoiceId Mono (щоб сторінка "дякуємо" сама перевірила статус)
//
// Якщо задані UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN — використовуємо
// Upstash Redis через REST (durable, шариться між інстансами Vercel). Інакше —
// фолбек у пам'ять процесу (ок лише для локалки / одного інстансу).

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const LINK_PREFIX = "accesslink:";
const INVOICE_PREFIX = "invoice:";
const LINK_TTL_SECONDS = 3600; // година — посилання потрібне одразу після оплати
const INVOICE_TTL_SECONDS = 86400; // доба — стільки живе інвойс Mono

const useUpstash = Boolean(UPSTASH_URL && UPSTASH_TOKEN);

// --- In-memory фолбек (через globalThis, щоб пережити hot-reload у next dev) ---
const globalForStore = globalThis as unknown as {
  __kvStore?: Map<string, string>;
};
const memStore = globalForStore.__kvStore ?? new Map<string, string>();
if (!globalForStore.__kvStore) globalForStore.__kvStore = memStore;

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

async function kvSet(key: string, value: string, ttl: number): Promise<void> {
  if (useUpstash) {
    await upstashCommand(["SET", key, value, "EX", ttl]);
    return;
  }
  memStore.set(key, value);
}

async function kvGet(key: string): Promise<string | null> {
  if (useUpstash) {
    const result = await upstashCommand(["GET", key]);
    return typeof result === "string" ? result : null;
  }
  return memStore.get(key) ?? null;
}

export async function saveAccessLink(reference: string, telegramLink: string): Promise<void> {
  await kvSet(LINK_PREFIX + reference, telegramLink, LINK_TTL_SECONDS);
}

export async function getAccessLink(reference: string): Promise<string | null> {
  return kvGet(LINK_PREFIX + reference);
}

export async function saveInvoiceId(reference: string, invoiceId: string): Promise<void> {
  await kvSet(INVOICE_PREFIX + reference, invoiceId, INVOICE_TTL_SECONDS);
}

export async function getInvoiceId(reference: string): Promise<string | null> {
  return kvGet(INVOICE_PREFIX + reference);
}
