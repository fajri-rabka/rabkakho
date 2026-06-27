"use client";

import { useRef, useState, useEffect } from "react";
import { useThemeContext } from "@/context/ThemeContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function BackgroundParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useThemeContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(
    () => {
      if (!mounted || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let width = window.innerWidth;
      let height = window.innerHeight;
      let particles: Particle[] = [];

      // Deteksi mobile untuk menyesuaikan jumlah partikel (biar tetap enteng)
      const isMobile = window.innerWidth < 768;
      const PARTICLE_COUNT = isMobile ? 150 : 400;

      // Optimasi Retina/High-DPI Display (Biar partikel nggak buram)
      const resize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      };

      resize();
      window.addEventListener("resize", resize);

      // --- ANTIGRAVITY PHYSICS CLASS ---
      class Particle {
        x: number;
        y: number;
        originX: number;
        originY: number;
        size: number;
        vx: number;
        vy: number;
        ease: number;
        friction: number;
        alpha: number;

        constructor() {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          this.originX = this.x;
          this.originY = this.y;
          this.size = Math.random() * 2 + 0.5; // Ukuran bervariasi (kedalaman)
          this.vx = 0;
          this.vy = 0;
          this.ease = 0.05;
          this.friction = 0.92;
          this.alpha = Math.random() * 0.5 + 0.1;
        }

        draw(context: CanvasRenderingContext2D, isDark: boolean) {
          context.beginPath();
          context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          context.fillStyle = isDark
            ? `rgba(255, 255, 255, ${this.alpha})`
            : `rgba(0, 0, 0, ${this.alpha})`;
          context.fill();
        }

        update(mouseX: number, mouseY: number) {
          // 1. Antigravity / Repulsion Logic (Menjauh dari mouse)
          const dx = mouseX - this.x;
          const dy = mouseY - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;

          // Radius area tolakan mouse
          const maxDistance = 150;

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            // Dorong partikel berlawanan arah dengan mouse
            this.vx -= forceDirectionX * force * 5;
            this.vy -= forceDirectionY * force * 5;
          }

          // 2. Float Back (Kembali ke posisi asal secara organik)
          this.vx += (this.originX - this.x) * this.ease;
          this.vy += (this.originY - this.y) * this.ease;

          // 3. Apply Friction (Biar gerakannya smooth dan berhenti perlahan)
          this.vx *= this.friction;
          this.vy *= this.friction;

          // 4. Update Posisi
          this.x += this.vx;
          this.y += this.vy;

          // 5. Efek melayang acak tambahan (biar nggak diam kaku)
          this.originX += Math.sin(Date.now() * 0.001 + this.alpha) * 0.5;
          this.originY += Math.cos(Date.now() * 0.001 + this.alpha) * 0.5;
        }
      }

      // Inisialisasi Partikel
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
      }

      // Track pergerakan Mouse via GSAP quickTo logic concept
      let mouse = { x: -1000, y: -1000 };
      const handleMouseMove = (e: MouseEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      };

      const handleMouseLeave = () => {
        mouse.x = -1000;
        mouse.y = -1000;
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseleave", handleMouseLeave);

      // --- RENDER LOOP ENGINE (Di-drive oleh GSAP Ticker) ---
      const render = () => {
        // Bersihkan canvas setiap frame
        ctx.clearRect(0, 0, width, height);

        const isDark = theme === "dark";

        // Gambar dan update ulang setiap partikel
        for (let i = 0; i < particles.length; i++) {
          particles[i].update(mouse.x, mouse.y);
          particles[i].draw(ctx, isDark);
        }
      };

      // Tambahkan fungsi render ke siklus internal GSAP (lock 60fps/120fps)
      gsap.ticker.add(render);

      // Cleanup
      return () => {
        window.removeEventListener("resize", resize);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseleave", handleMouseLeave);
        gsap.ticker.remove(render);
      };
    },
    { dependencies: [mounted, theme] }
  );

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-10]"
      aria-hidden="true"
    />
  );
}