"use client";

import { useState } from "react";
import { ChevronDown, Play, Dumbbell } from "lucide-react";
import { Eyebrow } from "../../ui/Eyebrow";
import { SectionHeading } from "../../ui/SectionHeading";
import { program } from "@/lib/data";

export function Program() {
  const [open, setOpen] = useState<number | null>(1);

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
          sans="4 тижні —"
          italic="чіткий план"
          className="mt-4"
        />
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          Кожен тиждень будується на попередньому. Жодного хаосу — лише
          системний прогрес.
        </p>

        <div className="mt-10 flex flex-col gap-3">
          {program.map((week) => {
            const isOpen = open === week.n;
            return (
              <article
                key={week.n}
                className="rounded-2xl bg-white transition-shadow"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`week-${week.n}`}
                  onClick={() => setOpen(isOpen ? null : week.n)}
                  className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-7 sm:py-6"
                >
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-coral text-sm font-semibold text-white">
                    {week.n}
                  </span>
                  <h3 className="flex-1 text-base font-bold text-ink sm:text-lg">
                    {week.title}
                  </h3>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-ink-soft transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  id={`week-${week.n}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-6 pl-[3.75rem] leading-relaxed text-ink-soft sm:px-7 sm:pl-[4.25rem]">
                      {week.text}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
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
