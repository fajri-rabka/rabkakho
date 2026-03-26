"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const { active, scrollTo } = useScrollSpy(NAV_ITEMS.map((i) => i.id));
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{
        y: 0,
        top: isScrolled ? "30px" : "0px",
        width: isScrolled ? "90%" : "100%",
        borderRadius: isScrolled ? "100px" : "0px",
        borderColor: isScrolled
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(255, 255, 255, 0.5)",
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed z-50 left-1/2 -translate-x-1/2 bg-surface/80 backdrop-blur-xl border-x border-b transition-colors duration-300`}
    >
      <div
        className={`flex justify-between items-center px-10 transition-all duration-300 w-full max-w-screen-2xl mx-auto gap-10 ${isScrolled ? "py-4" : "py-8"}`}
      >
        <div className="text-xl font-bold tracking-tighter text-white font-headline">
          Rabka.
        </div>

        <div className="hidden md:flex gap-10 items-center relative">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;

            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative uppercase text-[10px] font-bold tracking-[0.2em] font-headline pb-1 transition-colors
                  ${
                    isActive ? "text-white" : "text-white/40 hover:text-white"
                  }`}
              >
                {item.label}

                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute left-0 bottom-0 h-[1px] w-full bg-white"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => scrollTo("contact")}
          className="bg-transparent border border-white rounded-full text-white px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black active:scale-95 transition-all duration-300 cursor-pointer"
        >
          Get in Touch
        </button>
      </div>
    </motion.nav>
  );
}
