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

// Ultra smooth cinematic easing
const cinEase: [number, number, number, number] = [0.19, 1, 0.22, 1];

// ── Animation variants ────────────────────────────────────────────────────────

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.4, ease: cinEase },
  },
};

const imageReveal: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)", filter: "brightness(0.5)" },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    filter: "brightness(1)",
    transition: { duration: 1.6, ease: cinEase },
  },
};

const textSlideUp: Variants = {
  hidden: { y: "40%", opacity: 0, filter: "blur(8px)" },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  visible: (i: number): any => ({
    y: "0%",
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: cinEase, delay: i * 0.1 },
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

  // Smooth Parallax for image wrapper
  const rawY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y = useSpring(rawY, { stiffness: 40, damping: 15, mass: 0.5 });

  // Parallax for image scaling inward as you scroll past
  const rawScale = useTransform(scrollYProgress, [0, 1], [1.15, 1.02]);
  const scale = useSpring(rawScale, { stiffness: 40, damping: 15, mass: 0.5 });

  return (
    <motion.article
      ref={cardRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className="relative w-full group py-8"
    >
      {/* ── Outer wrapper line for luxury feel ── */}
      <motion.div
        variants={{
          hidden: { scaleY: 0, originY: 0, opacity: 0 },
          visible: {
            scaleY: 1,
            opacity: 0.2,
            transition: { duration: 1.5, ease: cinEase },
          },
        }}
        className={`absolute top-0 bottom-0 w-px bg-outline hidden lg:block ${isEven ? "left-[55%]" : "right-[55%]"}`}
      />

      <div className="flex flex-col lg:flex-row items-center gap-5 lg:gap-20 w-full relative z-10">
        {/* ── IMAGE ── */}
        <motion.div
          variants={cardReveal}
          className={`w-full lg:w-[55%] relative ${
            isEven ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <motion.a
            href={project.link || "#"}
            target={project.link ? "_blank" : undefined}
            rel="noopener noreferrer"
            variants={imageReveal}
            className="block relative overflow-hidden bg-surface-variant group/link cursor-pointer w-full rounded-2xl md:rounded-4xl shadow-[0_20px_40px_-20px_rgba(0,0,0,0.3)] will-change-transform"
            style={{ aspectRatio: "4/3" }}
          >
            {/* Gradient Overlay for Mood */}
            <div className="absolute inset-0 z-10 bg-linear-to-b from-transparent via-black/5 to-black/60 opacity-60 group-hover/link:opacity-80 transition-opacity duration-500 ease-out pointer-events-none" />

            {/* Cinematic Overlay Border */}
            <div className="absolute inset-0 z-20 border border-white/20 mix-blend-overlay rounded-2xl md:rounded-4xl pointer-events-none transition-colors duration-500 ease-out group-hover/link:border-white/40" />

            <motion.div
              style={{
                y,
                position: "absolute",
                top: -80,
                bottom: -80,
                left: 0,
                right: 0,
              }}
              className="will-change-transform bg-black"
            >
              <motion.img
                src={project.image}
                alt={project.title}
                style={{ scale }}
                className="w-full h-full object-cover brightness-[0.85] saturate-[0.85] group-hover/link:saturate-110 group-hover/link:brightness-110 transition-all duration-500 ease-out will-change-transform origin-center"
              />
            </motion.div>

            {/* Hover Explore Button */}

            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
              <div className="opacity-0 group-hover/link:opacity-100 scale-95 translate-y-2 group-hover/link:translate-y-0 group-hover/link:scale-100 transition-all duration-300 ease-out transform-gpu will-change-transform will-change-opacity">
                <div className="bg-black/30 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-3 border border-white/30 text-white shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                  <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold">
                    Explore
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Project ID subtle overlay over image */}
            <div className="absolute top-6 left-6 z-20 overflow-hidden">
              <motion.span
                variants={textSlideUp}
                className="block font-label text-[10px] tracking-[0.3em] uppercase text-white/70 mix-blend-overlay font-bold"
              >
                No. {project.id}
              </motion.span>
            </div>
          </motion.a>
        </motion.div>

        {/* ── CONTENT ── */}
        <div
          className={`w-full lg:w-[45%] flex flex-col justify-center mt-6 lg:mt-0 ${
            isEven ? "lg:order-2" : "lg:order-1"
          }`}
        >
          {/* Subcategory */}
          <div className="p-2 -m-2 overflow-hidden mb-4 lg:mb-6">
            <motion.div custom={0} variants={textSlideUp}>
              <span className="font-label text-[9px] md:text-[11px] tracking-[0.3em] uppercase text-primary font-bold opacity-70 block translate-y-3 group-hover:translate-y-0 transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)]">
                {project.subcategory || project.category}
              </span>
            </motion.div>
          </div>

          {/* Title */}
          <div className="p-4 -m-4 overflow-hidden mb-6 lg:mb-8 flex flex-col">
            <motion.h3
              custom={1}
              variants={textSlideUp}
              className="font-headline text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tighter text-on-background leading-[1.1] hover:text-primary transition-colors duration-500"
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
          <div className="p-4 -m-4 overflow-hidden mb-8 lg:mb-10">
            <motion.div custom={2} variants={textSlideUp}>
              <p className="text-xs md:text-sm text-on-background/70 font-light leading-relaxed max-w-lg lg:max-w-md group-hover:text-on-background/90 transition-colors duration-700">
                {project.description}
              </p>
            </motion.div>
          </div>

          {/* Tech tags - Sophisticated Floating Design */}
          <div className="p-4 -m-4 overflow-hidden">
            <motion.div
              custom={3}
              variants={textSlideUp}
              className="flex flex-wrap gap-x-6 gap-y-4"
            >
              {project.tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-2 group/tag cursor-default"
                >
                  <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center border border-outline/30 group-hover/tag:bg-primary/5 group-hover/tag:border-primary/20 transition-all duration-500 group-hover/tag:scale-110 shadow-sm">
                    <img
                      src={`https://cdn.simpleicons.org/${getSlug(tag)}/${iconColor}`}
                      alt={tag}
                      className="w-4 h-4 object-contain opacity-50 group-hover/tag:opacity-100 transition-opacity duration-300"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  </div>
                  <span className="text-[10px] tracking-widest uppercase text-on-background/50 group-hover/tag:text-on-background/90 font-semibold transition-colors duration-300">
                    {tag}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
