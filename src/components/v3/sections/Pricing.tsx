import { Check, Zap } from "lucide-react";
import { Button } from "../Button";
import { pricing } from "@/lib/data";

export function Pricing() {
  return (
    <section
      id="pricing"
      className="relative bg-gray-900 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.18em] text-emerald-400">
          <span aria-hidden className="text-emerald-400">//</span>
          <span>Тарифи</span>
        </p>
        <h2 className="mt-4 max-w-2xl text-4xl sm:text-5xl leading-[1.02] font-black tracking-tight text-white">
          Обери свій <span className="text-emerald-500">план</span>
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-300">
          Усі тарифи з гарантією повернення коштів протягом 7 днів. Можна
          оплатити карткою або частинами.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {pricing.map((plan) => (
            <article
              key={plan.id}
              className={`relative flex flex-col border-2 p-8 transition-all ${
                plan.featured
                  ? "border-emerald-500 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 lg:scale-105 shadow-2xl"
                  : "border-gray-700 bg-gray-800/40 hover:border-emerald-500"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 bg-emerald-500 px-4 py-2 text-xs font-black uppercase tracking-widest text-white">
                  <Zap className="h-3.5 w-3.5" />
                  Хіт
                </span>
              )}

              <div>
                <h3
                  className={`text-2xl font-black uppercase tracking-tight ${
                    plan.featured ? "text-emerald-400" : "text-white"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`mt-1 text-sm font-bold ${
                    plan.featured ? "text-emerald-300" : "text-gray-400"
                  }`}
                >
                  {plan.tagline}
                </p>
              </div>

              <div className="mt-7 flex items-baseline gap-2">
                <span
                  className={`text-5xl font-black tracking-tight ${
                    plan.featured ? "text-emerald-400" : "text-emerald-500"
                  }`}
                >
                  {plan.price}
                </span>
                <span
                  className={`text-base font-bold ${
                    plan.featured ? "text-emerald-300" : "text-gray-400"
                  }`}
                >
                  {plan.currency}
                </span>
              </div>

              <ul className="mt-7 flex flex-1 flex-col gap-3.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm font-medium">
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        plan.featured ? "text-emerald-400" : "text-emerald-500"
                      }`}
                      strokeWidth={3}
                    />
                    <span
                      className={
                        plan.featured ? "text-gray-100" : "text-gray-300"
                      }
                    >
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

        <p className="mt-10 text-center text-sm text-gray-500 font-bold uppercase tracking-wide">
          🔒 Безпечна оплата · LiqPay · Apple Pay · Google Pay
        </p>
      </div>
    </section>
  );
}
