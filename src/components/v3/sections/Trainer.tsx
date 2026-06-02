import Image from "next/image";
import { InstagramIcon, YoutubeIcon } from "../../ui/BrandIcons";
import { trainerStats } from "@/lib/data";
import agentsPhoto from "@/images/AGENTS.jpeg";

export function Trainer() {
  return (
    <section id="trainer" className="bg-gray-800/50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div className="absolute -inset-3 -z-10 border-4 border-emerald-500" />
            <div className="relative aspect-3/4 overflow-hidden rounded-3xl bg-slate-900 border-4 border-emerald-500">
              <Image
                src={agentsPhoto}
                alt="Яна Зубова"
                fill
                sizes="(max-width: 1024px) 60vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-center p-8 text-white/90">
                <span className="text-xs font-black uppercase tracking-[0.2em]">
                  Твій тренер
                </span>
              </div>
            </div>
          </div>

          <div>
            <p className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.18em] text-emerald-400">
              <span aria-hidden="true" className="text-emerald-400">{'//'}</span>
              <span>Хто тебе навчатиме</span>
            </p>
            <h2 className="mt-4 text-5xl font-black leading-none tracking-tight text-white sm:text-6xl">
              Яна
              <br />
              <span className="text-emerald-500">
                Зубова
              </span>
            </h2>

            <p className="mt-7 max-w-lg text-lg leading-relaxed text-gray-300">
              Сертифікований фітнес-тренер з 8 роками досвіду. Магістр з
              кінезіології, спеціаліст з жіночого здоров&apos;я. Мама двох
              дітей — розуміє зайнятість зсередини.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {trainerStats.map((stat) => (
                <div
                  key={stat.label}
                  className="border-2 border-emerald-500 bg-gray-900 px-5 py-4"
                >
                  <div className="text-3xl font-black text-emerald-400">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-gray-300 font-bold uppercase tracking-wide">{stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-6 text-gray-300">
              <a
                href="https://instagram.com/olenafitflow"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold hover:text-emerald-400 transition-colors uppercase"
              >
                <InstagramIcon className="h-4 w-4" />
                @olenafitflow
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-bold hover:text-emerald-400 transition-colors uppercase"
              >
                <YoutubeIcon className="h-4 w-4" />
                FitFlow UA
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
