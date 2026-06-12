import { Star } from "lucide-react";
import { Eyebrow } from "../ui/Eyebrow";
import { SectionHeading } from "../ui/SectionHeading";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  return (
    <section id="reviews" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Eyebrow>Відгуки</Eyebrow>
        <SectionHeading
          sans="Вони вже"
          italic="пройшли курс"
          className="mt-4"
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3 lg:gap-6">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="flex flex-col rounded-[2rem] bg-paleblue-soft p-7 sm:p-8"
            >
              <div className="flex gap-0.5 text-coral">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-coral" />
                ))}
              </div>

              <blockquote className="mt-5 flex-1 font-display italic leading-relaxed text-ink">
                &ldquo;{t.text}&rdquo;
              </blockquote>

              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-ink to-ink-soft text-sm font-bold text-white">
                  {t.name.charAt(0)}
                </div>
                <div className="text-sm font-bold text-ink">{t.name}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
