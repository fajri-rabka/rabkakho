export const tokens = {
  colors: {
    primary: "from-cyan-400 via-blue-500 to-purple-600",
    primaryHover: "from-cyan-500 via-blue-600 to-purple-700",
    accent: "from-purple-400 to-pink-600",
    accentHover: "from-purple-500 to-pink-700",
    background: "#0a0a0a",
    foreground: "#ededed",
    muted: "#a1a1aa",
    border: "rgba(255, 255, 255, 0.2)",
  },
  glass: {
    base: "absolute inset-0 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl",
    card: "bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl hover:bg-white/10 transition-all duration-300",
    none: "bg-transparent border-none shadow-none backdrop-filter-none",
  },
  spacing: {
    section: "py-24 md:py-10",
    container: "max-w-7xl mx-auto px-6 lg:px-8",
    gap: "gap-6 md:gap-8",
  },
  typography: {
    h1: "text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight",
    h2: "text-4xl md:text-6xl font-bold tracking-tight",
    h3: "text-2xl md:text-3xl font-semibold",
    body: "text-base md:text-lg text-neutral-300 leading-relaxed",
  },
  borderRadius: {
    lg: "rounded-2xl",
    xl: "rounded-3xl",
    full: "rounded-full",
  },
} as const;
