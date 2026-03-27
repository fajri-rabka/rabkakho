"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const BackgroundParticles = () => {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();

  // Scroll Parallax Layers (Depth feeling)
  const layer1Y = useTransform(scrollY, [0, 1000], [0, -150]);
  const layer2Y = useTransform(scrollY, [0, 1000], [0, -300]);
  const layer3Y = useTransform(scrollY, [0, 1000], [0, -450]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particles = useMemo(() => {
    return Array.from({ length: 90 }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 1.5 + 3,
      opacity: Math.random() * 0.4 + 0.1,
      layer: i % 3,
      driftX: Math.random() * 40 - 20,
      driftY: Math.random() * 40 - 20,
      driftDuration: Math.random() * 10 + 20,
    }));
  }, []);

  if (!mounted) return null;

  const layers = [
    { p: particles.filter((p) => p.layer === 0), motion: layer1Y },
    { p: particles.filter((p) => p.layer === 1), motion: layer2Y },
    { p: particles.filter((p) => p.layer === 2), motion: layer3Y },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
      {layers.map((layer, lIdx) => (
        <motion.div
          key={lIdx}
          style={{ y: layer.motion }}
          className="absolute inset-0 will-change-transform"
        >
          {layer.p.map((p, i) => (
            <motion.div
              key={i}
              className="absolute bg-on-background rounded-full"
              style={{
                width: p.size,
                height: p.size,
                left: p.left,
                top: p.top,
                opacity: p.opacity * 0.5,
                boxShadow:
                  p.size > 1.2 ? `0 0 10px var(--color-on-background)` : "none",
              }}
              animate={{
                x: [0, p.driftX, 0],
                y: [0, p.driftY, 0],
              }}
              transition={{
                duration: p.driftDuration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export default BackgroundParticles;
