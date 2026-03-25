'use client';

export function About() {
  return (
    <section className="px-8 max-w-screen-2xl mx-auto py-32 bg-black border-t border-white/5" id="about">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
        <div className="md:col-span-5">
          <span className="font-label text-[10px] tracking-[0.4em] uppercase text-white/40">The Philosophy</span>
          <h2 className="font-headline text-6xl font-extrabold tracking-tighter mt-4 leading-[0.9]">SILENT <br/>PRECISION.</h2>
        </div>
        <div className="md:col-span-7">
          <p className="text-2xl font-light text-white/70 leading-relaxed mb-16">
            Design is not about adding more; it is about removing everything that doesn't belong until only the essence remains. I believe in the power of negative space to create clarity and the impact of typography to drive emotion.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h4 className="font-headline font-bold text-lg mb-4 tracking-tighter">THE APPROACH</h4>
              <p className="text-white/30 text-sm leading-relaxed font-light">
                Every pixel is intentional. Every interaction is considered. We work at the intersection of aesthetic beauty and functional performance to deliver results that don't just look goodâ€”they feel right.
              </p>
            </div>
            <div>
              <h4 className="font-headline font-bold text-lg mb-4 tracking-tighter">THE RESULT</h4>
              <p className="text-white/30 text-sm leading-relaxed font-light">
                Digital products that stand the test of time. By avoiding fleeting trends and focusing on fundamental design principles, we build experiences that remain relevant and resonant.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

