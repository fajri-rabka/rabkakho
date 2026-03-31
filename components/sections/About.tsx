"use client";
import { useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { Download } from "lucide-react";

function FloatingLetter({ char, index }: { char: string; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 80, damping: 20, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = 100;
    const force = Math.max(0, 1 - distance / maxDistance);

    const strength = 300;

    x.set(-dx * force * (strength / 100));
    y.set(-dy * force * (strength / 100));

    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.span
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
      }}
      animate={{
        y: isHovered
          ? 0
          : [0, index % 3 === 0 ? -45 : index % 3 === 1 ? -35 : -25, 0],
        rotate: isHovered ? 0 : [0, index % 2 === 0 ? 10 : -10, 0],
      }}
      transition={{
        y: {
          duration: 6 + (index % 4),
          repeat: Infinity,
          ease: "easeInOut",
        },
        rotate: {
          duration: 7 + (index % 4),
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      className="inline-block px-1 md:px-2 relative cursor-pointer select-none transition-colors hover:text-on-background text-on-background/90 will-change-transform"
    >
      {char === " " ? "\u00A0\u00A0" : char}
    </motion.span>
  );
}

const cinEase: [number, number, number, number] = [0.19, 1, 0.22, 1];

export function About() {
  return (
    <section
      className="px-6 md:px-12 max-w-screen-2xl mx-auto py-24 md:py-48 bg-background border-t border-outline/30"
      id="about"
    >
      <div className="flex flex-col xl:flex-row gap-16 xl:gap-32 w-full">
        {/* ── LEFT MASSIVE TEXT ── */}
        <div className="w-full xl:w-[45%] flex flex-col justify-start">
          <h2 className="font-headline text-5xl md:text-[6.5rem] lg:text-[8rem] font-black tracking-tighter leading-[0.85] text-on-background uppercase">
            <div className="flex flex-wrap gap-y-12 md:gap-y-6">
              {"LESS CODE.".split("").map((char, i) => (
                <FloatingLetter key={i} char={char} index={i} />
              ))}
            </div>
            <div className="flex flex-wrap mt-8 md:mt-16 gap-y-12 md:gap-y-6">
              {"MORE IMPACT.".split("").map((char, i) => (
                <FloatingLetter key={i} char={char} index={i + 10} />
              ))}
            </div>
          </h2>
        </div>

        {/* ── RIGHT CONTENT ── */}
        <div className="w-full xl:w-[55%] flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: 1.2,
              ease: cinEase,
              delay: 0.1,
            }}
            className="text-xl md:text-2xl lg:text-3xl font-light text-on-background/80 leading-relaxed md:leading-[1.4] mb-16 md:mb-24 tracking-tight max-w-3xl"
          >
            Building great products is not about adding more, but delivering
            more with less. I focus on creating efficient, scalable interfaces
            where performance, clarity, and user experience work seamlessly
            together.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* APPROACH */}
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 1.2,
                ease: cinEase,
                delay: 0.2,
              }}
              className="flex flex-col border-t border-outline/30 pt-6 group"
            >
              <h4 className="font-label font-bold text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-primary mb-6 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                THE APPROACH
              </h4>
              <p className="text-on-background/60 text-sm md:text-base leading-relaxed font-light group-hover:text-on-background/80 transition-colors duration-500">
                I build with a systems mindset clean code, prioritize
                performance, and precise, every detail matters.
              </p>
            </motion.div>

            {/* RESULT */}
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 1.2,
                ease: cinEase,
                delay: 0.3,
              }}
              className="flex flex-col border-t border-outline/30 pt-6 group"
            >
              <h4 className="font-label font-bold text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-primary mb-6 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                THE RESULT
              </h4>
              <p className="text-on-background/60 text-sm md:text-base leading-relaxed font-light group-hover:text-on-background/80 transition-colors duration-500">
                Scalable, high performance products built to last and designed
                to deliver real impact.
              </p>
            </motion.div>
          </div>

          <div className="flex flex-col mt-5 pt-10">
            {/* DOWNLOAD CV */}
            <motion.a
              href="/cv/fajri-cv.pdf"
              download
              initial="initial"
              whileHover="hovered"
              variants={{
                initial: { opacity: 0, y: 30, filter: "blur(4px)" },
                hovered: { opacity: 1, y: 0, filter: "blur(0px)" },
              }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 1.2,
                ease: cinEase,
                delay: 0.4,
              }}
              className="group flex items-center gap-6 w-fit cursor-pointer"
            >
              <div className="relative overflow-hidden border border-outline/40 rounded-full px-8 lg:py-4 pt-2 pb-4 bg-transparent hover:bg-on-background transition-colors duration-500 ease-out">
                <span className="relative z-10 text-[.6rem] md:text-xs font-bold uppercase tracking-[0.3em] text-on-background group-hover:text-background transition-colors duration-500">
                  Download CV
                </span>
                <div className="absolute inset-0 bg-on-background scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left" />
              </div>

              <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full border border-outline/40 flex items-center justify-center bg-surface-variant group-hover:bg-on-background transition-colors duration-500 ease-out overflow-hidden shadow-sm">
                <motion.div
                  variants={{
                    initial: { y: 0 },
                    hovered: {
                      y: [0, 5, -5, 0],
                      transition: {
                        duration: 0.8,
                        ease: "easeOut",
                      },
                    },
                  }}
                  className="group-hover:text-background text-on-background transition-colors duration-500"
                >
                  <Download size={20} strokeWidth={1.5} />
                </motion.div>
              </div>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
