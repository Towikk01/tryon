import { Check } from "lucide-react";
import { Button } from "../Button";
import { Eyebrow } from "../../ui/Eyebrow";
import { SectionHeading } from "../../ui/SectionHeading";
import { pricing } from "@/lib/data";

export function Pricing() {
  return (
    <section id="pricing" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Eyebrow>Тарифи</Eyebrow>
        <SectionHeading
          sans="Обери свій"
          italic="план"
          className="mt-4 max-w-2xl"
        />
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600">
          Гарантія повернення 7 днів. Усі тарифи мають доступ до основного
          контенту. Вибери рівень підтримки, який тобі потрібен.
        </p>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {pricing.map((plan) => (
            <article
              key={plan.id}
              className={`relative rounded-2xl p-8 border-2 transition-all ${
                plan.featured
                  ? "bg-black text-white border-black lg:scale-105"
                  : "bg-white text-black border-gray-200 hover:border-black"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-black uppercase tracking-widest bg-white text-black px-3 py-1 rounded-full">
                  Популярний
                </span>
              )}

              <div>
                <h3 className="text-2xl font-black">{plan.name}</h3>
                <p className={`mt-2 text-sm ${plan.featured ? "text-white/70" : "text-gray-600"}`}>
                  {plan.tagline}
                </p>
              </div>

              <div className="mt-8 flex items-baseline gap-2">
                <span className="text-5xl font-black">{plan.price}</span>
                <span className={`text-sm font-semibold ${plan.featured ? "text-white/70" : "text-gray-600"}`}>
                  {plan.currency}
                </span>
              </div>

              <ul className="mt-8 flex flex-1 flex-col gap-4">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="h-4 w-4 shrink-0 mt-0.5" strokeWidth={3} />
                    <span className={plan.featured ? "text-white/90" : "text-gray-700"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                href={`#checkout-${plan.id}`}
                variant={plan.featured ? "primary" : "outline"}
                className="mt-8"
              >
                {plan.cta}
              </Button>
            </article>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-gray-500">
          🔒 Безпечна оплата · LiqPay · Apple Pay · Google Pay
        </p>
      </div>
    </section>
  );
}
