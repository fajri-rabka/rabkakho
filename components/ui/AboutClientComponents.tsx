"use client";

import { useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { Download } from "lucide-react";

export function FloatingLetter({ char, index }: { char: string; index: number }) {
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

export function AnimatedParagraph({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 1.2,
        ease: cinEase,
        delay: 0.1,
      }}
      className={className}
    >
      {children}
    </motion.p>
  );
}

export function AnimatedBox({ children, className, delay }: { children: React.ReactNode; className?: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 1.2,
        ease: cinEase,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedDownloadButton() {
  return (
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
  );
}

export function FadeInTag({ children, className }: { children: React.ReactNode; className?: string }) {
  const ease = [0.16, 1, 0.3, 1] as const;
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease }}
      className={className}
    >
      {children}
    </motion.span>
  );
}
