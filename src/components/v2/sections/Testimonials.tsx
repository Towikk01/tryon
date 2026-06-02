import { Star } from "lucide-react";
import { Eyebrow } from "../../ui/Eyebrow";
import { SectionHeading } from "../../ui/SectionHeading";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  return (
    <section id="reviews" className="bg-gray-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Eyebrow>Результати</Eyebrow>
        <SectionHeading
          sans="Реальні"
          italic="відгуки"
          className="mt-4"
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <article key={t.name} className="rounded-2xl bg-white p-8 border border-gray-200">
              <div className="flex gap-1 text-black">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-black" />
                ))}
              </div>

              <blockquote className="mt-6 leading-relaxed text-gray-700 font-medium">
                &ldquo;{t.text}&rdquo;
              </blockquote>

              <div className="mt-6 flex items-center justify-between gap-3 pt-6 border-t border-gray-200">
                <div>
                  <div className="font-bold text-black">
                    {t.name}, {t.age}
                  </div>
                  <div className="text-xs text-gray-500">{t.city}</div>
                </div>
                <span className="text-xs font-bold bg-black text-white px-3 py-1.5 rounded-full">
                  {t.badge}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
