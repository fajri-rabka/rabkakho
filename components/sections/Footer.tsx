'use client';

import { SectionContainer } from '@/components/ui/SectionContainer';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-white/10 bg-black/50 backdrop-blur-xl">
            <SectionContainer className="py-12 md:py-16">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <p className="text-neutral-500 text-sm mt-2">
                            Crafting digital experiences with passion and precision.
                        </p>
                    </div>

                    <div className="flex items-center gap-8 text-sm font-medium text-neutral-400">
                        <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                        <a href="#" className="hover:text-white transition-colors">GitHub</a>
                        <a href="#" className="hover:text-white transition-colors">Instagram</a>
                    </div>

                    <div className="text-neutral-600 text-sm">
                        © {currentYear} All rights reserved.
                    </div>
                </div>
            </SectionContainer>
        </footer>
    );
}
