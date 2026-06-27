"use client";

import { useState, useEffect, useRef } from "react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { Sidebar } from "./Sidebar";
import { useTheme } from "@/hooks/useTheme";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Moon, Sun } from "lucide-react";

// Registration is now handled globally in lib/gsap-config.ts

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isSidebarOpen]);

  // 1. The "Hydration-Guard" (Mount State)
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  useGSAP(
    (context) => {
      // 2. Abort if React hasn't fully painted yet or refs are missing
      if (!isMounted || !navRef.current) return;

      // Lock centering natively
      gsap.set(navRef.current, { xPercent: -50 });

      let rafId1: number;
      let rafId2: number;

      // 3. Double-Raf Buffer for Layout Paint
      rafId1 = requestAnimationFrame(() => {
        rafId2 = requestAnimationFrame(() => {
          // 4. Guaranteed Context Execution - This ties the timeline securely to the component lifecycle
          context.add(() => {
            // 5. Defensive Ref Selection: Using a local scope selector
            const q = gsap.utils.selector(navRef);
            
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: document.documentElement,
                start: "top -50",
                end: "+=1",
                toggleActions: "play none none reverse",
              },
            });

            tl.to(
              navRef.current,
              {
                top: "14px",
                width: "80%",
                borderWidth: "1px",
                borderColor: "var(--nav-border)",
                backgroundColor: "var(--nav-bg)",
                boxShadow: "var(--nav-shadow)",
                duration: 0.6,
                ease: "power3.inOut",
              },
              0
            );

            tl.to(
              q(".nav-inner"),
              {
                paddingTop: "12px",
                paddingBottom: "12px",
                paddingLeft: "24px",
                paddingRight: "24px",
                duration: 0.6,
                ease: "power3.inOut",
              },
              0
            );

            tl.to(
              q(".nav-logo"),
              {
                scale: 0.95,
                duration: 0.6,
                ease: "power3.inOut",
              },
              0
            );
          });
        });
      });

      return () => {
        cancelAnimationFrame(rafId1);
        cancelAnimationFrame(rafId2);
        // context.revert() is handled automatically by useGSAP
      };
    },
    { scope: navRef, dependencies: [isMounted], revertOnUpdate: true } 
  );

  useEffect(() => {
    if (!linksContainerRef.current || !active) return;
    const activeEl = linksContainerRef.current.querySelector(
      `[data-id='${active}']`
    ) as HTMLElement;
    if (activeEl) {
      setIndicatorStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
        opacity: 1,
      });
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [active]);

  return (
    <>
      <nav
        ref={navRef}
        style={{
          "--nav-border": theme === "dark" ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.08)",
          "--nav-bg": theme === "dark" ? "rgba(10, 10, 10, 0.45)" : "rgba(255, 255, 255, 0.45)",
          "--nav-shadow": theme === "dark" ? "0 20px 40px -15px rgba(0, 0, 0, 0.7)" : "0 20px 40px -15px rgba(0, 0, 0, 0.1)",
          willChange: "transform, width, top, padding, background-color, border-color",
        } as React.CSSProperties}
        className="fixed z-[999] left-1/2 top-0 w-full backdrop-blur-3xl saturate-[180%] border border-transparent"
      >
        <div
          style={{ willChange: "padding" }}
          className="nav-inner flex justify-between items-center w-full max-w-screen-2xl mx-auto gap-8 px-10 py-7"
        >
          <div
            onClick={() => scrollTo("home")}
            className="nav-logo text-xl font-bold tracking-tighter text-on-background font-headline cursor-pointer origin-left will-change-transform"
          >
            Rabka.
          </div>

          <div
            ref={linksContainerRef}
            className="hidden lg:flex gap-10 items-center relative"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;

              return (
                <button
                  key={item.id}
                  data-id={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative uppercase text-[10px] font-bold tracking-[0.2em] font-headline pb-1 transition-colors
                    ${isActive
                      ? "text-on-background"
                      : "text-on-background/80 hover:text-on-background"
                    }`}
                >
                  {item.label}
                </button>
              );
            })}

            <div
              className="absolute bottom-0 h-px bg-on-background transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
                opacity: indicatorStyle.opacity,
              }}
            />
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={toggleTheme}
              className="group relative h-10 w-10 flex-shrink-0 bg-transparent hover:bg-surface transition-all duration-300 overflow-hidden active:scale-90"
              aria-label="Toggle Theme"
            >
              <div
                className="flex flex-col h-[200%] w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transform: `translateY(${theme === "dark" ? "0%" : "-50%"})`,
                }}
              >
                <div className="h-10 w-full flex items-center justify-center flex-shrink-0">
                  <Moon className="w-4 h-4 text-on-background" strokeWidth={1.5} />
                </div>

                <div className="h-10 w-full flex items-center justify-center flex-shrink-0">
                  <Sun className="w-4 h-4 text-on-background" strokeWidth={1.5} />
                </div>
              </div>
            </button>

            <button
              onClick={() => scrollTo("contact")}
              className="hidden md:block border border-outline text-on-background px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] bg-transparent hover:bg-on-background hover:text-background active:scale-95 transition-all duration-300"
            >
              Get in Touch
            </button>

            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex lg:hidden group items-center justify-center"
            >
              <div className="flex flex-col gap-1.5 items-end">
                <span className="w-8 h-[1.5px] bg-on-background" />
                <span className="w-6 h-[1.5px] bg-on-background" />
              </div>
            </button>
          </div>
        </div>
      </nav>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        items={NAV_ITEMS}
        scrollTo={scrollTo}
      />
    </>
  );
}