export type SocialIcon = "Github" | "Linkedin" | "Mail" | "Phone";
export type TraitIcon = "Zap" | "Shield" | "Layers" | "Network";

export const profile = {
  name: "Rubina Anjum",
  initials: "RA",
  title: "Full Stack Engineer · Backend & Integrations",
  tagline:
    "Building scalable backend systems for fintech, health-tech, and e-commerce. Node.js · Laravel · REST APIs · Redis · Identity · Payments.",
  location: "Gurugram, India",
  email: "rubina.anjum1999@gmail.com",
  resumeUrl: "/resume",
  yearsOfExperience: 4,
  projectsCompleted: 12,
  technologiesMastered: 20,
  roles: [
    "Full Stack Engineer",
    "Backend & Systems Engineer",
    "Node.js Developer",
    "Laravel Specialist",
    "Integration Architect",
    "Performance & Security Builder",
  ],
  bio: [
    "I'm a Full Stack Engineer with 4+ years building scalable backend systems across fintech, health-tech, and e-commerce. My primary stack spans Node.js and Laravel, shipping REST APIs, real-time WebSocket layers, Redis-backed caches, and third-party integrations — with a strong bias toward clean architecture, performance, and security.",
    "At Care Health Insurance I lead identity, messaging, and security workstreams: SAML 2.0 SSO with Google Workspace, real-time WhatsApp engagement via Gupshup + WebSocket, and SAST integration into our CI/CD pipelines. Before that, at Payworld, I owned KYC workflows, payment gateway integrations, and a full Angular 5 → 13 migration.",
  ],
  traits: [
    { label: "Performance Obsessed", icon: "Zap" as TraitIcon },
    { label: "Security-First", icon: "Shield" as TraitIcon },
    { label: "Clean Architecture", icon: "Layers" as TraitIcon },
    { label: "Integration Builder", icon: "Network" as TraitIcon },
  ],
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/RubinaAnjum",
      icon: "Github" as SocialIcon,
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/anjumrubina",
      icon: "Linkedin" as SocialIcon,
    },
    {
      label: "Email",
      href: "mailto:rubina.anjum1999@gmail.com",
      icon: "Mail" as SocialIcon,
    },
    // {
    //   label: "Phone",
    //   href: "tel:+919973201608",
    //   icon: "Phone" as SocialIcon,
    // },
  ],
} as const;
