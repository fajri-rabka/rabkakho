"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ReactIcon,
  NextjsIcon,
  VueIcon,
  ViteIcon,
  NodejsIcon,
  TailwindIcon,
  GitIcon,
} from "@/components/ui/Icons";

export function TechStack() {
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const titles = ["MODERN TOOLS", "REAL RESULTS", "NEXT GEN TECH"];

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
      className="px-8 md:px-12 max-w-screen-2xl mx-auto py-16 md:py-24 lg:py-32 border-t border-outline"
      id="tech-stack"
    >
      <div className="mb-12 md:mb-16 lg:mb-20 lg:min-h-40 min-h-auto">
        <span className="font-label text-[10px] tracking-[0.4em] uppercase text-on-background/85">
          Technology Ecosystem
        </span>
        <div className="relative mt-4 h-15 md:h-24 overflow-hidden">
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
              className="font-headline text-2xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter absolute flex items-center whitespace-nowrap text-on-background"
            >
              {titles[index].slice(0, charIndex)}
              <motion.span
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  times: [0, 0.5, 0.51, 1],
                }}
                className="inline-block w-0.5 h-[0.8em] bg-on-background ml-2"
              />
            </motion.h2>
          </AnimatePresence>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
        {[
          { name: "React", Icon: ReactIcon },
          { name: "Next.js", Icon: NextjsIcon },
          { name: "Vue.js", Icon: VueIcon },
          { name: "Vite.js", Icon: ViteIcon },
          { name: "Node.js", Icon: NodejsIcon },
          { name: "Tailwind", Icon: TailwindIcon },
          { name: "Git", Icon: GitIcon },
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
            <div
              className={`relative w-8 h-8 flex items-center justify-center text-on-background/50 group-hover:text-on-background transition-colors duration-500`}
            >
              <tech.Icon size={32} />
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
