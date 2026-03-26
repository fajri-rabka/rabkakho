"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function TechStack() {
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
      className="px-8 max-w-screen-2xl mx-auto py-32 border-t border-white/5"
      id="tech-stack"
    >
      <div className="mb-20 min-h-[160px]">
        <span className="font-label text-[10px] tracking-[0.4em] uppercase text-white/40">
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
              className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter absolute flex items-center whitespace-nowrap"
            >
              {titles[index].slice(0, charIndex)}
              <motion.span
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  times: [0, 0.5, 0.51, 1],
                }}
                className="inline-block w-[4px] h-[0.8em] bg-white ml-2"
              />
            </motion.h2>
          </AnimatePresence>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
        {/* Tech Item: React */}
        <div
          className="glass-card p-8 flex flex-col gap-5 items-center justify-center group hover:bg-white/10 transition-all duration-500 reveal"
          style={{ animationDelay: "0.1s" }}
        >
          <Image src="/svg/react.svg" alt="React" width={32} height={32} />
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/60 group-hover:text-white">
            React
          </span>
        </div>
        {/* Tech Item: Next.js */}
        <div
          className="glass-card p-8 flex flex-col gap-5 items-center justify-center group hover:bg-white/10 transition-all duration-500 reveal"
          style={{ animationDelay: "0.15s" }}
        >
          <Image src="/svg/nextjs.svg" alt="Next.js" width={32} height={32} />
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/60 group-hover:text-white">
            Next.js
          </span>
        </div>
        {/* Tech Item: Vue.js */}
        <div
          className="glass-card p-8 flex flex-col gap-5 items-center justify-center group hover:bg-white/10 transition-all duration-500 reveal"
          style={{ animationDelay: "0.2s" }}
        >
          <Image src="/svg/vuejs.svg" alt="Vue.js" width={32} height={32} />
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/60 group-hover:text-white">
            Vue.js
          </span>
        </div>
        {/* Tech Item: Vite.js */}
        <div
          className="glass-card p-8 flex flex-col gap-5 items-center justify-center group hover:bg-white/10 transition-all duration-500 reveal"
          style={{ animationDelay: "0.4s" }}
        >
          <Image src="/svg/vitejs.svg" alt="Vite.js" width={32} height={32} />
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/60 group-hover:text-white">
            Vite.js
          </span>
        </div>
        {/* Tech Item: Node.js */}
        <div
          className="glass-card p-8 flex flex-col gap-5 items-center justify-center group hover:bg-white/10 transition-all duration-500 reveal"
          style={{ animationDelay: "0.45s" }}
        >
          <Image src="/svg/nodejs.svg" alt="Node.js" width={32} height={32} />
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/60 group-hover:text-white">
            Node.js
          </span>
        </div>
        {/* Tech Item: Tailwind */}
        <div
          className="glass-card p-8 flex flex-col gap-5 items-center justify-center group hover:bg-white/10 transition-all duration-500 reveal"
          style={{ animationDelay: "0.25s" }}
        >
          <Image
            src="/svg/tailwind.svg"
            alt="Tailwind"
            width={32}
            height={32}
          />
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/60 group-hover:text-white">
            Tailwind
          </span>
        </div>
        {/* Tech Item: Git */}
        <div
          className="glass-card p-8 flex flex-col gap-5 items-center justify-center group hover:bg-white/10 transition-all duration-500 reveal"
          style={{ animationDelay: "0.3s" }}
        >
          <Image src="/svg/git.svg" alt="Git" width={32} height={32} />
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/60 group-hover:text-white">
            Git
          </span>
        </div>
      </div>
    </section>
  );
}
