import { Lightbulb, Users, Leaf } from "lucide-react";
import { Eyebrow } from "../../ui/Eyebrow";
import { SectionHeading } from "../../ui/SectionHeading";
import { whatsInside } from "@/lib/data";

const iconMap: Record<"clock" | "users" | "heart", any> = {
  clock: Lightbulb,
  users: Users,
  heart: Leaf,
};

export function WhatsInside() {
  return (
    <section id="what" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Eyebrow>Що тебе чекає</Eyebrow>
        <SectionHeading
          sans="Все що потрібно"
          italic="для успіху"
          className="mt-4 max-w-2xl"
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {whatsInside.map((card, idx) => {
            const Icon = iconMap[card.icon];
            return (
              <article
                key={card.n}
                className="relative"
              >
                <div className="absolute top-0 left-0 text-6xl font-black text-gray-100 -z-10">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-black text-white shrink-0">
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-black">
                      {card.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-gray-600">
                      {card.text}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
