import { Star } from "lucide-react";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  return (
    <section id="reviews" className="bg-gray-800/50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.18em] text-emerald-400">
          <span aria-hidden className="text-emerald-400">//</span>
          <span>Відгуки</span>
        </p>
        <h2 className="mt-4 text-4xl sm:text-5xl leading-[1.02] font-black tracking-tight text-white">
          Вони вже <span className="text-emerald-500">змінилися</span>
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="flex flex-col border-2 border-gray-700 bg-gray-900/40 p-8 hover:border-emerald-500 transition-colors"
            >
              <div className="flex gap-1 text-emerald-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-emerald-500" />
                ))}
              </div>

              <blockquote className="mt-5 flex-1 leading-relaxed text-gray-100 font-medium">
                &ldquo;{t.text}&rdquo;
              </blockquote>

              <div className="mt-6 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 shrink-0 bg-gradient-to-br from-emerald-500 to-emerald-600" />
                  <div>
                    <div className="text-sm font-bold text-white">
                      {t.name}, {t.age}
                    </div>
                    <div className="text-xs text-gray-400 uppercase font-bold">{t.city}</div>
                  </div>
                </div>
                <span
                  className={`shrink-0 px-3 py-1.5 text-xs font-black uppercase tracking-wider ${
                    t.badgeTone === "coral"
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-700 text-emerald-400"
                  }`}
                >
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
