"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, X } from "lucide-react";
import { track, planById, planParams } from "@/lib/metaPixel";

type Variant = "primary" | "outline";

const base =
  "inline-flex w-full items-center justify-center rounded-full px-7 py-4 text-base font-semibold select-none disabled:opacity-70 disabled:cursor-not-allowed";

const styles: Record<Variant, string> = {
  primary: "cta",
  outline: "cta-outline",
};

type Props = {
  planId: string;
  planName?: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function CheckoutButton({
  planId,
  planName,
  variant = "primary",
  className = "",
  children,
}: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && !loading) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    const t = setTimeout(() => firstFieldRef.current?.focus(), 50);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [open, loading]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (name.trim().length < 2) return setError("Вкажіть ім'я");
    if (!EMAIL_RE.test(email.trim())) return setError("Некоректний email");
    if (phone.replace(/\D/g, "").length < 10)
      return setError("Некоректний номер телефону");

    setLoading(true);
    // Людина обрала тариф і йде на оплату — саме тут InitiateCheckout.
    const plan = planById(planId);
    track("InitiateCheckout", plan ? planParams(plan) : undefined);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
        }),
      });
      const data = (await res.json()) as { pageUrl?: string; error?: string };
      if (!res.ok || !data.pageUrl) {
        throw new Error(data.error ?? "Помилка оплати");
      }
      window.location.href = data.pageUrl;
    } catch (e2) {
      setError(e2 instanceof Error ? e2.message : "Помилка оплати");
      setLoading(false);
    }
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`${base} ${styles[variant]}`}
      >
        <span className="cta-label inline-flex items-center gap-2">
          {children}
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-label="Оформлення замовлення"
          onClick={() => {
            if (!loading) setOpen(false);
          }}
        >
          <div
            className="theme-blush w-full max-w-md rounded-t-[2rem] bg-cream p-6 text-ink shadow-2xl sm:rounded-[2rem] sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-extrabold tracking-tight">
                  Оформлення{planName ? ` · ${planName}` : ""}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  Залиш контакти — на них надішлемо доступ до курсу.
                </p>
              </div>
              <button
                type="button"
                onClick={() => !loading && setOpen(false)}
                aria-label="Закрити"
                className="shrink-0 rounded-full p-1.5 text-muted hover:bg-white hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
              <Field label="Ім'я">
                <input
                  ref={firstFieldRef}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  maxLength={100}
                  placeholder="Ваше ім'я"
                  className="field"
                  required
                />
              </Field>
              <Field label="Email">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  maxLength={254}
                  inputMode="email"
                  placeholder="you@email.com"
                  className="field"
                  required
                />
              </Field>
              <Field label="Телефон">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                  maxLength={30}
                  inputMode="tel"
                  placeholder="+380 __ ___ __ __"
                  className="field"
                  required
                />
              </Field>

              {error && <p className="text-sm text-coral">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className={`${base} cta mt-2`}
              >
                <span className="cta-label inline-flex items-center gap-2">
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  Перейти до оплати
                </span>
              </button>

              <p className="mt-1 text-center text-xs leading-relaxed text-muted">
                Натискаючи «Перейти до оплати», ви погоджуєтесь з{" "}
                <a href="/oferta" target="_blank" className="underline hover:text-coral">
                  Публічною офертою
                </a>{" "}
                та{" "}
                <a
                  href="/polityka-konfidentsiynosti"
                  target="_blank"
                  className="underline hover:text-coral"
                >
                  Політикою конфіденційності
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-left">
      <span className="text-sm font-medium text-ink-soft">{label}</span>
      {children}
    </label>
  );
}
