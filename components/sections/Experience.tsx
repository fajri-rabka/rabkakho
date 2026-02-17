'use client';

import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionContainer } from '@/components/ui/SectionContainer';
import { tokens } from '@/lib/constants/design-tokens';
import { Calendar, Building2 } from 'lucide-react';

const experiences = [
    {
        role: 'Senior Frontend Engineer',
        company: 'TechCorp Inc.',
        period: '2023 - Present',
        description: 'Leading the frontend team in rebuilding the core product dashboard. Improved performance by 40% and established a new design system.',
        technologies: ['React', 'Next.js', 'GraphQL', 'Turborepo']
    },
    {
        role: 'Full Stack Developer',
        company: 'StartupX',
        period: '2021 - 2023',
        description: 'Developed and maintained multiple client-facing applications. Implemented CI/CD pipelines and automated testing strategies.',
        technologies: ['Vue.js', 'Node.js', 'AWS', 'Docker']
    },
    {
        role: 'Junior Web Developer',
        company: 'Creative Agency',
        period: '2019 - 2021',
        description: 'Collaborated with designers to deliver pixel-perfect websites for various clients. Specialized in interactive animations.',
        technologies: ['JavaScript', 'GSAP', 'WordPress', 'PHP']
    }
];

export function Experience() {
    return (
        <SectionContainer id="experience" className="bg-white/2">
            <div className="space-y-12">
                <AnimatedSection className="text-center max-w-2xl mx-auto space-y-4">
                    <h2 className={tokens.typography.h2}>Experience</h2>
                    <p className="text-neutral-400">
                        My professional journey and the companies I've had the privilege to work with.
                    </p>
                </AnimatedSection>

                <div className="relative space-y-8 max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent hidden md:block" />

                    {experiences.map((exp, index) => (
                        <AnimatedSection key={index} delay={index * 0.1}>
                            <div className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                                {/* Timeline Dot */}
                                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)] -translate-x-1.5 md:-translate-x-2 mt-6 hidden md:block" />

                                <div className="flex-1">
                                    {/* Spacer for alternating layout */}
                                </div>

                                <GlassCard className="flex-1 p-6 space-y-4 w-full md:w-[calc(50%-2rem)]">
                                    <div className="flex justify-between items-start flex-wrap gap-2">
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                                            <div className="flex items-center gap-2 text-cyan-400 text-sm mt-1">
                                                <Building2 size={14} />
                                                <span>{exp.company}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-neutral-500 text-xs font-medium px-2 py-1 rounded-full bg-white/5 border border-white/5">
                                            <Calendar size={12} />
                                            <span>{exp.period}</span>
                                        </div>
                                    </div>

                                    <p className="text-neutral-300 text-sm leading-relaxed">
                                        {exp.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {exp.technologies.map(tech => (
                                            <span key={tech} className="text-xs text-neutral-400 px-2 py-1 rounded bg-white/5">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </GlassCard>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </SectionContainer>
    );
}
