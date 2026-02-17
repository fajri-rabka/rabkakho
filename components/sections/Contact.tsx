'use client';

import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionContainer } from '@/components/ui/SectionContainer';
import { GlassButton } from '@/components/ui/GlassButton';
import { tokens } from '@/lib/constants/design-tokens';
import { Mail, MessageSquare, ArrowRight } from 'lucide-react';

export function Contact() {
    return (
        <SectionContainer id="contact" className="pb-32">
            <AnimatedSection width="default" className="max-w-4xl mx-auto">
                <GlassCard className="p-8 md:p-12 text-center space-y-8 relative overflow-hidden group">
                    {/* Decorative background glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <div className="relative z-10 space-y-6">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                            Ready to start your next project?
                        </h2>
                        <p className="text-sm text-neutral-300 max-w-2xl mx-auto">
                            I'm currently available for freelance work and open to full-time opportunities.
                            If you have a project that needs some creative touch, let's chat!
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <GlassButton size="lg" className="min-w-[160px]">
                                <Mail className="mr-2 h-5 w-5" />
                                Email Me
                            </GlassButton>
                        </div>
                    </div>
                </GlassCard>
            </AnimatedSection>
        </SectionContainer>
    );
}
