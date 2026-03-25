'use client';

export function ProjectsPreview() {
  return (
    <section className="px-8 max-w-screen-2xl mx-auto py-32 border-t border-white/5" id="work">
      <div className="flex justify-between items-end mb-20">
        <div>
          <span className="font-label text-[10px] tracking-[0.4em] uppercase text-white/40">Selected Works</span>
          <h2 className="font-headline text-5xl font-extrabold tracking-tighter mt-4">PROJECTS</h2>
        </div>
        <div className="hidden md:block text-right">
          <span className="text-white/20 font-label text-[10px] tracking-[0.3em] uppercase">Scroll to explore (04)</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-x-20 md:gap-y-32">
        {/* Project 01 */}
        <div className="group relative flex flex-col reveal">
          <div className="aspect-[4/5] overflow-hidden bg-[#0a0a0a] mb-8 transition-transform duration-700 group-hover:-translate-y-2">
            <img 
              className="w-full h-full object-cover grayscale opacity-70 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" 
              alt="Monochrome close-up of high-end electronic hardware" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAh1UqFcC2tZYeB58tBA2wEq5x9e2tww7LtV8D5EvhizHMoOqJKC5eKvdcPL7BAYVQYg0vWbUAnFiJDiBCQS2p4sLhsYLOOY2yOjqlGHlbTbSF7lR4jsttmTBnXmUq6aXeZEq5xQVV7xiOGzib0d-MbCcBus7_2loHdN2fpoXK-ep6gUqoGPH8jRa74-rku_I_S8rGjVgdhNA0UO6ysWhHZJi05rOScE-vHNTwGAug1NroShbhNeN2EODqGzAoFvPHm8-zdUOxLHB8"
            />
          </div>
          <div className="project-card-glass p-8 absolute bottom-20 left-6 right-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-bold">Tech / Architecture</span>
            <h3 className="text-2xl font-extrabold tracking-tighter text-white mt-2">AXON SYSTEM</h3>
            <p className="text-sm text-white/60 mt-4 mb-6 leading-relaxed font-light">Centralized neural interface for next-generation automated environments.</p>
            <div className="flex gap-3">
              <span className="text-[9px] border border-white/20 px-2 py-1 uppercase text-white/40 tracking-widest">WebGL</span>
              <span className="text-[9px] border border-white/20 px-2 py-1 uppercase text-white/40 tracking-widest">React</span>
            </div>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-extrabold tracking-tighter group-hover:text-white/40 transition-colors">AXON SYSTEM</h3>
              <p className="text-white/40 text-sm mt-1 uppercase tracking-widest text-[10px]">Neural Interface Design</p>
            </div>
            <span className="material-symbols-outlined text-white/20 group-hover:text-white transition-colors">arrow_outward</span>
          </div>
        </div>
        
        {/* Project 02 */}
        <div className="group relative flex flex-col md:mt-40 reveal" style={{ animationDelay: '0.1s' }}>
          <div className="aspect-[4/5] overflow-hidden bg-[#0a0a0a] mb-8 transition-transform duration-700 group-hover:-translate-y-2">
            <img 
              className="w-full h-full object-cover grayscale opacity-70 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" 
              alt="Abstract 3D monochromatic shapes" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtnBQmBrLrgvHpAtEWaGgtdtd5CVMa74OZJCsn-ZnF4-hUvNzybGC_iFs3f6M-yH6dZOQBC0ygT2RdTB0ptnKSFdV5eKhwDvOhfuZeqVCfn05oAZQH5Oxb5rSxP7tMzwbGWh75UXwkFmJ8bdKhs935avnPIhtJO56PqifLofp7_jRplGcZ53EDfh7OckFmv94Asb1meHcTG4dl3AEhelbr_J-SiFLrdnmCdbUwDpUoIt0nsKkhzRqRZcRPv_97mQc6AgeeMkVw1IQ"
            />
          </div>
          <div className="project-card-glass p-8 absolute bottom-20 left-6 right-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-bold">E-Commerce / Luxury</span>
            <h3 className="text-2xl font-extrabold tracking-tighter text-white mt-2">LUMINA VELO</h3>
            <p className="text-sm text-white/60 mt-4 mb-6 leading-relaxed font-light">A digital boutique reimagining the experience of luxury watch curation.</p>
            <div className="flex gap-3">
              <span className="text-[9px] border border-white/20 px-2 py-1 uppercase text-white/40 tracking-widest">Next.js</span>
              <span className="text-[9px] border border-white/20 px-2 py-1 uppercase text-white/40 tracking-widest">Shopify</span>
            </div>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-extrabold tracking-tighter group-hover:text-white/40 transition-colors">LUMINA VELO</h3>
              <p className="text-white/40 text-sm mt-1 uppercase tracking-widest text-[10px]">Luxury E-Commerce</p>
            </div>
            <span className="material-symbols-outlined text-white/20 group-hover:text-white transition-colors">arrow_outward</span>
          </div>
        </div>
        
        {/* Project 03 */}
        <div className="group relative flex flex-col reveal">
          <div className="aspect-[4/5] overflow-hidden bg-[#0a0a0a] mb-8 transition-transform duration-700 group-hover:-translate-y-2">
            <img 
              className="w-full h-full object-cover grayscale opacity-70 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" 
              alt="Minimalist desk setup" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDb5oC60wirAvrJZDFYns18d_InXJ6MQDCzo9BidRoyVWKLHyZcOz2pSGnbdW0kIZ6aI3tzk04GygFhyB7ySNPlemL2EUgGvJpWTXWbRA_G3_lxMJVqVngjx61z0XBCKzj0EUYkRG-4QtsUYSn7UCSIVjwu31kxmxLDUw1wk7GtM6iXtqDMYcwrd4Ml9-Hy4e_NkzNnXcNbPRZZdVyBv0ZfIp75vBTRPaVG3iywx7bSSISWoMnJjcxH0UN6gaEJwQDE80_jQaS6OjA"
            />
          </div>
          <div className="project-card-glass p-8 absolute bottom-20 left-6 right-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-bold">SaaS / Productivity</span>
            <h3 className="text-2xl font-extrabold tracking-tighter text-white mt-2">VOID FLOW</h3>
            <p className="text-sm text-white/60 mt-4 mb-6 leading-relaxed font-light">Deep focus task management for the modern autonomous professional.</p>
            <div className="flex gap-3">
              <span className="text-[9px] border border-white/20 px-2 py-1 uppercase text-white/40 tracking-widest">TypeScript</span>
              <span className="text-[9px] border border-white/20 px-2 py-1 uppercase text-white/40 tracking-widest">Tailwind</span>
            </div>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-extrabold tracking-tighter group-hover:text-white/40 transition-colors">VOID FLOW</h3>
              <p className="text-white/40 text-sm mt-1 uppercase tracking-widest text-[10px]">Productivity OS</p>
            </div>
            <span className="material-symbols-outlined text-white/20 group-hover:text-white transition-colors">arrow_outward</span>
          </div>
        </div>
        
        {/* Project 04 */}
        <div className="group relative flex flex-col md:mt-40 reveal" style={{ animationDelay: '0.1s' }}>
          <div className="aspect-[4/5] overflow-hidden bg-[#0a0a0a] mb-8 transition-transform duration-700 group-hover:-translate-y-2">
            <img 
              className="w-full h-full object-cover grayscale opacity-70 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" 
              alt="Modern server room" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBShCbP6YYcY2vBnQGeMljSgwccVHqjF7VwKJ3_lYpwh5eySRv3zU71VXGsnDYhPVTX9o8Xso19HjdZfQjB_raOQjqE_mdtV__M2GWOFXyd1xqdK_fMnCLhb51lKEaTYObCN6gclqIWS0QLYol57fpKbOTneSCN-SmcvRAW-BMWsJcAksk97FX__6V9whdsVrL-fGFbTRj3PmZuFnsVR-qvSuGJ07rFKpLC_JK2DB_QuiXdyGsh8_JVlRIDSlHIY_wchvXYjNJocSQ"
            />
          </div>
          <div className="project-card-glass p-8 absolute bottom-20 left-6 right-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-bold">Web3 / Finance</span>
            <h3 className="text-2xl font-extrabold tracking-tighter text-white mt-2">ETHER PORT</h3>
            <p className="text-sm text-white/60 mt-4 mb-6 leading-relaxed font-light">Secure gateway for institutional-grade digital asset management.</p>
            <div className="flex gap-3">
              <span className="text-[9px] border border-white/20 px-2 py-1 uppercase text-white/40 tracking-widest">Solidity</span>
              <span className="text-[9px] border border-white/20 px-2 py-1 uppercase text-white/40 tracking-widest">Ethers.js</span>
            </div>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-extrabold tracking-tighter group-hover:text-white/40 transition-colors">ETHER PORT</h3>
              <p className="text-white/40 text-sm mt-1 uppercase tracking-widest text-[10px]">DeFi Infrastructure</p>
            </div>
            <span className="material-symbols-outlined text-white/20 group-hover:text-white transition-colors">arrow_outward</span>
          </div>
        </div>
        
      </div>
    </section>
  );
}

