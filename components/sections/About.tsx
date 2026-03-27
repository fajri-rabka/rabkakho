"use client";
import { useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

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
        // Increased amplitude for a more dynamic and expressive feel
        y: isHovered
          ? 0
          : [0, index % 3 === 0 ? -45 : index % 3 === 1 ? -35 : -25, 0],
        rotate: isHovered ? 0 : [0, index % 2 === 0 ? 10 : -10, 0],
      }}
      transition={{
        y: {
          duration: 6 + (index % 4), // Kept long for smoothness
          repeat: Infinity,
          ease: "easeInOut",
        },
        rotate: {
          duration: 7 + (index % 4),
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      className="inline-block px-1.5 md:px-3 relative cursor-pointer select-none transition-colors hover:text-on-background text-on-background/85 will-change-transform"
    >
      {char === " " ? "\u00A0\u00A0" : char}
    </motion.span>
  );
}

export function About() {
  return (
    <section
      className="px-8 md:px-12 max-w-screen-2xl mx-auto py-16 md:py-24 lg:py-32 bg-background border-t border-outline"
      id="about"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
        {/* LEFT */}
        <div className="md:col-span-5">
          <h2 className="font-headline lg:text-8xl text-4xl font-extrabold tracking-tighter mt-4 leading-[1.3] md:leading-[1.2] text-on-background">
            <div className="flex flex-wrap gap-y-12 md:gap-y-10">
              {"LESS CODE.".split("").map((char, i) => (
                <FloatingLetter key={i} char={char} index={i} />
              ))}
            </div>
            <div className="flex flex-wrap mt-16 md:mt-24 gap-y-12 md:gap-y-10">
              {"MORE IMPACT.".split("").map((char, i) => (
                <FloatingLetter key={i} char={char} index={i + 10} />
              ))}
            </div>
          </h2>
        </div>

        {/* RIGHT */}
        <div className="md:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1] as any,
              delay: 0.1,
            }}
            className="lg:text-2xl text-sm font-light text-on-background/90 leading-relaxed mb-16"
          >
            Building great products is not about adding more, but delivering
            more with less. I focus on creating efficient, scalable interfaces
            where performance, clarity, and user experience work seamlessly
            together.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* APPROACH */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] as any,
                delay: 0.3,
              }}
            >
              <h4 className="font-headline font-bold lg:text-lg text-md mb-4 tracking-tighter text-on-background">
                THE APPROACH
              </h4>
              <p className="text-on-background/70 lg:text-lg text-xs leading-relaxed font-light">
                I build with a systems mindset clean code, prioritize
                performance, and precise, every detail matters.
              </p>
            </motion.div>

            {/* RESULT */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] as any,
                delay: 0.4,
              }}
            >
              <h4 className="font-headline font-bold lg:text-lg text-md mb-4 tracking-tighter text-on-background">
                THE RESULT
              </h4>
              <p className="text-on-background/70 lg:text-lg text-xs leading-relaxed font-light">
                Scalable, high performance products built to last and designed
                to deliver real impact.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
