"use client";
import { useState, useEffect, useRef } from "react";
import {
  ReactIcon,
  NextjsIcon,
  VueIcon,
  ViteIcon,
  NodejsIcon,
  TailwindIcon,
  GitIcon,
} from "@/components/ui/Icons";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

// Registration is centrally handled in lib/gsap-config.ts

const TECH_DATA = [
  { name: "React", Icon: ReactIcon, version: "v19.0 LTS" },
  { name: "Next.js", Icon: NextjsIcon, version: "v15.0" },
  { name: "Vue.js", Icon: VueIcon, version: "v3.0" },
  { name: "Vite", Icon: ViteIcon, version: "v5.0" },
  { name: "Node.js", Icon: NodejsIcon, version: "v20.0 LTS" },
  { name: "Tailwind", Icon: TailwindIcon, version: "v4.0" },
  { name: "Git", Icon: GitIcon, version: "v2.0" },
  { name: "Empty", Icon: null, version: "// VOID" },
];

function TechCard({ tech, index }: { tech: typeof TECH_DATA[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const xTo = useRef<any>();
  const yTo = useRef<any>();
  const glitchTween = useRef<gsap.core.Tween>();

  // Hydration Guard
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  useGSAP(
    (context) => {
      // Abort if not fully painted or missing refs
      if (!isMounted || !cardRef.current || !contentRef.current) return;

      let rafId1: number;
      let rafId2: number;

      rafId1 = requestAnimationFrame(() => {
        rafId2 = requestAnimationFrame(() => {
          context.add(() => {
            // Data-Entry Scroll Entrance
            ScrollTrigger.create({
              trigger: cardRef.current,
              start: "top 95%",
              onEnter: () => {
                gsap.fromTo(
                  cardRef.current,
                  { opacity: 0, y: 40, skewX: 10 },
                  {
                    opacity: 1,
                    y: 0,
                    skewX: 0,
                    duration: 0.4,
                    delay: index * 0.05,
                    ease: "power4.out",
                  }
                );
              }
            });

            // Mouse follow setup for content
            xTo.current = gsap.quickTo(contentRef.current, "xPercent", { duration: 0.4, ease: "power3.out" });
            yTo.current = gsap.quickTo(contentRef.current, "yPercent", { duration: 0.4, ease: "power3.out" });
          });
        });
      });

      return () => {
        cancelAnimationFrame(rafId1);
        cancelAnimationFrame(rafId2);
      };
    },
    { scope: cardRef, dependencies: [isMounted], revertOnUpdate: true }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tech.Icon || window.innerWidth < 768) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    
    const xMove = (dx / (rect.width / 2)) * 15;
    const yMove = (dy / (rect.height / 2)) * 15;
    
    xTo.current?.(xMove);
    yTo.current?.(yMove);
  };

  const handleMouseEnter = () => {
    if (!tech.Icon || !contentRef.current) return;
    
    if (glitchTween.current) glitchTween.current.kill();
    glitchTween.current = gsap.to(contentRef.current, {
      x: () => gsap.utils.random(-2, 2),
      y: () => gsap.utils.random(-2, 2),
      duration: 0.03,
      yoyo: true,
      repeat: 5,
      onComplete: () => {
        gsap.set(contentRef.current, { x: 0, y: 0 });
      }
    });
  };

  const handleMouseLeave = () => {
    if (!tech.Icon || !contentRef.current) return;
    
    xTo.current?.(0);
    yTo.current?.(0);
    
    if (glitchTween.current) glitchTween.current.kill();
    gsap.set(contentRef.current, { x: 0, y: 0 });
  };

  if (!tech.Icon) {
    return (
      <div
        ref={cardRef}
        className="tech-card col-span-1 opacity-0 aspect-square border-[1px] border-on-background/30 flex items-center justify-center bg-transparent overflow-hidden min-w-0 p-[clamp(0.5rem,2vw,1.5rem)] rounded-none"
      >
        <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-on-background/20 rotate-45 whitespace-nowrap">
          {tech.version}
        </span>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="tech-card col-span-1 relative opacity-0 aspect-square flex flex-col justify-center border-[1px] border-on-background/30 bg-background hover:bg-on-background cursor-crosshair transition-colors duration-0 overflow-hidden min-w-0 group rounded-none"
    >
      <span 
        title={tech.version}
        className="absolute top-[clamp(0.5rem,2vw,1.5rem)] right-[clamp(0.5rem,2vw,1.5rem)] font-mono text-[9px] tracking-tight uppercase text-on-background/50 pointer-events-none group-hover:text-background/50 transition-colors duration-0 z-10 truncate max-w-[80%]"
      >
        [{tech.version}]
      </span>
      <div 
        ref={contentRef}
        className="flex flex-col items-center justify-center p-[clamp(0.5rem,2vw,1.5rem)] pointer-events-none w-full relative z-20 min-w-0 will-change-transform"
      >
        <div
          className="relative w-8 h-8 md:w-12 md:h-12 flex items-center justify-center text-on-background group-hover:text-background mb-4 transition-colors duration-0"
        >
          <tech.Icon size={48} />
        </div>
        <span
          title={tech.name}
          className="font-headline text-[clamp(0.75rem,2vw,1rem)] font-medium tracking-tight uppercase text-on-background group-hover:text-background leading-tight text-center transition-colors duration-0 w-full px-2 truncate block"
        >
          {tech.name}
        </span>
      </div>
    </div>
  );
}

export function TechStackGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 min-w-0 w-full h-full relative overflow-visible gap-0">
      {TECH_DATA.map((tech, i) => (
        <TechCard key={tech.name + i} tech={tech} index={i} />
      ))}
    </div>
  );
}

export function TechStackTitle() {
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const titles = ["MODERN TOOLS.", "REAL RESULTS.", "NEXT GEN TECH."];

  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!titleRef.current) return;
      gsap.to(titleRef.current, {
        y: "-110%",
        opacity: 0,
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => {
          setIndex((prev) => (prev + 1) % titles.length);
        },
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Hydration Guard
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  useGSAP(
    (context) => {
      if (!isMounted || !titleRef.current) return;

      context.add(() => {
        gsap.fromTo(
          titleRef.current,
          { y: "110%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.8, ease: "power3.inOut" }
        );
      });
    },
    { dependencies: [index, isMounted], revertOnUpdate: true }
  );

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
    <div className="relative h-15 md:h-24 overflow-visible w-full">
      <h2
        ref={titleRef}
        className="font-headline text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.04em] absolute flex items-center whitespace-nowrap text-on-background opacity-0 will-change-transform uppercase leading-none"
      >
        {titles[index].slice(0, charIndex)}
        <span className="inline-block w-[12px] h-[0.7em] bg-primary ml-2 animate-pulse" />
      </h2>
    </div>
  );
}
