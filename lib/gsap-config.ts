"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

// The Singleton Registration Pattern
// Prevents duplicate registrations and hot-reload crashes
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  
  // Tag the root element safely so the scroller directive works without breaking layout
  document.documentElement.setAttribute("data-lenis-scroll", "true");
  
  // Global Pipeline: Scroller Default
  ScrollTrigger.defaults({ scroller: "[data-lenis-scroll]" });
}
