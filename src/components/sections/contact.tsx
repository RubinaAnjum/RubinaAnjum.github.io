"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { z } from "zod";
import { profile } from "@/content/profile";
import { SectionHeader } from "@/components/sections/section-header";
import { GradientOrb } from "@/components/effects/gradient-orb";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please share your name"),
  email: z.string().trim().email("That email doesn't look right"),
  phone: z.string().trim().optional().or(z.literal("")),
  query: z.string().trim().min(10, "Tell me a little more (10+ chars)"),
});

type FormErrors = Partial<Record<keyof z.infer<typeof contactSchema>, string>>;

export function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerMessage(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      query: String(fd.get("query") ?? ""),
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const next: FormErrors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof FormErrors;
        if (!next[k]) next[k] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("https://formspree.io/f/xaqvlzod", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone || "",
          message: parsed.data.query,
          _subject: `Portfolio inquiry from ${parsed.data.name}`,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error ?? "Something went wrong");
      }
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setServerMessage(err instanceof Error ? err.message : "Unknown error");
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <GradientOrb className="left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" color="violet" size={620} />

      <div className="relative z-10 mx-auto max-w-3xl px-4">
        <SectionHeader
          eyebrow="Contact"
          title={
            <>
              Let&apos;s build <span className="text-gradient">something</span>.
            </>
          }
          description={`Recruiters, founders, fellow tinkerers — drop a line. I read everything that lands at ${profile.email}.`}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-12 overflow-hidden rounded-3xl glass-strong p-6 sm:p-8"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(34,211,238,0.12),transparent_70%)]" />

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative flex flex-col items-center justify-center gap-4 py-10 text-center"
              >
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald to-cyan text-background">
                  <CheckCircle2 size={26} strokeWidth={2.4} />
                  <span className="absolute inset-0 rounded-full bg-emerald/40 blur-xl" />
                </div>
                <h3 className="text-2xl font-semibold">Message received.</h3>
                <p className="max-w-sm text-sm text-muted-foreground">
                  Thanks for reaching out — I&apos;ll get back to you within a couple of working days.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-2 rounded-full glass px-5 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-cyan/40 transition-colors"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="relative grid gap-4 sm:grid-cols-2"
                noValidate
              >
                <Field label="Name" name="name" placeholder="Your name" error={errors.name} />
                <Field label="Email" name="email" type="email" placeholder="you@domain.com" error={errors.email} />
                <Field
                  label="Phone (optional)"
                  name="phone"
                  type="tel"
                  placeholder="+91 …"
                  error={errors.phone}
                  className="sm:col-span-2"
                />
                <div className="sm:col-span-2">
                  <label className="block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Query
                  </label>
                  <textarea
                    name="query"
                    rows={5}
                    placeholder="Tell me about the role, the team, the problem…"
                    className={cn(
                      "mt-2 w-full resize-none rounded-xl border bg-white/[0.02] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/40 transition-colors",
                      errors.query ? "border-pink/60" : "border-white/10 focus-visible:border-cyan/40",
                    )}
                  />
                  {errors.query && (
                    <p className="mt-1 font-mono text-[11px] text-pink">{errors.query}</p>
                  )}
                </div>

                <div className="sm:col-span-2 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
                  <p className="font-mono text-[11px] text-muted-foreground">
                    Or email{" "}
                    <a href={`mailto:${profile.email}`} className="text-cyan hover:underline">
                      {profile.email}
                    </a>
                  </p>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan via-violet to-pink px-7 text-sm font-medium text-background shadow-[0_0_30px_-5px_rgba(168,85,247,0.7)] hover:shadow-[0_0_40px_-2px_rgba(34,211,238,0.7)] transition-shadow disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 size={15} className="animate-spin" /> Sending
                      </>
                    ) : (
                      <>
                        <Send size={15} strokeWidth={2.2} /> Send message
                      </>
                    )}
                  </button>
                </div>

                {status === "error" && serverMessage && (
                  <p className="sm:col-span-2 font-mono text-[11px] text-pink">{serverMessage}</p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  error,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className={cn(
          "mt-2 h-11 w-full rounded-xl border bg-white/[0.02] px-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/40 transition-colors",
          error ? "border-pink/60" : "border-white/10 focus-visible:border-cyan/40",
        )}
      />
      {error && <p className="mt-1 font-mono text-[11px] text-pink">{error}</p>}
    </div>
  );
}
