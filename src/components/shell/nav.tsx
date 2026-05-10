"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { navLinks } from "@/content/nav";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

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
      style={{ overflowX: "clip" }}
    >
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

      <div className="relative mx-auto max-w-6xl px-3">
        <div
          className={cn(
            "flex w-full items-center gap-2 rounded-full px-3 py-2 transition-all duration-500",
            scrolled ? "border border-white/10 bg-white/[0.04]" : "glass",
          )}
        >
          {/* Logo */}
          <a
            href="#"
            className="group flex shrink-0 items-center gap-2 font-mono text-sm font-medium tracking-tight"
          >
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan to-violet text-background font-bold text-xs">
              {profile.initials}
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan to-violet opacity-50 blur-md group-hover:opacity-80 transition-opacity" />
            </span>
            <span className="hidden sm:inline text-foreground/90 group-hover:text-foreground transition-colors">
              {profile.name}
            </span>
          </a>

          {/* Scrollable nav — flex-1 wrapper clips, inner div scrolls */}
          <div className="flex-1 min-w-0 overflow-hidden">
            <nav className="flex items-center gap-0.5 overflow-x-auto scrollbar-none px-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="whitespace-nowrap rounded-full px-3 py-1.5 text-xs sm:text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Resume button */}
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center rounded-full bg-gradient-to-r from-cyan via-violet to-pink px-3 py-1.5 text-xs font-medium text-background shadow-[0_0_24px_-6px_rgba(168,85,247,0.7)] hover:shadow-[0_0_28px_-2px_rgba(34,211,238,0.6)] transition-shadow"
          >
            Resume
          </a>
        </div>
      </div>
    </motion.header>
  );
}
