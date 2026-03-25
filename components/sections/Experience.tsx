'use client';

export function Experience() {
  return (
    <section className="px-8 max-w-screen-2xl mx-auto py-32 border-t border-white/5" id="experience">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
        <div className="md:col-span-4">
          <span className="font-label text-[10px] tracking-[0.4em] uppercase text-white/40">The Journey</span>
          <h2 className="font-headline text-5xl font-extrabold tracking-tighter mt-4">EXPERIENCE</h2>
        </div>
        <div className="md:col-span-8 space-y-24 relative">
          {/* Vertical Line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10 hidden md:block"></div>
          
          {/* Exp Item 01 */}
          <div className="md:pl-12 relative group reveal">
            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-white border-4 border-black ring-1 ring-white/20 hidden md:block transition-all group-hover:scale-150"></div>
            <div className="glass-card p-10 hover:bg-white/5 transition-all duration-500 border border-white/10">
              <span className="text-xs font-bold tracking-[0.3em] text-white/40 block mb-4">2021 â€” PRESENT</span>
              <h3 className="text-3xl font-extrabold tracking-tighter mb-2">Senior Front-End Developer</h3>
              <p className="text-white/60 text-lg mb-6">Lumina Creative Agency</p>
              <p className="text-white/40 font-light leading-relaxed max-w-2xl">
                Leading a high-performance team of 5 designers and developers. Spearheading the technical direction of award-winning digital experiences for global luxury brands. Focused on performance, accessibility, and high-fidelity motion design.
              </p>
            </div>
          </div>
          
          {/* Exp Item 02 */}
          <div className="md:pl-12 relative group reveal" style={{ animationDelay: '0.1s' }}>
            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-white/20 border-4 border-black ring-1 ring-white/10 hidden md:block transition-all group-hover:bg-white group-hover:scale-150"></div>
            <div className="glass-card p-10 hover:bg-white/5 transition-all duration-500 border border-white/10">
              <span className="text-xs font-bold tracking-[0.3em] text-white/40 block mb-4">2019 â€” 2021</span>
              <h3 className="text-3xl font-extrabold tracking-tighter mb-2">UI Engineer</h3>
              <p className="text-white/60 text-lg mb-6">Nova Fintech Systems</p>
              <p className="text-white/40 font-light leading-relaxed max-w-2xl">
                Architected and maintained the core Design System used across 4 enterprise products. Engineered complex real-time dashboards for financial monitoring, focusing on data visualization and modular component architecture.
              </p>
            </div>
          </div>
          
          {/* Exp Item 03 */}
          <div className="md:pl-12 relative group reveal" style={{ animationDelay: '0.2s' }}>
            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-white/20 border-4 border-black ring-1 ring-white/10 hidden md:block transition-all group-hover:bg-white group-hover:scale-150"></div>
            <div className="glass-card p-10 hover:bg-white/5 transition-all duration-500 border border-white/10">
              <span className="text-xs font-bold tracking-[0.3em] text-white/40 block mb-4">2017 â€” 2019</span>
              <h3 className="text-3xl font-extrabold tracking-tighter mb-2">Junior Web Developer</h3>
              <p className="text-white/60 text-lg mb-6">StartUp Inc.</p>
              <p className="text-white/40 font-light leading-relaxed max-w-2xl">
                Executed full-stack development for rapid-growth consumer platforms. Specialized in custom CMS integrations and developing responsive, mobile-first user interfaces using emerging front-end frameworks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

