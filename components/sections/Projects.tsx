'use client';

import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionContainer } from '@/components/ui/SectionContainer';
import { GlassButton } from '@/components/ui/GlassButton';
import { tokens } from '@/lib/constants/design-tokens';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const projects = [
    {
        title: 'E-Commerce Dashboard',
        description: 'A comprehensive analytics dashboard for online retailers with real-time data visualization.',
        tags: ['Next.js', 'TypeScript', 'Tailwind', 'Recharts'],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
        demo: '#',
        github: '#'
    },
    {
        title: 'AI Content Generator',
        description: 'SaaS application that uses OpenAI API to generate marketing copy and blog posts.',
        tags: ['React', 'Node.js', 'OpenAI API', 'Stripe'],
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
        demo: '#',
        github: '#'
    },
    {
        title: 'DeFi Exchange',
        description: 'Decentralized exchange platform for swapping ERC-20 tokens with liquidity pool integration.',
        tags: ['Web3', 'Solidity', 'Ethers.js', 'Wagmi'],
        image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800',
        demo: '#',
        github: '#'
    }
];

export function Projects() {
    return (
        <SectionContainer id="projects">
            <div className="space-y-12">
                <AnimatedSection className="flex flex-col md:flex-row justify-between items-end gap-6">
                    <div className="space-y-4 max-w-2xl">
                        <h2 className={tokens.typography.h2}>Featured Work</h2>
                        <p className="text-neutral-400">
                            A selection of projects that showcase my expertise in building complex web applications.
                        </p>
                    </div>
                    <GlassButton variant="ghost" className="group">
                        View All Projects <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </GlassButton>
                </AnimatedSection>

                <AnimatedSection>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <GlassCard key={index} className="flex flex-col h-full group">
                                <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                        <GlassButton size="icon" variant="glass" aria-label="View Demo">
                                            <ExternalLink size={20} />
                                        </GlassButton>
                                        <GlassButton size="icon" variant="glass" aria-label="View Code">
                                            <Github size={20} />
                                        </GlassButton>
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-grow gap-4">
                                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-neutral-400 text-sm leading-relaxed flex-grow">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </AnimatedSection>
            </div>
        </SectionContainer>
    );
}
