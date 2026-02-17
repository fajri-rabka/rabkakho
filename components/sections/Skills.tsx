'use client';

import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionContainer } from '@/components/ui/SectionContainer';
import { tokens } from '@/lib/constants/design-tokens';
import { motion } from 'framer-motion';

const skills = [
    'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js',
    'Tailwind CSS', 'Framer Motion', 'PostgreSQL', 'GraphQL',
    'Docker', 'AWS', 'Git', 'Figma', 'Three.js'
];

export function Skills() {
    return (
        <SectionContainer id="skills" className="bg-white/2">
            <div className="space-y-12">
                <AnimatedSection className="text-center max-w-2xl mx-auto space-y-4">
                    <h2 className={tokens.typography.h2}>Technical Arsenal</h2>
                    <p className="text-neutral-400">
                        A curated list of technologies I use to bring ideas to life.
                    </p>
                </AnimatedSection>

                <AnimatedSection>
                    <div className="flex flex-wrapjustify-center gap-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                            {skills.map((skill, index) => (
                                <GlassCard
                                    key={skill}
                                    className="p-4 flex items-center justify-center text-center cursor-default"
                                >
                                    <span className="font-medium text-neutral-200">{skill}</span>
                                </GlassCard>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </SectionContainer>
    );
}
