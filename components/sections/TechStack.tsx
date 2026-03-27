"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTheme } from "@/hooks/useTheme";

export function TechStack() {
  const { theme } = useTheme();
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const titles = ["MODERN TOOLS", "REAL PERFORMANCE"];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setCharIndex(0);
    const charTimer = setInterval(() => {
      setCharIndex((prev) => {
        if (prev < titles[index].length) return prev + 1;
        clearInterval(charTimer);
        return prev;
      });
    }, 60);
    return () => clearInterval(charTimer);
  }, [index]);

  return (
    <section
      className="px-8 max-w-screen-2xl mx-auto lg:py-32 py-16 border-t border-outline"
      id="tech-stack"
    >
      <div className="mb-5 lg:mb-20 lg:min-h-[160px] min-h-auto">
        <span className="font-label text-[10px] tracking-[0.4em] uppercase text-on-background/85">
          Technology Ecosystem
        </span>
        <div className="relative mt-4 h-20 md:h-24 overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.h2
              key={index}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-110%", opacity: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-headline text-4xl md:text-7xl font-extrabold tracking-tighter absolute flex items-center whitespace-nowrap text-on-background"
            >
              {titles[index].slice(0, charIndex)}
              <motion.span
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  times: [0, 0.5, 0.51, 1],
                }}
                className="inline-block w-[2px] h-[0.8em] bg-on-background ml-2"
              />
            </motion.h2>
          </AnimatePresence>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
        {[
          { name: "React", icon: "/svg/react.svg" },
          { name: "Next.js", icon: "/svg/nextjs.svg" },
          { name: "Vue.js", icon: "/svg/vuejs.svg" },
          { name: "Vite.js", icon: "/svg/vitejs.svg" },
          { name: "Node.js", icon: "/svg/nodejs.svg" },
          { name: "Tailwind", icon: "/svg/tailwind.svg" },
          { name: "Git", icon: "/svg/git.svg" },
        ].map((tech, i) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1] as any,
              delay: i * 0.05,
            }}
            className="glass-card p-8 flex flex-col gap-5 items-center justify-center group hover:bg-on-background/5 transition-all duration-500 border border-outline"
          >
            <div className={`relative w-8 h-8 flex items-center justify-center ${theme === "dark" ? "invert brightness-200" : ""}`}>
               <Image src={tech.icon} alt={tech.name} width={32} height={32} className={theme === "light" ? "brightness-0" : ""} />
            </div>
            <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-on-background/85 group-hover:text-on-background">
              {tech.name}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
