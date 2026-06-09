"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

type Variant = "primary" | "outline";

const base =
  "inline-flex w-full items-center justify-center rounded-full px-7 py-4 text-base font-semibold select-none disabled:opacity-70 disabled:cursor-not-allowed";

const styles: Record<Variant, string> = {
  primary: "cta",
  outline: "cta-outline",
};

type Props = {
  planId: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

export function CheckoutButton({
  planId,
  variant = "primary",
  className = "",
  children,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const data = (await res.json()) as { pageUrl?: string; error?: string };
      if (!res.ok || !data.pageUrl) {
        throw new Error(data.error ?? "Помилка оплати");
      }
      window.location.href = data.pageUrl;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Помилка оплати");
      setLoading(false);
    }
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={`${base} ${styles[variant]}`}
      >
        <span className="cta-label inline-flex items-center gap-2">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {children}
        </span>
      </button>
      {error && <p className="text-center text-sm text-coral">{error}</p>}
    </div>
  );
}
