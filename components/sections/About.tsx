"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

function FloatingLetter({ char, index }: { char: string; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });
  const [isHovered, setIsHovered] = useState(false);

  // Base floating values - using specific starting seeds per index to avoid hydration mismatch
  const floatDuration = 8 + (index % 5) * 2;
  const floatY = -20 - (index % 3) * 15;

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    const distance = Math.sqrt(dx * dx + dy * dy);

    // falloff effect
    const maxDistance = 120;
    const force = Math.max(0, 1 - distance / maxDistance);

    const strength = 90; // adjust feel

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
      animate={
        !isHovered
          ? {
              y: [0, floatY, 0],
              rotate: [0, index % 2 === 0 ? 5 : -5, 0],
            }
          : {}
      }
      transition={{
        y: { duration: floatDuration, repeat: Infinity, ease: "easeInOut" },
        rotate: {
          duration: floatDuration + 1,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      className="inline-block px-2 md:px-3 relative cursor-pointer select-none transition-colors hover:text-on-background text-on-background/85"
    >
      {char === " " ? "\u00A0\u00A0" : char}
    </motion.span>
  );
}

export function About() {
  return (
    <section
      className="px-8 max-w-screen-2xl mx-auto lg:py-32 py-16 bg-background border-t border-outline"
      id="about"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
        {/* LEFT */}
        <div className="md:col-span-5">
          <h2 className="font-headline lg:text-7xl text-6xl font-extrabold tracking-tighter mt-4 leading-[0.9] text-on-background">
            <div className="flex flex-wrap gap-y-4">
              {"LESS CODE.".split("").map((char, i) => (
                <FloatingLetter key={i} char={char} index={i} />
              ))}
            </div>
            <div className="flex flex-wrap mt-10 gap-y-4">
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
