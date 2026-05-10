"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowRight, ExternalLink, Mail, Phone, Sparkles } from "lucide-react";
import { IconGithub, IconLinkedin } from "@/components/icons/brand";
import { GradientOrb } from "@/components/effects/gradient-orb";
import { GlowText } from "@/components/effects/glow-text";
import { MagneticButton } from "@/components/effects/magnetic-button";
import { profile, type SocialIcon } from "@/content/profile";

const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
  ssr: false,
  loading: () => null,
});

type IconCmp = React.ComponentType<{ size?: number; className?: string }>;

const socialIconMap: Record<SocialIcon, IconCmp> = {
  Github: IconGithub,
  Linkedin: IconLinkedin,
  Mail: Mail as unknown as IconCmp,
  Phone: Phone as unknown as IconCmp,
};

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % profile.roles.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden pt-24 pb-12"
    >
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-60" />
      <GradientOrb className="-top-40 -left-32" color="cyan" size={420} />
      <GradientOrb className="-bottom-48 -right-24" color="violet" size={480} />

      {mounted && (
        <div className="absolute inset-0 z-0 opacity-70">
          <HeroScene />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-mono text-muted-foreground"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
          </span>
          Available for new opportunities
        </motion.div>

        <h1 className="mt-8 text-balance font-sans text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] tracking-tight">
          <GlowText className="text-gradient-soft" delay={0.05}>
            Hey, I&apos;m
          </GlowText>
          <br />
          <GlowText className="text-gradient animate-gradient" delay={0.2}>
            {profile.name}
          </GlowText>
        </h1>

        <div className="mt-6 flex h-9 items-center justify-center font-mono text-sm sm:text-base text-muted-foreground">
          <span className="mr-2 text-cyan/80">&gt;</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={profile.roles[roleIndex]}
              initial={{ y: 14, opacity: 0, filter: "blur(6px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -14, opacity: 0, filter: "blur(6px)" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-foreground"
            >
              {profile.roles[roleIndex]}
            </motion.span>
          </AnimatePresence>
          <span className="ml-1 inline-block h-4 w-[2px] bg-cyan animate-pulse-soft align-middle" />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mx-auto mt-6 max-w-2xl text-balance text-base sm:text-lg text-muted-foreground"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-cyan via-violet to-pink px-7 text-sm font-medium text-background shadow-[0_0_30px_-5px_rgba(168,85,247,0.7)] hover:shadow-[0_0_44px_-2px_rgba(34,211,238,0.7)] transition-shadow"
            >
              <ExternalLink size={16} strokeWidth={2.4} />
              View Resume
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="#contact"
              className="inline-flex h-12 items-center gap-2 rounded-full glass px-7 text-sm font-medium hover:border-cyan/40 hover:text-cyan transition-all"
            >
              <Sparkles size={16} strokeWidth={2.2} />
              Hire Me
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="#projects"
              className="inline-flex h-12 items-center gap-2 rounded-full px-5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              View Projects
              <ArrowRight size={15} strokeWidth={2.2} />
            </a>
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-12 flex items-center justify-center gap-3"
        >
          {profile.socials.map((s) => {
            const Icon = socialIconMap[s.icon];
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="group inline-flex h-11 w-11 items-center justify-center rounded-full glass text-muted-foreground hover:text-cyan hover:border-cyan/40 hover:-translate-y-0.5 hover:shadow-[0_0_24px_-6px_rgba(34,211,238,0.6)] transition-all"
              >
                <Icon size={16} />
              </a>
            );
          })}
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 inline-flex flex-col items-center gap-2 text-xs font-mono text-muted-foreground hover:text-cyan transition-colors"
      >
        <span>scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.span>
      </motion.a>
    </section>
  );
}
