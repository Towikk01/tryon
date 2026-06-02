import Image from "next/image";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "../Button";
import { heroChips } from "@/lib/data";
import heroPhoto1 from "@/images/hm.jpeg";
import heroPhoto2 from "@/images/03a06362-1a2a-41e4-bd22-c62280d50855.jpeg";

export function Hero() {
  return (
    <section id="top" className="relative bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden pt-8 pb-20 sm:pt-12">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-400 blur-3xl rounded-full" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8 relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.18em] text-emerald-400 mb-6">
              <span aria-hidden className="text-emerald-400">//</span>
              <span>Програма на 30 днів</span>
            </p>

            <h1 className="text-6xl font-black leading-[0.9] tracking-tight text-white sm:text-7xl lg:text-8xl">
              Стань
              <br />
              <span className="text-emerald-500">СИЛЬНІШОЮ</span>
            </h1>

            <p className="mt-8 max-w-lg text-lg leading-relaxed text-gray-200">
              Інтенсивні тренування вдома. Програма для зайнятих українок
              <span className="font-bold text-orange-500"> 25–40</span>: 20–30 хв на день,
              без залу, без жорстких дієт.
            </p>

            <ul className="mt-8 flex flex-col gap-3">
              {heroChips.map((chip) => (
                <li key={chip} className="flex items-center gap-3 text-sm font-bold text-gray-100 uppercase tracking-wide">
                  <span className="inline-flex h-5 w-5 items-center justify-center bg-emerald-500 text-white text-xs font-bold">
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
      <div className="absolute -top-8 -right-8 h-32 w-32 bg-emerald-500/20 rounded-3xl" />
      <div className="relative grid grid-cols-2 gap-4">
        <div className="relative overflow-hidden rounded-3xl bg-gray-700 pt-[125%]">
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

      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 border-2 border-emerald-500 rounded-lg shadow-2xl p-5 flex items-center gap-4 w-fit">
        <div className="inline-flex h-12 w-12 items-center justify-center bg-emerald-500">
          <Zap className="h-6 w-6 text-white font-bold" />
        </div>
        <div>
          <div className="font-black text-lg text-emerald-400">2400+</div>
          <div className="text-xs text-gray-300 font-bold">успішних учасниць</div>
        </div>
      </div>
    </div>
  );
}
