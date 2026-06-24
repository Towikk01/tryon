"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Send, Loader2, Copy, Check } from "lucide-react";

type Status = "loading" | "ready" | "timeout";

const POLL_INTERVAL_MS = 2500;
const MAX_ATTEMPTS = 24; // ~60с очікування вебхука Mono

export default function AccessLink({ reference }: { reference: string }) {
  const [status, setStatus] = useState<Status>("loading");
  const [link, setLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let attempts = 0;

    async function poll() {
      attempts += 1;
      try {
        const res = await fetch(
          `/api/access-link?ref=${encodeURIComponent(reference)}`,
          { cache: "no-store" },
        );
        if (res.ok) {
          const data = (await res.json()) as { telegram_link?: string };
          if (!cancelled && data.telegram_link) {
            setLink(data.telegram_link);
            setStatus("ready");
            return;
          }
        }
      } catch {
        // ігноруємо — спробуємо ще раз
      }

      if (cancelled) return;
      if (attempts >= MAX_ATTEMPTS) {
        setStatus("timeout");
        return;
      }
      setTimeout(poll, POLL_INTERVAL_MS);
    }

    poll();
    return () => {
      cancelled = true;
    };
  }, [reference]);

  if (status === "ready" && link) {
    // Telegram не завжди пере-надсилає `start=<token>` ботові, якщо користувач
    // уже відкривав його раніше. Тоді deep-link «нічого не робить» — тож даємо
    // запасний шлях: токен із посилання + ручна команда /activate.
    const token = link.includes("start=") ? link.split("start=")[1] : null;
    const activateCommand = token ? `/activate ${token}` : null;

    async function copyCommand() {
      if (!activateCommand) return;
      try {
        await navigator.clipboard.writeText(activateCommand);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // буфер недоступний — користувач скопіює вручну
      }
    }

    return (
      <>
        <Link
          href={link}
          target="_blank"
          rel="noreferrer"
          className="cta mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-semibold"
        >
          <span className="cta-label inline-flex items-center gap-2">
            <Send className="h-5 w-5" />
            Перейти в Telegram
          </span>
        </Link>

        {activateCommand && (
          <div className="mt-6 rounded-2xl bg-paleblue-soft/60 px-4 py-4 text-left">
            <p className="text-sm text-ink-soft">
              Якщо ти вже купував(-ла) підписку раніше і бот не відкрив доступ
              автоматично — перейди в бота та надішли йому цю команду:
            </p>
            <div className="mt-3 flex items-center gap-2">
              <code className="flex-1 overflow-x-auto whitespace-nowrap rounded-lg bg-cream px-3 py-2 text-xs text-ink">
                {activateCommand}
              </code>
              <button
                type="button"
                onClick={copyCommand}
                className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-cream px-3 py-2 text-xs font-medium text-ink hover:text-coral"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Скопійовано
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Копіювати
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  if (status === "timeout") {
    return (
      <p className="mt-8 text-sm text-muted">
        Доступ готується трохи довше, ніж зазвичай. Онови сторінку через
        хвилину або напиши нам у Telegram — ми все надамо вручну.
      </p>
    );
  }

  return (
    <div className="mt-8 inline-flex items-center justify-center gap-2 text-base font-semibold text-ink-soft">
      <Loader2 className="h-5 w-5 animate-spin" />
      Готуємо твій доступ…
    </div>
  );
}
