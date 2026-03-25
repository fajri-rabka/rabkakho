'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { tokens } from '@/lib/constants/design-tokens';
import { hoverScale, tapScale } from '@/lib/animation/variants';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  variant?: 'base' | 'card' | 'none';
  hoverEffect?: boolean;
}

export function GlassCard({
  children,
  className,
  variant = 'card',
  hoverEffect = true,
  ...props
}: GlassCardProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-2xl',
        tokens.glass[variant],
        hoverEffect && 'hover:shadow-2xl hover:border-white/30',
        className
      )}
      whileHover={hoverEffect && !reduced ? hoverScale : undefined}
      whileTap={hoverEffect && !reduced ? tapScale : undefined}
      {...props}
    >
      {/* Subtle shimmer overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      {children as React.ReactNode}
    </motion.div>
  );
}
