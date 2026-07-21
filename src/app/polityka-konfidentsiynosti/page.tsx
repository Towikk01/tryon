import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Політика конфіденційності — TryOn",
  description:
    "Політика конфіденційності TryOn: які персональні дані ми збираємо, з якою метою та як їх захищаємо.",
};

export default function PrivacyPage() {
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
          Політика конфіденційності
        </h1>
        <p className="mt-2 text-sm text-muted">
          Редакція від 21 липня 2026 року.
        </p>

        <div className="legal mt-8 flex flex-col gap-5 text-ink-soft">
          <p>
            Ця Політика описує, як онлайн-курс «TryOn» (Сайт{" "}
            <a href="https://tryon.business" className="link">
              tryon.business
            </a>
            , далі — «ми») збирає, використовує та захищає персональні дані
            користувачів. Володільцем даних є власник проєкту «TryOn» (сайт{" "}
            <a href="https://tryon.business" className="link">
              tryon.business
            </a>
            ).
          </p>

          <Section title="1. Які дані ми збираємо">
            <p>
              Під час оформлення замовлення ми збираємо: <strong>ім’я</strong>,{" "}
              <strong>email</strong> та <strong>номер телефону</strong>. Під час
              оплати платіжні дані (номер картки тощо) обробляються
              безпосередньо платіжним сервісом Monobank — ми до них доступу{" "}
              <strong>не маємо</strong> і їх не зберігаємо. Також автоматично
              можуть збиратися знеособлені технічні дані (тип пристрою,
              аналітика відвідувань).
            </p>
          </Section>

          <Section title="2. З якою метою">
            <p>
              Дані використовуються для: надання доступу до Курсу та зв’язку щодо
              замовлення; технічної підтримки; інформаційних та маркетингових
              розсилок про Курс і оновлення (за наявності вашої згоди). Ви можете
              відмовитися від розсилок у будь-який момент.
            </p>
          </Section>

          <Section title="3. Правова підстава">
            <p>
              Обробка здійснюється на підставі вашої згоди (наданої при
              оформленні замовлення) та для виконання договору про надання
              доступу до Курсу.
            </p>
          </Section>

          <Section title="4. Кому ми передаємо дані">
            <p>
              Ми не продаємо ваші дані. Дані можуть оброблятися нашими
              сервіс-провайдерами виключно для роботи сервісу: Monobank (обробка
              оплат), Telegram (доставка доступу та підтримка), а також
              хостинг-платформа та сервіс веб-аналітики. Кожен із них обробляє
              дані відповідно до власних політик.
            </p>
          </Section>

          <Section title="5. Зберігання та захист">
            <p>
              Контактні дані зберігаються рівно стільки, скільки потрібно для
              зазначених цілей, після чого видаляються або знеособлюються. Ми
              вживаємо організаційних і технічних заходів для захисту даних від
              несанкціонованого доступу.
            </p>
          </Section>

          <Section title="6. Ваші права">
            <p>
              Ви маєте право отримати доступ до своїх даних, вимагати їх
              виправлення або видалення, а також відкликати згоду на обробку. Для
              цього напишіть нам на контакти нижче.
            </p>
          </Section>

          <Section title="7. Файли cookie та аналітика">
            <p>
              Сайт може використовувати файли cookie та інструменти аналітики для
              покращення роботи та вимірювання ефективності реклами. Ви можете
              керувати cookie в налаштуваннях свого браузера.
            </p>
          </Section>

          <Section title="8. Контакти">
            <p>
              З питань обробки персональних даних:
              <br />
              Email:{" "}
              <a href="mailto:tryon160325@gmail.com" className="link">
                tryon160325@gmail.com
              </a>
              <br />
              Telegram:{" "}
              <a href="https://t.me/TryOnFitFlowBot" className="link">
                @TryOnFitFlowBot
              </a>
            </p>
          </Section>
        </div>

        <div className="mt-10 flex flex-wrap gap-4 border-t border-line pt-6 text-sm">
          <Link href="/oferta" className="link">
            Публічна оферта
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
