"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Download } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function FloatingLetter({
  char,
  index,
}: {
  char: string;
  index: number;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Quick setters for smooth spring-like cursor tracking
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(
    () => {
      xTo.current = gsap.quickTo(containerRef.current, "x", {
        duration: 0.8,
        ease: "elastic.out(1, 0.3)",
      });
      yTo.current = gsap.quickTo(containerRef.current, "y", {
        duration: 0.8,
        ease: "elastic.out(1, 0.3)",
      });

      let mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!isHovered) {
          gsap.to(containerRef.current, {
            y:
              index % 3 === 0
                ? -45
                : index % 3 === 1
                  ? -35
                  : -25,
            rotation: index % 2 === 0 ? 10 : -10,
            duration: 3 + (index % 4),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        } else {
          gsap.killTweensOf(containerRef.current, "y,rotation");
          gsap.to(containerRef.current, { rotation: 0, duration: 0.5 });
        }
      });

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [isHovered] }
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = 100;
    const force = Math.max(0, 1 - distance / maxDistance);

    const strength = 300;

    xTo.current?.(-dx * force * (strength / 100));
    yTo.current?.(-dy * force * (strength / 100));

    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    xTo.current?.(0);
    yTo.current?.(0);
    setIsHovered(false);
  };

  return (
    <span
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block px-1 md:px-2 relative cursor-pointer select-none transition-colors hover:text-on-background text-on-background/90 will-change-transform"
    >
      {char === " " ? "\u00A0\u00A0" : char}
    </span>
  );
}

export function AnimatedParagraph({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      let mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0, y: 30, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
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
    <p ref={containerRef} className={`${className} opacity-0`}>
      {children}
    </p>
  );
}

export function AnimatedBox({
  children,
  className,
  delay,
}: {
  children: React.ReactNode;
  className?: string;
  delay: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      let mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0, y: 30, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            delay: delay,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.2,
            delay: delay,
            ease: "power2.out",
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
    <div ref={containerRef} className={`${className} opacity-0`}>
      {children}
    </div>
  );
}

export function AnimatedDownloadButton() {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      let mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0, y: 30, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            delay: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.2,
            delay: 0.4,
            ease: "power2.out",
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

  const handleMouseEnter = () => {
    gsap.to(iconRef.current, {
      y: -5,
      yoyo: true,
      repeat: 3,
      duration: 0.2,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    gsap.killTweensOf(iconRef.current);
    gsap.to(iconRef.current, { y: 0, duration: 0.2 });
  };

  return (
    <a
      ref={containerRef}
      href="/cv/fajri-cv.pdf"
      download
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group flex items-center gap-4 w-full cursor-pointer opacity-0"
    >
      <div className="relative overflow-hidden border border-outline px-8 lg:py-4 pt-2 pb-4 bg-transparent hover:bg-on-background transition-colors duration-500 ease-out flex-1 flex justify-center items-center rounded-none">
        <span className="relative z-10 text-[.6rem] md:text-[10px] font-bold uppercase tracking-[0.3em] font-mono text-on-background group-hover:text-background transition-colors duration-500">
          [DOWNLOAD_CV]
        </span>
        <div className="absolute inset-0 bg-on-background scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left" />
      </div>

      <div className="w-12 h-12 lg:w-[60px] lg:h-[60px] rounded-none border border-outline flex items-center justify-center bg-transparent group-hover:bg-on-background transition-colors duration-500 ease-out overflow-hidden flex-shrink-0">
        <div
          ref={iconRef}
          className="group-hover:text-background text-on-background transition-colors duration-500 will-change-transform"
        >
          <Download size={20} strokeWidth={1.5} />
        </div>
      </div>
    </a>
  );
}

export function FadeInTag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      let mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          }
        );
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <span ref={containerRef} className={`${className} opacity-0`}>
      {children}
    </span>
  );
}
