import Link from "next/link";
import { Send } from "lucide-react";
import { InstagramIcon, YoutubeIcon } from "../ui/BrandIcons";
import { Logo } from "../ui/Logo";
import { navLinks } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-cream">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-3 font-display text-base italic text-coral">Спробуй на собі</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Онлайн-курс для жінок та дівчат, тренування в зручному форматі, без
              жорстких дієт та навантажень, з турботою про Ваше здоров&apos;я.
            </p>
          </div>

          <nav>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Навігація
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-soft hover:text-coral transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Контакти
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <a
                  href="mailto:tryon160325@gmail.com"
                  className="text-sm text-ink-soft hover:text-coral transition-colors"
                >
                  tryon160325@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/tryon_ua"
                  className="text-sm text-ink-soft hover:text-coral transition-colors"
                >
                  Telegram-бот
                </a>
              </li>
            </ul>

            <div className="mt-5 flex gap-3">
              <a
                href="https://www.instagram.com/zubova_yana_"
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-paleblue-soft text-ink hover:bg-coral hover:text-white transition-colors"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-paleblue-soft text-ink hover:bg-coral hover:text-white transition-colors"
              >
                <YoutubeIcon className="h-4 w-4" />
              </a>
              <a
                href="https://t.me/tryon_ua"
                aria-label="Telegram"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-paleblue-soft text-ink hover:bg-coral hover:text-white transition-colors"
              >
                <Send className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-line pt-8 text-center text-xs text-muted">
          <p>© {year} TryOn · Усі права захищені</p>
        </div>
      </div>
    </footer>
  );
}
