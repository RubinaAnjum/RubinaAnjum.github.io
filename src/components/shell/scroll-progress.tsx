"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.2,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed top-0 inset-x-0 z-[60] h-[2px] bg-gradient-to-r from-cyan via-violet to-pink shadow-[0_0_8px_rgba(168,85,247,0.7)] print:hidden"
    />
  );
}
