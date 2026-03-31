"use client";

import { motion } from "framer-motion";
import { Project } from "@/lib/interfaces";
import { ArrowUpRight } from "lucide-react";

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

  return (
    <motion.div
      onClick={() => {
        if (isActive) setOpened(isOpened ? null : index);
      }}
      className="absolute w-[260px] md:w-[320px] lg:w-[450px] h-[340px] md:h-[400px] lg:h-[450px] rounded-[2rem]"
      style={{
        zIndex: isOpened ? 999 : isActive ? 500 : total - depth,
      }}
      animate={{
        x: offset,
        y: depth * 20,
        scale: isActive ? 1.05 : 1 - depth * 0.06,
        rotateZ: isActive ? 0 : clamped * 4,
        opacity: Math.abs(distance) > 2 ? 0 : isActive ? 1 : 0.5,
      }}
      transition={{
        type: "spring",
        stiffness: 90,
        damping: 18,
      }}
    >
      <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-black shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]">
        {/* IMAGE */}
        <motion.img
          src={project.image}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{
            filter: isOpened ? "grayscale(0%)" : "grayscale(100%)",
          }}
          transition={{ duration: 0.5 }}
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
        <motion.div
          animate={{ y: isOpened ? "0%" : "100%" }}
          transition={{
            type: "spring",
            stiffness: 110,
            damping: 20,
          }}
          className="absolute bottom-0 left-0 right-0 bg-black/90 backdrop-blur-2xl border-t border-white/10 p-6 md:p-8 z-20"
        >
          <div className="w-12 h-1 bg-white/10 rounded-full mx-auto mb-5" />

          <p className="text-xs md:text-sm text-white/80 mb-5">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-3 md:gap-4">
            {project.tags.map((tag) => (
              <div key={tag} className="flex items-center gap-2">
                <div className="w-6 h-6 flex items-center justify-center border border-white/20 rounded-full">
                  <img
                    src={`https://cdn.simpleicons.org/${getSlug(tag)}/ffffff`}
                    className="w-3 h-3"
                  />
                </div>
                <span className="text-[9px] uppercase tracking-widest text-white/60">
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
        </motion.div>
      </div>
    </motion.div>
  );
}
