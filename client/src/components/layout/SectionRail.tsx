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
  const [isLight, setIsLight] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

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
    setActiveId(id);
    setIsOpen(false);
    window.history.replaceState(null, "", `#${id}`);
    const headerHeight = document.querySelector<HTMLElement>("header")?.getBoundingClientRect().height ?? 0;
    const top = window.scrollY + target.getBoundingClientRect().top - headerHeight;
    window.scrollTo({ top, behavior: shouldReduceMotion ? "auto" : "smooth" });
  };

  const activeLabel = sections.find(({ id }) => id === activeId)?.label ?? "Home";
  const colors = isLight
    ? "border-black/10 bg-[#f8f6f0] text-[#181715] shadow-[0_10px_30px_rgba(24,23,21,.12)]"
    : "border-white/15 bg-[#171614] text-[#f5f1e9] shadow-[0_12px_34px_rgba(0,0,0,.3)]";
  const menuColors = isLight ? "border-black/10 bg-[#fbfaf7]" : "border-white/12 bg-[#171614]";

  return (
    <nav
      ref={rootRef}
      aria-label="Portfolio section selector"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 min-[1280px]:block"
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
            "group inline-flex min-h-11 items-center gap-3 border px-4 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#bd472b]",
            colors,
          )}
        >
          <span aria-live="polite" className="min-w-[5.5rem] text-left">{activeLabel}</span>
          <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")} aria-hidden="true" />
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
              className={cn("absolute right-0 top-[calc(100%+0.55rem)] w-52 origin-top-right border p-1.5", menuColors)}
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
                      "flex min-h-10 w-full items-center justify-between px-3 text-left text-[13px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#bd472b]",
                      active
                        ? isLight ? "bg-[#eee9df] text-[#181715]" : "bg-white/10 text-white"
                        : isLight ? "text-[#625f59] hover:bg-black/[.045] hover:text-[#181715]" : "text-white/65 hover:bg-white/[.06] hover:text-white",
                    )}
                  >
                    <span>{label}</span>
                    {active && <Check className="h-3.5 w-3.5 text-[#bd472b]" aria-hidden="true" />}
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
