"use client";

import { useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Plugins are now registered centrally in lib/gsap-config.ts

export function SmoothScrollWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // 3. Ticker Synchronization
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // 4. Strict Lenis -> GSAP Sync for Sub-pixel Precision
    const lenisInstance = lenisRef.current?.lenis;
    if (lenisInstance) {
      lenisInstance.on("scroll", ScrollTrigger.update);
    }

    return () => {
      gsap.ticker.remove(update);
      if (lenisInstance) {
        lenisInstance.off("scroll", ScrollTrigger.update);
      }
    };
  }, []);

  return (
    <ReactLenis root ref={lenisRef} autoRaf={false}>
      {children}
    </ReactLenis>
  );
}
