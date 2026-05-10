"use client";

import { motion } from "framer-motion";
import { BadgeCheck, ExternalLink, Trophy } from "lucide-react";
import {
  awards,
  certifications,
  type Award,
  type Certification,
} from "@/content/recognition";
import { SectionHeader } from "@/components/sections/section-header";
import { GradientOrb } from "@/components/effects/gradient-orb";
import { cn } from "@/lib/utils";

type Group = {
  eyebrow: string;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  accent: "violet" | "cyan";
  emptyState: string;
};

const awardsGroup: Group = {
  eyebrow: "Awards & Recognition",
  Icon: Trophy,
  accent: "violet",
  emptyState: "More wins on the way.",
};

const certsGroup: Group = {
  eyebrow: "Certifications",
  Icon: BadgeCheck,
  accent: "cyan",
  emptyState: "More certificates on the way.",
};

const accentMap: Record<
  Group["accent"],
  { text: string; ring: string; glow: string; edge: string; chip: string }
> = {
  violet: {
    text: "text-violet",
    ring: "hover:border-violet/40",
    glow: "from-violet/35 to-pink/15",
    edge: "from-violet via-pink to-transparent",
    chip: "border-violet/30 text-violet",
  },
  cyan: {
    text: "text-cyan",
    ring: "hover:border-cyan/40",
    glow: "from-cyan/35 to-violet/15",
    edge: "from-cyan via-violet to-transparent",
    chip: "border-cyan/30 text-cyan",
  },
};

function Card({
  index,
  accent,
  title,
  issuer,
  date,
  description,
  url,
  badgeLabel,
}: {
  index: number;
  accent: Group["accent"];
  title: string;
  issuer: string;
  date: string;
  description: string;
  url?: string;
  badgeLabel: string;
}) {
  const a = accentMap[accent];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-2xl glass p-5 transition-all duration-500 hover:-translate-y-0.5 hover:glass-frosted",
        a.ring,
      )}
    >
      <div
        className={cn(
          "absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-opacity bg-gradient-to-br",
          a.glow,
        )}
      />

      <div className="relative flex items-start justify-between gap-3">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border bg-white/[0.02] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em]",
            a.chip,
          )}
        >
          {badgeLabel}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          {date}
        </span>
      </div>

      <h4 className="relative mt-3 text-base font-semibold leading-snug tracking-tight text-balance">
        {title}
      </h4>
      <p className={cn("relative mt-1 text-sm font-medium", a.text)}>{issuer}</p>
      <p className="relative mt-3 text-sm text-muted-foreground leading-relaxed">{description}</p>

      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "relative mt-4 inline-flex items-center gap-1.5 text-xs font-medium",
            a.text,
          )}
        >
          View credential
          <ExternalLink size={12} strokeWidth={2.2} />
        </a>
      )}

      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r opacity-40",
          a.edge,
        )}
      />
    </motion.div>
  );
}

function Column<T extends { title: string }>({
  group,
  items,
  renderCard,
}: {
  group: Group;
  items: T[];
  renderCard: (item: T, index: number) => React.ReactNode;
}) {
  const a = accentMap[group.accent];
  const { Icon } = group;
  return (
    <div>
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-xl glass-strong",
            a.text,
          )}
        >
          <Icon size={18} strokeWidth={1.8} />
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {group.eyebrow}
          </p>
          <p className="text-base font-semibold tracking-tight">
            {items.length} {items.length === 1 ? "entry" : "entries"}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-6 text-center text-sm text-muted-foreground">
            {group.emptyState}
          </div>
        ) : (
          items.map((item, i) => renderCard(item, i))
        )}
      </div>
    </div>
  );
}

export function Recognition() {
  return (
    <section id="recognition" className="relative py-24 sm:py-32">
      <GradientOrb className="-left-24 top-1/3" color="violet" size={420} />
      <GradientOrb className="-right-24 bottom-1/4" color="cyan" size={420} />

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Recognition"
          title={
            <>
              Where the work has been <span className="text-gradient">noticed</span>.
            </>
          }
          description="Awards from the people I ship for, and certifications from the people who keep me sharp."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-10">
          <Column<Award>
            group={awardsGroup}
            items={awards}
            renderCard={(a, i) => (
              <Card
                key={a.title}
                index={i}
                accent={awardsGroup.accent}
                badgeLabel="Award"
                title={a.title}
                issuer={a.issuer}
                date={a.date}
                description={a.description}
                url={a.url}
              />
            )}
          />
          <Column<Certification>
            group={certsGroup}
            items={certifications}
            renderCard={(c, i) => (
              <Card
                key={c.title}
                index={i}
                accent={certsGroup.accent}
                badgeLabel="Certificate"
                title={c.title}
                issuer={c.issuer}
                date={c.date}
                description={c.description}
                url={c.url}
              />
            )}
          />
        </div>
      </div>
    </section>
  );
}
