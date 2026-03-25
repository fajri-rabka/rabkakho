/**
 * @deprecated
 * This file is kept for backwards compatibility.
 * All variants now live in /lib/animation/variants.ts
 * Import from there directly for new code.
 */
export {
  fadeIn,
  slideUp,
  slideUp as fadeInUp,
  staggerContainer,
  revealItem,
  hoverScale,
  tapScale,
  pageTransition,
  navigationSlide,
} from '@/lib/animation/variants';

// Legacy-only: blob float — removed from active use (infinite loops harm performance)
import { type Variants } from 'framer-motion';
export const floatAnimation: Variants = {};
export const glowHover: Variants = {};
export const scaleOnHover: Variants = {};
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};
