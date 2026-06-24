"use client";

import { Check, Play, Dumbbell } from "lucide-react";
import { Eyebrow } from "../../ui/Eyebrow";
import { SectionHeading } from "../../ui/SectionHeading";

const groups = [
  [
    "Розминка та мобільність",
    "Силові вправи",
    "Кардіонавантаження",
    "Відновлення та розтяжка",
  ],
  [
    "Більше руху та життєвого тонусу",
    "Поступовий розвиток сили й витривалості",
    "Збалансоване та безпечне навантаження",
  ],
  [
    "Помітні зміни у самопочутті та формі",
    "Результат, який відчувається",
  ],
];

export function Program() {
  return (
    <section
      id="program"
      className="relative bg-paleblue-soft py-20 sm:py-28"
    >
      <Dumbbell
        aria-hidden
        className="pointer-events-none absolute right-8 top-24 h-20 w-20 rotate-12 text-paleblue sm:right-20 sm:h-28 sm:w-28"
        strokeWidth={1.5}
      />

      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Eyebrow>Програма</Eyebrow>
        <SectionHeading
          sans="Створи свій"
          italic="чіткий план"
          className="mt-4"
        />
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          Та отримай задоволення від процесу.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {groups.map((items, i) => (
            <ul
              key={i}
              className="flex flex-col gap-4 rounded-2xl bg-white px-5 py-6 sm:px-6"
            >
              {items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-coral">
                    <Check className="h-3 w-3 text-white" strokeWidth={3} />
                  </span>
                  <span className="leading-snug text-ink-soft">{item}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl bg-ink">
          <button
            type="button"
            className="group relative flex w-full items-center gap-3 px-6 py-4 text-left text-white"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-coral">
              <Play className="h-4 w-4 fill-white text-white" />
            </span>
            <span className="text-sm font-medium uppercase tracking-wider">
              Огляд програми · 3 хв
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
