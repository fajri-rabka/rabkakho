import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import gsap from 'gsap';

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'glass';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    isLoading?: boolean;
}

export function GlassButton({
    children,
    className,
    variant = 'primary',
    size = 'md',
    isLoading,
    disabled,
    ...props
}: GlassButtonProps) {
    const variants = {
        primary: 'bg-white text-black hover:bg-neutral-200 border border-transparent shadow-lg shadow-white/10',
        secondary: 'bg-neutral-900 text-white border border-neutral-800 hover:bg-neutral-800 hover:border-neutral-700',
        ghost: 'bg-transparent text-white hover:bg-white/10 hover:text-white',
        glass: 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:border-white/30 shadow-lg',
    };

    const sizes = {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-14 px-8 text-lg',
        icon: 'h-10 w-10 p-2',
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
        gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
        props.onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: 'power2.out' });
        props.onMouseLeave?.(e);
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
        gsap.to(e.currentTarget, { scale: 0.95, duration: 0.1, ease: 'power2.out' });
        props.onMouseDown?.(e);
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
        gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2, ease: 'power2.out' });
        props.onMouseUp?.(e);
    };

    return (
        <button
            className={cn(
                'relative inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-cyan-500 disabled:opacity-50 disabled:pointer-events-none will-change-transform',
                variants[variant],
                sizes[size],
                className
            )}
            disabled={disabled || isLoading}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            {...props}
        >
            <React.Fragment>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}

                {/* Shine effect for glass/primary variants */}
                {(variant === 'glass' || variant === 'primary') && (
                    <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                    </div>
                )}
            </React.Fragment>
        </button>
    );
}
