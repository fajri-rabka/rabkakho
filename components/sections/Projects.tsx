"use client";

import { Project, ProjectsProps } from "@/lib/interfaces";

const DEFAULT_PROJECTS: Project[] = [
  {
    id: "01",
    title: "Mokita Wahana Honda",
    category: "Web Development",
    subcategory: "Booking Services Apps",
    description:
      "A super app for Honda motorcycle enthusiasts to connect, share, and booking services.",
    image: "images/projects/wahana-honda.webp",
    tags: ["React Native", "Bitbucket"],
  },
  {
    id: "02",
    title: "Singapore Expo",
    category: "Web Development",
    subcategory: "Event Website",
    description: "A website for Singapore Expo event.",
    image: "images/projects/singapore-expo.webp",
    tags: ["Figma", "HTML", "SASS", "Vanilla JavaScript"],
  },
  {
    id: "03",
    title: "UNPAGE Indonesia",
    category: "Web Development",
    subcategory: "Organization Website",
    description: "A website for Unpage Indonesia organization.",
    image: "images/projects/unpage-indonesia.webp",
    tags: ["Figma", "HTML", "SASS", "Vanilla JavaScript"],
  },
];

export function Projects({
  projects = DEFAULT_PROJECTS,
  label = "Works",
  title = "PROJECTS",
}: ProjectsProps) {
  return (
    <section
      className="px-8 max-w-screen-2xl mx-auto py-32 border-t border-white/5"
      id="work"
    >
      <div className="flex justify-between items-end mb-20">
        <div>
          <span className="font-label text-[10px] tracking-[0.4em] uppercase text-white/60">
            {label}
          </span>
          <h2 className="font-headline text-6xl font-extrabold tracking-tighter mt-4">
            {title}
          </h2>
        </div>
        <div className="hidden md:block text-right">
          <span className="text-white/40 font-label text-[10px] tracking-[0.3em] uppercase">
            Scroll to explore ({projects.length.toString().padStart(2, "0")})
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-x-20 md:gap-y-32">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`group relative flex flex-col reveal ${index % 2 === 1 ? "md:mt-40" : ""}`}
            style={{ animationDelay: `${(index % 2) * 0.1}s` }}
          >
            <div className="h-[400px] overflow-hidden bg-[#0a0a0a] mb-8 transition-transform duration-700 group-hover:-translate-y-2">
              <img
                className="w-full h-full object-cover grayscale opacity-70 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                alt={project.title}
                src={project.image}
              />
            </div>

            <div className="project-card-glass p-8 absolute bottom-20 left-6 right-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/70 font-bold">
                {project.category} - {project.subcategory}
              </span>
              <h3 className="text-2xl font-extrabold tracking-tighter text-white mt-2">
                {project.title}
              </h3>
              <p className="text-sm text-white/80 mt-4 mb-6 leading-relaxed font-light">
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
                  const iconUrl = `https://cdn.simpleicons.org/${slug}/ffffff`;

                  return (
                    <span
                      key={tag}
                      className="flex items-center px-2 py-1 uppercase text-white/40 tracking-widest"
                    >
                      <img
                        src={iconUrl}
                        alt={tag}
                        className="w-6 h-6 object-contain opacity-60"
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
                <h3 className="text-2xl font-extrabold tracking-tighter group-hover:text-white transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/60 text-sm mt-1 uppercase tracking-widest text-[10px]">
                  {project.subcategory}
                </p>
              </div>
              <span className="material-symbols-outlined text-white/40 group-hover:text-white transition-colors">
                arrow_outward
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProjectsPreview() {
  return <Projects />;
}
