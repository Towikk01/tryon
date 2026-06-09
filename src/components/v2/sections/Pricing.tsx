import { Check, Sparkles } from "lucide-react";
import { CheckoutButton } from "../CheckoutButton";
import { Eyebrow } from "../../ui/Eyebrow";
import { SectionHeading } from "../../ui/SectionHeading";
import { pricing } from "@/lib/data";

export function Pricing() {
  return (
    <section
      id="pricing"
      className="relative bg-paleblue-soft py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Eyebrow>Тарифи</Eyebrow>
        <SectionHeading
          sans="Обери свій"
          italic="формат"
          className="mt-4 max-w-2xl"
        />
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          Усі тарифи з гарантією повернення коштів протягом 7 днів. Можна
          оплатити карткою або частинами.
        </p>

        <div className="mt-12 grid gap-5 lg:grid-cols-3 lg:items-stretch lg:gap-6">
          {pricing.map((plan) => (
            <article
              key={plan.id}
              className={`relative flex flex-col rounded-[2rem] p-7 sm:p-8 ${
                plan.featured
                  ? "bg-ink text-white shadow-[0_30px_60px_-30px_rgba(221,107,74,0.6)] lg:-mt-4 lg:mb-4"
                  : "bg-white text-ink"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-coral px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                  <Sparkles className="h-3.5 w-3.5" />
                  Хіт продажів
                </span>
              )}

              <div>
                <h3
                  className={`text-2xl font-extrabold ${
                    plan.featured ? "text-white" : "text-ink"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`mt-1 text-sm ${
                    plan.featured ? "text-white/70" : "text-muted"
                  }`}
                >
                  {plan.tagline}
                </p>
              </div>

              <div className="mt-7 flex items-baseline gap-2">
                <span
                  className={`text-5xl font-extrabold tracking-tight ${
                    plan.featured ? "text-coral" : "text-coral"
                  }`}
                >
                  {plan.price}
                </span>
                <span
                  className={`text-base font-medium ${
                    plan.featured ? "text-white/70" : "text-muted"
                  }`}
                >
                  {plan.currency}
                </span>
              </div>

              <ul className="mt-7 flex flex-1 flex-col gap-3.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        plan.featured ? "text-coral" : "text-coral"
                      }`}
                      strokeWidth={3}
                    />
                    <span
                      className={
                        plan.featured ? "text-white/90" : "text-ink-soft"
                      }
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <CheckoutButton
                planId={plan.id}
                variant={plan.featured ? "primary" : "outline"}
                className="mt-8"
              >
                {plan.cta}
              </CheckoutButton>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted">
          🔒 Безпечна оплата · LiqPay · Apple Pay · Google Pay
        </p>
      </div>
    </section>
  );
}
