"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function TextReveal({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      let mm = gsap.matchMedia();

      // Full animation for devices allowing motion (The Kinetic Split Text)
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".kinetic-char",
          { y: "120%", skewY: 8, opacity: 0 },
          {
            y: "0%",
            skewY: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
            stagger: 0.03,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Accessible fallback for reduced motion (Simple Opacity Fade)
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.fromTo(
          ".kinetic-char",
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.2,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <span
      ref={containerRef}
      className={`inline-flex flex-wrap ${className}`}
      // A11y: Retain the full text for screen readers
      aria-label={text}
      role="text"
    >
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          className="inline-block whitespace-nowrap mr-[0.25em]"
        >
          {word.split("").map((char, charIndex) => (
            <span
              key={charIndex}
              // The Mask: Crucial for the brutalist reveal effect
              className="inline-block overflow-hidden align-bottom"
              // A11y: Hide fragmented letters from screen readers
              aria-hidden="true"
            >
              <span className="kinetic-char inline-block will-change-transform origin-bottom-left">
                {char}
              </span>
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}
