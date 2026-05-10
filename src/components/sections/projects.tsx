"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, ExternalLink, Sparkles } from "lucide-react";
import { IconGithub } from "@/components/icons/brand";
import { projects, type Project } from "@/content/projects";
import { SectionHeader } from "@/components/sections/section-header";
import { GradientOrb } from "@/components/effects/gradient-orb";
import { cn } from "@/lib/utils";

const accentBorder: Record<Project["accent"], string> = {
  cyan: "hover:border-cyan/40",
  violet: "hover:border-violet/40",
  pink: "hover:border-pink/40",
  emerald: "hover:border-emerald/40",
};

const accentText: Record<Project["accent"], string> = {
  cyan: "text-cyan",
  violet: "text-violet",
  pink: "text-pink",
  emerald: "text-emerald",
};

const accentGlow: Record<Project["accent"], string> = {
  cyan: "from-cyan/40 via-violet/30 to-transparent",
  violet: "from-violet/40 via-pink/30 to-transparent",
  pink: "from-pink/40 via-violet/30 to-transparent",
  emerald: "from-emerald/40 via-cyan/30 to-transparent",
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 220, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 220, damping: 18 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1200 }}
      className="group h-full"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className={cn(
          "relative h-full overflow-hidden rounded-2xl glass p-6 transition-all duration-500 hover:-translate-y-1 hover:glass-frosted",
          accentBorder[project.accent],
        )}
      >
        <div
          className={cn(
            "absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl opacity-0 group-hover:opacity-70 transition-opacity bg-gradient-to-br",
            accentGlow[project.accent],
          )}
        />

        <div className="relative flex items-center justify-between" style={{ transform: "translateZ(40px)" }}>
          {project.featured ? (
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full glass px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.16em]",
                accentText[project.accent],
              )}
            >
              <Sparkles size={10} strokeWidth={2.4} />
              Featured
            </span>
          ) : (
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
          )}
          <div className="flex items-center gap-1.5">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} repository`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full glass text-muted-foreground hover:text-cyan hover:border-cyan/40 transition-all"
              >
                <IconGithub size={13} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live preview`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full glass text-muted-foreground hover:text-cyan hover:border-cyan/40 transition-all"
              >
                <ExternalLink size={14} strokeWidth={1.8} />
              </a>
            )}
          </div>
        </div>

        <h3
          className="relative mt-6 text-xl font-semibold tracking-tight text-balance"
          style={{ transform: "translateZ(30px)" }}
        >
          {project.title}
        </h3>
        <p
          className="relative mt-2 text-sm text-muted-foreground text-balance"
          style={{ transform: "translateZ(20px)" }}
        >
          {project.tagline}
        </p>

        <div className="relative mt-5 space-y-3" style={{ transform: "translateZ(15px)" }}>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/80">
              Problem
            </p>
            <p className="mt-1 text-sm text-foreground/85 line-clamp-3">{project.problem}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/80">
              Architecture
            </p>
            <p className="mt-1 text-sm text-foreground/85 line-clamp-3">{project.architecture}</p>
          </div>
        </div>

        <div className="relative mt-5 flex flex-wrap gap-1.5" style={{ transform: "translateZ(20px)" }}>
          {project.stack.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-0.5 text-[10px] font-mono text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        {(project.liveUrl || project.repoUrl) && (
          <a
            href={project.liveUrl ?? project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "relative mt-6 inline-flex items-center gap-1.5 text-sm font-medium transition-colors",
              accentText[project.accent],
            )}
            style={{ transform: "translateZ(30px)" }}
          >
            Explore project
            <ArrowUpRight size={14} strokeWidth={2.2} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <GradientOrb className="-left-32 top-1/3" color="cyan" size={520} />
      <GradientOrb className="-right-32 bottom-0" color="violet" size={520} />

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Projects"
          title={
            <>
              Things I&apos;ve <span className="text-gradient">actually shipped</span>.
            </>
          }
          description="Working systems, not slideshows. Each one solved a real problem and is currently in use, archived, or running on a Raspberry Pi under my desk."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
