"use client";

import { Project, ProjectsProps } from "@/lib/interfaces";
import { motion, type Variants } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import { ProjectCard } from "@/components/ui/ProjectCard";

const DEFAULT_PROJECTS: Project[] = [
  {
    id: "01",
    title: "Mokita Wahana Honda",
    category: "Apps & Web Development",
    subcategory: "Booking Services Apps",
    description:
      "Worked as Frontend Developer in a team building a motorcycle service booking platform for Honda dealers. My responsibility was developing the mobile app booking flow, web dashboard admin, integrating dealer service data into a unified experience. The new system reduced manual booking dependency and increased digital adoption by 40% across regional dealers",
    image: "images/projects/wahana-honda.webp",
    tags: ["React Native", "React JS", "Bitbucket", "Bootstrap"],
    link: "https://apps.apple.com/id/app/wahana-honda/id1502207230",
  },
  {
    id: "02",
    title: "Singapore Expo",
    category: "Web Development",
    subcategory: "Event Website",
    description:
      "Redesigned and rebuilt the Singapore Expo website to improve performance, usability, and enquiry conversion for one of Southeast Asia’s largest event venues.",
    image: "images/projects/singapore-expo.webp",
    tags: ["Figma", "HTML", "SASS", "Vanilla JavaScript"],
    link: "https://www.singaporeexpo.com.sg/",
  },
  {
    id: "03",
    title: "UNPAGE Indonesia",
    category: "Web Development",
    subcategory: "Organization Website",
    description:
      "Created a unified platform for UNPAGE Indonesia that brings five program divisions into one structured website, making information easier to manage and access.",
    image: "images/projects/unpage-indonesia.webp",
    tags: ["Figma", "HTML", "SASS", "Vanilla JavaScript"],
    link: "https://www.un-pageindonesia.org/id",
  },
];

const cinEase: [number, number, number, number] = [0.19, 1, 0.22, 1];

const textReveal: Variants = {
  hidden: { y: "40%", opacity: 0, filter: "blur(8px)" },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  visible: (i: number): any => ({
    y: "0%",
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 1.4, ease: cinEase, delay: i * 0.15 },
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
      className="relative px-6 md:px-12 max-w-screen-2xl mx-auto py-16 md:py-48 overflow-hidden"
      id="work"
    >
      {/* ── Background Accent ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-linear-to-b from-transparent to-outline/50 hidden md:block" />

      {/* ── Section header ── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className="mb-5 md:mb-48 flex flex-col items-center text-center max-w-4xl mx-auto relative z-10"
      >
        <div className="p-2 -m-2 overflow-hidden mb-6">
          <motion.span
            variants={textReveal}
            custom={0}
            className="inline-flex items-center gap-4 font-label text-[10px] md:text-xs tracking-[0.5em] uppercase text-primary font-bold opacity-80"
          >
            {label}
          </motion.span>
        </div>

        <div className="p-4 -m-4 overflow-hidden">
          <motion.h2
            variants={textReveal}
            custom={1}
            className="font-headline text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-on-background leading-none uppercase"
          >
            {title}
          </motion.h2>
        </div>

        <motion.p
          custom={2}
          variants={textReveal}
          className="mt-8 text-xs md:text-sm text-on-background/50 max-w-xl px-4 leading-relaxed font-light"
        >
          Selected works showcasing design precision and meaningful execution
          across digital experiences.
        </motion.p>
      </motion.div>

      {/* ── Project list ── */}
      <div className="flex flex-col gap-5 md:gap-40 w-full relative z-20">
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
