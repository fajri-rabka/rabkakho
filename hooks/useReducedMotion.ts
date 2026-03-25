'use client';

import { useReducedMotion as useFramerReducedMotion } from 'framer-motion';

/**
 * Returns `true` when the user has enabled `prefers-reduced-motion: reduce`.
 * Use this to gate or simplify animations across all motion components.
 *
 * @example
 * const reduced = useReducedMotion();
 * <motion.div animate={reduced ? 'visible' : undefined} />
 */
export function useReducedMotion(): boolean {
  return useFramerReducedMotion() ?? false;
}
