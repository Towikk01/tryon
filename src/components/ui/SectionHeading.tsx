type SectionHeadingProps = {
  sans: string;
  italic: string;
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({
  sans,
  italic,
  as = "h2",
  className = "",
}: SectionHeadingProps) {
  const Tag = as;
  const sizes =
    as === "h1"
      ? "text-5xl sm:text-6xl leading-[0.95]"
      : "text-4xl sm:text-5xl leading-[1.02]";

  return (
    <Tag
      className={`font-extrabold tracking-tight text-ink ${sizes} ${className}`}
    >
      {sans}{" "}
      <span className="font-display font-bold italic text-coral">
        {italic}
      </span>
    </Tag>
  );
}
