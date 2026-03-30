"use client";

import { Project, ProjectsProps } from "@/lib/interfaces";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import { ease, fadeUp, staggerContainer } from "@/lib/motion";
import { ArrowUpRight } from "lucide-react";

const DEFAULT_PROJECTS: Project[] = [
  {
    id: "01",
    title: "Mokita Wahana Honda",
    category: "Apps & Web Development",
    subcategory: "Booking Services Apps",
    description:
      "A super app for Honda motorcycle enthusiasts to connect, share, and booking services.",
    problem:
      "Users struggled to manage motorcycle maintenance scheduling efficiently.",
    solution:
      "Developed an intuitive centralized super app handling bookings and community.",
    impact:
      "Increased digital service adoptions by 40% across regional dealerships.",
    image: "images/projects/wahana-honda.webp",
    tags: ["React Native", "Bitbucket", "Bootstrap"],
    link: "https://apps.apple.com/id/app/wahana-honda/id1502207230",
  },
  {
    id: "02",
    title: "Singapore Expo",
    category: "Web Development",
    subcategory: "Event Website",
    description: "A website for Singapore Expo event.",
    problem:
      "Outdated web presence caused friction for event organizers securing spaces.",
    solution:
      "Built a responsive, heavily optimized landing platform with strict SLAs.",
    impact:
      "Boosted inquiry conversion rates and slashed bounce rates significantly.",
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
      "Scattered data led to poor visibility for green-economy initiatives.",
    solution:
      "Implemented a cohesive CMS-driven structure for rapid publications.",
    impact:
      "Enhanced accessibility, unifying 5 distinct program wings under one hub.",
    image: "images/projects/unpage-indonesia.webp",
    tags: ["Figma", "HTML", "SASS", "Vanilla JavaScript"],
    link: "https://www.un-pageindonesia.org/id",
  },
];

export function Projects({
  projects = DEFAULT_PROJECTS,
  label = "Works",
  title = "PROJECTS",
}: ProjectsProps) {
  const { theme } = useTheme();
  return (
    <section
      className="px-6 md:px-12 max-w-screen-2xl mx-auto py-24 md:py-32"
      id="work"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex justify-between items-end mb-16 md:mb-24"
      >
        <div>
          <motion.span
            variants={fadeUp}
            className="font-label text-[10px] tracking-[0.4em] uppercase text-on-background/70 mb-4 block"
          >
            {label}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-headline text-xl lg:text-4xl font-extrabold tracking-tight text-on-background"
          >
            {title}
          </motion.h2>
        </div>
        <motion.div variants={fadeUp} className="hidden md:block">
          <span className="text-on-background/50 font-label text-xs tracking-widest uppercase">
            ({projects.length.toString().padStart(2, "0")}) Selected
          </span>
        </motion.div>
      </motion.div>

      <div className="flex flex-col gap-12 md:gap-24">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease, delay: index * 0.1 }}
            className="group block relative"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* IMAGE COLUMN */}
              <a
                href={project.link || "#"}
                target={project.link ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="lg:col-span-7 relative h-75 md:h-112.5 lg:h-125 w-full rounded-2xl overflow-hidden bg-surface shadow-[0_4px_24px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-700 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
              >
                {/* Overlay Blur / Gradient effect on hover */}
                <div className="absolute inset-0 z-10 bg-linear-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <motion.img
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.8, ease }}
                  className="w-full h-full object-cover filter brightness-[0.85] group-hover:brightness-100 transition-all duration-700"
                  alt={project.title}
                  src={project.image}
                />
              </a>

              {/* CONTENT COLUMN - STORYTELLING */}
              <div className="lg:col-span-5 flex flex-col justify-center relative">
                <div className="mb-6 flex justify-between items-center">
                  <span className="text-[10px] tracking-widest uppercase text-on-background/60 font-semibold border border-outline px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-on-background/40 group-hover:text-on-background transition-colors duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>

                <h3 className="text-lg md:text-2xl font-extrabold tracking-tight text-on-background mb-4">
                  {project.title}
                </h3>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => {
                    const slug = tag
                      .toLowerCase()
                      .replace("react js", "react")
                      .replace("react native", "react")
                      .replace("vanilla javascript", "javascript")
                      .replace("next js", "nextdotjs")
                      .replace("next.js", "nextdotjs")
                      .replace("ethers.js", "ethereum")
                      .replace("tailwind", "tailwindcss")
                      .replace("html", "html5")
                      .replace("css", "css")
                      .replace(/\s+/g, "")
                      .replace(/\./g, "");

                    const iconColor = theme === "dark" ? "ffffff" : "000000";
                    const iconUrl = `https://cdn.simpleicons.org/${slug}/${iconColor}`;

                    return (
                      <span
                        key={tag}
                        className="flex items-center justify-center w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-surface-variant border border-outline shadow-sm hover:scale-110 transition-transform duration-300"
                        title={tag}
                      >
                        <img
                          src={iconUrl}
                          alt={tag}
                          className="w-4 h-4 lg:w-5 lg:h-5 object-contain opacity-80"
                          onError={(e) =>
                            (e.currentTarget.style.display = "none")
                          }
                        />
                      </span>
                    );
                  })}
                </div>

                {/* Storytelling Grid */}
                <div className="space-y-5 border-l border-outline pl-5">
                  <div className="relative group/item">
                    <h4 className="text-sm uppercase tracking-wider text-on-background/50 font-semibold mb-1">
                      Problem
                    </h4>
                    <p className="text-sm text-on-background/90 leading-relaxed font-light">
                      {project.problem || project.description}
                    </p>
                  </div>
                  <div className="relative group/item">
                    <h4 className="text-sm uppercase tracking-wider text-on-background/50 font-semibold mb-1">
                      Solution
                    </h4>
                    <p className="text-sm text-on-background/90 leading-relaxed font-light">
                      {project.solution}
                    </p>
                  </div>
                  <div className="relative group/item">
                    <h4 className="text-sm uppercase tracking-wider text-on-background/50 font-semibold mb-1">
                      Impact
                    </h4>
                    <p className="text-sm text-on-background/90 font-medium">
                      {project.impact}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function ProjectsPreview() {
  return <Projects />;
}
