import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-md border px-2.5 py-0.5 text-xs font-semibold tracking-wider uppercase transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-[hsl(var(--neon-green))] bg-[hsl(var(--neon-green)/0.15)] text-[hsl(var(--neon-green))]",
        blue:
          "border-[hsl(var(--neon-blue))] bg-[hsl(var(--neon-blue)/0.15)] text-[hsl(var(--neon-blue))]",
        purple:
          "border-[hsl(var(--neon-purple))] bg-[hsl(var(--neon-purple)/0.15)] text-[hsl(var(--neon-purple))]",
        amber:
          "border-[hsl(var(--neon-amber))] bg-[hsl(var(--neon-amber)/0.15)] text-[hsl(var(--neon-amber))]",
        danger:
          "border-[hsl(var(--danger))] bg-[hsl(var(--danger)/0.15)] text-[hsl(var(--danger))]",
        muted:
          "border-[hsl(var(--border))] bg-[hsl(var(--background-elevated))] text-[hsl(var(--foreground-muted))]",
        live:
          "border-red-500 bg-red-500/15 text-red-400 animate-pulse-neon",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
