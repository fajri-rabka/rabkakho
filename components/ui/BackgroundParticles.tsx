import { useMemo } from "react";
import { motion } from "framer-motion";

const BackgroundParticles = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * 10,
      size: Math.random() * 2 + 1,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden opacity-30">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full will-change-transform"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, 40, 0],
            opacity: [0, 1, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundParticles;
