"use client";

import { useState } from "react";
import { ChevronDown, Play, Zap } from "lucide-react";
import { program } from "@/lib/data";

export function Program() {
  const [open, setOpen] = useState<number | null>(1);

  return (
    <section
      id="program"
      className="relative bg-gray-900 py-20 sm:py-28"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute right-20 top-20 w-80 h-80 bg-emerald-500 blur-3xl rounded-full" />
      </div>

      <div className="mx-auto max-w-3xl px-5 sm:px-8 relative z-10">
        <p className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.18em] text-emerald-400">
          <span aria-hidden className="text-emerald-400">//</span>
          <span>Програма</span>
        </p>
        <h2 className="mt-4 text-4xl sm:text-5xl leading-[1.02] font-black tracking-tight text-white">
          4 тижні — <span className="text-emerald-500">чіткий план</span>
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-300">
          Кожен тиждень будується на попередньому. Жодного хаосу — лише
          системний прогрес від дня до дня.
        </p>

        <div className="mt-10 flex flex-col gap-3">
          {program.map((week) => {
            const isOpen = open === week.n;
            return (
              <article
                key={week.n}
                className="border-2 border-gray-700 bg-gray-800/40 transition-all hover:border-emerald-500 hover:bg-gray-800/60"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`week-${week.n}`}
                  onClick={() => setOpen(isOpen ? null : week.n)}
                  className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-7 sm:py-6"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center bg-emerald-500 text-sm font-black text-white uppercase">
                    {week.n}
                  </span>
                  <h3 className="flex-1 text-base font-bold text-white sm:text-lg uppercase">
                    {week.title}
                  </h3>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-emerald-400 transition-transform duration-300 font-bold ${
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
                    <p className="px-5 pb-6 pl-[3.75rem] leading-relaxed text-gray-300 sm:px-7 sm:pl-[4.25rem]">
                      {week.text}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 overflow-hidden border-2 border-emerald-500 bg-gray-800">
          <button
            type="button"
            className="group relative flex w-full items-center gap-3 px-6 py-5 text-left"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center bg-emerald-500 text-white font-bold">
              <Play className="h-4 w-4 fill-white text-white" />
            </span>
            <span className="text-sm font-black uppercase tracking-widest text-white">
              Огляд програми · 3 хв
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
