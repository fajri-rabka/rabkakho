"use client";
import Image from "next/image";

export function Experience() {
  return (
    <section
      className="px-8 max-w-screen-2xl mx-auto py-32 border-t border-white/5"
      id="experience"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
        <div className="md:col-span-4">
          <span className="font-label text-[10px] tracking-[0.4em] uppercase text-white/40">
            The Journey
          </span>
          <h2 className="font-headline text-6xl font-extrabold tracking-tighter mt-4">
            EXPERIENCE
          </h2>
        </div>
        <div className="md:col-span-8 space-y-24 relative">
          {/* Vertical Line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10 hidden md:block"></div>

          {/* Exp Item 01 */}
          <div className="md:pl-12 relative group reveal">
            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-white border-4 border-black ring-1 ring-white/20 hidden md:block transition-all group-hover:scale-150"></div>
            <div className="glass-card p-10 hover:bg-white/5 transition-all duration-500 border border-white/10">
              <div className="logo mb-4">
                <Image
                  src="/logo/ccmuk_logo.webp"
                  alt="CCMUK"
                  width={50}
                  height={50}
                  className="grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <span className="text-xs font-bold tracking-[0.3em] text-white/40 block mb-4">
                Feb 2026 ― Present
              </span>
              <h3 className="text-3xl font-extrabold tracking-tighter mb-2">
                Front-End Developer
              </h3>
              <p className="text-white/60 text-lg mb-6">
                College of Contract Management United Kingdom
              </p>
              <p className="text-white/40 font-light leading-relaxed max-w-2xl">
                Developed and maintained a scalable web platform for a
                London-based education institution and Client Project,
                leveraging Next.js and Vite.js. Focused on performance,
                responsive UI, API integration, and SEO optimization.
              </p>
            </div>
          </div>

          {/* Exp Item 02 */}
          <div
            className="md:pl-12 relative group reveal"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-white/20 border-4 border-black ring-1 ring-white/10 hidden md:block transition-all group-hover:bg-white group-hover:scale-150"></div>
            <div className="glass-card p-10 hover:bg-white/5 transition-all duration-500 border border-white/10">
              <div className="logo mb-4">
                <Image
                  src="/logo/alephlabs_logo.webp"
                  alt="Aleph Labs"
                  width={60}
                  height={60}
                  className="grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <span className="text-xs font-bold tracking-[0.3em] text-white/40 block mb-4">
                Jun 2023 ― Dec 2025
              </span>
              <h3 className="text-3xl font-extrabold tracking-tighter mb-2">
                Front End Developer
              </h3>
              <p className="text-white/60 text-lg mb-6">Aleph Labs</p>
              <p className="text-white/40 font-light leading-relaxed max-w-2xl">
                Front End Developer at Aleph Labs, contributing to the Mokita
                team for PT Astra Honda International. Built and maintained 26
                cross-platform mobile apps, developed internal dashboards,
                integrated APIs, and handled production deployments across
                mobile platforms.
              </p>
            </div>
          </div>

          {/* Exp Item 03 */}
          <div
            className="md:pl-12 relative group reveal"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-white/20 border-4 border-black ring-1 ring-white/10 hidden md:block transition-all group-hover:bg-white group-hover:scale-150"></div>
            <div className="glass-card p-10 hover:bg-white/5 transition-all duration-500 border border-white/10">
              <div className="logo mb-4">
                <Image
                  src="/logo/stevsoft_logo.webp"
                  alt="Stevsoft"
                  width={100}
                  height={100}
                  className="grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <span className="text-xs font-bold tracking-[0.3em] text-white/40 block mb-4">
                Jan 2020 ― Mar 2022
              </span>
              <h3 className="text-3xl font-extrabold tracking-tighter mb-2">
                Junior Front End Developer
              </h3>
              <p className="text-white/60 text-lg mb-6">Stevsoft</p>
              <p className="text-white/40 font-light leading-relaxed max-w-2xl">
                Front-End Web Developer at Stevsoft, building e-commerce
                platforms, landing pages, and company websites across various
                industries. Specialized in responsive UI development,
                design-to-code implementation, and performance optimization
                using modern front-end tools.
              </p>
            </div>
          </div>

          {/* Exp Item 04 */}
          <div
            className="md:pl-12 relative group reveal"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-white/20 border-4 border-black ring-1 ring-white/10 hidden md:block transition-all group-hover:bg-white group-hover:scale-150"></div>
            <div className="glass-card p-10 hover:bg-white/5 transition-all duration-500 border border-white/10">
              <div className="logo mb-4">
                <Image
                  src="/logo/jasamarga_logo.webp"
                  alt="Jasamarga"
                  width={40}
                  height={40}
                  className="grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <span className="text-xs font-bold tracking-[0.3em] text-white/40 block mb-4">
                Jan 2017 - Apr 2017 (Internship)
              </span>
              <h3 className="text-3xl font-extrabold tracking-tighter mb-2">
                Junior Full Stack Developer
              </h3>
              <p className="text-white/60 text-lg mb-6">
                PT. Jalan Tol Lingkar Luar Jakarta
              </p>
              <p className="text-white/40 font-light leading-relaxed max-w-2xl">
                Full Stack Developer at PT Jalantol Lingkarluar Jakarta,
                building internal web systems to support toll road operations
                across both front-end and back-end.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
