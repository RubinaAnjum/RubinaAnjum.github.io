import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 select-none whitespace-nowrap",
  {
    variants: {
      variant: {
        primary:
          "text-background bg-gradient-to-r from-cyan via-violet to-pink shadow-[0_0_30px_-5px_rgba(168,85,247,0.6)] hover:shadow-[0_0_40px_-2px_rgba(34,211,238,0.7)] hover:-translate-y-0.5",
        outline:
          "glass text-foreground hover:border-cyan/40 hover:text-cyan hover:-translate-y-0.5 hover:shadow-[0_0_24px_-6px_rgba(34,211,238,0.5)]",
        ghost:
          "text-muted-foreground hover:text-foreground hover:bg-white/5",
        icon: "glass text-muted-foreground hover:text-cyan hover:border-cyan/40 hover:shadow-[0_0_20px_-4px_rgba(34,211,238,0.5)]",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { buttonVariants };
