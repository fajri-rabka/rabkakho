"use client";
import { motion } from "framer-motion";
import BackgroundParticles from "@/components/ui/BackgroundParticles";

export function Hero() {
  return (
    <section
      id="home"
      className="relative lg:min-h-[80vh] min-h-[100vh] flex flex-col justify-center px-8 max-w-screen-2xl mx-auto mb-32 reveal"
    >
      <BackgroundParticles />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.5,
          ease: [0.19, 1, 0.22, 1],
          delay: 0.1,
        }}
      >
        <span className="font-label text-[10px] tracking-[0.4em] uppercase mb-6 text-white/60">{`${new Date().getFullYear()}`}</span>
      </motion.div>
      <h1 className="font-headline text-6xl md:text-[8rem] font-extrabold tracking-tighter leading-[0.9] mt-8 lg:mt-1 mb-8 lg:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.5,
            ease: [0.19, 1, 0.22, 1],
            delay: 0.1,
          }}
        >
          LESS CODE <br />
        </motion.div>
        <div className="relative inline-flex mt-4 overflow-hidden group">
          <motion.span
            className="text-white whitespace-nowrap"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 1.5,
              ease: [0.19, 1, 0.22, 1],
            }}
          >
            MORE IMPACT.
          </motion.span>
          <motion.div
            className="absolute inset-0 bg-white mix-blend-difference z-20 pointer-events-none"
            initial={{ x: "-100%" }}
            animate={{ x: ["-100%", "0%", "100%"] }}
            transition={{
              duration: 5,
              times: [0, 0.5, 1],
              repeat: Infinity,
              repeatDelay: 5,
              ease: [0.19, 1, 0.22, 1],
            }}
          />
        </div>
      </h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.5,
          ease: [0.19, 1, 0.22, 1],
          delay: 0.3,
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <p className="md:col-start-7 md:col-span-12 lg:col-span-5 text-lg md:text-xl text-white/80 leading-relaxed font-light">
            I build efficient, scalable front-end solutions with clean
            architecture, focusing on performance, maintainability, and seamless
            user experience.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
