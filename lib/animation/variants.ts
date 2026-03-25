import { type Variants } from 'framer-motion';

// ─── Premium easing curve (Apple/Linear-style: fast-out slow-in) ────────────
const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;
const EASE_IN_OUT = [0.25, 0.46, 0.45, 0.94] as const;

// ─── Durations ───────────────────────────────────────────────────────────────
const DURATION = {
  fast: 0.35,
  base: 0.5,
  slow: 0.65,
} as const;

// ─── fadeIn ─────────────────────────────────────────────────────────────────
/** Opacity-only reveal. Use for subtle ambient elements. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.base, ease: EASE_IN_OUT },
  },
};

// ─── slideUp ────────────────────────────────────────────────────────────────
/** Primary entrance: translates up 24px + fades in. */
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_OUT_EXPO },
  },
};

// ─── revealItem ─────────────────────────────────────────────────────────────
/** Child variant consumed by staggerContainer. Use on list items / cards. */
export const revealItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT_EXPO },
  },
};

// ─── staggerContainer ───────────────────────────────────────────────────────
/**
 * Wrap a list of `revealItem` children.
 * `delayChildren` creates a pause before the first child animates.
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

// ─── hoverScale ─────────────────────────────────────────────────────────────
/**
 * Use as `whileHover` prop value directly (not a full variant object).
 * Only animates transform — no layout triggers.
 */
export const hoverScale = {
  scale: 1.03,
  y: -4,
  transition: { duration: DURATION.fast, ease: EASE_OUT_EXPO },
} as const;

export const tapScale = {
  scale: 0.97,
  transition: { duration: 0.15 },
} as const;

// ─── pageTransition ─────────────────────────────────────────────────────────
/** Full-page entry. Wrap the root layout children. */
export const pageTransition: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.fast, ease: EASE_IN_OUT },
  },
};

// ─── navigationSlide ────────────────────────────────────────────────────────
/** Navbar entrance from top — subtle, not jarring. */
export const navigationSlide: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT_EXPO },
  },
};

// ─── Legacy re-exports (keeps existing import paths working) ─────────────────
/** @deprecated Use slideUp instead */
export const fadeInUp = slideUp;

/** @deprecated Use revealItem + staggerContainer instead */
export const floatAnimation = {};

export { staggerContainer as staggerContainerVariants };
