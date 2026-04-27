import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: number;
}

/**
 * Skillarc mark — layered hex + node motif representing modular
 * AI building blocks and connected workflows.
 */
export function Logo({ className, size = 22 }: LogoProps) {
  return (
    <Image
      src="/icons/skillarc-logo.png"
      alt="SkillArc logo"
      width={size}
      height={size}
      className={cn("rounded-sm object-contain", className)}
      unoptimized
    />
  );
}
