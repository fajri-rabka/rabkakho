import React from 'react';
import { cn } from '@/lib/utils/cn';
import { tokens } from '@/lib/constants/design-tokens';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import gsap from 'gsap';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
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

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hoverEffect && !reduced) {
      gsap.to(e.currentTarget, { scale: 1.02, duration: 0.3, ease: 'power2.out' });
    }
    props.onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hoverEffect && !reduced) {
      gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: 'power2.out' });
    }
    props.onMouseLeave?.(e);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hoverEffect && !reduced) {
      gsap.to(e.currentTarget, { scale: 0.98, duration: 0.1, ease: 'power2.out' });
    }
    props.onMouseDown?.(e);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hoverEffect && !reduced) {
      gsap.to(e.currentTarget, { scale: 1.02, duration: 0.2, ease: 'power2.out' });
    }
    props.onMouseUp?.(e);
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl will-change-transform',
        tokens.glass[variant],
        hoverEffect && 'hover:shadow-2xl hover:border-white/30',
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      {...props}
    >
      {/* Subtle shimmer overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      {children}
    </div>
  );
}
