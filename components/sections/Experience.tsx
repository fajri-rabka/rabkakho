"use client";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(containerRef);
      let mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          q(".exp-header"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );

        gsap.fromTo(
          q(".exp-card"),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
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
          q(".exp-header, .exp-card"),
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
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
      id="experience"
    >
      {/* Explicit Grid Background Lines */}
      <div className="absolute inset-0 grid grid-cols-12 pointer-events-none opacity-20 z-0">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="hidden lg:block border-r border-outline" />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10 border-b border-outline">
        {/* HEADER (Spans 4 cols) */}
        <div className="lg:col-span-4 border-r border-outline pl-4 md:pl-12 pr-4 pt-24 pb-12 md:pb-24 flex flex-col justify-between">
          <div className="exp-header opacity-0 will-change-transform lg:sticky lg:top-32">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-on-background/50 mb-4 block">
              [THE_JOURNEY]
            </span>
            <h2 className="font-headline text-5xl lg:text-7xl font-black tracking-[-0.04em] text-on-background uppercase leading-none break-words">
              EXPERIENCE
            </h2>
          </div>
        </div>

        {/* CONTENT (Spans 8 cols) */}
        <div className="lg:col-span-8 flex flex-col bg-background">
          {[
            {
              id: "01",
              date: "Feb 2026 ― Present",
              role: "Front-End Developer",
              company: "College of Contract Management United Kingdom",
              logo: "/logo/ccmuk_logo.webp",
              width: 50,
              desc: "Developed and maintained a scalable web platform for GSM Client and build CRM Product, leveraging Next.js and Vite.js. Focused on performance, responsive UI, API integration, and SEO optimization.",
            },
            {
              id: "02",
              date: "Jun 2023 ― Dec 2025",
              role: "Front End Developer",
              company: "Aleph Labs",
              logo: "/logo/alephlabs_logo.webp",
              width: 60,
              desc: "Front End Developer at Aleph Labs, contributing to the Mokita team for PT Astra Honda International. Built and maintained 26 cross-platform mobile apps, developed internal dashboards, integrated APIs, and handled production deployments across mobile platforms.",
            },
            {
              id: "03",
              date: "Jan 2020 ― Mar 2022",
              role: "Junior Front End Developer",
              company: "Stevsoft",
              logo: "/logo/stevsoft_logo.webp",
              width: 100,
              desc: "Front-End Web Developer at Stevsoft, building e-commerce platforms, landing pages, and company websites across various industries. Specialized in responsive UI development, design-to-code implementation, and performance optimization using modern front-end tools.",
            },
            {
              id: "04",
              role: "Junior Full Stack Developer",
              date: "Jan 2017 - Apr 2017 (Internship)",
              company: "PT. Jalan Tol Lingkar Luar Jakarta",
              logo: "/logo/jasamarga_logo.webp",
              width: 40,
              desc: "Full Stack Developer at PT Jalantol Lingkarluar Jakarta, building internal web systems to support toll road operations across both front-end and back-end.",
            },
          ].map((item) => (
            <div
              key={item.id}
              className="exp-card w-full group opacity-0 will-change-transform border-b border-outline last:border-b-0 hover:bg-on-background/5 transition-colors duration-300 grid grid-cols-1 lg:grid-cols-8 p-8 md:p-12"
            >
              {/* Logo / Metadata */}
              <div className="lg:col-span-2 mb-8 lg:mb-0 pr-8">
                <div className="h-12 flex items-center justify-start mb-6">
                  <Image
                    src={item.logo}
                    alt={item.company}
                    width={item.width}
                    height={50}
                    className="grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <span className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-on-background/50 block">
                  [{item.id}] <br />
                  <span className="mt-1 block text-on-background/30 font-light">{item.date}</span>
                </span>
              </div>

              {/* Info */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <h3 className="font-headline lg:text-4xl text-2xl font-black tracking-[-0.04em] uppercase text-on-background mb-4">
                  {item.role}
                </h3>
                <p className="font-mono text-[11px] tracking-[0.2em] text-on-background/70 uppercase mb-8">
                  {item.company}
                </p>
                <p className="text-on-background/80 font-light leading-[1.6] max-w-2xl text-sm md:text-base">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
