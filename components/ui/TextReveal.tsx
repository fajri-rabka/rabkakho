// components/ui/TextReveal.tsx
"use client";

import { motion } from "framer-motion";
import { useLoaderReady } from "./SpaceLoader";

const ease = [0.22, 1, 0.36, 1] as const;

export function TextReveal({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const letters = text.split("");
  // const isReady = useLoaderReady();

  return (
    <span className={`inline-block ${className}`}>
      {letters.map((char, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            initial={{ y: "120%", opacity: 0, filter: "blur(4px)" }}
            animate={
              // isReady ? { y: "0%", opacity: 1, filter: "blur(0px)" } : {}
              { y: "0%", opacity: 1, filter: "blur(0px)" }
            }
            transition={{
              duration: 0.5,
              ease,
              delay: i * 0.01,
            }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
