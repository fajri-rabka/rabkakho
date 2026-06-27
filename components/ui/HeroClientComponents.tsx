"use client";

import { useEffect, useState, useRef } from "react";
import { useThemeContext } from "@/context/ThemeContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const words = ["MORE IMPACT.", "MORE POWER.", "MORE SPEED."];

export function AnimatedWord() {
  const { theme } = useThemeContext();
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wordTimer = setInterval(() => {
      // Brutalist snap exit before changing text
      gsap.to(wordRef.current, {
        yPercent: -100,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
        onComplete: () => {
          setIndex((prev) => (prev + 1) % words.length);
        },
      });
    }, 3500);
    return () => clearInterval(wordTimer);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          wordRef.current,
          { yPercent: 120, opacity: 0, rotationZ: 2 },
          {
            yPercent: 0,
            opacity: 1,
            rotationZ: 0,
            duration: 1,
            ease: "expo.out",
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.fromTo(
          wordRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: "power2.out" }
        );
      });
    },
    { scope: containerRef, dependencies: [index] }
  );

  return (
    <div
      ref={containerRef}
      className="relative h-[1.1em] overflow-hidden w-full flex items-end"
    >
      <div
        ref={wordRef}
        className={`absolute left-0 top-0 w-full bg-linear-to-r ${theme === "dark"
          ? "from-white to-neutral-600"
          : "from-black to-neutral-400"
          } bg-clip-text text-transparent will-change-transform origin-bottom-left`}
      >
        {words[index]}
      </div>
    </div>
  );
}

export function AnimatedDescription() {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      let mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.2, delay: 0.8, ease: "power3.out" }
        );
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.2, delay: 0.8, ease: "power2.out" }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <p
      ref={containerRef}
      className="text-sm md:text-xl text-on-background/70 leading-relaxed max-w-lg font-light opacity-0 will-change-transform"
    >
      I build efficient, scalable front-end solutions with clean architecture, focusing on performance, maintainability, and seamless user experience.
    </p>
  );
}

export function ScrollExploreLabel() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      let mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 1, delay: 1.2, ease: "power3.out" }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="opacity-0 flex items-center gap-4">
      <div className="w-12 md:w-24 h-px bg-on-background/30" />
      <span className="font-mono text-[9px] md:text-xs tracking-[0.4em] uppercase text-on-background/50 font-light whitespace-nowrap">
        Scroll to Explore
      </span>
    </div>
  );
}
