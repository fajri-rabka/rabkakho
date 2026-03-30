import { Project } from "@/lib/interfaces";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type Variants,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

// Typed as BezierDefinition to satisfy Framer Motion's Easing type
const cinEase: [number, number, number, number] = [0.76, 0, 0.24, 1];

// ── Animation variants ────────────────────────────────────────────────────────

const clipReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    transition: { duration: 1.1, ease: cinEase },
  },
};

const textSlideUp: Variants = {
  hidden: { y: "110%", opacity: 0 },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  visible: (i: number): any => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 0.9, ease: cinEase, delay: i * 0.08 },
  }),
};

// ── Tag slug helper ───────────────────────────────────────────────────────────

const getSlug = (tag: string) =>
  tag
    .toLowerCase()
    .replace("react js", "react")
    .replace("react native", "react")
    .replace("vanilla javascript", "javascript")
    .replace("next js", "nextdotjs")
    .replace("next.js", "nextdotjs")
    .replace("ethers.js", "ethereum")
    .replace("tailwind", "tailwindcss")
    .replace("html", "html5")
    .replace(/\s+/g, "")
    .replace(/\./g, "");

export function ProjectCard({
  project,
  index,
  theme,
}: {
  project: Project;
  index: number;
  theme: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;
  const iconColor = theme === "dark" ? "ffffff" : "000000";

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y = useSpring(rawY, { stiffness: 60, damping: 20 });

  return (
    <motion.article
      ref={cardRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="relative w-full group"
    >
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-24 w-full">
        {/* ── IMAGE ── */}
        <div
          className={`w-full lg:w-[55%] relative ${
            isEven ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <motion.a
            href={project.link || "#"}
            target={project.link ? "_blank" : undefined}
            rel="noopener noreferrer"
            variants={clipReveal}
            className="block relative overflow-hidden bg-surface-variant group/link cursor-pointer w-full rounded-2xl md:rounded-4xl shadow-2xl"
            style={{ aspectRatio: "4/3" }}
          >
            {/* Gradient Overlay for Mood */}
            <div className="absolute inset-0 z-10 bg-linear-to-b from-transparent via-black/10 to-black/60 opacity-60 group-hover/link:opacity-80 transition-opacity duration-700 pointer-events-none" />

            {/* Cinematic Overlay Border */}
            <div className="absolute inset-0 z-20 border border-white/10 mix-blend-overlay rounded-2xl md:rounded-4xl pointer-events-none" />

            <motion.div
              style={{
                y,
                position: "absolute",
                top: -40,
                bottom: -40,
                left: 0,
                right: 0,
              }}
              className="will-change-transform"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover brightness-90 saturate-[0.80] group-hover/link:saturate-100 group-hover/link:brightness-100 group-hover/link:scale-105 transition-all duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] will-change-transform"
              />
            </motion.div>

            {/* Hover Explort Button */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 opacity-0 group-hover/link:opacity-100 scale-90 group-hover/link:scale-100 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] pointer-events-none">
              <div className="bg-black/60 backdrop-blur-md rounded-full px-6 py-3 flex items-center gap-3 border border-white/20 text-white shadow-2xl">
                <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold">
                  Explore
                </span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </motion.a>
        </div>

        {/* ── CONTENT ── */}
        <div
          className={`w-full lg:w-[45%] flex flex-col justify-center mt-6 lg:mt-0 ${
            isEven ? "lg:order-2" : "lg:order-1"
          }`}
        >
          {/* Subcategory & Prefix */}
          <motion.div
            custom={0}
            variants={textSlideUp}
            className="flex items-center gap-4 mb-4 lg:mb-6"
          >
            <span className="font-label text-[9px] md:text-[11px] tracking-[0.3em] uppercase text-primary font-bold opacity-50">
              {project.subcategory || project.category}
            </span>
          </motion.div>

          {/* Title */}
          <div className="overflow-hidden mb-6 lg:mb-8">
            <motion.h3
              custom={1}
              variants={textSlideUp}
              className="font-headline text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black tracking-tighter text-on-background leading-[1.1] hover:text-primary transition-colors duration-500"
            >
              <a
                href={project.link || "#"}
                target={project.link ? "_blank" : undefined}
                rel="noopener noreferrer"
              >
                {project.title}
              </a>
            </motion.h3>
          </div>

          {/* Description */}
          <motion.div
            custom={2}
            variants={textSlideUp}
            className="overflow-hidden mb-8 lg:mb-10"
          >
            <p className="text-xs md:text-sm text-on-background/70 font-light leading-relaxed max-w-lg lg:max-w-md">
              {project.description}
            </p>
          </motion.div>

          {/* Tech tags - Redesigned as sleek minimal list */}
          <motion.div
            custom={3}
            variants={textSlideUp}
            className="flex flex-wrap gap-x-6 gap-y-4"
          >
            {project.tags.map((tag) => (
              <div key={tag} className="flex items-center gap-2 group/tag">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-surface-variant flex items-center justify-center border border-outline/50 group-hover/tag:bg-on-background/5 group-hover/tag:border-on-background/20 transition-all duration-300">
                  <img
                    src={`https://cdn.simpleicons.org/${getSlug(tag)}/${iconColor}`}
                    alt={tag}
                    className="w-3.5 h-3.5 md:w-4 md:h-4 object-contain opacity-50 group-hover/tag:opacity-100 transition-opacity duration-300"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>
                <span className="text-[10px] md:text-[11px] tracking-widest uppercase text-on-background/60 group-hover/tag:text-on-background font-semibold transition-colors duration-300">
                  {tag}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}
