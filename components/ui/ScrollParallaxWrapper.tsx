"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function ScrollParallaxWrapper({
  children,
  withParallax = false,
  background,
  className,
  id,
  ...props
}: {
  children: React.ReactNode;
  withParallax?: boolean;
  background?: React.ReactNode;
  className?: string;
  id?: string;
  [key: string]: any;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (withParallax) {
        let mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
          // Parallax background (slower than scroll)
          gsap.to(".parallax-bg", {
            y: 80,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });

          // Parallax text (faster than scroll) + fade out
          gsap.to(".parallax-content", {
            y: -40,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        });
        return () => mm.revert();
      }
    },
    { scope: containerRef }
  );

  if (withParallax) {
    return (
      <section ref={containerRef} id={id} className={className}>
        {background && (
          <div className="absolute inset-0 parallax-bg will-change-transform">
            {background}
          </div>
        )}
        <div
          className="relative z-10 w-full max-w-4xl parallax-content will-change-transform"
          {...props}
        >
          {children}
        </div>
      </section>
    );
  }

  // Fallback to regular div for other sections
  return (
    <div {...props} className={className}>
      {children}
    </div>
  );
}
