import { HeartPulse, Timer, TrendingUp, Leaf, type LucideIcon } from "lucide-react";
import { Eyebrow } from "../../ui/Eyebrow";
import { SectionHeading } from "../../ui/SectionHeading";
import { whatsInside } from "@/lib/data";

const iconMap: Record<"heartPulse" | "timer" | "trendingUp" | "leaf", LucideIcon> = {
  heartPulse: HeartPulse,
  timer: Timer,
  trendingUp: TrendingUp,
  leaf: Leaf,
};

export function WhatsInside() {
  return (
    <section
      id="what"
      className="relative bg-paleblue-soft py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Eyebrow>Що всередині</Eyebrow>
        <SectionHeading
          sans="Розумний рух"
          italic="для твого тіла"
          className="mt-4 max-w-xl"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {whatsInside.map((card) => {
            const Icon = iconMap[card.icon];
            return (
              <article
                key={card.n}
                className="relative rounded-[2rem] bg-white p-7 sm:p-8"
              >
                <div className="flex items-start justify-between">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-coral/10 text-coral">
                    <Icon className="h-7 w-7" strokeWidth={2} />
                  </div>
                  <span className="font-display text-2xl italic text-ink/20">
                    {card.n}
                  </span>
                </div>
                <h3 className="mt-7 text-xl font-bold text-ink">
                  {card.title}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-soft">
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
