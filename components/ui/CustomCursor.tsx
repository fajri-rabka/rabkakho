"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const SPRING = { damping: 25, stiffness: 300, mass: 0.4 };

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [variant, setVariant] = useState<"default" | "hover">("default");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, SPRING);
  const smoothY = useSpring(mouseY, SPRING);

  useEffect(() => {
    // Detect touch device (coarse pointer)
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
    };

    checkTouch();
    window.addEventListener("resize", checkTouch);

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handlePointerEnter = () => setIsVisible(true);
    const handlePointerLeave = () => setIsVisible(false);

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const isInteractive =
        target.closest("[data-cursor='hover']") ||
        target.closest("a, button, input, textarea");

      setVariant(isInteractive ? "hover" : "default");
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", handleHover);
    document.addEventListener("mouseleave", handlePointerLeave);
    document.addEventListener("mouseenter", handlePointerEnter);

    return () => {
      window.removeEventListener("resize", checkTouch);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleHover);
      document.removeEventListener("mouseleave", handlePointerLeave);
      document.removeEventListener("mouseenter", handlePointerEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* OUTER RING */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border pointer-events-none z-[9999] backdrop-blur-[2px]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: variant === "hover" ? 1.3 : 1,
          borderColor:
            variant === "hover"
              ? "var(--on-bg-variant)"
              : "var(--cursor-ring)",
          backgroundColor:
            variant === "hover"
              ? "var(--on-bg-variant)"
              : "transparent",
          opacity: isVisible ? (variant === "hover" ? 0.2 : 1) : 0,
        }}
        transition={{
          scale: { type: "spring", ...SPRING },
          borderColor: { duration: 0.25 },
          backgroundColor: { duration: 0.25 },
        }}
      />

      {/* CENTER DOT */}
      <motion.div
        className="fixed top-0 left-0 w-1.25 h-1.25 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: variant === "hover" ? 0.7 : 1,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 400,
        }}
      />
    </>
  );
}
