'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { staggerContainer, revealItem, slideUp } from '@/lib/animation/variants';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface AnimatedSectionProps extends HTMLMotionProps<'div'> {
  /**
   * When `stagger` is true (default), the wrapper becomes a staggerContainer
   * and YOU are responsible for wrapping direct children in `<motion.div variants={revealItem}>`.
   *
   * When `stagger` is false, this component itself animates as a single slideUp block.
   */
  stagger?: boolean;
  width?: 'full' | 'default';
}

export function AnimatedSection({
  children,
  className,
  stagger = false,
  width = 'default',
  ...props
}: AnimatedSectionProps) {
  const reduced = useReducedMotion();

  // When reduced motion is requested, render children without any animation
  if (reduced) {
    return (
      <div
        className={cn(
          'w-full',
          width === 'default' && 'max-w-7xl mx-auto',
          className
        )}
      >
        {children as React.ReactNode}
      </div>
    );
  }

  if (stagger) {
    // Parent-only: children must have variants={revealItem}
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainer}
        className={cn(
          'w-full',
          width === 'default' && 'max-w-7xl mx-auto',
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  // Default: single-block slideUp
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={slideUp}
      className={cn(
        'w-full',
        width === 'default' && 'max-w-7xl mx-auto',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
