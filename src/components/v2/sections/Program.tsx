"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Eyebrow } from "../../ui/Eyebrow";
import { SectionHeading } from "../../ui/SectionHeading";
import { program } from "@/lib/data";

export function Program() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="program" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Eyebrow>Програма</Eyebrow>
        <SectionHeading
          sans="4 тижні"
          italic="трансформації"
          className="mt-4"
        />
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600">
          Кожен тиждень спланований так, щоб прогресувати швидше. Результати,
          які ти побачиш у дзеркалі.
        </p>

        <div className="mt-12 flex flex-col gap-3">
          {program.map((week) => {
            const isOpen = open === week.n;
            return (
              <article key={week.n} className="border-b border-gray-200 last:border-b-0">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : week.n)}
                  className="flex w-full items-start gap-6 py-5 text-left hover:opacity-70 transition-opacity"
                >
                  <span className="font-black text-5xl text-gray-100 shrink-0">
                    {week.n}
                  </span>
                  <div className="flex-1 pt-1">
                    <h3 className="text-lg font-bold text-black">
                      {week.title}
                    </h3>
                    {isOpen && (
                      <p className="mt-3 text-gray-600 leading-relaxed">
                        {week.text}
                      </p>
                    )}
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-black shrink-0 mt-1 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
