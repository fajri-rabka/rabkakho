import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';
import { tokens } from '@/lib/constants/design-tokens';

interface SectionContainerProps extends HTMLAttributes<HTMLElement> {
    padding?: boolean;
    width?: 'full' | 'default' | 'narrow';
}

export const SectionContainer = forwardRef<HTMLElement, SectionContainerProps>(
    ({ className, padding = true, width = 'default', children, ...props }, ref) => {
        return (
            <section
                ref={ref}
                className={cn(
                    'relative w-full',
                    padding && tokens.spacing.section,
                    className
                )}
                {...props}
            >
                <div
                    className={cn(
                        'mx-auto w-full',
                        tokens.spacing.container,
                        width === 'narrow' && 'max-w-4xl',
                        width === 'full' && 'max-w-full px-0'
                    )}
                >
                    {children}
                </div>
            </section>
        );
    }
);

SectionContainer.displayName = 'SectionContainer';
