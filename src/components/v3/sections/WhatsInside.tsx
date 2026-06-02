import { Zap, Users, Flame, type LucideIcon } from "lucide-react";
import { whatsInside } from "@/lib/data";

const iconMap: Record<"clock" | "users" | "heart", LucideIcon> = {
  clock: Zap,
  users: Users,
  heart: Flame,
};

export function WhatsInside() {
  return (
    <section
      id="what"
      className="relative bg-gray-900 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.18em] text-emerald-400">
          <span aria-hidden className="text-emerald-400">//</span>
          <span>Що всередині</span>
        </p>
        <h2 className="mt-4 max-w-xl text-4xl sm:text-5xl leading-[1.02] font-black tracking-tight text-white">
          Три елементи <span className="text-emerald-500">твоєї трансформації</span>
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {whatsInside.map((card) => {
            const Icon = iconMap[card.icon];
            return (
              <article
                key={card.n}
                className="relative border-2 border-gray-700 bg-gray-800/50 p-8 hover:border-emerald-500 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="inline-flex h-16 w-16 items-center justify-center bg-emerald-500 text-white font-bold">
                    <Icon className="h-8 w-8" strokeWidth={2} />
                  </div>
                  <span className="text-3xl font-black text-emerald-500/30">
                    {card.n}
                  </span>
                </div>
                <h3 className="mt-7 text-xl font-black text-emerald-400 uppercase tracking-tight">
                  {card.title}
                </h3>
                <p className="mt-3 leading-relaxed text-gray-300">
                  {card.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
