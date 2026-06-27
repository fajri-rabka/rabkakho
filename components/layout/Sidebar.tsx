"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { X, ArrowRight } from "lucide-react";
import { GithubIcon, LinkedInIcon, InstagramIcon } from "@/components/ui/Icons";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: { id: string; label: string }[];
  scrollTo: (id: string) => void;
}

export function Sidebar({ isOpen, onClose, items, scrollTo }: SidebarProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(containerRef);
      if (isOpen) {
        gsap.set(containerRef.current, {
          display: "flex",
          pointerEvents: "auto",
        });

        const tl = gsap.timeline();

        tl.fromTo(
          containerRef.current,
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, duration: 1.2, ease: "power3.inOut" }
        );

        tl.fromTo(
          q(".nav-item"),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.1 },
          "-=0.6"
        );

        tl.fromTo(
          q(".footer-item"),
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.8"
        );
      } else {
        gsap.to(containerRef.current, {
          opacity: 0,
          scale: 1.05,
          duration: 0.8,
          ease: "power3.inOut",
          onComplete: () => {
            gsap.set(containerRef.current, {
              display: "none",
              pointerEvents: "none",
            });
          },
        });
      }
    },
    { dependencies: [isOpen], scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full bg-surface/95 backdrop-blur-3xl z-[9999] flex flex-col will-change-transform opacity-0 pointer-events-none"
      style={{ display: "none" }}
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
          <button
            key={item.id}
            onClick={() => {
              scrollTo(item.id);
              onClose();
            }}
            className="nav-item group relative opacity-0"
            onMouseEnter={(e) => {
              const line = e.currentTarget.querySelector(".nav-line");
              gsap.to(line, { scaleX: 1, duration: 0.8, ease: "power3.out" });
            }}
            onMouseLeave={(e) => {
              const line = e.currentTarget.querySelector(".nav-line");
              gsap.to(line, { scaleX: 0, duration: 0.8, ease: "power3.out" });
            }}
          >
            <div className="overflow-hidden relative flex items-center justify-center">
              <span className="text-5xl md:text-[7rem] lg:text-[9rem] font-extrabold tracking-tighter leading-[0.9] text-on-background/20 group-hover:text-on-background transition-all duration-700 ease-[0.16, 1, 0.3, 1] inline-block">
                {item.label}
              </span>

              {/* Decorative underline effect */}
              <div className="nav-line absolute bottom-4 left-0 right-0 h-[2px] bg-on-background origin-left scale-x-0 will-change-transform" />
            </div>

            {/* Repel Effect Panah */}
            <span className="absolute -right-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:right-[-60px] transition-all duration-700 ease-[0.16, 1, 0.3, 1] text-on-background hidden lg:block">
              <ArrowRight size={48} strokeWidth={1} />
            </span>
          </button>
        ))}
      </nav>

      {/* Bottom Footer Info */}
      <div className="footer-item p-10 md:p-16 flex flex-col md:flex-row justify-between items-center gap-8 mt-auto opacity-0">
        <div className="flex gap-10 md:gap-12">
          {[
            {
              Icon: GithubIcon,
              h: "https://github.com/fajri-rabka",
            },
            {
              Icon: LinkedInIcon,
              h: "https://www.linkedin.com/in/fajrirabka",
            },
            {
              Icon: InstagramIcon,
              h: "https://www.instagram.com/fajri.rabka",
            },
          ].map((link, i) => (
            <a
              key={i}
              href={link.h}
              target="_blank"
              className="group relative flex flex-col items-center gap-2"
              onMouseEnter={(e) =>
                gsap.to(e.currentTarget, {
                  y: -5,
                  duration: 0.3,
                  ease: "back.out(1.7)",
                })
              }
              onMouseLeave={(e) =>
                gsap.to(e.currentTarget, {
                  y: 0,
                  duration: 0.3,
                  ease: "power2.out",
                })
              }
            >
              <div className="opacity-50 group-hover:opacity-100 transition-all duration-500 will-change-transform">
                <link.Icon size={20} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
