// Сховище reference -> telegram_link.
//
// Бот віддає персональну ссилку ЛИШЕ в момент створення токена (POST /api/tokens),
// окремого "дістати за reference" ендпоінта в нього немає. Тому ми ловимо ссилку
// у вебхуці й кладемо сюди, а сторінка "дякуємо" читає її звідси.
//
// УВАГА: це in-memory, живе лише в пам'яті процесу. Для локалки / одного інстансу — ок.
// На Vercel (serverless, кілька інстансів, холодний старт) НЕ переживе —
// перед продом треба замінити на Vercel KV / Upstash Redis.

// Через globalThis, щоб пережити hot-reload у next dev (модуль переобчислюється).
const globalForStore = globalThis as unknown as {
  __accessLinks?: Map<string, string>;
};

const store = globalForStore.__accessLinks ?? new Map<string, string>();
if (!globalForStore.__accessLinks) globalForStore.__accessLinks = store;

export function saveAccessLink(reference: string, telegramLink: string): void {
  store.set(reference, telegramLink);
}

export function getAccessLink(reference: string): string | null {
  return store.get(reference) ?? null;
}
