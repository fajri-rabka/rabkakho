"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { Sidebar } from "./Sidebar";
import { useTheme } from "@/hooks/useTheme";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "work", label: "Works" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const { active, scrollTo } = useScrollSpy(NAV_ITEMS.map((i) => i.id));
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isSidebarOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{
          y: 0,
          top: isScrolled ? "14px" : "0px",
          width: isScrolled ? "80%" : "100%",
          borderRadius: "100px",
          borderWidth: isScrolled ? "1px" : "0px",
          borderColor: isScrolled
            ? theme === "dark"
              ? "rgba(255, 255, 255, 0.15)"
              : "rgba(0, 0, 0, 0.08)"
            : theme === "dark"
              ? "rgba(255, 255, 255, 0)"
              : "rgba(0, 0, 0, 0)",
          backgroundColor: isScrolled
            ? theme === "dark"
              ? "rgba(10, 10, 10, 0.45)"
              : "rgba(255, 255, 255, 0.45)"
            : theme === "dark"
              ? "rgba(0, 0, 0, 0)"
              : "rgba(255, 255, 255, 0)",
          boxShadow: isScrolled
            ? theme === "dark"
              ? "0 20px 40px -15px rgba(0, 0, 0, 0.7)"
              : "0 20px 40px -15px rgba(0, 0, 0, 0.1)"
            : "0 0 0 rgba(0, 0, 0, 0)",
        }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="fixed z-50 left-1/2 -translate-x-1/2 backdrop-blur-3xl saturate-[180%]"
      >
        <motion.div
          animate={{
            paddingTop: isScrolled ? "12px" : "28px",
            paddingBottom: isScrolled ? "12px" : "28px",
            paddingLeft: isScrolled ? "24px" : "40px",
            paddingRight: isScrolled ? "24px" : "40px",
          }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-between items-center w-full max-w-screen-2xl mx-auto gap-8"
        >
          <motion.div
            animate={{ scale: isScrolled ? 0.95 : 1 }}
            className="text-xl font-bold tracking-tighter text-on-background font-headline"
          >
            Rabka.
          </motion.div>

          <div className="hidden lg:flex gap-10 items-center relative">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative uppercase text-[10px] font-bold tracking-[0.2em] font-headline pb-1 transition-colors
                    ${
                      isActive
                        ? "text-on-background"
                        : "text-on-background/80 hover:text-on-background"
                    }`}
                >
                  {item.label}

                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute left-0 bottom-0 h-px w-full bg-on-background"
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

          <div className="flex items-center gap-6">
            <button
              onClick={toggleTheme}
              className="group relative h-10 w-10 rounded-full border border-outline bg-transparent hover:bg-surface transition-all duration-300 overflow-hidden active:scale-90"
              aria-label="Toggle Theme"
            >
              <div className="relative h-full w-full">
                <motion.div
                  initial={false}
                  animate={{
                    y: theme === "dark" ? "0%" : "100%",
                    opacity: theme === "dark" ? 1 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="absolute inset-0 flex items-center justify-center group transition-colors duration-500"
                >
                  <span className="material-symbols-outlined text-[20px] transition-colors duration-500">
                    dark_mode
                  </span>
                </motion.div>
                <motion.div
                  initial={false}
                  animate={{
                    y: theme === "light" ? "0%" : "-100%",
                    opacity: theme === "light" ? 1 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="absolute inset-0 flex items-center justify-center group transition-colors duration-500"
                >
                  <span className="material-symbols-outlined text-[20px] transition-colors duration-500">
                    light_mode
                  </span>
                </motion.div>
              </div>
            </button>

            <button
              onClick={() => scrollTo("contact")}
              className="hidden md:block border border-outline text-on-background rounded-full px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] bg-transparent hover:bg-on-background hover:text-background active:scale-95 transition-all duration-300"
            >
              Get in Touch
            </button>

            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex lg:hidden group items-center justify-center"
            >
              <div className="flex flex-col gap-1.5 items-end">
                <span className="w-8 h-[1.5px] bg-on-background rounded-full" />
                <span className="w-6 h-[1.5px] bg-on-background rounded-full" />
              </div>
            </button>
          </div>
        </motion.div>
      </motion.nav>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        items={NAV_ITEMS}
        scrollTo={scrollTo}
      />
    </>
  );
}
