"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import Image from "next/image";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: { id: string; label: string }[];
  scrollTo: (id: string) => void;
}

export function Sidebar({ isOpen, onClose, items, scrollTo }: SidebarProps) {
  const containerVariants = {
    closed: {
      opacity: 0,
      scale: 1.05,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: 30 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4 + i * 0.1,
        duration: 1,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    }),
  };

  const footerVariants = {
    closed: { opacity: 0, y: 10 },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1,
        duration: 1,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={containerVariants}
          className="fixed inset-0 w-full h-full bg-surface/95 backdrop-blur-3xl z-[100] flex flex-col"
        >
          {/* Close Area / Header */}
          <div className="absolute top-0 left-0 right-0 p-10 md:p-16 flex justify-end items-end z-10">
            <button
              onClick={onClose}
              className="group flex items-center gap-4 text-on-background/60 hover:text-on-background transition-all duration-500"
            >
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                Close Menu
              </span>
              <div className="w-12 h-12 rounded-full border border-outline flex items-center justify-center bg-on-background/5 group-hover:bg-on-background group-hover:text-background transition-all duration-700 ease-[0.16, 1, 0.3, 1] rotate-[-90deg] group-hover:rotate-0">
                <X size={20} />
              </div>
            </button>
          </div>

          {/* Centered Navigation */}
          <nav className="flex-grow flex flex-col items-center justify-center gap-6 md:gap-10">
            {items.map((item, i) => (
              <motion.button
                key={item.id}
                custom={i}
                variants={itemVariants}
                onClick={() => {
                  scrollTo(item.id);
                  onClose();
                }}
                className="group relative"
              >
                <div className="overflow-hidden relative flex items-center justify-center">
                  <span className="text-5xl md:text-[7rem] lg:text-[9rem] font-extrabold tracking-tighter leading-[0.9] text-on-background/20 group-hover:text-on-background transition-all duration-700 ease-[0.16, 1, 0.3, 1] inline-block">
                    {item.label}
                  </span>

                  {/* Decorative underline/cross effect */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    className="absolute bottom-4 left-0 right-0 h-[2px] bg-on-background origin-left"
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>

                {/* Repel Effect Panah */}
                <span className="absolute -right-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:right-[-60px] transition-all duration-700 ease-[0.16, 1, 0.3, 1] text-on-background hidden lg:block">
                  <ArrowRight size={48} strokeWidth={1} />
                </span>
              </motion.button>
            ))}
          </nav>

          {/* Bottom Footer Info */}
          <motion.div
            variants={footerVariants}
            className="p-10 md:p-16 flex flex-col md:flex-row justify-end items-center gap-8"
          >
            <div className="flex gap-10 md:gap-16">
              {[
                {
                  l: "/svg/github.svg",
                  h: "https://github.com/fajri-rabka",
                },
                {
                  l: "/svg/linkedin.svg",
                  h: "https://www.linkedin.com/in/fajrirabka",
                },
                {
                  l: "/svg/gmail.svg",
                  h: "https://www.instagram.com/fajri.rabka",
                },
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.h}
                  target="_blank"
                  className="group flex flex-col items-center gap-2"
                >
                  <Image
                    src={link.l}
                    alt={link.l}
                    width={20}
                    height={20}
                    className=" opacity-50 group-hover:opacity-100 transition duration-500"
                  />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
