'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Github, Linkedin, Twitter } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { tokens } from '@/lib/constants/design-tokens';
import { navigationSlide } from '@/lib/utils/animation-variants';
import { GlassButton } from '@/components/ui/GlassButton';

const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Work', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    return (
        <motion.header
            variants={navigationSlide}
            initial="hidden"
            animate="visible"
            className={cn(
                'z-50 w-full flex transition-all duration-300',
                scrolled ? 'fixed top-6' : 'absolute top-6'
            )}
        >
            <div
                className={cn(
                    'w-full max-w-6xl transition-all duration-300 pl-20',
                    scrolled &&
                    'bg-black/20 backdrop-blur-xl border border-white/10 rounded-full shadow-lg'
                )}
            >
                <nav className="flex items-center justify-between h-14">
                    {/* Logo */}
                    <a
                        href="#"
                        className="text-2xl font-bold hover:opacity-80 transition-opacity font-pixelify"
                    >
                        rabka.
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-neutral-300 hover:text-white transition-colors relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
                            </a>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <div className="flex items-center gap-3 pr-4">
                            <a href="#" className="text-neutral-400 hover:text-white transition-colors"><Github size={20} /></a>
                            <a href="#" className="text-neutral-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-white p-2"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </nav>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-full left-0 right-0 p-4 md:hidden"
                >
                    <div className={tokens.glass.card + " rounded-2xl p-6 flex flex-col gap-4"}>
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="text-lg font-medium text-white py-2 border-b border-white/10 last:border-0"
                            >
                                {item.name}
                            </a>
                        ))}
                        <div className="flex gap-4 pt-4 justify-center">
                            <a href="#" className="text-white"><Github /></a>
                            <a href="#" className="text-white"><Linkedin /></a>
                            <a href="#" className="text-white"><Twitter /></a>
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.header>
    );
}
