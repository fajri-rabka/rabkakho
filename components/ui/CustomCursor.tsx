"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [variant, setVariant] = useState<"default" | "hover">("default");

  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const xOuter = useRef<gsap.QuickToFunc | null>(null);
  const yOuter = useRef<gsap.QuickToFunc | null>(null);
  const xInner = useRef<gsap.QuickToFunc | null>(null);
  const yInner = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(() => {
    // Set up quickTo for high performance cursor tracking
    xOuter.current = gsap.quickTo(outerRef.current, "x", {
      duration: 0.25,
      ease: "power2.out",
    });
    yOuter.current = gsap.quickTo(outerRef.current, "y", {
      duration: 0.25,
      ease: "power2.out",
    });
    xInner.current = gsap.quickTo(innerRef.current, "x", {
      duration: 0.1,
      ease: "power3.out",
    });
    yInner.current = gsap.quickTo(innerRef.current, "y", {
      duration: 0.1,
      ease: "power3.out",
    });
  }, []);

  useGSAP(() => {
    gsap.to(outerRef.current, {
      opacity: isVisible ? (variant === "hover" ? 0.2 : 1) : 0,
      scale: variant === "hover" ? 1.3 : 1,
      backgroundColor:
        variant === "hover" ? "var(--on-bg-variant)" : "transparent",
      borderColor:
        variant === "hover" ? "var(--on-bg-variant)" : "var(--cursor-ring)",
      duration: 0.25,
      ease: "power2.out",
    });

    gsap.to(innerRef.current, {
      opacity: isVisible ? 1 : 0,
      scale: variant === "hover" ? 0.7 : 1,
      duration: 0.2,
      ease: "power3.out",
    });
  }, { dependencies: [isVisible, variant] });

  useEffect(() => {
    // Detect touch device (coarse pointer)
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
    };

    checkTouch();
    window.addEventListener("resize", checkTouch);

    const move = (e: MouseEvent) => {
      xOuter.current?.(e.clientX);
      yOuter.current?.(e.clientY);
      xInner.current?.(e.clientX);
      yInner.current?.(e.clientY);

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
  }, [isVisible]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* OUTER RING */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border pointer-events-none z-[9999] backdrop-blur-[2px] opacity-0 will-change-transform"
        style={{ transform: "translate(-50%, -50%)" }}
      />

      {/* CENTER DOT */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 w-1.25 h-1.25 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference opacity-0 will-change-transform"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  );
}
