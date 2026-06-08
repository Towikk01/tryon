import Link, { type LinkProps } from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline";

const base =
  "inline-flex w-full items-center justify-center rounded-full px-7 py-4 text-base font-semibold select-none";

const styles: Record<Variant, string> = {
  primary: "cta",
  outline: "cta-outline",
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
      <span className="cta-label">{children}</span>
    </Link>
  );
}
