import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Публічна оферта — TryOn",
  description:
    "Публічна оферта (договір публічної оферти) на надання доступу до онлайн-курсу TryOn.",
};

export default function OfertaPage() {
  return (
    <main className="theme-blush min-h-screen bg-cream px-5 py-14 text-ink sm:py-20">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="text-sm font-medium text-muted hover:text-coral"
        >
          ← На головну
        </Link>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Публічна оферта
        </h1>
        <p className="mt-2 text-sm text-muted">
          Договір публічної оферти про надання доступу до онлайн-курсу. Редакція
          від 21 липня 2026 року.
        </p>

        <div className="legal mt-8 flex flex-col gap-5 text-ink-soft">
          <p>
            Цей документ є офіційною публічною пропозицією (офертою) продавця
            онлайн-курсу «TryOn» — власника проєкту та сайту{" "}
            <a href="https://tryon.business" className="link">
              tryon.business
            </a>{" "}
            (далі — «Виконавець») — укласти договір про надання доступу до
            онлайн-курсу «TryOn» на умовах, викладених нижче. Приймаючи цю оферту
            (здійснюючи оплату), фізична особа (далі — «Замовник») погоджується з
            усіма її умовами.
          </p>

          <Section title="1. Терміни">
            <p>
              <strong>Курс</strong> — онлайн-продукт «TryOn»: набір відеотренувань
              та супровідних матеріалів, доступ до яких надається через
              Telegram-бот. <strong>Сайт</strong> —{" "}
              <a href="https://tryon.business" className="link">
                tryon.business
              </a>
              . <strong>Тариф</strong> — обраний Замовником обсяг доступу (Lite,
              Pro або VIP) з відповідною ціною та строком.
            </p>
          </Section>

          <Section title="2. Предмет договору">
            <p>
              Виконавець надає Замовнику доступ до Курсу відповідно до обраного
              Тарифу, а Замовник оплачує цей доступ. Курс має інформаційний
              характер і не є медичною чи реабілітаційною послугою.
            </p>
          </Section>

          <Section title="3. Тарифи та оплата">
            <p>
              Актуальні Тарифи та ціни опубліковані на Сайті в розділі «Тарифи».
              Оплата здійснюється онлайн через платіжний сервіс Monobank
              (еквайринг). Договір вважається укладеним з моменту успішної
              оплати.
            </p>
          </Section>

          <Section title="4. Порядок надання доступу">
            <p>
              Після успішної оплати Замовник автоматично отримує персональне
              посилання для доступу до Курсу в Telegram — на сторінці подяки та/або
              одразу після переходу в бот. Зазвичай доступ надається протягом
              кількох хвилин. Якщо доступ не надійшов — Замовник звертається до
              підтримки (контакти нижче), і доступ надається вручну.
            </p>
          </Section>

          <Section title="5. Строк доступу">
            <p>
              Строк доступу визначається обраним Тарифом (наприклад, 30 або 90
              днів) і відраховується з моменту надання доступу.
            </p>
          </Section>

          <Section title="6. Повернення коштів">
            <p>
              Замовник має право на повернення коштів протягом{" "}
              <strong>7 днів</strong> з моменту оплати, звернувшись до підтримки
              за контактами нижче. Оскільки Курс є цифровим контентом, після
              спливу цього строку або після суттєвого використання матеріалів
              повернення коштів не здійснюється, крім випадків, передбачених
              чинним законодавством України.
            </p>
          </Section>

          <Section title="7. Права та обов’язки">
            <p>
              Замовник зобов’язується не передавати доступ третім особам, не
              копіювати та не поширювати матеріали Курсу. Усі матеріали є
              об’єктом інтелектуальної власності Виконавця. Виконавець
              зобов’язується надати доступ до Курсу згідно з обраним Тарифом.
            </p>
          </Section>

          <Section title="8. Відповідальність">
            <p>
              Замовник самостійно відповідає за стан свого здоров’я. Перед
              початком тренувань рекомендується проконсультуватися з лікарем.
              Виконавець не несе відповідальності за наслідки неправильного
              виконання вправ.
            </p>
          </Section>

          <Section title="9. Контакти">
            <p>
              Проєкт «TryOn»
              <br />
              Сайт:{" "}
              <a href="https://tryon.business" className="link">
                tryon.business
              </a>
              <br />
              Email:{" "}
              <a href="mailto:tryon160325@gmail.com" className="link">
                tryon160325@gmail.com
              </a>
              <br />
              Telegram:{" "}
              <a href="https://t.me/tryon_ua" className="link">
                @tryon_ua
              </a>
            </p>
          </Section>
        </div>

        <div className="mt-10 flex flex-wrap gap-4 border-t border-line pt-6 text-sm">
          <Link href="/polityka-konfidentsiynosti" className="link">
            Політика конфіденційності
          </Link>
          <Link href="/" className="text-muted hover:text-coral">
            ← На головну
          </Link>
        </div>
      </article>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-lg font-bold text-ink">{title}</h2>
      {children}
    </section>
  );
}
