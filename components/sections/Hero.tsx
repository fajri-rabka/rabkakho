"use client";

import {
  motion,
  useScroll,
  useTransform,
  Variants,
  AnimatePresence,
} from "framer-motion";
import { useState, useEffect } from "react";
import BackgroundParticles from "@/components/ui/BackgroundParticles";

const variants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      delay: i * 0.12,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

const words = ["MORE IMPACT.", "MORE POWER.", "MORE SPEED."];

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 500], [0, 80]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [words.length]);

  if (!mounted) {
    return (
      <section className="relative min-h-[100vh] lg:min-h-[80vh] flex flex-col justify-center px-8 md:px-12 max-w-screen-2xl mx-auto overflow-hidden py-16 md:py-24 lg:py-32">
        {/* Skeleton UI or just a blank section to reserve space */}
      </section>
    );
  }

  return (
    <section
      id="home"
      className="relative min-h-[80vh] lg:min-h-[90vh] flex flex-col justify-center px-8 md:px-12 max-w-screen-2xl mx-auto overflow-hidden py-16 md:py-24 lg:py-32"
    >
      <BackgroundParticles />

      <motion.div style={{ y: yParallax }} className="relative z-10 w-full">
        {/* YEAR TAG */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={variants}
        >
          <span className="font-label text-[10px] tracking-[0.4em] uppercase mb-8 block text-on-background/85">
            {new Date().getFullYear()}
          </span>
        </motion.div>

        {/* MAIN HEADLINE */}
        <h1 className="font-headline text-5xl md:text-8xl lg:text-7xl xl:text-8xl font-extrabold tracking-tighter leading-[0.85] text-on-background">
          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={variants}
          >
            LESS CODE
          </motion.div>
          <div className="relative h-[1.8em] lg:h-[1.1em] overflow-hidden mb-12 md:mb-0 lg:mb-20">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={words[index]}
                initial={{ y: 40, opacity: 0, filter: "blur(6px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -40, opacity: 0, filter: "blur(6px)" }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute left-0 top-0 w-full will-change-transform will-change-opacity"
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          </div>
        </h1>

        {/* DESCRIPTION */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={variants}
          className="grid grid-cols-1 md:grid-cols-8 gap-8"
        >
          <div className="md:col-start-1 md:col-span-12 lg:col-span-5">
            <p className="text-xs md:text-lg text-on-background/80 leading-relaxed font-light text-balance ">
              I build efficient, scalable front-end solutions with clean
              architecture, focusing on performance, maintainability, and
              seamless user experience.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
