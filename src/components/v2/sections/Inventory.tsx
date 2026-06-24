import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { Send } from "lucide-react";
import { Eyebrow } from "../../ui/Eyebrow";
import { SectionHeading } from "../../ui/SectionHeading";
import bodybar from "@/images/bodybar.jpeg";
import carpet from "@/images/carpet.jpeg";
import gantel from "@/images/gantel.jpeg";
import fitboll from "@/images/fitboll.jpeg";
import expander from "@/images/expander.jpeg";

const TRAINER_TG = "https://t.me/Zubova_Yana_U";

const items: { img: StaticImageData; label: string }[] = [
  { img: bodybar, label: "Тренажер-бодібар" },
  { img: carpet, label: "Килимок" },
  { img: gantel, label: "Гантелі" },
  { img: fitboll, label: "Фітбол" },
  { img: expander, label: "Еспандер-резинка" },
];

export function Inventory() {
  return (
    <section id="inventory" className="relative py-12 sm:py-20">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Eyebrow>Інвентар</Eyebrow>
        <SectionHeading
          sans="Що знадобиться"
          italic="на тренуваннях"
          className="mt-4"
        />
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          Мінімальний набір для занять удома. Усе можна придбати або замінити на
          схоже — напиши тренеру, і вона підкаже.
        </p>

        {/* Мобілка — горизонтальна карусель зі снапом (видно «хвостик» наступної
            картки), з sm — звичайна сітка. */}
        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:mt-10 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0 lg:grid-cols-5 [&::-webkit-scrollbar]:hidden">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex shrink-0 basis-[44%] snap-start flex-col gap-3 sm:basis-auto"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-white">
                <Image
                  src={item.img}
                  alt={item.label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 44vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>
              <span className="text-center text-sm font-medium leading-snug text-ink-soft">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:mt-10">
          <Link
            href={TRAINER_TG}
            target="_blank"
            rel="noreferrer"
            className="cta inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-semibold"
          >
            <span className="cta-label inline-flex items-center gap-2">
              <Send className="h-5 w-5" />
              Написати тренеру
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
