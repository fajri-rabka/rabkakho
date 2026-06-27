"use client";

import { Project, ProjectsProps } from "@/lib/interfaces";
import { useState, useEffect, useRef } from "react";
import { ProjectCard } from "@/components/ui/ProjectCard";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const DEFAULT_PROJECTS: Project[] = [
  {
    id: "01",
    title: "Studio Tiga Ruang",
    category: "Web Development",
    subcategory: "Architect Company Website",
    description:
      "Studio Tiga Ruang website to showcase their architectural portfolio and services.",
    image: "images/projects/studiotigaruang.webp",
    tags: ["Figma", "Astro", "GSAP"],
    link: "https://studiotigaruang.com/",
  },
  {
    id: "02",
    title: "Mokita Wahana Honda",
    category: "Apps & Web Development",
    subcategory: "Booking Services Apps",
    description:
      "Worked as Frontend Developer in a team building a motorcycle service booking platform for Honda dealers. My responsibility was developing the mobile app booking flow, web dashboard admin, integrating dealer service data into a unified experience. The new system reduced manual booking dependency and increased digital adoption by 40% across regional dealers.",
    image: "images/projects/wahana-honda.webp",
    tags: ["React Native", "React JS", "Bitbucket", "Bootstrap"],
    link: "https://apps.apple.com/id/app/wahana-honda/id1502207230",
  },
  {
    id: "03",
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
    id: "04",
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

export function Projects({
  projects = DEFAULT_PROJECTS,
  label = "Works",
  title = "PROJECTS",
}: ProjectsProps) {
  const [active, setActive] = useState(0);
  const [opened, setOpened] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleNext = () => {
    setActive((prev) => {
      const next = (prev + 1) % projects.length;
      setOpened(null);
      return next;
    });
  };

  const handlePrev = () => {
    setActive((prev) => {
      const next = (prev - 1 + projects.length) % projects.length;
      setOpened(null);
      return next;
    });
  };

  useGSAP(
    () => {
      const q = gsap.utils.selector(containerRef);
      let mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          q(".reveal-text"),
          { y: "40%", opacity: 0, filter: "blur(8px)" },
          {
            y: "0%",
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.4,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.fromTo(
          q(".reveal-text"),
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.4,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="w-full relative border-t border-outline bg-background overflow-hidden"
      id="work"
    >
      {/* Explicit Grid Background Lines */}
      <div className="absolute inset-0 grid grid-cols-12 pointer-events-none opacity-20">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="border-r border-outline" />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10 border-b border-outline">
        {/* ── LEFT MASSIVE TITLE (Spans 9 columns) ── */}
        <div className="lg:col-span-10 border-r border-outline pl-4 pr-12 md:pl-12 py-24 md:py-32 flex flex-col justify-end">
          <div className="overflow-hidden mb-8">
            <span className="reveal-text inline-block font-mono text-[10px] tracking-[0.4em] uppercase text-on-background/50 border border-outline px-4 py-2 opacity-0 will-change-transform">
              [{label}]
            </span>
          </div>

          <div className="overflow-hidden">
            <h2 className="reveal-text font-headline text-[clamp(4rem,14vw,14rem)] font-black tracking-[-0.06em] text-on-background leading-[0.8] uppercase opacity-0 will-change-transform break-all">
              {title}
            </h2>
          </div>
        </div>

        {/* ── RIGHT EMPTY TENSION SPACE (Spans 3 columns) ── */}
        <div className="lg:col-span-2 hidden lg:flex flex-col justify-between p-12 relative overflow-hidden">
          <span className="font-mono text-[7px] tracking-[0.4em] uppercase text-on-background/30 rotate-90 origin-top-left absolute left-12 top-1/2 -translate-y-1/2 whitespace-nowrap">
            [SCROLL_FOR_MORE_WORKS] // 002
          </span>
        </div>
      </div>

      {/* ── CAROUSEL GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10">
        <div className="lg:col-span-9 border-r border-outline py-12 md:py-24 pl-4 md:pl-12 flex flex-col">
          <div className="relative w-full max-w-[1200px] h-[400px] md:h-[600px] overflow-visible mx-auto lg:mx-0">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                total={projects.length}
                active={active}
                opened={opened}
                setOpened={setOpened}
              />
            ))}
          </div>
        </div>

        {/* CONTROLS */}
        <div className="lg:col-span-3 flex flex-col justify-between bg-background relative z-20 h-full">
          <div className="p-8 md:p-12 border-b border-outline">
            <p className="reveal-text font-mono text-[10px] text-on-background/70 leading-[1.8] tracking-widest uppercase opacity-0 will-change-transform">
              Selected works showcasing design precision and meaningful
              execution across digital experiences.
            </p>
          </div>

          <div className="flex flex-row lg:flex-col items-stretch h-full flex-grow border-t lg:border-t-0 border-outline mt-12 lg:mt-0">
            <button
              onClick={handlePrev}
              className="flex-1 min-h-[100px] border-r lg:border-r-0 lg:border-b border-outline bg-background flex items-center justify-center text-on-background font-headline text-3xl md:text-5xl hover:bg-on-background hover:text-background transition-colors duration-200 uppercase"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              className="flex-1 min-h-[100px] bg-background flex items-center justify-center text-on-background font-headline text-3xl md:text-5xl hover:bg-on-background hover:text-background transition-colors duration-200 uppercase"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
