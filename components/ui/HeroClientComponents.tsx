"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useThemeContext } from "@/context/ThemeContext";

const ease = [0.16, 1, 0.3, 1] as const;
const words = ["MORE IMPACT.", "MORE POWER.", "MORE SPEED."];

export function Highlight({
  children,
  active,
}: {
  children: string;
  active: boolean;
}) {
  return (
    <span className="relative inline-block mx-1">
      <motion.span
        animate={{ opacity: active ? 1 : 0.6 }}
        transition={{ duration: 1, ease }}
        className={`relative z-10 text-on-background font-bold ${
          active ? "text-on-background" : "text-on-background/80"
        }`}
      >
        {children}
      </motion.span>
      <motion.span
        animate={{ scaleX: active ? 1 : 0 }}
        transition={{ duration: 0.6, ease }}
        className="absolute left-0 bottom-0.5 h-px w-full bg-on-background origin-left"
      />
    </span>
  );
}

export function AnimatedWord() {
  const { theme } = useThemeContext();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const wordTimer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 4000);
    return () => clearInterval(wordTimer);
  }, []);

  return (
    <div className="relative h-[1.2em] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={words[index]}
          initial={{ y: 40, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -40, opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.8, ease }}
          className={`absolute left-0 top-0 w-full bg-linear-to-r ${
            theme === "dark"
              ? "from-white/90 to-black/20"
              : "from-black/90 to-white/20"
          } bg-clip-text text-transparent`}
        >
          {words[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function AnimatedDescription() {
  const [highlightIdx, setHighlightIdx] = useState(0);

  useEffect(() => {
    const highlightTimer = setInterval(() => {
      setHighlightIdx((prev) => (prev + 1) % 4);
    }, 2800);
    return () => clearInterval(highlightTimer);
  }, []);

  return (
    <motion.p
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.6, delay: 0.6, ease }}
      className="text-sm md:text-lg text-on-background leading-relaxed max-w-2xl mb-12 font-light"
    >
      I build efficient,
      <Highlight active={highlightIdx === 0}>scalable</Highlight>
      front-end solutions with clean architecture, focusing on
      <Highlight active={highlightIdx === 1}>performance</Highlight>,
      <Highlight active={highlightIdx === 2}>maintainability</Highlight>,
      and seamless
      <Highlight active={highlightIdx === 3}>user experience</Highlight>.
    </motion.p>
  );
}
