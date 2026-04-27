import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: number;
}

/**
 * Skillarc mark — an anvil-meets-circuit-node glyph rendered as a
 * monoline SVG. Picks up the brand orange via `currentColor`.
 */
export function Logo({ className, size = 22 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-accent", className)}
      aria-hidden
    >
      {/* anvil base */}
      <path d="M3 16h13a3 3 0 0 0 3-3v-1" />
      <path d="M5 16v3h12v-3" />
      {/* anvil horn */}
      <path d="M19 12h2" />
      {/* circuit node above */}
      <circle cx="12" cy="6" r="2.2" />
      <path d="M12 8.2v3.6" />
      <path d="M9.6 6h-2" />
      <path d="M16.4 6h-2" />
      {/* spark */}
      <path
        d="M12 3.2v.6M10.4 4l.4.4M13.6 4l-.4.4"
        className="text-accent-soft"
        stroke="currentColor"
      />
    </svg>
  );
}
