'use client';

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 w-full py-16">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 w-full max-w-screen-2xl mx-auto">
        <div className="text-white/20 font-label text-[10px] tracking-[0.4em] uppercase mb-12 md:mb-0">
          Â© {new Date().getFullYear()} THE CURATOR. ALL RIGHTS RESERVED.
        </div>
        <div className="flex gap-12">
          <a className="text-white/30 hover:text-white transition-colors font-label text-[10px] tracking-[0.3em] uppercase" href="#">Twitter</a>
          <a className="text-white/30 hover:text-white transition-colors font-label text-[10px] tracking-[0.3em] uppercase" href="#">LinkedIn</a>
          <a className="text-white/30 hover:text-white transition-colors font-label text-[10px] tracking-[0.3em] uppercase" href="#">Instagram</a>
          <a className="text-white/30 hover:text-white transition-colors font-label text-[10px] tracking-[0.3em] uppercase" href="#">Email</a>
        </div>
      </div>
    </footer>
  );
}

