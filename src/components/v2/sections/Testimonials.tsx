"use client";

import { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Eyebrow } from "../../ui/Eyebrow";
import { SectionHeading } from "../../ui/SectionHeading";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  function toggle(i: number) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  function step() {
    const track = trackRef.current;
    if (!track) return 0;
    const first = track.firstElementChild as HTMLElement | null;
    if (!first) return track.clientWidth;
    const gap = parseFloat(getComputedStyle(track).columnGap || "0") || 0;
    return first.offsetWidth + gap;
  }

  function scrollByDir(dir: 1 | -1) {
    trackRef.current?.scrollBy({ left: dir * step(), behavior: "smooth" });
  }

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    const s = step() || 1;
    setActive(Math.round(track.scrollLeft / s));
  }

  function goTo(i: number) {
    trackRef.current?.scrollTo({ left: i * step(), behavior: "smooth" });
  }

  return (
    <section id="reviews" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Відгуки</Eyebrow>
            <SectionHeading sans="Вони вже" italic="пройшли курс" className="mt-4" />
          </div>

          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              aria-label="Попередній відгук"
              onClick={() => scrollByDir(-1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:bg-paleblue/60"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Наступний відгук"
              onClick={() => scrollByDir(1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:bg-paleblue/60"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="mt-12 flex snap-x snap-mandatory items-start gap-5 overflow-x-auto pb-2 lg:gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((t, i) => {
            const open = expanded.has(i);
            return (
              <article
                key={t.name}
                className="flex w-[88%] shrink-0 snap-start flex-col rounded-[2rem] bg-paleblue-soft p-7 sm:w-[60%] sm:p-8 lg:w-[42%]"
              >
                <div className="flex gap-0.5 text-coral">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-5 w-5 fill-coral" />
                  ))}
                </div>

                <blockquote
                  className={`mt-5 font-display italic leading-relaxed text-ink ${
                    open ? "" : "line-clamp-5"
                  }`}
                >
                  &ldquo;{t.text}&rdquo;
                </blockquote>

                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="mt-3 self-start text-sm font-semibold text-coral hover:underline"
                >
                  {open ? "Згорнути" : "Читати більше"}
                </button>

                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-ink to-ink-soft text-sm font-bold text-white">
                    {t.name.charAt(0)}
                  </div>
                  <div className="text-sm font-bold text-ink">{t.name}</div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              aria-label={`Відгук ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-6 bg-coral" : "w-2 bg-line"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
