"use client";

export function Hero() {
  return (
    <section
      id="home"
      className="min-h-[80vh] flex flex-col justify-center px-8 max-w-screen-2xl mx-auto mb-32 reveal"
    >
      <span className="font-label text-[10px] tracking-[0.4em] uppercase mb-6 text-white/40">{`${new Date().getFullYear()}`}</span>
      <h1 className="font-headline text-6xl md:text-[8rem] font-extrabold tracking-tighter leading-[0.9] mb-12">
        LESS CODE <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/20">
          MORE IMPACT.
        </span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <p className="md:col-start-7 md:col-span-5 text-lg md:text-xl text-white/50 leading-relaxed font-light">
          I build efficient, scalable front-end solutions with clean
          architecture, focusing on performance, maintainability, and seamless
          user experience.
        </p>
      </div>
    </section>
  );
}
