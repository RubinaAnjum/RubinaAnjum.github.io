import { PrintButton } from "./print-button";

export const metadata = {
  title: "Resume — Rubina Anjum",
  description: "Full Stack Engineer · Backend & Integrations",
};

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 print:bg-white">
      {/* Print button — hidden when printing */}
      <div className="print:hidden fixed top-4 right-4 z-50">
        <PrintButton />
      </div>

      {/* Resume sheet */}
      <div className="mx-auto max-w-[780px] px-10 py-12 print:px-8 print:py-8">

        {/* Header */}
        <header className="border-b border-gray-200 pb-6 mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Rubina Anjum</h1>
          <p className="mt-1 text-base font-medium text-gray-600">
            Full Stack Engineer · Backend &amp; Integrations
          </p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-500">
            <a href="mailto:rubina.anjum1999@gmail.com" className="hover:text-gray-800">
              rubina.anjum1999@gmail.com
            </a>
            <a href="https://linkedin.com/in/anjumrubina" className="hover:text-gray-800">
              linkedin.com/in/anjumrubina
            </a>
            <a href="https://github.com/RubinaAnjum" className="hover:text-gray-800">
              github.com/RubinaAnjum
            </a>
            <span>Gurugram, India</span>
          </div>
        </header>

        {/* Summary */}
        <section className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Summary</h2>
          <p className="text-sm leading-relaxed text-gray-700">
            Full Stack Engineer with 4+ years building scalable backend systems across fintech, health-tech,
            and e-commerce. Primary stack spans <strong>Node.js</strong> and <strong>Laravel/PHP</strong> —
            shipping REST APIs, real-time WebSocket layers, Redis-backed caches, and complex third-party
            integrations. Proven track record in identity (SAML 2.0 SSO), payment gateways, KYC pipelines,
            and frontend migrations (Angular). Strong bias toward clean architecture, performance, and
            security-first engineering.
          </p>
        </section>

        {/* Experience */}
        <section className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Experience</h2>

          <div className="mb-5">
            <div className="flex items-baseline justify-between">
              <h3 className="text-sm font-semibold text-gray-900">Software Engineer</h3>
              <span className="text-xs text-gray-400">Oct 2022 – Present</span>
            </div>
            <p className="text-xs font-medium text-gray-500 mb-2">Care Health Insurance · Gurugram</p>
            <ul className="space-y-1.5 text-sm text-gray-700 list-disc list-outside ml-4">
              <li>
                Built a <strong>Node.js + WebSocket</strong> real-time notification service handling policy,
                claim, and document events via Redis pub/sub with delivery receipts and dead-letter retry.
              </li>
              <li>
                Implemented <strong>SAML 2.0 SSO</strong> with Google Workspace as IdP across internal apps —
                signed AuthnRequests, attribute-mapped provisioning, and RBAC integration using Laravel.
              </li>
              <li>
                Integrated <strong>Gupshup WhatsApp Business APIs</strong> with a Node.js/WebSocket layer for
                real-time two-way customer messaging; opt-in state machines, template versioning, exponential
                backoff retry.
              </li>
              <li>
                Led backend performance optimization across Node.js and Laravel services — Redis stampede
                protection, ORM query tuning, and lazy resolution; instrumented via Coralogix.
              </li>
              <li>
                Embedded <strong>SAST tooling</strong> into CI/CD pipelines and established security review
                gates for production deployments.
              </li>
            </ul>
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-sm font-semibold text-gray-900">Software Engineer</h3>
              <span className="text-xs text-gray-400">Jun 2020 – Sep 2022</span>
            </div>
            <p className="text-xs font-medium text-gray-500 mb-2">Payworld · Remote</p>
            <ul className="space-y-1.5 text-sm text-gray-700 list-disc list-outside ml-4">
              <li>
                Designed a state-machine-driven <strong>KYC pipeline</strong> (PAN / Aadhaar / Experian) in
                Laravel with provider adapters, idempotent retries, and full audit trails.
              </li>
              <li>
                Owned <strong>payment gateway integrations</strong> across multiple PSPs — reconciliation
                flows, webhook handling, and failure recovery.
              </li>
              <li>
                Executed an incremental <strong>Angular 5.4 → 13 migration</strong> (via 6/8/11/13),
                modernized RxJS, introduced lazy routes, and rewired CI — shipped with feature flags to
                maintain zero downtime.
              </li>
              <li>
                Built REST APIs consumed by the agent panel and external partners using Laravel and Yii.
              </li>
            </ul>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Skills</h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <div>
              <span className="font-medium text-gray-800">Languages</span>
              <span className="text-gray-500 ml-2">TypeScript, PHP, JavaScript</span>
            </div>
            <div>
              <span className="font-medium text-gray-800">Node.js Stack</span>
              <span className="text-gray-500 ml-2">Node.js, Express.js, WebSocket, Fastify</span>
            </div>
            <div>
              <span className="font-medium text-gray-800">PHP / Laravel Stack</span>
              <span className="text-gray-500 ml-2">Laravel, Yii, CodeIgniter, Queues</span>
            </div>
            <div>
              <span className="font-medium text-gray-800">Frontend</span>
              <span className="text-gray-500 ml-2">Angular, Vue.js, React, RxJS</span>
            </div>
            <div>
              <span className="font-medium text-gray-800">Databases</span>
              <span className="text-gray-500 ml-2">MySQL, Redis, MongoDB</span>
            </div>
            <div>
              <span className="font-medium text-gray-800">DevOps</span>
              <span className="text-gray-500 ml-2">Docker, Git, CI/CD, SAST, Coralogix</span>
            </div>
            <div className="col-span-2">
              <span className="font-medium text-gray-800">Integrations</span>
              <span className="text-gray-500 ml-2">
                SAML 2.0 / SSO, Payment Gateways, WhatsApp / Gupshup, PAN / KYC / Experian, REST APIs
              </span>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Key Projects</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Real-Time Notification Service
                <span className="ml-2 text-xs font-normal text-gray-400">Node.js · WebSocket · Redis</span>
              </p>
              <p className="text-sm text-gray-600">
                Event-driven push notification system for policy and claim updates; Redis pub/sub fan-out,
                delivery receipts, dead-letter retry.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                SAML 2.0 SSO
                <span className="ml-2 text-xs font-normal text-gray-400">Laravel · Google Workspace</span>
              </p>
              <p className="text-sm text-gray-600">
                Federated identity across internal health-tech apps; signed assertions, attribute-mapped
                provisioning, RBAC integration.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                WhatsApp Engagement Platform
                <span className="ml-2 text-xs font-normal text-gray-400">Node.js · Gupshup · WebSocket</span>
              </p>
              <p className="text-sm text-gray-600">
                Two-way compliant WhatsApp channel with real-time agent dashboard delivery and opt-in state
                machines.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                KYC Verification Pipeline
                <span className="ml-2 text-xs font-normal text-gray-400">Laravel · PHP · Yii</span>
              </p>
              <p className="text-sm text-gray-600">
                State-machine-driven PAN/Aadhaar/Experian pipeline with provider adapters, idempotent retries,
                and audit trails.
              </p>
            </div>
          </div>
        </section>

        {/* Recognition */}
        <section className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Recognition</h2>
          <div className="flex items-baseline gap-3">
            <p className="text-sm font-semibold text-gray-900">Achiever of the Quarter — JFM 2025</p>
            <span className="text-xs text-gray-400">Care Health Insurance · Q1 2025</span>
          </div>
          <p className="text-sm text-gray-600 mt-0.5">
            Recognized for high-impact contributions across identity, messaging, and security workstreams.
          </p>
        </section>

        {/* Certifications */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Certifications</h2>
          <div className="flex items-baseline gap-3">
            <p className="text-sm font-semibold text-gray-900">Certificate in AI Tools &amp; ChatGPT Workshop</p>
            <span className="text-xs text-gray-400">be10x · Nov 2025</span>
          </div>
          <p className="text-sm text-gray-600 mt-0.5">
            Applied AI and generative tooling — LLM prompts, automation, and ChatGPT for day-to-day engineering.
          </p>
        </section>

      </div>
    </div>
  );
}
