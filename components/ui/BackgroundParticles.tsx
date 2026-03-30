"use client";

import { useEffect, useState, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useThemeContext } from "@/context/ThemeContext";

const BackgroundParticles = () => {
  const { theme } = useThemeContext();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring for high-performance mouse tracking (no re-renders)
  const smoothMouseX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const smoothMouseY = useSpring(mouseY, { damping: 25, stiffness: 120 });

  const { scrollY } = useScroll();

  // Parallax depth layers (Scroll-driven)
  const layer1Y = useTransform(scrollY, [0, 1000], [0, -120]);
  const layer2Y = useTransform(scrollY, [0, 1000], [0, -240]);
  const layer3Y = useTransform(scrollY, [0, 1000], [0, -360]);

  // Parallax layers (Mouse-driven via style prop)
  const m1X = useTransform(smoothMouseX, [-0.5, 0.5], [-25, 25]);
  const m1Y = useTransform(smoothMouseY, [-0.5, 0.5], [-25, 25]);

  const m2X = useTransform(smoothMouseX, [-0.5, 0.5], [-45, 45]);
  const m2Y = useTransform(smoothMouseY, [-0.5, 0.5], [-45, 45]);

  const m3X = useTransform(smoothMouseX, [-0.5, 0.5], [-65, 65]);
  const m3Y = useTransform(smoothMouseY, [-0.5, 0.5], [-65, 65]);

  useEffect(() => {
    setMounted(true);

    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMove = (e: MouseEvent) => {
      if (window.matchMedia("(max-width: 768px)").matches) return;
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("resize", checkMobile);
    };
  }, [mouseX, mouseY]);

  const particles = useMemo(() => {
    // Reduced count for mobile to improve FPS
    const count = isMobile ? 30 : 100;
    return Array.from({ length: count }).map((_, i) => {
      const layer = i % 3;

      return {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,

        layer,

        size:
          (Math.random() * 1.5 + 3) *
          (layer === 0 ? 1.2 : layer === 1 ? 1 : 0.7),

        opacity: Math.random() * 0.5 + 0.2,

        driftX: Math.random() * 60 - 30,
        driftY: -(Math.random() * 120 + 40),

        driftDuration: Math.random() * 12 + 18,
      };
    });
  }, [isMobile]);

  if (!mounted) return null;

  const layers = [
    {
      p: particles.filter((p) => p.layer === 0),
      y: layer1Y,
      mx: m1X,
      my: m1Y,
    },
    {
      p: particles.filter((p) => p.layer === 1),
      y: layer2Y,
      mx: m2X,
      my: m2Y,
    },
    {
      p: particles.filter((p) => p.layer === 2),
      y: layer3Y,
      mx: m3X,
      my: m3Y,
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
      {layers.map((layer, lIdx) => (
        <motion.div
          key={lIdx}
          style={{
            x: isMobile ? 0 : layer.mx,
            y: layer.y,
          }}
          className="absolute inset-0"
        >
          {layer.p.map((p, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: p.size,
                height: p.size,
                left: p.left,
                top: p.top,

                opacity:
                  p.layer === 0
                    ? p.opacity * 0.9
                    : p.layer === 1
                      ? p.opacity * 0.5
                      : p.opacity * 0.25,

                filter: `blur(${p.layer * 1.5}px)`,

                background:
                  theme === "dark"
                    ? "radial-gradient(circle, rgba(255,255,255,1) 0%, transparent 70%)"
                    : "radial-gradient(circle, rgba(0,0,0,1) 0%, transparent 70%)",

                willChange: "transform, opacity",
              }}
              animate={{
                x: [0, p.driftX, 0],
                y: [0, p.driftY, 0],
                opacity: [0.1, p.opacity, 0.1],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: isMobile ? p.driftDuration * 1.5 : p.driftDuration,
                repeat: Infinity,
                ease: [0.65, 0, 0.35, 1],
              }}
            />
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export default BackgroundParticles;
