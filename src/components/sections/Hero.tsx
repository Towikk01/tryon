import Image from "next/image";
import { ArrowRight, Lock } from "lucide-react";
import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";
import { heroChips } from "@/lib/data";
import heroPhoto1 from "@/images/hm.jpeg";
import heroPhoto2 from "@/images/03a06362-1a2a-41e4-bd22-c62280d50855.jpeg";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-6 pb-16 sm:pt-10">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow variant="dash" className="mb-6">
              Онлайн-курс
            </Eyebrow>

            <h1 className="text-5xl font-extrabold leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              TryOn
              <br />
              <span className="font-display font-bold italic text-coral">
                Спробуй на собі
              </span>
            </h1>

            <p className="mt-7 max-w-md text-lg leading-relaxed text-ink-soft">
              Фітнес-платформа для тренувань вдома. Програма для зайнятих
              українок <span className="font-semibold">25–40</span>: тренування
              20–30 хв на день, без жорстких дієт.
            </p>

            <ul className="mt-7 flex flex-wrap gap-2.5">
              {heroChips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink-soft"
                >
                  <span className="mr-1 text-coral">✓</span>
                  {chip}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:max-w-md">
              <Button href="#pricing" variant="primary">
                Обрати курс <ArrowRight className="h-5 w-5" />
              </Button>
              <Button href="#what" variant="outline">
                Дізнатись більше
              </Button>
            </div>

            <p className="mt-6 flex items-center gap-2 text-sm text-muted">
              <Lock className="h-4 w-4 text-coral" />
              Місця обмежені · Гарантія повернення 7 днів
            </p>
          </div>

          <div className="relative">
            <HeroCollage />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroCollage() {
  return (
    <div className="relative mx-auto grid h-[360px] max-w-md grid-cols-2 gap-4 sm:h-[440px] lg:h-[520px] lg:max-w-none">
      <div className="relative overflow-hidden rounded-[2rem] bg-paleblue">
        <Image
          src={heroPhoto1}
          alt="Тренування вдома"
          fill
          sizes="(max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 text-sm font-medium uppercase tracking-[0.2em] text-white">
          Тренування
        </div>
      </div>

      <div className="relative mt-10 overflow-hidden rounded-[2rem] bg-ink">
        <Image
          src={heroPhoto2}
          alt="Розтяжка і відновлення"
          fill
          sizes="(max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 text-sm font-medium uppercase tracking-[0.2em] text-white">
          Розтяжка
        </div>
      </div>

      <div className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 items-center divide-x divide-line overflow-hidden rounded-2xl bg-white shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
        <div className="px-5 py-3 text-center">
          <div className="text-xl font-extrabold text-coral">2400+</div>
          <div className="text-[11px] font-medium uppercase tracking-wider text-muted">
            учасниць
          </div>
        </div>
        <div className="px-5 py-3 text-center">
          <div className="text-xl font-extrabold text-ink">
            4.9<span className="text-coral">★</span>
          </div>
          <div className="text-[11px] font-medium uppercase tracking-wider text-muted">
            рейтинг
          </div>
        </div>
      </div>
    </div>
  );
}
