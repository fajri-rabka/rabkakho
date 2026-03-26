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
    image: "images/Wahana-Honda.webp",
    tags: ["React Native", "React JS"],
  },
  {
    id: "02",
    title: "LUMINA VELO",
    category: "E-Commerce",
    subcategory: "Luxury",
    description:
      "A digital boutique reimagining the experience of luxury watch curation.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDtnBQmBrLrgvHpAtEWaGgtdtd5CVMa74OZJCsn-ZnF4-hUvNzybGC_iFs3f6M-yH6dZOQBC0ygT2RdTB0ptnKSFdV5eKhwDvOhfuZeqVCfn05oAZQH5Oxb5rSxP7tMzwbGWh75UXwkFmJ8bdKhs935avnPIhtJO56PqifLofp7_jRplGcZ53EDfh7OckFmv94Asb1meHcTG4dl3AEhelbr_J-SiFLrdnmCdbUwDpUoIt0nsKkhzRqRZcRPv_97mQc6AgeeMkVw1IQ",
    tags: ["Next.js", "Shopify"],
  },
  {
    id: "03",
    title: "VOID FLOW",
    category: "SaaS",
    subcategory: "Productivity",
    description:
      "Deep focus task management for the modern autonomous professional.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDb5oC60wirAvrJZDFYns18d_InXJ6MQDCzo9BidRoyVWKLHyZcOz2pSGnbdW0kIZ6aI3tzk04GygFhyB7ySNPlemL2EUgGvJpWTXWbRA_G3_lxMJVqVngjx61z0XBCKzj0EUYkRG-4QtsUYSn7UCSIVjwu31kxmxLDUw1wk7GtM6iXtqDMYcwrd4Ml9-Hy4e_NkzNnXcNbPRZZdVyBv0ZfIp75vBTRPaVG3iywx7bSSISWoMnJjcxH0UN6gaEJwQDE80_jQaS6OjA",
    tags: ["TypeScript", "Tailwind"],
  },
  {
    id: "04",
    title: "ETHER PORT",
    category: "Web3",
    subcategory: "Finance",
    description:
      "Secure gateway for institutional-grade digital asset management.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBShCbP6YYcY2vBnQGeMljSgwccVHqjF7VwKJ3_lYpwh5eySRv3zU71VXGsnDYhPVTX9o8Xso19HjdZfQjB_raOQjqE_mdtV__M2GWOFXyd1xqdK_fMnCLhb51lKEaTYObCN6gclqIWS0QLYol57fpKbOTneSCN-SmcvRAW-BMWsJcAksk97FX__6V9whdsVrL-fGFbTRj3PmZuFnsVR-qvSuGJ07rFKpLC_JK2DB_QuiXdyGsh8_JVlRIDSlHIY_wchvXYjNJocSQ",
    tags: ["Solidity", "Ethers.js"],
  },
];

export function Projects({
  projects = DEFAULT_PROJECTS,
  label = "Selected Works",
  title = "PROJECTS",
}: ProjectsProps) {
  return (
    <section
      className="px-8 max-w-screen-2xl mx-auto py-32 border-t border-white/5"
      id="work"
    >
      <div className="flex justify-between items-end mb-20">
        <div>
          <span className="font-label text-[10px] tracking-[0.4em] uppercase text-white/40">
            {label}
          </span>
          <h2 className="font-headline text-6xl font-extrabold tracking-tighter mt-4">
            {title}
          </h2>
        </div>
        <div className="hidden md:block text-right">
          <span className="text-white/20 font-label text-[10px] tracking-[0.3em] uppercase">
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
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-bold">
                {project.category} / {project.subcategory}
              </span>
              <h3 className="text-2xl font-extrabold tracking-tighter text-white mt-2">
                {project.title}
              </h3>
              <p className="text-sm text-white/60 mt-4 mb-6 leading-relaxed font-light">
                {project.description}
              </p>
              <div className="flex gap-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] border border-white/20 px-2 py-1 uppercase text-white/40 tracking-widest"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-extrabold tracking-tighter group-hover:text-white/40 transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/40 text-sm mt-1 uppercase tracking-widest text-[10px]">
                  {project.subcategory}
                </p>
              </div>
              <span className="material-symbols-outlined text-white/20 group-hover:text-white transition-colors">
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
