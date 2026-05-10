"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/content/nav";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 print:hidden",
        scrolled ? "py-2" : "py-4",
      )}
    >
      {/* Full-width frosted backdrop — blurs page content beneath the header on scroll */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 transition-opacity duration-500",
          scrolled ? "opacity-100" : "opacity-0",
        )}
        style={{
          background:
            "linear-gradient(to bottom, rgba(5, 6, 10, 0.65) 0%, rgba(5, 6, 10, 0.35) 80%, rgba(5, 6, 10, 0) 100%)",
          backdropFilter: "blur(20px) saturate(200%)",
          WebkitBackdropFilter: "blur(10px) saturate(200%)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 80%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 80%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4">
        <div
          className={cn(
            "flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500",
            scrolled ? "border border-white/10 bg-white/[0.04]" : "glass",
          )}
        >
          <a
            href="#"
            className="group flex items-center gap-2 font-mono text-sm font-medium tracking-tight"
          >
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan to-violet text-background font-bold text-xs">
              {profile.initials}
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan to-violet opacity-50 blur-md group-hover:opacity-80 transition-opacity" />
            </span>
            <span className="hidden sm:inline text-foreground/90 group-hover:text-foreground transition-colors">
              {profile.name}
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan via-violet to-pink px-4 py-1.5 text-xs font-medium text-background shadow-[0_0_24px_-6px_rgba(168,85,247,0.7)] hover:shadow-[0_0_28px_-2px_rgba(34,211,238,0.6)] transition-shadow"
          >
            Resume
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/5 transition-colors"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-2 glass-strong rounded-2xl p-2"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block rounded-xl bg-gradient-to-r from-cyan via-violet to-pink px-4 py-3 text-center text-sm font-medium text-background"
              >
                View Resume
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
