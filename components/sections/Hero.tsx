"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import BackgroundParticles from "@/components/ui/BackgroundParticles";

/**
 * Senior Refactor: Hero Section
 * - High-performance staggered animations
 * - Custom premium easing
 * - Scroll parallax depth
 * - ZERO wording changes
 */

const variants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      delay: i * 0.12,
      ease: [0.215, 0.61, 0.355, 1], // Custom Cubic-Bezier
    },
  }),
};

export function Hero() {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 500], [0, 80]);

  return (
    <section
      id="home"
      className="relative min-h-[100vh] lg:min-h-[80vh] flex flex-col justify-center px-8 max-w-screen-2xl mx-auto overflow-hidden"
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
        <h1 className="font-headline text-6xl md:text-[8.5rem] font-extrabold tracking-tighter leading-[0.85] mb-12 text-on-background">
          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={variants}
          >
            LESS CODE
          </motion.div>

          <div className="relative inline-flex overflow-hidden group">
            <motion.span
              custom={2}
              initial="hidden"
              animate="visible"
              variants={variants}
              className="text-on-background relative z-10 block"
            >
              MORE IMPACT.
            </motion.span>

            {/* Sliding Glint Mask */}
            <motion.div
              className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
              initial={{ x: "-120%" }}
              animate={{ x: ["-120%", "120%"] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <div
                className="
      h-full w-[40%]
      bg-gradient-to-r
      from-transparent
      via-white/80
      to-transparent
      blur-[6px]
      opacity-70
      dark:via-white/90
    "
              />
            </motion.div>
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
            <p className="text-md md:text-lg text-on-background/80 leading-relaxed font-light text-balance ">
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
