"use client";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 w-full py-5 md:py-10">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 md:px-12 w-full max-w-screen-2xl mx-auto">
        <div className="text-white/20 font-label text-[8px] lg:text-[10px] tracking-[0.4em] uppercase mb-12 md:mb-0">
          © {new Date().getFullYear()} Rabka — Built with passion.
        </div>
        <div className="flex lg:gap-12 gap-6">
          <a
            className="text-white/30 hover:text-white transition-colors font-label text-[8px] lg:text-[10px] tracking-[0.3em] uppercase"
            target="_blank"
            href="https://www.linkedin.com/in/fajrirabka"
          >
            LinkedIn
          </a>
          <a
            className="text-white/30 hover:text-white transition-colors font-label text-[8px] lg:text-[10px] tracking-[0.3em] uppercase"
            target="_blank"
            href="https://www.instagram.com/fajri.rabka"
          >
            Instagram
          </a>
          <a
            className="text-white/30 hover:text-white transition-colors font-label text-[8px] lg:text-[10px] tracking-[0.3em] uppercase"
            target="_blank"
            href="mailto:fajri.rabka@gmail.com"
          >
            Email
          </a>
          <a
            className="text-white/30 hover:text-white transition-colors font-label text-[8px] lg:text-[10px] tracking-[0.3em] uppercase"
            target="_blank"
            href="https://github.com/fajri-rabka"
          >
            Github
          </a>
        </div>
      </div>
    </footer>
  );
}
