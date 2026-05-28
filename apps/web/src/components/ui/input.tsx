import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background-alt))] px-3 py-2",
        "text-sm text-[hsl(var(--foreground))] font-mono",
        "placeholder:text-[hsl(var(--foreground-subtle))]",
        "transition-all duration-200",
        "focus:outline-none focus:border-[hsl(var(--neon-blue))] focus:ring-1 focus:ring-[hsl(var(--neon-blue)/0.3)]",
        "hover:border-[hsl(var(--border-bright))]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
