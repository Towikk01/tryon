import Image from "next/image";
import { InstagramIcon, YoutubeIcon } from "../../ui/BrandIcons";
import { Eyebrow } from "../../ui/Eyebrow";
import { trainerStats } from "@/lib/data";
import agentsPhoto from "@/images/AGENTS.jpeg";

export function Trainer() {
  return (
    <section id="trainer" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div className="absolute -inset-3 -z-10 rounded-[2.5rem] bg-paleblue-soft" />
            <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-slate-900">
              <Image
                src={agentsPhoto}
                alt="Яна Зубова"
                fill
                sizes="(max-width: 1024px) 60vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-center p-8 text-white/90">
                <span className="text-xs font-medium uppercase tracking-[0.2em]">
                  Фото тренера
                </span>
              </div>
            </div>
          </div>

          <div>
            <Eyebrow>Твій тренер</Eyebrow>
            <h2 className="mt-4 text-5xl font-extrabold leading-[1] tracking-tight text-ink sm:text-6xl">
              Яна
              <br />
              <span className="font-display font-bold italic text-coral">
                Зубова
              </span>
            </h2>

            <p className="mt-7 max-w-lg text-lg leading-relaxed text-ink-soft">
              Сертифікований фітнес-тренер з 8 роками досвіду. Магістр з
              кінезіології, спеціаліст з жіночого здоров&apos;я. Мама двох
              дітей — розуміє зайнятість зсередини.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {trainerStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-paleblue-soft px-5 py-4"
                >
                  <div className="font-display text-3xl font-bold italic text-coral">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-ink-soft">{stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-6 text-ink-soft">
              <a
                href="https://instagram.com/olenatryon"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium hover:text-coral transition-colors"
              >
                <InstagramIcon className="h-4 w-4" />
                @olenatryon
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-medium hover:text-coral transition-colors"
              >
                <YoutubeIcon className="h-4 w-4" />
                TryOn UA
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
