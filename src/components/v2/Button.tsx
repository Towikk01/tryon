import Link, { type LinkProps } from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline";

const base =
  "inline-flex w-full items-center justify-center gap-2 rounded-lg px-7 py-4 text-base font-semibold transition-colors duration-200 select-none";

const styles: Record<Variant, string> = {
  primary: "bg-black text-white hover:bg-gray-900",
  outline: "border-2 border-black text-black hover:bg-black hover:text-white",
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
