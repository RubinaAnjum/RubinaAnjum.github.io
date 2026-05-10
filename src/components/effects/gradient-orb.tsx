import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  color?: "cyan" | "violet" | "pink" | "emerald";
  size?: number;
};

const colorMap = {
  cyan: "rgba(34, 211, 238, 0.45)",
  violet: "rgba(168, 85, 247, 0.5)",
  pink: "rgba(236, 72, 153, 0.45)",
  emerald: "rgba(16, 185, 129, 0.45)",
};

export function GradientOrb({ className, color = "violet", size = 480 }: Props) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute rounded-full blur-3xl animate-pulse-soft", className)}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 50% 50%, ${colorMap[color]} 0%, transparent 65%)`,
      }}
    />
  );
}
