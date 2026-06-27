import BackgroundParticles from "@/components/ui/BackgroundParticles";
import { TextReveal } from "@/components/ui/TextReveal";
import { ScrollParallaxWrapper } from "@/components/ui/ScrollParallaxWrapper";
import {
  AnimatedWord,
  AnimatedDescription,
} from "@/components/ui/HeroClientComponents";
import { FadeInTag } from "@/components/ui/AboutClientComponents";

export function Hero() {
  return (
    <ScrollParallaxWrapper
      withParallax
      background={<BackgroundParticles />}
      id="home"
      className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-12 max-w-screen-2xl mx-auto overflow-hidden"
    >
      {/* Tag */}
      <FadeInTag className="font-label text-xs tracking-[0.3em] uppercase text-on-background/70 block mb-6">
        {new Date().getFullYear()}
      </FadeInTag>

      {/* Headline */}
      <h1 className="font-headline text-3xl lg:text-8xl font-bold tracking-tight leading-none text-on-background mb-8">
        <TextReveal text="LESS CODE," className="block" />
        <AnimatedWord />
      </h1>

      {/* Description */}
      <AnimatedDescription />
    </ScrollParallaxWrapper>
  );
}
