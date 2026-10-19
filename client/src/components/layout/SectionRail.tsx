import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
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

export function SectionRail() {
  const [activeId, setActiveId] = useState("top");
  const [rollDirection, setRollDirection] = useState<1 | -1>(1);
  const [isLight, setIsLight] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeIndexRef = useRef(0);

  const setCurrentSection = (id: string) => {
    const nextIndex = sections.findIndex((section) => section.id === id);
    if (nextIndex >= 0 && nextIndex !== activeIndexRef.current) {
      setRollDirection(nextIndex > activeIndexRef.current ? 1 : -1);
      activeIndexRef.current = nextIndex;
    }
    setActiveId(id);
  };

  useEffect(() => {
    const updateActiveSection = () => {
      const activationLine = window.innerHeight * 0.42;
      let current = sections[0].id;
      for (const section of sections) {
        const target = document.getElementById(section.id);
        if (target && target.getBoundingClientRect().top <= activationLine) current = section.id;
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        current = sections[sections.length - 1].id;
      }
      setCurrentSection(current);
    };

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateActiveSection();
      });
    };
    const updateTheme = () => setIsLight(document.documentElement.getAttribute("data-section-theme") === "stone");
    const themeObserver = new MutationObserver(updateTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-section-theme"] });
    updateTheme();
    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      themeObserver.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setIsOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      const items = itemRefs.current.filter((item): item is HTMLButtonElement => item !== null);
      if (!items.length) return;
      event.preventDefault();
      const focusedIndex = items.indexOf(document.activeElement as HTMLButtonElement);
      const direction = event.key === "ArrowDown" ? 1 : -1;
      const nextIndex = focusedIndex < 0 ? 0 : (focusedIndex + direction + items.length) % items.length;
      items[nextIndex]?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    setCurrentSection(id);
    setIsOpen(false);
    triggerRef.current?.focus();
    window.history.replaceState(null, "", `#${id}`);
    const headerHeight = document.querySelector<HTMLElement>("header")?.getBoundingClientRect().height ?? 0;
    const top = window.scrollY + target.getBoundingClientRect().top - headerHeight;
    window.scrollTo({ top, behavior: shouldReduceMotion ? "auto" : "smooth" });
  };

  const activeIndex = sections.findIndex(({ id }) => id === activeId);
  const activeLabel = sections[activeIndex]?.label ?? "Home";
  const previousLabel = sections[activeIndex - 1]?.label ?? "";
  const nextLabel = sections[activeIndex + 1]?.label ?? "";
  const primaryText = isLight ? "text-[#201d19]" : "text-[#fffaf2]";
  const secondaryText = isLight ? "text-[#514d46]/65" : "text-white/55";

  return (
    <nav
      ref={rootRef}
      aria-label="Portfolio section selector"
      className="fixed right-7 top-1/2 z-40 hidden -translate-y-1/2 min-[1280px]:block"
    >
      <div className="relative flex flex-col items-end">
        <motion.button
          ref={triggerRef}
          type="button"
          aria-label={`Choose portfolio section. Current section: ${activeLabel}`}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-controls="portfolio-section-menu"
          onClick={() => setIsOpen((open) => !open)}
          whileHover={shouldReduceMotion ? undefined : { x: -3 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          className={cn(
            "group inline-flex min-h-[76px] items-center gap-3 bg-transparent py-2 pl-3 text-right transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#bd472b]",
            primaryText,
          )}
        >
          <span className="relative flex h-[58px] w-[112px] flex-col justify-center overflow-hidden text-right [text-shadow:0_1px_8px_rgba(0,0,0,.28)]">
            <AnimatePresence initial={false} custom={rollDirection} mode="popLayout">
              <motion.span
                key={activeId}
                custom={rollDirection}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: rollDirection > 0 ? 16 : -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: rollDirection > 0 ? -16 : 16 }}
                transition={{ duration: shouldReduceMotion ? 0.08 : 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex flex-col items-end justify-center"
              >
                <span aria-hidden="true" className={cn("h-4 text-[11px] leading-4 transition-opacity", secondaryText)}>{previousLabel || "\u00a0"}</span>
                <span aria-live="polite" className="flex h-5 items-center gap-2 text-[15px] font-semibold leading-5">
                  <span className="h-[2px] w-4 bg-[#bd472b] transition-transform duration-300 group-hover:w-6" aria-hidden="true" />
                  {activeLabel}
                </span>
                <span aria-hidden="true" className={cn("h-4 text-[11px] leading-4 transition-opacity", secondaryText)}>{nextLabel || "\u00a0"}</span>
              </motion.span>
            </AnimatePresence>
          </span>
          <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform duration-200", isOpen && "rotate-180")} aria-hidden="true" />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="portfolio-section-menu"
              role="menu"
              aria-label="Choose a section"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -7, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -5, scale: 0.985 }}
              transition={{ duration: shouldReduceMotion ? 0.08 : 0.18, ease: "easeOut" }}
              className="absolute right-0 top-[calc(100%+0.6rem)] w-max min-w-40 origin-top-right py-1 text-right [text-shadow:0_1px_8px_rgba(0,0,0,.38)]"
            >
              {sections.map(({ id, label }, index) => {
                const active = activeId === id;
                return (
                  <button
                    key={id}
                    ref={(element) => { itemRefs.current[index] = element; }}
                    type="button"
                    role="menuitem"
                    tabIndex={active ? 0 : -1}
                    aria-current={active ? "location" : undefined}
                    onClick={() => scrollToSection(id)}
                    className={cn(
                      "flex min-h-10 w-full items-center justify-end gap-3 bg-transparent pl-4 text-right text-[13px] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#bd472b]",
                      active
                        ? "font-semibold text-[#bd472b]"
                        : isLight ? "text-[#514d46]/70 hover:translate-x-[-3px] hover:text-[#201d19]" : "text-white/65 hover:translate-x-[-3px] hover:text-white",
                    )}
                  >
                    {active && <Check className="h-3.5 w-3.5 text-[#bd472b]" aria-hidden="true" />}
                    <span>{label}</span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
