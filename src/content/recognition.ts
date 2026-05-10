export type Award = {
  title: string;
  issuer: string;
  date: string;
  description: string;
  url?: string;
};

export type Certification = {
  title: string;
  issuer: string;
  date: string;
  description: string;
  credentialId?: string;
  url?: string;
};

export const awards: Award[] = [
  {
    title: "Achiever of the Quarter — JFM 2025",
    issuer: "Care Health Insurance",
    date: "Q1 2025",
    description:
      "Recognized for delivering high-impact contributions and driving measurable business outcomes across the identity, messaging, and security workstreams.",
  },
];

export const certifications: Certification[] = [
  {
    title: "Certificate in AI Tools & ChatGPT Workshop",
    issuer: "be10x",
    date: "Nov 2025",
    description:
      "Hands-on training in applied AI and generative tools — turning LLM prompts, automation, and ChatGPT into reliable building blocks for day-to-day engineering work.",
  },
];
