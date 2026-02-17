import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DevPortfolio | Modern Web Experience",
  description: "Senior Full Stack Developer specializing in building exceptional digital experiences with modern technologies.",
  keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Web Developer", "Portfolio"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-black text-white selection:bg-cyan-500/30 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
