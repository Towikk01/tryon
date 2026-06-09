import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "../Button";
import { Eyebrow } from "../../ui/Eyebrow";
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
              30-денний онлайн-курс
            </Eyebrow>

            <h1 className="text-glow font-extrabold leading-[0.95] tracking-tight text-ink">
              <span className="block text-6xl sm:text-7xl">TryOn</span>
              <span className="mt-2 block whitespace-nowrap font-display text-4xl font-bold italic text-coral sm:text-5xl lg:text-6xl">
                Спробуй на собі
              </span>
            </h1>

            <p className="mt-7 max-w-md text-lg leading-relaxed text-ink-soft">
              Віднови своє тіло через розумний рух і відчуй легкість щодня.
              Безпечні тренування <span className="font-semibold">20–60 хв</span>{" "}
              у різних форматах — Pilates, stretching, functional — для
              відновлення та зміцнення.
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
    </div>
  );
}
