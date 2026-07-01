"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Check, Play, Dumbbell, X } from "lucide-react";
import { Eyebrow } from "../../ui/Eyebrow";
import { SectionHeading } from "../../ui/SectionHeading";

const PREVIEW_VIDEO_SRC = "/program-preview.mp4";
const PREVIEW_POSTER_SRC = "/program-poster.jpg";

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
  const [videoOpen, setVideoOpen] = useState(false);

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

        <button
          type="button"
          onClick={() => setVideoOpen(true)}
          aria-label="Дивитись огляд програми"
          className="group relative mt-10 block aspect-video w-full overflow-hidden rounded-3xl bg-ink"
        >
          <Image
            src={PREVIEW_POSTER_SRC}
            alt="Огляд програми"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-coral shadow-lg transition-transform group-hover:scale-110">
              <Play className="ml-0.5 h-6 w-6 fill-white text-white" />
            </span>
          </span>
          <span className="absolute bottom-5 left-6 text-sm font-medium uppercase tracking-wider text-white">
            Огляд програми
          </span>
        </button>
      </div>

      {videoOpen && (
        <VideoModal onClose={() => setVideoOpen(false)} />
      )}
    </section>
  );
}

function VideoModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Огляд програми"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-black shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрити"
          className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
        >
          <X className="h-5 w-5" />
        </button>
        <video
          src={PREVIEW_VIDEO_SRC}
          poster={PREVIEW_POSTER_SRC}
          controls
          autoPlay
          playsInline
          className="h-auto max-h-[80vh] w-full bg-black"
        />
      </div>
    </div>
  );
}
