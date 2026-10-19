import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const sections = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "recognition", label: "Recognition" },
  { id: "contact", label: "Contact" },
];

const wheelSlots = [-2, -1, 0, 1, 2] as const;

export function SectionRail() {
  const [activeId, setActiveId] = useState("top");
  const [isLight, setIsLight] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const activeIndex = sections.findIndex(({ id }) => id === activeId);
  const activeIndexRef = useRef(activeIndex);
  const lastWheelAt = useRef(0);
  const navigationTargetRef = useRef<string | null>(null);
  const navigationFallbackRef = useRef<number | null>(null);
  activeIndexRef.current = activeIndex;

  useEffect(() => {
    const updateActiveSection = () => {
      if (navigationTargetRef.current) {
        setActiveId(navigationTargetRef.current);
        return;
      }
      const activationLine = window.innerHeight * 0.42;
      let current = sections[0].id;
      for (const section of sections) {
        const target = document.getElementById(section.id);
        if (target && target.getBoundingClientRect().top <= activationLine) current = section.id;
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        current = sections[sections.length - 1].id;
      }
      setActiveId(current);
    };

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateActiveSection();
      });
    };
    const onScrollEnd = () => {
      navigationTargetRef.current = null;
      if (navigationFallbackRef.current !== null) window.clearTimeout(navigationFallbackRef.current);
      navigationFallbackRef.current = null;
      updateActiveSection();
    };
    const updateTheme = () => setIsLight(document.documentElement.getAttribute("data-section-theme") === "stone");
    const themeObserver = new MutationObserver(updateTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-section-theme"] });
    updateTheme();
    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("scrollend", onScrollEnd);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("scrollend", onScrollEnd);
      themeObserver.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      if (navigationFallbackRef.current !== null) window.clearTimeout(navigationFallbackRef.current);
    };
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const boundedIndex = Math.max(0, Math.min(sections.length - 1, index));
    const { id } = sections[boundedIndex];
    const target = document.getElementById(id);
    if (!target) return;
    activeIndexRef.current = boundedIndex;
    setActiveId(id);
    navigationTargetRef.current = id;
    if (navigationFallbackRef.current !== null) window.clearTimeout(navigationFallbackRef.current);
    navigationFallbackRef.current = window.setTimeout(() => {
      navigationTargetRef.current = null;
      navigationFallbackRef.current = null;
      const activationLine = window.innerHeight * 0.42;
      let current = sections[0].id;
      for (const section of sections) {
        const sectionTarget = document.getElementById(section.id);
        if (sectionTarget && sectionTarget.getBoundingClientRect().top <= activationLine) current = section.id;
      }
      setActiveId(current);
    }, shouldReduceMotion ? 80 : 1800);
    window.history.replaceState(null, "", `#${id}`);
    const headerHeight = document.querySelector<HTMLElement>("header")?.getBoundingClientRect().height ?? 0;
    const top = window.scrollY + target.getBoundingClientRect().top - headerHeight;
    window.scrollTo({ top, behavior: shouldReduceMotion ? "auto" : "smooth" });
  }, [shouldReduceMotion]);

  const moveBy = useCallback((direction: -1 | 1) => {
    scrollToIndex(activeIndexRef.current + direction);
  }, [scrollToIndex]);

  useEffect(() => {
    const rail = document.querySelector<HTMLElement>("[data-section-wheel]");
    if (!rail) return;
    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 12) return;
      event.preventDefault();
      const now = performance.now();
      if (now - lastWheelAt.current < 540) return;
      lastWheelAt.current = now;
      moveBy(event.deltaY > 0 ? 1 : -1);
    };
    rail.addEventListener("wheel", handleWheel, { passive: false });
    return () => rail.removeEventListener("wheel", handleWheel);
  }, [moveBy]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      moveBy(1);
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      moveBy(-1);
    } else if (event.key === "Home") {
      event.preventDefault();
      scrollToIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      scrollToIndex(sections.length - 1);
    }
  };

  return (
    <nav
      data-section-wheel
      aria-label="Portfolio section selector. Use arrow keys or the mouse wheel to move between sections."
      onKeyDown={handleKeyDown}
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 min-[1280px]:block xl:right-8"
    >
      <ul className="relative flex h-[212px] w-36 flex-col justify-center gap-1 text-right [perspective:500px] [text-shadow:0_1px_9px_rgba(0,0,0,.32)]">
        {wheelSlots.map((offset) => {
          const item = sections[activeIndex + offset];
          const distance = Math.abs(offset);
          const active = offset === 0;
          if (!item) return <li key={offset} aria-hidden="true" className="h-9 shrink-0" />;

          return (
            <li key={offset} className="relative flex h-9 shrink-0 items-center justify-end">
              <AnimatePresence mode="wait" initial={false}>
                <motion.button
                  key={item.id}
                  type="button"
                  aria-current={active ? "location" : undefined}
                  aria-label={active ? `${item.label}, current section` : `Go to ${item.label} section`}
                  onClick={() => scrollToIndex(activeIndex + offset)}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: offset < 0 ? -12 : 12, rotateX: offset < 0 ? 12 : -12 }}
                  animate={{ opacity: active ? 1 : distance === 1 ? 0.68 : 0.36, y: 0, rotateX: 0, scale: active ? 1.08 : distance === 1 ? 0.94 : 0.86 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: offset < 0 ? 12 : -12, rotateX: offset < 0 ? -12 : 12 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "group relative inline-flex min-h-9 items-center justify-end bg-transparent px-1 text-right font-medium tracking-[-0.025em] focus-visible:outline-none focus-visible:text-[#bd472b] focus-visible:after:absolute focus-visible:after:-bottom-0.5 focus-visible:after:right-0 focus-visible:after:h-[2px] focus-visible:after:w-7 focus-visible:after:bg-[#bd472b]",
                    active
                      ? "text-[16px] font-semibold text-[#bd472b]"
                      : isLight
                        ? "text-[14px] text-[#514d46] hover:text-[#bd472b]"
                        : "text-[14px] text-white/80 hover:text-[#ff704d]",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -left-4 top-1/2 h-px w-0 -translate-y-1/2 bg-[#bd472b] transition-[width] duration-200",
                      active ? "w-3" : "group-hover:w-2 group-focus-visible:w-2",
                    )}
                  />
                  {item.label}
                </motion.button>
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
