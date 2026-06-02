import Link, { type LinkProps } from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline";

const base =
  "inline-flex w-full items-center justify-center gap-2 px-7 py-4 text-base font-bold transition-all duration-200 select-none uppercase tracking-tight";

const styles: Record<Variant, string> = {
  primary: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg hover:shadow-xl hover:-translate-y-0.5",
  outline: "border-2 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-emerald-400",
};

type Props = LinkProps & {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: Props) {
  return (
    <Link className={`${base} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </Link>
  );
}
