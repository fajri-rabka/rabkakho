"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function HeroKineticText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      let mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // 1. Kinetic Reveal Animation
        gsap.fromTo(
          ".kinetic-char",
          { yPercent: 120, rotationZ: 5, opacity: 0 },
          {
            yPercent: 0,
            rotationZ: 0,
            opacity: 1,
            duration: 1.2,
            ease: "expo.out",
            stagger: 0.04,
            delay: 0.1,
          }
        );

        // 2. Scroll Parallax & Fade
        gsap.to(containerRef.current, {
          yPercent: -20,
          scale: 0.95,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom -100%",
            scrub: true,
          },
        });

        // 3. Magnetic Mouse Effect
        const xTo = gsap.quickTo(textRef.current, "x", {
          duration: 0.8,
          ease: "power3.out",
        });
        const yTo = gsap.quickTo(textRef.current, "y", {
          duration: 0.8,
          ease: "power3.out",
        });

        const handleMouseMove = (e: MouseEvent) => {
          // Calculate distance from center of screen (subtle movement)
          const x = (e.clientX / window.innerWidth - 0.5) * 40;
          const y = (e.clientY / window.innerHeight - 0.5) * 40;
          xTo(x);
          yTo(y);
        };

        const handleMouseLeave = () => {
          xTo(0);
          yTo(0);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          window.removeEventListener("mousemove", handleMouseMove);
          window.removeEventListener("mouseleave", handleMouseLeave);
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.2, ease: "power2.out" }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={`w-full relative ${className}`}>
      <div
        ref={textRef}
        className="will-change-transform flex flex-wrap"
        aria-label={text}
        role="text"
      >
        {words.map((word, wordIdx) => (
          <span
            key={wordIdx}
            className="inline-block whitespace-nowrap mr-[0.25em]"
          >
            {word.split("").map((char, charIdx) => (
              <span
                key={charIdx}
                className="inline-block overflow-hidden align-bottom"
                aria-hidden="true"
              >
                <span className="kinetic-char inline-block will-change-transform origin-bottom-left">
                  {char}
                </span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
