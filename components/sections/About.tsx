import {
  FloatingLetter,
  AnimatedParagraph,
  AnimatedBox,
  AnimatedDownloadButton,
} from "@/components/ui/AboutClientComponents";

export function About() {
  return (
    <section
      className="px-6 md:px-12 max-w-screen-2xl mx-auto py-24 md:py-48 bg-background border-t border-outline/30"
      id="about"
    >
      <div className="flex flex-col xl:flex-row gap-16 xl:gap-32 w-full">
        {/* ── LEFT MASSIVE TEXT ── */}
        <div className="w-full xl:w-[45%] flex flex-col justify-start">
          <h2 className="font-headline text-5xl md:text-[6.5rem] lg:text-[8rem] font-black tracking-tighter leading-[0.85] text-on-background uppercase">
            <div className="flex flex-wrap gap-y-12 md:gap-y-6">
              {"LESS CODE.".split("").map((char, i) => (
                <FloatingLetter key={i} char={char} index={i} />
              ))}
            </div>
            <div className="flex flex-wrap mt-8 md:mt-16 gap-y-12 md:gap-y-6">
              {"MORE IMPACT.".split("").map((char, i) => (
                <FloatingLetter key={i} char={char} index={i + 10} />
              ))}
            </div>
          </h2>
        </div>

        {/* ── RIGHT CONTENT ── */}
        <div className="w-full xl:w-[55%] flex flex-col justify-center">
          <AnimatedParagraph className="text-xl md:text-2xl lg:text-3xl font-light text-on-background/80 leading-relaxed md:leading-[1.4] mb-16 md:mb-24 tracking-tight max-w-3xl">
            Building great products is not about adding more, but delivering
            more with less. I focus on creating efficient, scalable interfaces
            where performance, clarity, and user experience work seamlessly
            together.
          </AnimatedParagraph>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* APPROACH */}
            <AnimatedBox
              delay={0.2}
              className="flex flex-col border-t border-outline/30 pt-6 group"
            >
              <h4 className="font-label font-bold text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-primary mb-6 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                THE APPROACH
              </h4>
              <p className="text-on-background/60 text-sm md:text-base leading-relaxed font-light group-hover:text-on-background/80 transition-colors duration-500">
                I build with a systems mindset clean code, prioritize
                performance, and precise, every detail matters.
              </p>
            </AnimatedBox>

            {/* RESULT */}
            <AnimatedBox
              delay={0.3}
              className="flex flex-col border-t border-outline/30 pt-6 group"
            >
              <h4 className="font-label font-bold text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-primary mb-6 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                THE RESULT
              </h4>
              <p className="text-on-background/60 text-sm md:text-base leading-relaxed font-light group-hover:text-on-background/80 transition-colors duration-500">
                Scalable, high performance products built to last and designed
                to deliver real impact.
              </p>
            </AnimatedBox>
          </div>

          <div className="flex flex-col mt-5 pt-10">
            {/* DOWNLOAD CV */}
            <AnimatedDownloadButton />
          </div>
        </div>
      </div>
    </section>
  );
}
