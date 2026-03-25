'use client';

export function Hero() {
  return (
    <section id="home" className="min-h-[80vh] flex flex-col justify-center px-8 max-w-screen-2xl mx-auto mb-32 reveal">
      <span className="font-label text-[10px] tracking-[0.4em] uppercase mb-6 text-white/40">Portfolio 2024 Edition</span>
      <h1 className="font-headline text-7xl md:text-[10rem] font-extrabold tracking-tighter leading-[0.9] mb-12">
        THE DIGITAL <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/20">CURATOR.</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <p className="md:col-start-7 md:col-span-5 text-lg md:text-xl text-white/50 leading-relaxed font-light">
          Meticulously crafting high-end digital experiences through the lens of atmospheric minimalism and editorial precision.
        </p>
      </div>
    </section>
  );
}

