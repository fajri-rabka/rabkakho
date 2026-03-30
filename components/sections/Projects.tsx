"use client";

import { Project, ProjectsProps } from "@/lib/interfaces";
import { motion, type Variants } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import { ease } from "@/lib/motion";
import { ProjectCard } from "@/components/ui/ProjectCard";

const DEFAULT_PROJECTS: Project[] = [
  {
    id: "01",
    title: "Mokita Wahana Honda",
    category: "Apps & Web Development",
    subcategory: "Booking Services Apps",
    description:
      "A super app for Honda motorcycle enthusiasts to connect, share, and book services.",
    problem:
      "Booking a service was still done manually, people had to call dealers, wait in queue, and often follow up just to get a confirmation.",
    solution:
      "We built a single super app that lets users book services, explore dealer info, and engage with the community in one simple experience.",
    impact:
      "Service bookings shifted significantly to digital, with a 40% increase in adoption across regional dealers.",
    image: "images/projects/wahana-honda.webp",
    tags: ["React Native", "React JS", "Bitbucket", "Bootstrap"],
    link: "https://apps.apple.com/id/app/wahana-honda/id1502207230",
  },
  {
    id: "02",
    title: "Singapore Expo",
    category: "Web Development",
    subcategory: "Event Website",
    description: "A website for Singapore Expo event.",
    problem:
      "The previous website felt slow and outdated, causing users to leave before completing inquiry forms.",
    solution:
      "We redesigned and rebuilt the site to be faster, fully responsive, and better aligned with the premium events they host.",
    impact:
      "Bounce rate decreased noticeably, and event inquiries increased shortly after the new site went live.",
    image: "images/projects/singapore-expo.webp",
    tags: ["Figma", "HTML", "SASS", "Vanilla JavaScript"],
    link: "https://www.singaporeexpo.com.sg/",
  },
  {
    id: "03",
    title: "UNPAGE Indonesia",
    category: "Web Development",
    subcategory: "Organization Website",
    description: "A website for Unpage Indonesia organization.",
    problem:
      "Each program division managed its content separately, making the information scattered and inconsistent across the site.",
    solution:
      "We implemented a centralized CMS so all divisions could publish and manage content independently without developer support.",
    impact:
      "Five program divisions are now unified under one platform, making the website easier to manage and much more user-friendly for visitors.",
    image: "images/projects/unpage-indonesia.webp",
    tags: ["Figma", "HTML", "SASS", "Vanilla JavaScript"],
    link: "https://www.un-pageindonesia.org/id",
  },
];

const cinEase: [number, number, number, number] = [0.76, 0, 0.24, 1];

const textSlideUp: Variants = {
  hidden: { y: "110%", opacity: 0 },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  visible: (i: number): any => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 0.9, ease: cinEase, delay: i * 0.08 },
  }),
};

export function Projects({
  projects = DEFAULT_PROJECTS,
  label = "Works",
  title = "PROJECTS",
}: ProjectsProps) {
  const { theme } = useTheme();

  return (
    <section
      className="relative px-6 md:px-12 max-w-screen-2xl mx-auto py-28 md:py-40 overflow-hidden"
      id="work"
    >
      {/* ── Section header ── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mb-20 md:mb-28 grid grid-cols-1 md:grid-cols-12 gap-8 items-end"
      >
        {/* Left: label + title */}
        <div className="md:col-span-7">
          <div className="overflow-hidden mb-3">
            <motion.span
              variants={textSlideUp}
              custom={0}
              className="inline-flex items-center gap-3 font-label text-[10px] tracking-[0.4em] uppercase text-on-background/50"
            >
              {label}
            </motion.span>
          </div>

          <div className="overflow-hidden">
            <motion.h2
              variants={textSlideUp}
              custom={1}
              className="font-headline text-2xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-on-background"
            >
              {title}
            </motion.h2>
          </div>
        </div>

        {/* Right: count + brief */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.4 }}
          className="md:col-span-5 md:text-right"
        >
          <p className="text-xs lg:text-sm text-on-background/50 font-light leading-relaxed mb-3">
            Selected works showcasing design precision and meaningful execution.
          </p>
          <span className="font-label text-xs tracking-widest uppercase text-on-background/30">
            ({projects.length.toString().padStart(2, "0")}) Selected Works
          </span>
        </motion.div>
      </motion.div>

      {/* ── Project list ── */}
      <div className="flex flex-col items-center justify-center gap-16 md:gap-24">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            theme={theme}
          />
        ))}
      </div>
    </section>
  );
}

export function ProjectsPreview() {
  return <Projects />;
}
