import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export default function Home() {
  const designs = [
    {
      version: "v1",
      title: "Дизайн 1",
      description: "Класичний, теплий та привітний дизайн з коралевим акцентом. Ідеально для класичного підходу.",
      colors: "Коралевий + бежевий",
      fonts: "Inter + Playfair",
      features: ["Мвм дизайн", "Теплі кольори", "Класичні закруглені кути"],
    },
    {
      version: "v2",
      title: "Дизайн 2",
      description: "Сучасний мінімалістичний дизайн з чорним як основним кольором. Для тих, хто любить контрасти.",
      colors: "Чорний + білий",
      fonts: "Sans-serif bold",
      features: ["Мінімалізм", "Чорно-білий", "Сучасний", "Контрастний"],
    },
    {
      version: "v3",
      title: "Дизайн 3",
      description: "Енергичний, сучасний дизайн з темно-синім та яскраво-оранжевим. Для тих, хто шукає сміливості та контрасту.",
      colors: "Індиго + оранжевий",
      fonts: "Sans-serif ultra-bold",
      features: ["Енергичний", "Геометричний", "Темна палітра", "Сучасний"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur sticky top-0 z-50">
        <div className="mx-auto max-w-6xl px-5 py-4 sm:px-8 flex items-center justify-between">
          <Logo />
          <p className="text-sm font-medium text-gray-600">Варіанти дизайну</p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="text-center mb-20">
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-black mb-4">
            Виберіть дизайн
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Три повністю функціональних варіанти одного сайту. Оберіть той, який вам найбільше подобається.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 mb-16">
          {designs.map((design) => (
            <div
              key={design.version}
              className="group rounded-3xl border-2 border-gray-200 bg-white p-8 hover:border-black transition-colors"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-black text-black mb-2">
                    {design.title}
                  </h2>
                  <p className="text-gray-600">{design.version.toUpperCase()}</p>
                </div>
                <div className="text-4xl font-black text-gray-100">
                  {design.version === "v1" ? "①" : design.version === "v2" ? "②" : "③"}
                </div>
              </div>

              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {design.description}
              </p>

              <div className="mb-6 space-y-3">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                    Кольори
                  </h3>
                  <p className="text-gray-700">{design.colors}</p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                    Типографія
                  </h3>
                  <p className="text-gray-700">{design.fonts}</p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                    Особливості
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {design.features.map((feature) => (
                      <li
                        key={feature}
                        className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link
                href={`/${design.version}`}
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors group/btn"
              >
                Переглянути дизайн
                <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

        <div className="rounded-3xl bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-200 p-12">
          <h2 className="text-3xl font-black text-black mb-4">
            💡 Як це працює?
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            Це один і той же сайт з однаковим контентом, але з двома різними дизайнами.
            Обидві версії повністю функціональні та готові до демонстрації клієнту.
          </p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="text-2xl">→</span>
              <span>
                <strong>/v1</strong> — Класичний дизайн з теплими кольорами
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-2xl">→</span>
              <span>
                <strong>/v2</strong> — Мінімалістичний дизайн з чорно-білою палітрою
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-2xl">→</span>
              <span>
                <strong>/v3</strong> — Енергичний дизайн з індиго та оранжевим
              </span>
            </li>
          </ul>
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-white mt-20">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 text-center text-sm text-gray-600">
          <p>© 2026 fitflow · Порівняння варіантів дизайну</p>
        </div>
      </footer>
    </div>
  );
}
