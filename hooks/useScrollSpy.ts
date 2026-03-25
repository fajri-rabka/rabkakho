import { useEffect, useRef, useState } from "react";

export function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  const isProgrammatic = useRef(false);
  const lastScrollY = useRef(0);
  const direction = useRef<"up" | "down">("down");

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      direction.current = currentY > lastScrollY.current ? "down" : "up";

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammatic.current) return;

        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visible.length) return;

        const current = visible[0];
        const id = current.target.id;

        if (direction.current === "up") {
          const index = ids.indexOf(id);
          const activeIndex = ids.indexOf(active);

          if (index > activeIndex) return; // ignore section bawah
        }

        if (direction.current === "down") {
          const index = ids.indexOf(id);
          const activeIndex = ids.indexOf(active);

          if (index < activeIndex) return; // ignore section atas
        }

        setActive(id);
      },
      {
        rootMargin: "-40% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, [ids, active]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const offset = 80;
    const y = el.getBoundingClientRect().top + window.scrollY - offset;

    isProgrammatic.current = true;
    setActive(id);

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });

    let timeout = setTimeout(() => {
      isProgrammatic.current = false;
    }, 700);

    return () => clearTimeout(timeout);
  };

  return { active, scrollTo };
}
