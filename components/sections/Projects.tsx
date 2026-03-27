"use client";

import { Project, ProjectsProps } from "@/lib/interfaces";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";

const DEFAULT_PROJECTS: Project[] = [
  {
    id: "01",
    title: "Mokita Wahana Honda",
    category: "Web Development",
    subcategory: "Booking Services Apps",
    description:
      "A super app for Honda motorcycle enthusiasts to connect, share, and booking services.",
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
      className="px-8 max-w-screen-2xl mx-auto lg:py-32 py-16 border-t border-outline"
      id="work"
    >
      <div className="flex justify-between items-end lg:mb-20 mb-10">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.5,
              ease: [0.19, 1, 0.22, 1],
              delay: 0.1,
            }}
          >
            <span className="font-label text-[10px] tracking-[0.4em] uppercase text-on-background/85">
              {label}
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.5,
              ease: [0.19, 1, 0.22, 1],
              delay: 0.4,
            }}
          >
            <h2 className="font-headline lg:text-6xl text-4xl font-extrabold tracking-tighter mt-4 text-on-background">
              {title}
            </h2>
          </motion.div>
        </div>
        <div className="hidden md:block text-right">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.5,
              ease: [0.19, 1, 0.22, 1],
              delay: 0.6,
            }}
          >
            <span className="text-on-background/70 font-label text-[10px] tracking-[0.3em] uppercase">
              Scroll to explore ({projects.length.toString().padStart(2, "0")})
            </span>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-x-20 md:gap-y-32">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1] as any,
              delay: (index % 2) * 0.1,
            }}
            className={`group relative flex flex-col ${index % 2 === 1 ? "md:mt-40" : ""}`}
          >
            <a
              href={project.link || "#"}
              target={project.link ? "_blank" : undefined}
              rel={project.link ? "noopener noreferrer" : undefined}
              className="block flex-1 relative"
            >
              <div className="h-[400px] overflow-hidden bg-surface-variant mb-8 transition-transform duration-700 group-hover:-translate-y-2">
                <img
                  className="w-full h-full object-cover grayscale opacity-70 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                  alt={project.title}
                  src={project.image}
                />
              </div>

              <div className="project-card-glass p-5 lg:p-8 absolute bottom-20 left-6 right-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10 shadow-2xl">
                <span className="text-[8px] lg:text-[10px] tracking-[0.3em] uppercase text-on-background/90 font-bold">
                  {project.category} - {project.subcategory}
                </span>
                <h3 className="text-lg lg:text-2xl font-extrabold tracking-tighter text-on-background mt-2">
                  {project.title}
                </h3>
                <p className="lg:text-sm text-xs text-on-background/80 mt-4 mb-6 leading-relaxed font-light">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
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
                        className="flex items-center px-2 py-1 uppercase text-on-background/70 tracking-widest"
                      >
                        <img
                          src={iconUrl}
                          alt={tag}
                          className="w-6 h-6 object-contain opacity-80"
                          onError={(e) =>
                            (e.currentTarget.style.display = "none")
                          }
                        />
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-extrabold tracking-tighter group-hover:text-on-background transition-colors text-on-background">
                    {project.title}
                  </h3>
                  <p className="text-on-background/85 text-sm mt-1 uppercase tracking-widest text-[10px]">
                    {project.subcategory}
                  </p>
                </div>
                <span className="material-symbols-outlined text-on-background/70 group-hover:text-on-background transition-colors">
                  arrow_outward
                </span>
              </div>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function ProjectsPreview() {
  return <Projects />;
}
