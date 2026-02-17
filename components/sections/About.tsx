'use client';

import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionContainer } from '@/components/ui/SectionContainer';
import { tokens } from '@/lib/constants/design-tokens';
import { Code2, Globe, Database, Terminal } from 'lucide-react';

export function About() {
    return (
        <SectionContainer id="about" width='full'>
            <AnimatedSection className="grid lg:grid-cols-1 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className={tokens.typography.h2}>About Me</h2>
                    <div className="space-y-4 text-neutral-400 text-sm leading-relaxed">
                        <p>
                            I am a Front-End Developer with solid experience in building scalable web and mobile applications. I specialize in creating clean, accessible, and user-focused interfaces using modern technologies such as React, React Native, and modern CSS frameworks. I am passionate about delivering high-quality digital products that balance performance, usability, and visual detail
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-12">
                    <GlassCard className="p-6 flex flex-col items-center text-center gap-4">
                        <div className="p-3 rounded-full bg-cyan-500/10 text-cyan-400">
                            <Code2 size={32} />
                        </div>
                        <h3 className="font-semibold text-white">Frontend</h3>
                        <p className="text-sm text-neutral-400">React, Next.js, Tailwind</p>
                    </GlassCard>

                    <GlassCard className="p-6 flex flex-col items-center text-center gap-4">
                        <div className="p-3 rounded-full bg-purple-500/10 text-purple-400">
                            <Database size={32} />
                        </div>
                        <h3 className="font-semibold text-white">Backend</h3>
                        <p className="text-sm text-neutral-400">Node.js, PostgreSQL, Prisma, GraphQL</p>
                    </GlassCard>

                    <GlassCard className="p-6 flex flex-col items-center text-center gap-4">
                        <div className="p-3 rounded-full bg-pink-500/10 text-pink-400">
                            <Globe size={32} />
                        </div>
                        <h3 className="font-semibold text-white">Web3</h3>
                        <p className="text-sm text-neutral-400">Solidity, Ethers.js, Wagmi, Hardhat</p>
                    </GlassCard>
                </div>
            </AnimatedSection>
        </SectionContainer>
    );
}
