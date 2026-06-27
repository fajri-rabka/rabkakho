"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils/cn";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface AnimatedSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  stagger?: boolean;
  width?: "full" | "default";
}

export function AnimatedSection({
  children,
  className,
  stagger = false,
  width = "default",
  ...props
}: AnimatedSectionProps) {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reduced) return;

      const q = gsap.utils.selector(containerRef);

      if (stagger) {
        gsap.fromTo(
          q("> *"), // Target direct children
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      } else {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    },
    { scope: containerRef, dependencies: [stagger, reduced] }
  );

  if (reduced) {
    return (
      <div
        className={cn(
          "w-full",
          width === "default" && "max-w-7xl mx-auto",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full",
        width === "default" && "max-w-7xl mx-auto",
        !stagger ? "opacity-0" : "", // If not stagger, the container itself is animated
        className
      )}
      {...props}
    >
      {/* If stagger is true, children must manually start with opacity-0 if they don't want FOUC, or we can just let GSAP handle it immediately */}
      {children}
    </div>
  );
}
