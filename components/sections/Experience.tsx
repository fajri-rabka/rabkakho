"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export function Experience() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
  };

  return (
    <section
      className="px-8 max-w-screen-2xl mx-auto lg:py-32 py-16 border-t border-white/5"
      id="experience"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-15 lg:gap-20">
        <motion.div 
          className="md:col-span-4"
          {...fadeInUp}
        >
          <span className="font-label text-[10px] tracking-[0.4em] uppercase text-white/40">
            The Journey
          </span>
          <h2 className="font-headline lg:text-6xl text-4xl font-extrabold tracking-tighter mt-4">
            EXPERIENCE
          </h2>
        </motion.div>
        <div className="md:col-span-8 space-y-10 lg:space-y-24 relative">
          {/* Vertical Line */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] as any, delay: 0.4 }}
            className="absolute left-0 top-0 bottom-0 w-px bg-white/10 hidden md:block"
          ></motion.div>

          {[
            {
              id: "01",
              date: "Feb 2026 ― Present",
              role: "Front-End Developer",
              company: "College of Contract Management United Kingdom",
              logo: "/logo/ccmuk_logo.webp",
              width: 50,
              desc: "Developed and maintained a scalable web platform for a London-based education institution and Client Project, leveraging Next.js and Vite.js. Focused on performance, responsive UI, API integration, and SEO optimization."
            },
            {
              id: "02",
              date: "Jun 2023 ― Dec 2025",
              role: "Front End Developer",
              company: "Aleph Labs",
              logo: "/logo/alephlabs_logo.webp",
              width: 60,
              desc: "Front End Developer at Aleph Labs, contributing to the Mokita team for PT Astra Honda International. Built and maintained 26 cross-platform mobile apps, developed internal dashboards, integrated APIs, and handled production deployments across mobile platforms."
            },
            {
              id: "03",
              date: "Jan 2020 ― Mar 2022",
              role: "Junior Front End Developer",
              company: "Stevsoft",
              logo: "/logo/stevsoft_logo.webp",
              width: 100,
              desc: "Front-End Web Developer at Stevsoft, building e-commerce platforms, landing pages, and company websites across various industries. Specialized in responsive UI development, design-to-code implementation, and performance optimization using modern front-end tools."
            },
            {
              id: "04",
              role: "Junior Full Stack Developer",
              date: "Jan 2017 - Apr 2017 (Internship)",
              company: "PT. Jalan Tol Lingkar Luar Jakarta",
              logo: "/logo/jasamarga_logo.webp",
              width: 40,
              desc: "Full Stack Developer at PT Jalantol Lingkarluar Jakarta, building internal web systems to support toll road operations across both front-end and back-end."
            }
          ].map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any, delay: index * 0.1 }}
              className="md:pl-12 relative group"
            >
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-white/20 border-4 border-black ring-1 ring-white/10 hidden md:block transition-all group-hover:bg-white group-hover:scale-150"></div>
              <div className="glass-card p-10 hover:bg-white/5 transition-all duration-500 border border-white/10">
                <div className="logo mb-4">
                  <Image
                    src={item.logo}
                    alt={item.company}
                    width={item.width}
                    height={50}
                    className="grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <span className="text-xs font-bold tracking-[0.3em] text-white/40 block mb-4">
                  {item.date}
                </span>
                <h3 className="text-3xl font-extrabold tracking-tighter mb-2">
                  {item.role}
                </h3>
                <p className="text-white/60 text-lg mb-6">
                  {item.company}
                </p>
                <p className="text-white/40 font-light leading-relaxed max-w-2xl">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
