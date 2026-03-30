"use client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import BackgroundParticles from "@/components/ui/BackgroundParticles";
import { TextReveal } from "@/components/ui/TextReveal";
import { useThemeContext } from "@/context/ThemeContext";

const ease = [0.16, 1, 0.3, 1] as const;

const words = ["MORE IMPACT.", "MORE POWER.", "MORE SPEED."];

function Highlight({
  children,
  active,
}: {
  children: string;
  active: boolean;
}) {
  return (
    <span className="relative inline-block mx-1">
      <motion.span
        animate={{
          opacity: active ? 1 : 0.6,
        }}
        transition={{ duration: 1, ease }}
        className={`relative z-10 text-on-background  ${active ? "text-on-background font-bold" : "text-on-background/40"}`}
      >
        {children}
      </motion.span>

      <motion.span
        animate={{
          scaleX: active ? 1 : 0,
        }}
        transition={{ duration: 0.6, ease }}
        className="absolute left-0 bottom-0.5 h-px w-full bg-on-background origin-left"
      />
    </span>
  );
}

export function Hero() {
  const { theme } = useThemeContext();

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // layered parallax (premium feel)
  const yText = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [index, setIndex] = useState(0);
  const [highlightIdx, setHighlightIdx] = useState(0);

  useEffect(() => {
    const wordTimer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 4000);

    const highlightTimer = setInterval(() => {
      setHighlightIdx((prev) => (prev + 1) % 4);
    }, 2800);

    return () => {
      clearInterval(wordTimer);
      clearInterval(highlightTimer);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-12 max-w-screen-2xl mx-auto overflow-hidden"
    >
      {/* Background */}
      <motion.div style={{ y: yBg }} className="absolute inset-0">
        <BackgroundParticles />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 w-full max-w-4xl"
      >
        {/* Tag */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="font-label text-xs tracking-[0.3em] uppercase text-on-background/70 block mb-6"
        >
          {new Date().getFullYear()}
        </motion.span>

        {/* Headline */}
        <h1 className="font-headline text-3xl lg:text-6xl font-bold tracking-tight leading-none text-on-background mb-8">
          <TextReveal text="LESS CODE," className="block" />

          {/* Animated Word */}
          <div className="relative h-[1.2em] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={words[index]}
                initial={{ y: 40, opacity: 0, filter: "blur(6px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -40, opacity: 0, filter: "blur(6px)" }}
                transition={{ duration: 0.8, ease }}
                className={`absolute left-0 top-0 w-full bg-linear-to-r ${theme === "dark" ? "from-white/90 to-black/20" : "from-black/90 to-white/20"} bg-clip-text text-transparent`}
              >
                {words[index]}
              </motion.div>
            </AnimatePresence>
          </div>
        </h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.6,
            delay: 0.6,
            ease,
          }}
          className={`text-md md:text-lg text-on-background  leading-relaxed max-w-2xl mb-12 font-light`}
        >
          I build efficient,
          <Highlight active={highlightIdx === 0}>scalable</Highlight>
          front-end solutions with clean architecture, focusing on
          <Highlight active={highlightIdx === 1}>performance</Highlight>,
          <Highlight active={highlightIdx === 2}>maintainability</Highlight>,
          and seamless
          <Highlight active={highlightIdx === 3}>user experience</Highlight>.
        </motion.p>
      </motion.div>
    </section>
  );
}
