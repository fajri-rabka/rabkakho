import BackgroundParticles from "@/components/ui/BackgroundParticles";
import { HeroKineticText } from "@/components/ui/HeroKineticText";
import {
  AnimatedWord,
  AnimatedDescription,
  ScrollExploreLabel,
} from "@/components/ui/HeroClientComponents";
import { FadeInTag } from "@/components/ui/AboutClientComponents";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-center px-6 md:px-12 max-w-screen-2xl mx-auto overflow-hidden"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <BackgroundParticles />
      </div>

      <div className="relative z-10 w-full pt-16 md:pt-24">
        {/* Tag */}
        <FadeInTag className="font-label text-[10px] md:text-xs tracking-[0.3em] uppercase text-on-background/70 block mb-8">
          {`[KEEP IT, SIMPLE STUPID]`}
        </FadeInTag>

        {/* Massive Brutalist Typography */}
        <h1 className="font-headline text-[clamp(4rem,11vw,12rem)] font-black tracking-[-0.04em] leading-none text-on-background uppercase">
          <HeroKineticText text="LESS CODE," className="block mb-1 md:mb-4" />
          <AnimatedWord />
        </h1>

        {/* Brutalist Contrast: Ultra bold vs thin metadata */}
        <div className="mt-12 md:mt-16 flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">
          <AnimatedDescription />
          <ScrollExploreLabel />
        </div>
      </div>
    </section>
  );
}
