import {
  Info,
  TriangleAlert,
  CircleAlert,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CalloutVariant = "info" | "tip" | "warning" | "danger";

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: ReactNode;
  className?: string;
}

const VARIANT_STYLES: Record<
  CalloutVariant,
  { icon: LucideIcon; ring: string; iconColor: string; bg: string }
> = {
  info: {
    icon: Info,
    ring: "border-info/40",
    iconColor: "text-info",
    bg: "bg-info/5",
  },
  tip: {
    icon: Lightbulb,
    ring: "border-success/40",
    iconColor: "text-success",
    bg: "bg-success/5",
  },
  warning: {
    icon: TriangleAlert,
    ring: "border-warning/40",
    iconColor: "text-warning",
    bg: "bg-warning/5",
  },
  danger: {
    icon: CircleAlert,
    ring: "border-destructive/40",
    iconColor: "text-destructive",
    bg: "bg-destructive/5",
  },
};

/**
 * Boxed call-out used inline in MDX prose. Visual style matches shadcn's
 * documentation alerts (icon + tinted ring + soft background).
 */
export function Callout({
  variant = "info",
  title,
  children,
  className,
}: CalloutProps) {
  const style = VARIANT_STYLES[variant];
  const Icon = style.icon;

  return (
    <div
      role="note"
      className={cn(
        "my-6 flex gap-3 rounded-md border px-4 py-3 text-sm",
        style.ring,
        style.bg,
        className,
      )}
    >
      <Icon
        aria-hidden
        className={cn("mt-0.5 h-4 w-4 shrink-0", style.iconColor)}
      />
      <div className="min-w-0 flex-1 space-y-1">
        {title && <p className="font-medium text-foreground">{title}</p>}
        <div className="text-muted-foreground [&>p]:m-0 [&>p+p]:mt-2">
          {children}
        </div>
      </div>
    </div>
  );
}
