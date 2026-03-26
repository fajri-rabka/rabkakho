"use client";

export function TechStack() {
  return (
    <section
      className="px-8 max-w-screen-2xl mx-auto py-32 border-t border-white/5"
      id="tech-stack"
    >
      <div className="mb-20 reveal">
        <span className="font-label text-[10px] tracking-[0.4em] uppercase text-white/40">
          Toolbox
        </span>
        <h2 className="font-headline text-6xl font-extrabold tracking-tighter mt-4">
          TECHNICAL ARSENAL
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
        {/* Tech Item: React */}
        <div
          className="glass-card p-8 flex flex-col items-center justify-center group hover:bg-white/10 transition-all duration-500 reveal"
          style={{ animationDelay: "0.1s" }}
        >
          <svg
            className="w-8 h-8 text-white/40 group-hover:text-white transition-colors mb-4"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M24 10.636c0-1.21-.955-2.28-2.316-3.08-1.36-.8-3.05-1.424-4.887-1.78.337-.872.532-1.758.532-2.628 0-.663-.122-1.284-.367-1.796-.246-.513-.642-.942-1.157-1.203-.514-.262-1.127-.349-1.808-.242-.68.107-1.393.39-2.097.818-.704.428-1.385.98-1.996 1.62-.61-.64-1.292-1.192-1.996-1.62-.704-.428-1.417-.71-2.097-.818-.68-.107-1.294-.02-1.808.242-.515.26-.91.69-1.157 1.203-.245.512-.367 1.133-.367 1.796 0 .87.195 1.756.532 2.628-1.837.356-3.527.98-4.887 1.78C.955 8.356 0 9.426 0 10.636c0 1.21.955 2.28 2.316 3.08 1.36.8 3.05 1.424 4.887 1.78-.337.872-.532 1.758-.532 2.628 0 .663.122 1.284.367 1.796.246.513.642.942 1.157 1.203.514.262 1.127.349 1.808.242.68-.107 1.393-.39 2.097-.818.704-.428 1.385-.98 1.996-1.62.61.64 1.292 1.192 1.996 1.62.704.428 1.417.71 2.097.818.68.107 1.294.02 1.808-.242.515-.26.91-.69 1.157-1.203.245-.512.367-1.133.367-1.796 0-.87-.195-1.756-.532-2.628 1.837-.356 3.527-.98 4.887-1.78 1.36-.8 2.316-1.87 2.316-3.08zm-12 1.82c-.994 0-1.8-.806-1.8-1.82s.806-1.82 1.8-1.82 1.8.806 1.8 1.82-.806 1.82-1.8 1.82z" />
          </svg>
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/60 group-hover:text-white">
            React
          </span>
        </div>
        {/* Tech Item: Next.js */}
        <div
          className="glass-card p-8 flex flex-col items-center justify-center group hover:bg-white/10 transition-all duration-500 reveal"
          style={{ animationDelay: "0.15s" }}
        >
          <svg
            className="w-8 h-8 text-white/40 group-hover:text-white transition-colors mb-4"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18.663 20.281l-9.157-11.859v11.859h-1.554v-14.36h1.554l8.914 11.583v-11.583h1.554v14.36h-1.311zm-6.663-20.281c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22.449c-5.761 0-10.449-4.688-10.449-10.449 0-3.083 1.339-5.854 3.473-7.766l14.742 19.12c-2.091 2.057-4.996 3.095-7.766 3.095zm9.581-4.706l-1.077-1.396c.618-1.141.945-2.428.945-3.79 0-4.654-3.795-8.449-8.449-8.449-1.284 0-2.492.29-3.578.803l-1.425-1.85c1.528-.611 3.203-.953 4.954-.953 6.87 0 12.449 5.579 12.449 12.449 0 1.442-.246 2.827-.698 4.116z" />
          </svg>
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/60 group-hover:text-white">
            Next.js
          </span>
        </div>
        {/* Tech Item: Vue.js */}
        <div
          className="glass-card p-8 flex flex-col items-center justify-center group hover:bg-white/10 transition-all duration-500 reveal"
          style={{ animationDelay: "0.2s" }}
        >
          <svg
            className="w-8 h-8 text-white/40 group-hover:text-white transition-colors mb-4"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M24,1.6L12,22.4L0,1.6h4.8L12,14L19.2,1.6H24z M17,1.6L12,10.2L7,1.6H2.5L12,18l9.5-16.4H17z" />
          </svg>
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/60 group-hover:text-white">
            Vue.js
          </span>
        </div>
        {/* Tech Item: Figma */}
        <div
          className="glass-card p-8 flex flex-col items-center justify-center group hover:bg-white/10 transition-all duration-500 reveal"
          style={{ animationDelay: "0.25s" }}
        >
          <svg
            className="w-8 h-8 text-white/40 group-hover:text-white transition-colors mb-4"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 0C8.688 0 6 2.688 6 6c0 1.83 1.011 3.42 2.5 4.253C6.444 11.238 5 12.923 5 15c0 1.83 1.011 3.42 2.5 4.253C6.444 20.238 5 21.923 5 24c0 3.312 2.688 6 6 6s6-2.688 6-6c0-1.83-1.011-3.42-2.5-4.253 2.056-.985 3.5-3.045 3.5-5.38 0-1.83-1.011-3.42-2.5-4.253 2.056-.985 3.5-3.045 3.5-5.38a6.002 6.002 0 0 0-6-6zm0 2.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zm0 11a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zm0 11a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7z" />
          </svg>
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/60 group-hover:text-white">
            Figma
          </span>
        </div>
        {/* Tech Item: Git */}
        <div
          className="glass-card p-8 flex flex-col items-center justify-center group hover:bg-white/10 transition-all duration-500 reveal"
          style={{ animationDelay: "0.3s" }}
        >
          <svg
            className="w-8 h-8 text-white/40 group-hover:text-white transition-colors mb-4"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.187 0L8.708 2.624l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.883.719-2.603 0-.515-.516-.662-1.256-.439-1.904L12.653 8.912c-.22.441-.658.752-1.155.82l.004 5.372c.645-.215 1.379-.07 1.889.441.716.716.716 1.887 0 2.603-.712.712-1.882.712-2.6 0-.515-.516-.658-1.258-.438-1.9L10.32 16.22l-1.633 1.633c-.604.603-1.582.603-2.187 0L.454 11.807c-.603-.604-.603-1.582 0-2.187L2.628 7.446l2.76 2.76c-.215.644-.07 1.378.441 1.888.516.516 1.258.658 1.9.438l2.633 2.634V9.825c-.215-.644-.07-1.378.441-1.888.516-.516 1.258-.658 1.9-.438l2.633 2.634V9.825c-.22-.441-.662-.756-1.163-.823V3.629L2.63 9.94c-.604.604-.604 1.582 0 2.187l10.479 10.478c.604.604 1.582.604 2.187 0l10.479-10.478c.604-.604.604-1.582 0-2.187z" />
          </svg>
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/60 group-hover:text-white">
            Git
          </span>
        </div>
        {/* Tech Item: Express JS */}
        <div
          className="glass-card p-8 flex flex-col items-center justify-center group hover:bg-white/10 transition-all duration-500 reveal"
          style={{ animationDelay: "0.35s" }}
        >
          <svg
            className="w-8 h-8 text-white/40 group-hover:text-white transition-colors mb-4"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12-12-5.373-12-12 5.373-12 12-12zm-3.5 16c-.276 0-.5-.224-.5-.5s.224-.5.5-.5.5.224.5.5-.224.5-.5.5zm7 0c-.276 0-.5-.224-.5-.5s.224-.5.5-.5.5.224.5.5-.224.5-.5.5zm-3.5-8c-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.015-4.5-4.5-4.5zm0 8c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z" />
          </svg>
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/60 group-hover:text-white">
            Express JS
          </span>
        </div>
        {/* Tech Item: Vite.js */}
        <div
          className="glass-card p-8 flex flex-col items-center justify-center group hover:bg-white/10 transition-all duration-500 reveal"
          style={{ animationDelay: "0.4s" }}
        >
          <svg
            className="w-8 h-8 text-white/40 group-hover:text-white transition-colors mb-4"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11.097 1.487a.75.75 0 0 1 1.806 0l9.742 16.5a.75.75 0 0 1-.645 1.132H2.001a.75.75 0 0 1-.646-1.132l9.742-16.5zM12 4.41L3.99 18h16.02L12 4.41zM11 11h2v5h-2v-5zm0-3h2v2h-2V8z" />
          </svg>
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/60 group-hover:text-white">
            Vite.js
          </span>
        </div>
      </div>
    </section>
  );
}
