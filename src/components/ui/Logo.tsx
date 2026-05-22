type LogoProps = {
  className?: string;
};

export function Logo({ className = "" }: LogoProps) {
  return (
    <span
      className={`inline-flex items-baseline text-2xl font-extrabold tracking-tight text-ink ${className}`}
    >
      fit
      <span className="text-coral">flow</span>
      <span className="ml-0.5 text-coral">.</span>
    </span>
  );
}
