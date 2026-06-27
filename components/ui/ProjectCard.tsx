"use client";

import { useRef } from "react";
import { Project } from "@/lib/interfaces";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const getSlug = (tag: string) =>
  tag
    .toLowerCase()
    .replace("react js", "react")
    .replace("react native", "react")
    .replace("vanilla javascript", "javascript")
    .replace("next js", "nextdotjs")
    .replace("next.js", "nextdotjs")
    .replace("tailwind", "tailwindcss")
    .replace("html", "html5")
    .replace(/\s+/g, "")
    .replace(/\./g, "");

export function ProjectCard({
  project,
  index,
  total,
  active,
  opened,
  setOpened,
}: {
  project: Project;
  index: number;
  total: number;
  active: number;
  opened: number | null;
  setOpened: (i: number | null) => void;
}) {
  const isActive = active === index;
  const isOpened = opened === index;

  const distance = index - active;
  const clamped = Math.max(-2, Math.min(2, distance));

  const offset = clamped * 220;
  const depth = Math.abs(index - active);

  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      let mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Card positioning
        gsap.to(cardRef.current, {
          x: offset,
          y: depth * 20,
          scale: isActive ? 1.05 : 1 - depth * 0.06,
          rotationZ: isActive ? 0 : clamped * 4,
          opacity: Math.abs(distance) > 2 ? 0 : isActive ? 1 : 0.5,
          zIndex: isOpened ? 999 : isActive ? 500 : total - depth,
          duration: 0.8,
          ease: "elastic.out(1, 0.75)",
        });

        // Image grayscale filter
        gsap.to(imgRef.current, {
          filter: isOpened ? "grayscale(0%)" : "grayscale(100%)",
          duration: 0.5,
          ease: "power2.out",
        });

        // Drawer animation
        gsap.to(drawerRef.current, {
          y: isOpened ? "0%" : "100%",
          duration: 0.6,
          ease: "power3.out",
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.to(cardRef.current, {
          opacity: Math.abs(distance) > 2 ? 0 : isActive ? 1 : 0.5,
          zIndex: isOpened ? 999 : isActive ? 500 : total - depth,
          duration: 0.5,
          ease: "power2.out",
        });

        gsap.to(drawerRef.current, {
          y: isOpened ? "0%" : "100%",
          duration: 0.5,
          ease: "power2.out",
        });
      });
    },
    { dependencies: [isActive, isOpened, offset, depth, clamped, distance, total] }
  );

  return (
    <div
      ref={cardRef}
      onClick={() => {
        if (isActive) setOpened(isOpened ? null : index);
      }}
      className="absolute w-[260px] md:w-[320px] lg:w-[450px] h-[340px] md:h-[400px] lg:h-[450px] will-change-transform opacity-0 cursor-pointer"
    >
      <div className="relative w-full h-full overflow-hidden bg-background border border-outline">
        {/* IMAGE */}
        <img
          ref={imgRef}
          src={project.image}
          className="absolute inset-0 w-full h-full object-cover will-change-filter"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />

        {/* TITLE */}
        <div className="absolute bottom-0 p-6 md:p-8 z-10">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
            {project.title}
          </h3>

          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/60">
            {project.subcategory || project.category}
          </span>
        </div>

        {/* DRAWER */}
        <div
          ref={drawerRef}
          className="absolute bottom-0 left-0 right-0 bg-background border-t border-outline p-6 md:p-8 z-20 will-change-transform translate-y-[100%]"
        >
          <p className="text-xs md:text-sm text-on-background/80 mb-5">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-3 md:gap-4">
            {project.tags.map((tag) => (
              <div key={tag} className="flex items-center gap-2">
                <div className="w-6 h-6 flex items-center justify-center border border-outline rounded-none bg-on-background/5">
                  <img
                    src={`https://cdn.simpleicons.org/${getSlug(tag)}/ffffff`}
                    className="w-3 h-3 grayscale contrast-200"
                  />
                </div>
                <span className="text-[9px] uppercase tracking-widest text-on-background/60">
                  {tag}
                </span>
              </div>
            ))}
          </div>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              className="mt-5 inline-flex items-center gap-2 text-white text-xs tracking-widest uppercase"
            >
              Explore <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
