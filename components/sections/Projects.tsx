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
      className="relative px-6 md:px-12 max-w-screen-2xl mx-auto py-16 md:py-48 overflow-hidden"
      id="work"
    >
      {/* ── Section header ── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mb-32 md:mb-48 flex flex-col items-center text-center max-w-4xl mx-auto"
      >
        <div className="overflow-hidden mb-6">
          <motion.span
            variants={textSlideUp}
            custom={0}
            className="inline-flex items-center gap-4 font-label text-xs tracking-[0.5em] uppercase text-primary"
          >
            {label}
          </motion.span>
        </div>

        <div className="overflow-hidden">
          <motion.h2
            variants={textSlideUp}
            custom={1}
            className="font-headline text-2xl md:text-5xl lg:text-6xl font-black tracking-tighter text-on-background leading-none uppercase"
          >
            {title}
          </motion.h2>
        </div>

        <motion.p
          custom={2}
          variants={textSlideUp}
          className="mt-8 text-sm md:text-base text-on-background/50 max-w-2xl px-4"
        >
          Selected works showcasing design precision and meaningful execution
          across digital experiences.
        </motion.p>
      </motion.div>

      {/* ── Project list ── */}
      <div className="flex flex-col gap-32 md:gap-48 w-full">
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
