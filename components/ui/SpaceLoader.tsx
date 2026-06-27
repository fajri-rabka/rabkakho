"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false, loading: () => <RocketCSSFallback /> }
);

interface SpaceLoaderProps {
  onComplete?: () => void;
  isComplete?: boolean;
}

// 🚀 CSS Fallback Rocket (Original Sleek Design)
function RocketCSSFallback() {
  return (
    <div className="relative flex flex-col items-center justify-center w-12 h-32 will-change-transform">
      <div
        className="w-4 h-8 bg-linear-to-r from-zinc-400 via-zinc-100 to-zinc-500"
        style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
      />
      <div className="w-4 h-16 bg-linear-to-r from-zinc-400 via-zinc-100 to-zinc-500 relative overflow-hidden shadow-[inset_-2px_0_4px_rgba(0,0,0,0.1),inset_2px_0_4px_rgba(255,255,255,0.5)]">
        <div className="w-full h-px bg-zinc-400/50 absolute top-4" />
        <div className="w-full h-px bg-zinc-400/50 absolute top-10" />
      </div>
      <div className="w-5 h-2 bg-linear-to-r from-zinc-800 via-zinc-500 to-zinc-900 rounded-b-sm border-t border-zinc-700" />
      <div
        className="absolute bottom-1 -left-1 w-3 h-10 bg-linear-to-r from-zinc-500 to-zinc-300"
        style={{ clipPath: "polygon(0 50%, 100% 0, 100% 100%, 0 100%)" }}
      />
      <div
        className="absolute bottom-1 -right-1 w-3 h-10 bg-linear-to-l from-zinc-500 to-zinc-300"
        style={{ clipPath: "polygon(0 0, 100% 50%, 100% 100%, 0 100%)" }}
      />
    </div>
  );
}

// 🌐 Ultra-Modern Sleek 3D Rocket
function UltraModernRocket({ phase }: { phase: string }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (group.current) {
      const speed = phase === "launching" ? 15 : phase === "ignition" ? 2 : 0.4;
      group.current.rotation.y += delta * speed;

      if (phase === "loading") {
        group.current.position.y =
          Math.sin(state.clock.elapsedTime * 2) * 0.1 - 0.2;
      }
    }
  });

  return (
    <group ref={group} dispose={null} position={[0, -0.5, 0]} scale={1.2}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 2.5, 32]} />
        <meshStandardMaterial color="#c4c7c5" roughness={0.15} metalness={0.9} />
      </mesh>
      <mesh position={[0, 1.25, 0]} scale={[1, 2.5, 1]}>
        <sphereGeometry args={[0.3, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.6, 0]}>
        <torusGeometry args={[0.31, 0.015, 16, 32]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>
      <mesh position={[0, -0.6, 0]}>
        <torusGeometry args={[0.31, 0.015, 16, 32]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>
      <mesh position={[0, -1.35, 0]}>
        <cylinderGeometry args={[0.3, 0.35, 0.2, 32]} />
        <meshStandardMaterial color="#111111" roughness={0.7} metalness={0.5} />
      </mesh>
      <mesh position={[0, -1.48, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.05, 32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.05, 32]} />
        <meshBasicMaterial color="#00d0ff" />
      </mesh>
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI) / 2) * 0.3,
            -0.8,
            Math.sin((i * Math.PI) / 2) * 0.3,
          ]}
          rotation={[0, (i * Math.PI) / 2 + Math.PI / 2, Math.PI / 15]}
        >
          <boxGeometry args={[0.6, 1.2, 0.02]} />
          <meshStandardMaterial color="#111111" roughness={0.2} metalness={0.9} />
        </mesh>
      ))}
      <pointLight position={[2, 2, 2]} intensity={2} color="#ffffff" distance={5} />
      <pointLight position={[-2, -2, 2]} intensity={1} color="#00f0ff" distance={5} />
    </group>
  );
}

// Global hook to defer animations until the SpaceLoader has completely finished and disappeared.
export function useLoaderReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (
      typeof document !== "undefined" &&
      document.body.classList.contains("loader-ready")
    ) {
      setReady(true);
      return;
    }
    const handleReady = () => setReady(true);
    window.addEventListener("loader-ready", handleReady);
    return () => window.removeEventListener("loader-ready", handleReady);
  }, []);

  return ready;
}

export function SpaceLoader({ onComplete, isComplete }: SpaceLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "ignition" | "launching" | "exited" | "unmounted">("loading");
  const [stars, setStars] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // 🌌 Generate layered stars
  useEffect(() => {
    const layers = ["far", "mid", "near"];
    setStars(
      Array.from({ length: 80 }).map((_, i) => {
        const layer = layers[Math.floor(Math.random() * layers.length)];
        return {
          id: i,
          layer,
          size:
            layer === "far"
              ? Math.random() * 1
              : layer === "mid"
                ? Math.random() * 2
                : Math.random() * 3 + 1,
          speed: layer === "far" ? 0.5 : layer === "mid" ? 1.2 : 2,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          delay: Math.random() * 2,
        };
      })
    );
  }, []);

  // 🔒 lock scroll
  useEffect(() => {
    document.body.style.overflow = phase === "unmounted" ? "unset" : "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [phase]);

  // 📊 Progress
  useEffect(() => {
    if (phase !== "loading") return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 10 + 3;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase("ignition"), 400);
          return 100;
        }
        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [phase]);

  // 🎬 phase flow
  useEffect(() => {
    if (phase === "ignition") {
      setTimeout(() => setPhase("launching"), 900);
    } else if (phase === "launching") {
      setTimeout(() => setPhase("exited"), 1200);
    } else if (phase === "exited") {
      // When exited phase starts, GSAP handles the fade out, then updates to unmounted
    }
  }, [phase]);

  useGSAP(() => {
    const q = gsap.utils.selector(containerRef);
    let mm = gsap.matchMedia();

    // The entire loader sequence
    if (phase === "loading") {
      gsap.to(q(".progress-bar"), {
        scaleX: progress / 100,
        ease: "power2.out",
        duration: 0.2,
      });
    }

    if (phase === "ignition") {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Camera shake
        gsap.to(q(".camera-shake"), {
          x: "random(-2, 2)",
          y: "random(-2, 2)",
          duration: 0.05,
          repeat: -1,
          yoyo: true,
        });

        // Rocket ignition
        gsap.to(q(".rocket-container"), {
          y: -2,
          scale: 0.95,
          duration: 0.1,
          repeat: -1,
          yoyo: true,
        });

        // Flame ignition
        gsap.to(q(".rocket-flame"), {
          scaleY: 1.5,
          scaleX: 1.2,
          opacity: 1,
          duration: 0.05,
          repeat: -1,
          yoyo: true,
        });
      });
    }

    if (phase === "launching") {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Stop shake and launch
        gsap.killTweensOf(q(".camera-shake"));
        gsap.set(q(".camera-shake"), { x: 0, y: 0 });

        gsap.to(q(".rocket-container"), {
          y: "-120vh",
          scale: 1.2,
          duration: 1.2,
          ease: "power4.in",
        });

        gsap.to(q(".rocket-flame"), {
          scaleY: 30,
          scaleX: 3.5,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        });

        // Shockwave
        gsap.fromTo(
          q(".shockwave"),
          { scale: 0, opacity: 0.8 },
          { scale: 10, opacity: 0, duration: 1.0, ease: "power2.out" }
        );

        // Hide UI
        gsap.to(q(".ui-container"), {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.inOut",
        });

        // Move stars down to simulate upward movement
        gsap.to(q(".star"), {
          y: "200vh",
          duration: 1.5,
          ease: "power4.in",
          stagger: 0.01,
        });
      });
    }

    if (phase === "exited") {
      // Fade out entire loader and unmount
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 1.1,
        filter: "blur(20px)",
        duration: 1.2,
        ease: "power4.inOut",
        onComplete: () => {
          document.body.classList.add("loader-ready");
          window.dispatchEvent(new Event("loader-ready"));
          onComplete?.();
          setPhase("unmounted");
        },
      });
    }

    return () => mm.revert();
  }, { scope: containerRef, dependencies: [phase, progress] });

  // Only render if not unmounted
  if (phase === "unmounted") return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
    >
      {/* 🌌 Stars */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star absolute bg-white rounded-full"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              filter: star.layer === "far" ? "blur(1px)" : "none",
              opacity: star.layer === "near" ? 1 : 0.6,
            }}
          />
        ))}
      </div>

      {/* 🎥 Camera shake */}
      <div className="camera-shake relative flex flex-col items-center z-10 will-change-transform">
        {/* 🚀 Rocket */}
        <div className="rocket-container relative flex flex-col items-center will-change-transform">
          {/* === REACT THREE FIBER CONTAINER === */}
          <div className="w-40 h-56 md:w-52 md:h-64 relative z-20 flex justify-center items-center pointer-events-none drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">
            <Suspense fallback={<RocketCSSFallback />}>
              <Canvas
                dpr={[1, 1.5]}
                camera={{ position: [0, 0, 8], fov: 40 }}
                gl={{
                  antialias: false,
                  alpha: true,
                  powerPreference: "high-performance",
                }}
              >
                <ambientLight intensity={1.2} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} />
                <UltraModernRocket phase={phase} />
              </Canvas>
            </Suspense>
          </div>

          {/* 🔥 Flame */}
          <div
            className="rocket-flame absolute top-[80%] w-4 h-16 bg-linear-to-b from-cyan-200 via-cyan-500 to-transparent blur-md origin-top rounded-full z-10 mix-blend-screen opacity-0 will-change-transform"
          />

          {/* 💥 Shockwave */}
          <div className="shockwave absolute top-[75%] w-24 h-24 border-2 border-cyan-400 bg-cyan-400/20 blur-sm mix-blend-screen rounded-full z-0 opacity-0 will-change-transform" />
        </div>

        {/* 📊 UI */}
        <div className="ui-container mt-4 flex flex-col items-center gap-4 will-change-transform">
          <div className="relative flex flex-col items-center">
            {/* Glow layer */}
            <span className="absolute text-[32px] md:text-[72px] font-bold uppercase text-white blur-2xl tracking-[0.4em] opacity-30">
              {phase === "loading"
                ? "Standby for Liftoff"
                : phase === "ignition"
                  ? "Ignition Sequence"
                  : "Liftoff"}
            </span>
            {/* Main text */}
            <span className="relative text-3xl md:text-7xl uppercase text-white tracking-widest leading-tight font-bold text-center">
              {phase === "loading"
                ? "Something is taking shape"
                : phase === "ignition"
                  ? "Almost ready"
                  : "Here we go"}
            </span>

            {/* Subtext */}
            <span className="mt-5 text-xs md:text-xs text-white/50 tracking-[0.2em] text-center font-label">
              {phase === "loading"
                ? "Preparing your experience"
                : phase === "ignition"
                  ? "Hold on for a second"
                  : "Welcome aboard"}
            </span>
          </div>

          <div className="w-28 h-px bg-white/10 overflow-hidden rounded-full drop-shadow-[0_0_5px_rgba(255,255,255,0.4)] mt-50">
            <div className="progress-bar h-full bg-white shadow-[0_0_10px_white] origin-left scale-x-0 will-change-transform" />
          </div>

          <span className="text-white/30 text-xs font-medium tracking-widest mt-3 font-label">
            {Math.floor(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
}
