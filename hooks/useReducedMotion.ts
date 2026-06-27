"use client";

import { useState, useEffect } from "react";

/**
 * Returns `true` when the user has enabled `prefers-reduced-motion: reduce`.
 * Use this to gate or simplify animations across all motion components.
 */
export function useReducedMotion(): boolean {
  const [matches, setMatch] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMatch(mediaQuery.matches);
    const handler = (event: MediaQueryListEvent) => setMatch(event.matches);
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, []);

  return matches;
}
