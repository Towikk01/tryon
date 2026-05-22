type EyebrowProps = {
  children: React.ReactNode;
  variant?: "dash" | "slash";
  className?: string;
};

export function Eyebrow({
  children,
  variant = "slash",
  className = "",
}: EyebrowProps) {
  return (
    <p
      className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft ${className}`}
    >
      {variant === "dash" ? (
        <span aria-hidden className="h-px w-8 bg-ink" />
      ) : (
        <span aria-hidden className="text-coral">//</span>
      )}
      <span>{children}</span>
    </p>
  );
}
