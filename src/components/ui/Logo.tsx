import Image from "next/image";
import logo from "@/images/tryon-logo.png";

type LogoProps = {
  className?: string;
};

export function Logo({ className = "" }: LogoProps) {
  return (
    <Image
      src={logo}
      alt="TryOn — Спробуй на собі"
      priority
      sizes="120px"
      className={`h-8 w-auto sm:h-9 ${className}`}
    />
  );
}
