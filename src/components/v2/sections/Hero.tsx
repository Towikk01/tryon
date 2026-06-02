import Image from "next/image";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "../Button";
import { Eyebrow } from "../../ui/Eyebrow";
import { heroChips } from "@/lib/data";
import heroPhoto1 from "@/images/hm.jpeg";
import heroPhoto2 from "@/images/03a06362-1a2a-41e4-bd22-c62280d50855.jpeg";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-8 pb-20 sm:pt-12">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <Eyebrow variant="slash" className="mb-6">
              Онлайн курс для фітнесу
            </Eyebrow>

            <h1 className="text-6xl font-black leading-[0.9] tracking-tight text-black sm:text-7xl lg:text-8xl">
              Змінюй
              <br />
              <span className="relative">
                тіло
                <span className="absolute bottom-0 left-0 right-0 h-4 bg-black/10" />
              </span>
            </h1>

            <p className="mt-8 max-w-lg text-lg leading-relaxed text-gray-600">
              30 днів інтенсивних тренувань. Програма для зайнятих українок
              <span className="font-semibold"> 25–40</span>: 20–30 хв на день,
              без залу, без жорстких дієт.
            </p>

            <ul className="mt-8 flex flex-col gap-3">
              {heroChips.map((chip) => (
                <li key={chip} className="flex items-center gap-3 text-sm font-medium text-black">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-black text-white text-xs">
                    ✓
                  </span>
                  {chip}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:max-w-md">
              <Button href="#pricing" variant="primary">
                Почати сьогодні <ArrowRight className="h-5 w-5" />
              </Button>
              <Button href="#what" variant="outline">
                Про програму
              </Button>
            </div>
          </div>

          <div className="relative">
            <HeroImages />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroImages() {
  return (
    <div className="relative mx-auto max-w-lg">
      <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-gray-100" />
      <div className="relative grid grid-cols-2 gap-4">
        <div className="relative overflow-hidden rounded-3xl bg-gray-200 pt-[125%]">
          <Image
            src={heroPhoto1}
            alt="Тренування"
            fill
            sizes="(max-width: 1024px) 50vw, 25vw"
            className="object-cover absolute inset-0"
          />
        </div>
        <div className="relative mt-8 overflow-hidden rounded-3xl bg-gray-800 pt-[125%]">
          <Image
            src={heroPhoto2}
            alt="Результати"
            fill
            sizes="(max-width: 1024px) 50vw, 25vw"
            className="object-cover absolute inset-0"
          />
        </div>
      </div>

      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg p-5 flex items-center gap-4 w-fit">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-black">
          <Zap className="h-6 w-6 text-white" />
        </div>
        <div>
          <div className="font-black text-lg text-black">2400+</div>
          <div className="text-xs text-gray-600">успішних учасниць</div>
        </div>
      </div>
    </div>
  );
}
