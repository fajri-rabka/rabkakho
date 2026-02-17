// Standardized spacing system for consistent layout
export const SPACING = {
    // Section vertical spacing
    section: {
        mobile: 'py-16',      // 64px top/bottom
        tablet: 'md:py-20',   // 80px top/bottom
        desktop: 'lg:py-24',  // 96px top/bottom
    },

    // Container horizontal padding
    container: {
        mobile: 'px-4',       // 16px left/right
        tablet: 'sm:px-6',    // 24px left/right
        desktop: 'lg:px-8',   // 32px left/right
    },

    // Content spacing
    content: {
        xs: 'space-y-2',      // 8px between items
        sm: 'space-y-4',      // 16px between items
        md: 'space-y-6',      // 24px between items
        lg: 'space-y-8',      // 32px between items
        xl: 'space-y-12',     // 48px between items
        '2xl': 'space-y-16',  // 64px between items
    },

    // Grid gaps
    grid: {
        sm: 'gap-4',          // 16px
        md: 'gap-6',          // 24px
        lg: 'gap-8',          // 32px
    },

    // Section header margin bottom
    header: {
        mobile: 'mb-12',      // 48px
        tablet: 'md:mb-16',   // 64px
        desktop: 'lg:mb-20',  // 80px
    },

    // Card padding
    card: {
        sm: 'p-4',            // 16px all sides
        md: 'p-6',            // 24px all sides
        lg: 'p-8',            // 32px all sides
    },
} as const;

// Helper function to combine spacing classes
export function getSpacing(...classes: string[]): string {
    return classes.join(' ');
}
