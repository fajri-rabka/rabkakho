"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

// Registration is now handled globally in lib/gsap-config.ts

const getScroller = () => {
  if (typeof window === "undefined") return undefined;
  return document.querySelector("[data-lenis-scroll]") ? "[data-lenis-scroll]" : window;
};

export function AboutLayoutWrapper({
  leftContent,
  rightContent,
}: {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}) {
  const containerRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  // 1. The "Hydration-Guard" (Mount State)
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  useGSAP(
    (context) => {
      // 2. Abort if React hasn't fully painted yet or refs are missing
      if (!isMounted || !containerRef.current || !pinRef.current) return;

      let rafId1: number;
      let rafId2: number;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        gsap.set(pinRef.current, { force3D: true, backfaceVisibility: "hidden" });

        // 3. Double-Raf Buffer for Layout Paint
        rafId1 = requestAnimationFrame(() => {
          rafId2 = requestAnimationFrame(() => {
            // 4. Guaranteed Context Execution
            context.add(() => {
              ScrollTrigger.create({
                trigger: containerRef.current!,
                start: "top top",
                end: "bottom bottom",
                pin: pinRef.current!,
                pinSpacing: true,
                pinType: "transform",
                invalidateOnRefresh: true,
                scroller: getScroller(),
                onRefresh: () => {
                  if (pinRef.current && pinRef.current.parentElement) {
                    const pinHeight = pinRef.current.offsetHeight;
                    pinRef.current.parentElement.style.minHeight = `${pinHeight}px`;
                  }
                }
              });
            });
          });
        });

        return () => {
          cancelAnimationFrame(rafId1);
          cancelAnimationFrame(rafId2);
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: containerRef, dependencies: [isMounted], revertOnUpdate: true }
  );

  return (
    <section
      ref={containerRef}
      className="w-full bg-background border-t border-outline relative grid grid-cols-1 lg:grid-cols-12 overflow-clip"
      id="about"
    >
      <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-12 pointer-events-none opacity-20 z-0 overflow-clip">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="hidden lg:block border-r border-outline h-full" />
        ))}
      </div>

      <div className="lg:col-span-7 border-r border-outline relative z-40 border-b border-outline lg:border-b-0 overflow-clip">
        <div ref={pinRef} className="h-[70vh] lg:h-screen flex flex-col justify-center w-full overflow-clip will-change-transform z-50">
          {leftContent}
        </div>
      </div>

      <div className="lg:col-span-5 relative z-10 flex flex-col overflow-clip">
        {rightContent}
      </div>
    </section>
  );
}

export function AboutKineticText({ text, className = "" }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const quickSetters = useRef<{
    x: gsap.QuickToFunc;
    y: gsap.QuickToFunc;
    scale: gsap.QuickToFunc;
    skew: gsap.QuickToFunc;
  }[]>([]);

  const words = text.split(" ");
  let charIndex = 0;
  const mappedWords = words.map((word) => {
    return word.split("").map((char) => {
      const index = charIndex++;
      return { char, index };
    });
  });

  // 1. The "Hydration-Guard" (Mount State)
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  useGSAP(
    (context) => {
      // 2. Abort if React hasn't fully painted yet or refs are missing
      if (!isMounted || !containerRef.current) return;

      const mm = gsap.matchMedia();
      let rafId1: number;
      let rafId2: number;

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const validChars = gsap.utils.toArray(charRefs.current).filter((el): el is HTMLSpanElement => el !== null);
        if (validChars.length === 0) return;

        // 3. Double-Raf Buffer for Layout Paint
        rafId1 = requestAnimationFrame(() => {
          rafId2 = requestAnimationFrame(() => {
            // 4. Guaranteed Context Execution
            context.add(() => {
              ScrollTrigger.create({
                trigger: containerRef.current!,
                start: "top 80%",
                scroller: getScroller(),
                onEnter: () => {
                  gsap.fromTo(
                    validChars,
                    { yPercent: 120, skewY: 8 },
                    {
                      yPercent: 0,
                      skewY: 0,
                      duration: 1.2,
                      ease: "power4.out",
                      stagger: 0.02,
                      onComplete: () => {
                        validChars.forEach((el, i) => {
                          if (el) {
                            quickSetters.current[i] = {
                              x: gsap.quickTo(el, "x", { duration: 0.4, ease: "power4.out" }),
                              y: gsap.quickTo(el, "y", { duration: 0.4, ease: "power4.out" }),
                              scale: gsap.quickTo(el, "scale", { duration: 0.4, ease: "power4.out" }),
                              skew: gsap.quickTo(el, "skewX", { duration: 0.4, ease: "power4.out" }),
                            };
                          }
                        });
                      }
                    }
                  );
                }
              });
            });
          });
        });

        return () => {
          cancelAnimationFrame(rafId1);
          cancelAnimationFrame(rafId2);
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        rafId1 = requestAnimationFrame(() => {
          rafId2 = requestAnimationFrame(() => {
            context.add(() => {
              ScrollTrigger.create({
                trigger: containerRef.current!,
                start: "top 80%",
                scroller: getScroller(),
                onEnter: () => {
                  gsap.fromTo(
                    containerRef.current!,
                    { opacity: 0 },
                    { opacity: 1, duration: 1.2, ease: "power2.out" }
                  );
                }
              });
            });
          });
        });

        return () => {
          cancelAnimationFrame(rafId1);
          cancelAnimationFrame(rafId2);
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: containerRef, dependencies: [isMounted], revertOnUpdate: true }
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (quickSetters.current.length === 0 || window.innerWidth < 768) return;

      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const radius = 250;

      charRefs.current.forEach((el, i) => {
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const setter = quickSetters.current[i];
        if (!setter) return;

        if (dist < radius) {
          const force = (radius - dist) / radius;
          const repelX = (dx / dist) * -1 * force * 50;
          const repelY = (dy / dist) * -1 * force * 50;
          const scale = 1 + (force * 0.4);
          const skew = (dx / radius) * force * 15;

          setter.x(repelX);
          setter.y(repelY);
          setter.scale(scale);
          setter.skew(skew);
        } else {
          setter.x(0);
          setter.y(0);
          setter.scale(1);
          setter.skew(0);
        }
      });
    };

    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <div ref={containerRef} className={`${className} flex flex-wrap w-[110%]`} aria-label={text}>
      {mappedWords.map((word, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.2em] mb-2 md:mb-0">
          {word.map((item) => (
            <span
              key={item.index}
              className="overflow-hidden inline-block align-bottom"
              aria-hidden="true"
            >
              <span
                ref={(el) => {
                  charRefs.current[item.index] = el;
                }}
                className="inline-block will-change-transform origin-center"
              >
                {item.char}
              </span>
            </span>
          ))}
        </span>
      ))}
    </div>
  );
}
