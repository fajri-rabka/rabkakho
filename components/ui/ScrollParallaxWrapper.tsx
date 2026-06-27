"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, HTMLMotionProps } from "framer-motion";

interface ScrollParallaxWrapperProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  withParallax?: boolean;
  background?: React.ReactNode;
  className?: string;
  id?: string;
}

export function ScrollParallaxWrapper({
  children,
  withParallax = false,
  background,
  className,
  id,
  ...props
}: ScrollParallaxWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  if (withParallax) {
    return (
      <section ref={containerRef} id={id} className={className}>
        {background && (
          <motion.div style={{ y: yBg }} className="absolute inset-0">
            {background}
          </motion.div>
        )}
        <motion.div style={{ y: yText, opacity }} className="relative z-10 w-full max-w-4xl" {...props}>
          {children}
        </motion.div>
      </section>
    );
  }

  // Fallback to regular motion div for other sections (like About)
  return (
    <motion.div {...props} className={className}>
      {children}
    </motion.div>
  );
}
