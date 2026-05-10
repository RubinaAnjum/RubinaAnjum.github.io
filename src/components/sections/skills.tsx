"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Cpu,
  Database,
  Layout,
  Plug,
  Server,
  Wrench,
} from "lucide-react";
import {
  skillCategories,
  type SkillCategory,
  type SkillTier,
} from "@/content/skills";
import { SectionHeader } from "@/components/sections/section-header";
import { GradientOrb } from "@/components/effects/gradient-orb";
import { cn } from "@/lib/utils";

const iconForTitle: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  Languages: Code2,
  "Backend Frameworks": Server,
  Frontend: Layout,
  "APIs & Integrations": Plug,
  "Databases & Caching": Database,
  "DevOps & Tooling": Wrench,
};

const accent: Record<
  SkillCategory["accent"],
  {
    ring: string;
    text: string;
    glow: string;
    chipCore: string;
    dotCore: string;
    edge: string;
  }
> = {
  cyan: {
    ring: "hover:border-cyan/40",
    text: "text-cyan",
    glow: "from-cyan/30 to-violet/20",
    chipCore: "border-cyan/40 text-foreground",
    dotCore: "bg-cyan shadow-[0_0_10px_rgba(34,211,238,0.9)]",
    edge: "from-cyan via-violet to-transparent",
  },
  violet: {
    ring: "hover:border-violet/40",
    text: "text-violet",
    glow: "from-violet/30 to-pink/20",
    chipCore: "border-violet/40 text-foreground",
    dotCore: "bg-violet shadow-[0_0_10px_rgba(168,85,247,0.9)]",
    edge: "from-violet via-pink to-transparent",
  },
  pink: {
    ring: "hover:border-pink/40",
    text: "text-pink",
    glow: "from-pink/30 to-violet/20",
    chipCore: "border-pink/40 text-foreground",
    dotCore: "bg-pink shadow-[0_0_10px_rgba(236,72,153,0.9)]",
    edge: "from-pink via-violet to-transparent",
  },
  emerald: {
    ring: "hover:border-emerald/40",
    text: "text-emerald",
    glow: "from-emerald/30 to-cyan/20",
    chipCore: "border-emerald/40 text-foreground",
    dotCore: "bg-emerald shadow-[0_0_10px_rgba(16,185,129,0.9)]",
    edge: "from-emerald via-cyan to-transparent",
  },
};

function tierClasses(tier: SkillTier, accentKey: SkillCategory["accent"]) {
  const a = accent[accentKey];
  switch (tier) {
    case "core":
      return {
        chip: cn("border", a.chipCore, "bg-white/[0.04]"),
        dot: cn("h-1.5 w-1.5 rounded-full", a.dotCore),
        text: "text-foreground",
      };
    case "strong":
      return {
        chip: "border border-white/10 bg-white/[0.02] text-foreground/85",
        dot: "h-1.5 w-1.5 rounded-full bg-white/40",
        text: "",
      };
    case "familiar":
    default:
      return {
        chip: "border border-dashed border-white/10 bg-transparent text-muted-foreground",
        dot: "h-1.5 w-1.5 rounded-full ring-1 ring-white/30 ring-inset",
        text: "",
      };
  }
}

export function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <GradientOrb className="left-1/2 -translate-x-1/2 top-12" color="violet" size={520} />

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Skills"
          title={
            <>
              A stack built for <span className="text-gradient">production</span>.
            </>
          }
          description="No percentage bars — they all lie a little. Here's the honest version: what I reach for daily, what I'm strong on, and what I'm familiar with."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, idx) => {
            const Icon = iconForTitle[cat.title] ?? Cpu;
            const a = accent[cat.accent];

            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-2xl glass p-6 transition-all duration-500 hover:-translate-y-1 hover:glass-frosted",
                  a.ring,
                )}
              >
                <div
                  className={cn(
                    "absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-opacity bg-gradient-to-br",
                    a.glow,
                  )}
                />

                <div className="relative flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "inline-flex h-10 w-10 items-center justify-center rounded-xl glass-strong",
                        a.text,
                      )}
                    >
                      <Icon size={18} strokeWidth={1.8} />
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight">{cat.title}</h3>
                  </div>
                  {cat.badge && (
                    <span
                      className={cn(
                        "shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em]",
                        a.text,
                      )}
                    >
                      {cat.badge}
                    </span>
                  )}
                </div>

                <p className="relative mt-3 text-sm text-muted-foreground">{cat.description}</p>

                <ul className="relative mt-5 flex flex-wrap gap-1.5">
                  {cat.skills.map((s, i) => {
                    const t = tierClasses(s.tier, cat.accent);
                    return (
                      <motion.li
                        key={s.name}
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{
                          duration: 0.4,
                          delay: 0.12 + i * 0.04,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-medium transition-colors",
                          t.chip,
                        )}
                      >
                        <span className={t.dot} aria-hidden />
                        {s.name}
                      </motion.li>
                    );
                  })}
                </ul>

                <div
                  className={cn(
                    "pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r opacity-40",
                    a.edge,
                  )}
                />
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[11px] text-muted-foreground"
        >
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
            <span className="uppercase tracking-[0.16em]">Core — daily driver</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
            <span className="uppercase tracking-[0.16em]">Strong — production-ready</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full ring-1 ring-white/30 ring-inset" />
            <span className="uppercase tracking-[0.16em]">Familiar — working knowledge</span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
