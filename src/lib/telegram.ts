// Надсилання повідомлень власнику в Telegram. Викликається ЛИШЕ на сервері
// (TELEGRAM_BOT_TOKEN / TELEGRAM_OWNER_CHAT_ID не мають потрапити у браузер).

export async function notifyOwner(text: string): Promise<void> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_OWNER_CHAT_ID;
  if (!botToken || !chatId) {
    console.warn("Telegram notify skipped: env not set");
    return;
  }
  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
  } catch (err) {
    console.error("Telegram notify failed", err);
  }
}

/** Екранує символи, небезпечні для parse_mode=HTML у Telegram. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
