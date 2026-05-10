export type Project = {
  slug: string;
  title: string;
  tagline: string;
  problem: string;
  architecture: string;
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  accent: "cyan" | "violet" | "pink" | "emerald";
  featured?: boolean;
  context?: string;
};

export const projects: Project[] = [
  {
    slug: "realtime-notification-service",
    title: "Real-Time Notification Service",
    tagline: "Event-driven push notifications over WebSocket and webhooks.",
    context: "Care Health Insurance",
    problem:
      "Async events — policy renewals, claim updates, document approvals — were delivered by polling. Customers missed time-sensitive updates; agent dashboards were stale by the time they refreshed.",
    architecture:
      "Built a Node.js + Express service with a WebSocket server for persistent connections and a webhook fan-out for offline clients. Events published to a Redis pub/sub channel; subscriber pool routes to the correct socket or queues for retry. Delivery receipts tracked per-event; dead-letter queue handles persistently undelivered messages.",
    stack: ["Node.js", "Express.js", "WebSocket", "Redis", "MySQL"],
    accent: "emerald",
    featured: true,
  },
  {
    slug: "saml-sso",
    title: "SAML 2.0 SSO with Google Workspace",
    tagline: "Federated identity for a regulated health-tech estate.",
    context: "Care Health Insurance",
    problem:
      "Internal apps each maintained their own auth, leading to inconsistent access control and a manual offboarding nightmare. Compliance and InfoSec wanted a single source of identity.",
    architecture:
      "Implemented SAML 2.0 SP integrations against Google Workspace as IdP — domain verification, signed AuthnRequests, attribute-mapped user provisioning, and graceful fallback for non-federated accounts. Sessions issued centrally; downstream services validated assertions and mapped to internal RBAC.",
    stack: ["Laravel", "PHP", "SAML 2.0", "Google Workspace", "OAuth"],
    accent: "cyan",
    featured: true,
  },
  {
    slug: "whatsapp-engagement",
    title: "Gupshup WhatsApp + WebSocket Engagement",
    tagline: "Real-time, opt-in two-way messaging at customer scale.",
    context: "Care Health Insurance",
    problem:
      "Customer engagement was stuck on email + IVR — slow, low open-rate, and impossible to make conversational. We needed a compliant WhatsApp channel that worked both as broadcast and live two-way support.",
    architecture:
      "Integrated Gupshup's WhatsApp Business APIs with a WebSocket layer for real-time inbound delivery. Outbound respects opt-in state machines; inbound fans out to agent dashboards over WS. Templates versioned; failures retry with exponential backoff.",
    stack: ["Node.js", "Laravel", "Gupshup", "WebSocket", "Redis", "MySQL"],
    accent: "violet",
    featured: true,
  },
  {
    slug: "backend-perf",
    title: "Backend Performance Optimization",
    tagline: "Caching + lazy loading on hot paths under high concurrent load.",
    context: "Care Health Insurance",
    problem:
      "Critical journeys were creaking under peak load — repeated DB hits, eager-loaded relationships, and no shared cache layer. Latency spiked precisely when traffic mattered most.",
    architecture:
      "Profiled hot endpoints across both Node.js and Laravel services, introduced a Redis-backed cache tier with stampede protection, converted eager joins to lazy resolution where appropriate, and tuned ORM and query patterns. Wired metrics into Coralogix to keep the wins observable.",
    stack: ["Node.js", "Laravel", "Redis", "MySQL", "Coralogix"],
    accent: "emerald",
  },
  {
    slug: "kyc-workflow",
    title: "PAN / KYC Verification Workflow",
    tagline: "Compliant onboarding wired to third-party verifiers.",
    context: "Payworld",
    problem:
      "Manual KYC was the slowest step of agent onboarding and a regulatory exposure. Each verifier had its own quirks, retry semantics, and error vocabulary.",
    architecture:
      "Designed a state-machine-driven KYC pipeline with adapters per provider, idempotent retries, and audit trails. PAN/Aadhaar lookups, document upload, OTP, and status callbacks unified behind a single internal REST API built in Laravel.",
    stack: ["Laravel", "PHP", "Yii", "REST APIs", "MySQL"],
    accent: "violet",
    featured: true,
  },
  {
    slug: "angular-migration",
    title: "Angular 5.4 → Angular 13 Migration",
    tagline: "Lifting the agent panel out of legacy without freezing the business.",
    context: "Payworld",
    problem:
      "The agent panel was stuck on Angular 5.4 — slow tooling, missing types, no Ivy, and a build pipeline nobody wanted to touch. Direct rewrites had been attempted and abandoned twice.",
    architecture:
      "Incremental upgrade: stepped through Angular 6/8/11/13, modernized RxJS usage, swapped legacy modules, introduced lazy-loaded routes, and rewired CI for the new toolchain. Shipped feature flags so the new shell could host both old and migrated routes during the cutover.",
    stack: ["Angular", "TypeScript", "RxJS", "Webpack"],
    accent: "cyan",
  },
];
