'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { fadeInUp, staggerContainer } from '@/lib/utils/animation-variants';

interface AnimatedSectionProps extends HTMLMotionProps<'div'> {
    delay?: number;
    width?: 'full' | 'default';
}

export function AnimatedSection({
    children,
    className,
    delay = 0,
    width = 'default',
    ...props
}: AnimatedSectionProps) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className={cn(
                'w-full',
                width === 'default' && 'max-w-7xl mx-auto',
                className
            )}
            {...props}
        >
            <motion.div variants={fadeInUp} custom={delay}>
                {children}
            </motion.div>
        </motion.div>
    );
}
