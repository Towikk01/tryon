import Link from "next/link";
import { Send } from "lucide-react";
import { InstagramIcon, YoutubeIcon } from "../ui/BrandIcons";
import { Logo } from "../ui/Logo";
import { navLinks } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-gray-600">
              30-денний онлайн-курс для жінок 25–40. Тренування вдома, без
              жорстких дієт, з підтримкою кураторки і спільноти.
            </p>
          </div>

          <nav>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
              Навігація
            </h4>
            <ul className="mt-5 flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-black transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
              Контакти
            </h4>
            <ul className="mt-5 flex flex-col gap-3">
              <li>
                <a
                  href="mailto:hello@fitflow.ua"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  hello@fitflow.ua
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/fitflow_ua"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  Telegram-бот
                </a>
              </li>
            </ul>

            <div className="mt-6 flex gap-3">
              <a
                href="https://instagram.com/olenafitflow"
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-black hover:bg-black hover:text-white transition-colors"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-black hover:bg-black hover:text-white transition-colors"
              >
                <YoutubeIcon className="h-4 w-4" />
              </a>
              <a
                href="https://t.me/fitflow_ua"
                aria-label="Telegram"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-black hover:bg-black hover:text-white transition-colors"
              >
                <Send className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-10 text-center text-xs text-gray-500">
          <p>© {year} fitflow · Усі права захищені</p>
        </div>
      </div>
    </footer>
  );
}
