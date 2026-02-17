import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { tokens } from '@/lib/constants/design-tokens';

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
    return (
        <motion.div
            className={cn(
                'relative overflow-hidden rounded-2xl',
                tokens.glass[variant],
                hoverEffect && 'hover:shadow-2xl hover:border-white/30',
                className
            )}
            whileHover={hoverEffect ? { y: -5, scale: 1.01 } : undefined}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            {...props}
        >
            {/* Texture overlay for realism */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {children as React.ReactNode}
        </motion.div>
    );
}
