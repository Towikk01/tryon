import Link from "next/link";
import { CheckCircle2, Send } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Дякуємо за оплату — TryOn",
  robots: { index: false },
};

export default function ThankYouPage() {
  const tgLink = process.env.NEXT_PUBLIC_TELEGRAM_LINK;

  return (
    <main className="theme-blush flex min-h-screen items-center justify-center bg-cream px-5 py-16 text-ink">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-paleblue-soft">
          <CheckCircle2 className="h-9 w-9 text-coral" />
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Дякуємо за оплату!
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          Оплата отримана. Щоб отримати доступ до курсу, перейди в наш
          Telegram — там на тебе чекають усі матеріали та підтримка.
        </p>

        {tgLink && (
          <Link
            href={tgLink}
            target="_blank"
            rel="noreferrer"
            className="cta mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-semibold"
          >
            <span className="cta-label inline-flex items-center gap-2">
              <Send className="h-5 w-5" />
              Перейти в Telegram
            </span>
          </Link>
        )}

        <p className="mt-6 text-sm text-muted">
          Якщо доступ не надійшов протягом 10 хвилин — напиши нам у Telegram.
        </p>

        <Link
          href="/"
          className="mt-8 inline-block text-sm font-medium text-muted hover:text-coral"
        >
          ← На головну
        </Link>
      </div>
    </main>
  );
}
