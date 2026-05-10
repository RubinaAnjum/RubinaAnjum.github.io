"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Layers, Network, Shield, Zap } from "lucide-react";
import { profile, type TraitIcon } from "@/content/profile";
import { GradientOrb } from "@/components/effects/gradient-orb";
import { SectionHeader } from "@/components/sections/section-header";

const traitIconMap: Record<TraitIcon, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  Zap,
  Shield,
  Layers,
  Network,
};

function StatCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="text-gradient text-4xl sm:text-5xl font-semibold tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

export function About() {
  const stats = [
    { label: "Years of Experience", value: profile.yearsOfExperience, suffix: "+" },
    { label: "Projects Completed", value: profile.projectsCompleted, suffix: "+" },
    { label: "Technologies Mastered", value: profile.technologiesMastered, suffix: "+" },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <GradientOrb className="-left-32 top-1/4" color="cyan" size={420} />
      <GradientOrb className="-right-32 bottom-1/4" color="pink" size={420} />

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="About"
          title={
            <>
              Engineer who turns{" "}
              <span className="text-gradient">complex systems</span> into shipped products.
            </>
          }
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3 space-y-5 text-base sm:text-lg leading-relaxed text-muted-foreground"
          >
            {profile.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}

            <div className="pt-4 flex flex-wrap gap-2">
              {profile.traits.map((t, i) => {
                const Icon = traitIconMap[t.icon];
                return (
                  <motion.span
                    key={t.label}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="group inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium text-foreground hover:border-cyan/40 hover:text-cyan transition-colors"
                  >
                    <Icon size={13} strokeWidth={2} />
                    {t.label}
                  </motion.span>
                );
              })}
            </div>
          </motion.div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-2xl glass p-6 hover:border-cyan/30 transition-all duration-500 hover:-translate-y-0.5 hover:glass-frosted"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-cyan/30 to-violet/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <StatCounter value={s.value} suffix={s.suffix} />
                <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
