import { AboutLayoutWrapper, AboutKineticText } from "@/components/ui/AboutKinetic";
import { AnimatedDownloadButton } from "@/components/ui/AboutClientComponents";

export function About() {
  const LeftContent = (
    <div className="w-full">
      {/* 
        The Bleed: text breaks boundaries (-ml-4 to push outside safe padding)
        The Kinetic Split: wrapped in the AboutKineticText component 
      */}
      <AboutKineticText
        text="LESS CODE. MORE IMPACT."
        className="font-headline text-[clamp(6rem,15vw,22rem)] font-black tracking-[-0.06em] leading-[0.85] text-on-background uppercase -ml-2 lg:-ml-6" 
      />
    </div>
  );

  const RightContent = (
    <>
      <div className="min-h-[45vh] lg:min-h-[55vh] p-6 lg:p-12 border-b border-outline flex items-end">
        <p className="font-mono text-[11px] lg:text-[12px] tracking-[0.2em] uppercase text-on-background/85 leading-[1.8]">
          Building great products is not about adding more, but delivering more with less. I focus on creating efficient, scalable interfaces where performance, clarity, and user experience work seamlessly together.
        </p>
      </div>

      <div className="min-h-[35vh] lg:min-h-[45vh] p-6 lg:p-12 border-b border-outline flex flex-col justify-end">
        <h4 className="font-mono font-bold text-[10px] tracking-[0.4em] uppercase text-on-background/50 mb-8 lg:mb-16">
          [THE APPROACH]
        </h4>
        <p className="text-on-background text-base lg:text-3xl leading-none font-black uppercase tracking-tighter">
          I build with a systems mindset clean code, prioritize performance, and precise, every detail matters.
        </p>
      </div>

      <div className="min-h-[35vh] lg:min-h-[45vh] p-6 lg:p-12 border-b border-outline flex flex-col justify-end">
        <h4 className="font-mono font-bold text-[10px] tracking-[0.4em] uppercase text-on-background/50 mb-8 lg:mb-16">
          [THE RESULT]
        </h4>
        <p className="text-on-background text-base lg:text-3xl leading-none font-black uppercase tracking-tighter">
          Scalable, high performance products built to last and designed to deliver real impact.
        </p>
      </div>

      <div className="h-[25vh] p-6 lg:p-12 flex justify-start items-center bg-background border-b border-outline">
        <AnimatedDownloadButton />
      </div>
    </>
  );

  return <AboutLayoutWrapper leftContent={LeftContent} rightContent={RightContent} />;
}
