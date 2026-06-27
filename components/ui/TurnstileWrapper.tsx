"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { useThemeContext } from "@/context/ThemeContext";
import { useState, useEffect } from "react";

interface TurnstileWrapperProps {
  onSuccess: (token: string) => void;
  onExpire: () => void;
  onError?: () => void;
}

export function TurnstileWrapper({ onSuccess, onExpire, onError }: TurnstileWrapperProps) {
  const { theme } = useThemeContext();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Hydration Guard / Skeleton loader to prevent CLS
  if (!isMounted) {
    return (
      <div className="w-[300px] h-[65px] border border-outline bg-surface/50 animate-pulse flex items-center justify-center">
        <span className="text-[10px] font-mono tracking-widest text-on-background/30 uppercase">
          Loading Security...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-[65px] min-w-[300px] flex justify-center lg:justify-start">
      <Turnstile
        key={theme}
        siteKey={process.env.TURNSTILE_SITE_KEY!}
        onSuccess={onSuccess}
        onExpire={onExpire}
        onError={onError}
        options={{ theme: theme === "dark" ? "dark" : "light" }}
      />
    </div>
  );
}
