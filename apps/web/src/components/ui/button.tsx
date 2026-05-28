import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-hsl-[var(--neon-green)] text-[#0a0c14] hover:opacity-90 glow-green",
        neon:
          "border border-[hsl(var(--neon-green))] text-[hsl(var(--neon-green))] bg-[hsl(var(--neon-green)/0.1)] hover:bg-[hsl(var(--neon-green)/0.2)] glow-green",
        "neon-blue":
          "border border-[hsl(var(--neon-blue))] text-[hsl(var(--neon-blue))] bg-[hsl(var(--neon-blue)/0.1)] hover:bg-[hsl(var(--neon-blue)/0.2)] glow-blue",
        "neon-purple":
          "border border-[hsl(var(--neon-purple))] text-[hsl(var(--neon-purple))] bg-[hsl(var(--neon-purple)/0.1)] hover:bg-[hsl(var(--neon-purple)/0.2)] glow-purple",
        ghost:
          "text-[hsl(var(--foreground-muted))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--background-elevated))]",
        destructive:
          "border border-[hsl(var(--danger))] text-[hsl(var(--danger))] bg-[hsl(var(--danger)/0.1)] hover:bg-[hsl(var(--danger)/0.2)]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "neon",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
