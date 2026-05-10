export type SkillTier = "core" | "strong" | "familiar";

export type Skill = {
  name: string;
  tier: SkillTier;
};

export type SkillCategory = {
  title: string;
  accent: "cyan" | "violet" | "pink" | "emerald";
  description: string;
  /** Optional badge shown in the card corner (e.g. "Daily driver", "4+ yrs"). */
  badge?: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    accent: "cyan",
    description: "TypeScript and PHP as daily drivers. JavaScript across the full stack.",
    badge: "4+ yrs",
    skills: [
      { name: "TypeScript", tier: "core" },
      { name: "PHP", tier: "core" },
      { name: "JavaScript", tier: "strong" },
    ],
  },
  {
    title: "Node.js Stack",
    accent: "emerald",
    description: "Node-first for real-time systems, microservices, and API-heavy workloads.",
    badge: "Daily driver",
    skills: [
      { name: "Node.js", tier: "core" },
      { name: "Express.js", tier: "core" },
      { name: "REST APIs", tier: "core" },
      { name: "WebSocket", tier: "strong" },
      { name: "Fastify", tier: "familiar" },
    ],
  },
  {
    title: "PHP / Laravel Stack",
    accent: "violet",
    description: "Laravel for production-grade APIs, queues, and event-driven workflows.",
    badge: "Daily driver",
    skills: [
      { name: "Laravel", tier: "core" },
      { name: "Yii", tier: "strong" },
      { name: "CodeIgniter", tier: "familiar" },
      { name: "Queues & Jobs", tier: "strong" },
    ],
  },
  {
    title: "Frontend",
    accent: "pink",
    description: "Comfortable across Angular and Vue; migrated production apps at scale.",
    skills: [
      { name: "Angular", tier: "strong" },
      { name: "Vue.js", tier: "strong" },
      { name: "React", tier: "familiar" },
    ],
  },
  {
    title: "Databases & Caching",
    accent: "cyan",
    description: "Schemas designed for scale; caches tuned to stay warm under load.",
    skills: [
      { name: "MySQL", tier: "core" },
      { name: "Redis", tier: "strong" },
      { name: "MongoDB", tier: "familiar" },
    ],
  },
  {
    title: "Integrations & DevOps",
    accent: "violet",
    description: "Identity, payments, messaging, KYC — secured pipelines and observable production.",
    badge: "Production",
    skills: [
      { name: "SAML 2.0 / SSO", tier: "strong" },
      { name: "Payment Gateways", tier: "strong" },
      { name: "Gupshup / WhatsApp", tier: "strong" },
      { name: "Docker", tier: "strong" },
      { name: "SAST / CI Pipelines", tier: "strong" },
      { name: "Coralogix", tier: "strong" },
    ],
  },
];
