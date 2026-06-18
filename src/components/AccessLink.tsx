"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Send, Loader2 } from "lucide-react";

type Status = "loading" | "ready" | "timeout";

const POLL_INTERVAL_MS = 2500;
const MAX_ATTEMPTS = 24; // ~60с очікування вебхука Mono

export default function AccessLink({ reference }: { reference: string }) {
  const [status, setStatus] = useState<Status>("loading");
  const [link, setLink] = useState<string | null>(null);

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
    return (
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
