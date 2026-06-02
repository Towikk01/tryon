import Image from "next/image";
import { InstagramIcon, YoutubeIcon } from "../../ui/BrandIcons";
import { Eyebrow } from "../../ui/Eyebrow";
import { trainerStats } from "@/lib/data";
import agentsPhoto from "@/images/AGENTS.jpeg";

export function Trainer() {
  return (
    <section id="trainer" className="bg-gray-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <Eyebrow>Твій тренер</Eyebrow>
            <h2 className="mt-6 text-6xl font-black leading-[1] tracking-tight text-black sm:text-7xl">
              Яна
              <br />
              Зубова
            </h2>

            <p className="mt-8 max-w-lg text-lg leading-relaxed text-gray-600">
              Сертифікований фітнес-тренер з 8 роками досвіду. Магістр з
              кінезіології, спеціаліст з жіночого здоров&apos;я. Розуміє, що
              означає бути зайнятою мамою.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4">
              {trainerStats.map((stat) => (
                <div key={stat.label} className="border-l-4 border-black pl-4">
                  <div className="font-black text-3xl text-black">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 text-gray-600">
              <a
                href="https://instagram.com/olenafitflow"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-sm font-semibold hover:text-black transition-colors w-fit"
              >
                <InstagramIcon className="h-5 w-5" />
                @olenafitflow
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-3 text-sm font-semibold hover:text-black transition-colors w-fit"
              >
                <YoutubeIcon className="h-5 w-5" />
                FitFlow UA
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-black/5" />
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-gray-300">
              <Image
                src={agentsPhoto}
                alt="Яна Зубова"
                fill
                sizes="(max-width: 1024px) 60vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
