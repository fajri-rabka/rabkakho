import { Project } from "@/lib/interfaces";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type Variants,
} from "framer-motion";
import { ExternalLink } from "lucide-react";
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

// textSlideUp uses `custom` prop for staggered delay.
// To stay TS-safe we cast the function variant as Variants.
const textSlideUp: Variants = {
  hidden: { y: "110%", opacity: 0 },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  visible: (i: number): any => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 0.9, ease: cinEase, delay: i * 0.08 },
  }),
};

const lineExpand: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.0, ease: cinEase, delay: 0.2 },
  },
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

  /**
   * Parallax: the inner wrapper shifts ±40px.
   * The wrapper is inset by -40px top & bottom so the image ALWAYS fills
   * the container regardless of translation — no clipping artifacts.
   */
  const rawY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y = useSpring(rawY, { stiffness: 60, damping: 20 });

  return (
    <motion.article
      ref={cardRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="relative"
    >
      {/* Divider line with cinematic reveal */}
      <motion.div
        variants={lineExpand}
        className="w-full h-px bg-outline mb-12 md:mb-16"
      />

      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-16 items-center ${
          isEven ? "" : "lg:[direction:rtl]"
        }`}
      >
        {/* ── IMAGE ── */}
        <motion.div
          variants={clipReveal}
          className="lg:col-span-7 relative overflow-hidden rounded-2xl bg-surface-variant"
          style={{ aspectRatio: "16/10" }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 z-10 bg-linear-to-br from-black/20 via-transparent to-black/40 pointer-events-none" />

          {/*
            Parallax image wrapper.
            Sits at top:-40px / bottom:-40px so even after y has moved ±40px
            it still fully covers the container. overflow-hidden on the outer
            motion.div clips any excess — zero gaps, zero white space.
          */}
          {/*
            One single motion.div: negative top/bottom inset absorbs the full
            ±40 px parallax travel — the image always covers the container.
          */}
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
              className="w-full h-full object-cover brightness-[0.88] transition-[filter] duration-700"
            />
          </motion.div>

          {/* Hover visit-link overlay */}
          <a
            href={project.link || "#"}
            target={project.link ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="absolute inset-0 z-20 flex items-end p-6 opacity-0 hover:opacity-100 transition-opacity duration-500 bg-linear-to-t from-black/70 via-black/20 to-transparent group/link"
          >
            <span className="flex items-center gap-2 text-white text-xs tracking-[0.2em] uppercase font-semibold translate-y-3 group-hover/link:translate-y-0 transition-transform duration-500">
              <ExternalLink className="w-3.5 h-3.5" />
              View Project
            </span>
          </a>
        </motion.div>

        {/* ── CONTENT ── */}
        <div
          className={`lg:col-span-5 flex flex-col justify-center pt-8 lg:pt-0 ${
            isEven ? "" : "[direction:ltr]"
          }`}
        >
          {/* Category */}
          <motion.div
            custom={0}
            variants={textSlideUp}
            className="overflow-hidden mb-6"
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.35em] uppercase text-on-background/50">
              {project.category}
            </span>
          </motion.div>

          {/* Title */}
          <div className="overflow-hidden mb-6">
            <motion.h3
              custom={1}
              variants={textSlideUp}
              className="font-headline text-2xl md:text-3xl xl:text-4xl font-extrabold tracking-tight text-on-background leading-tight"
            >
              {project.title}
            </motion.h3>
          </div>

          {/* Tech tags */}
          <motion.div
            custom={2}
            variants={textSlideUp}
            className="flex flex-wrap gap-2 mb-8"
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                title={tag}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-outline bg-surface text-[10px] tracking-wide uppercase text-on-background/60 font-medium hover:border-on-background/30 hover:text-on-background transition-all duration-300"
              >
                <img
                  src={`https://cdn.simpleicons.org/${getSlug(tag)}/${iconColor}`}
                  alt={tag}
                  className="w-3 h-3 object-contain opacity-70"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Storytelling rows */}
          <motion.div custom={3} variants={textSlideUp} className="space-y-5">
            {(
              [
                {
                  label: "Problem",
                  text: project.problem || project.description,
                  accent: false,
                },
                { label: "Solution", text: project.solution, accent: false },
                { label: "Impact", text: project.impact, accent: true },
              ] as { label: string; text?: string; accent: boolean }[]
            ).map(({ label, text, accent }) =>
              text ? (
                <div key={label} className="flex gap-5 items-start">
                  <span className="text-[9px] tracking-[0.25em] uppercase text-on-background/35 font-semibold pt-1 w-14 shrink-0">
                    {label}
                  </span>
                  <p
                    className={`text-sm leading-relaxed ${
                      accent
                        ? "text-on-background font-semibold"
                        : "text-on-background/70 font-light"
                    }`}
                  >
                    {text}
                  </p>
                </div>
              ) : null,
            )}
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}
