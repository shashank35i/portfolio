import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
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
  const shouldReduceMotion = useReducedMotion();

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

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    setActiveId(id);
    window.history.replaceState(null, "", `#${id}`);
    const headerHeight = document.querySelector<HTMLElement>("header")?.getBoundingClientRect().height ?? 0;
    const top = window.scrollY + target.getBoundingClientRect().top - headerHeight;
    window.scrollTo({ top, behavior: shouldReduceMotion ? "auto" : "smooth" });
  };

  return (
    <nav
      aria-label="Portfolio sections"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 min-[1280px]:block xl:right-8"
    >
      <ul className="flex flex-col items-end gap-1 text-right [text-shadow:0_1px_9px_rgba(0,0,0,.32)]">
        {sections.map(({ id, label }) => {
          const active = activeId === id;
          return (
            <li key={id}>
              <button
                type="button"
                aria-current={active ? "location" : undefined}
                onClick={() => scrollToSection(id)}
                className={cn(
                  "group relative inline-flex min-h-8 items-center justify-end bg-transparent py-1 pl-3 transition-[font-size,color,transform] ease-out focus-visible:outline-none focus-visible:text-[#bd472b] focus-visible:after:absolute focus-visible:after:-bottom-0.5 focus-visible:after:right-0 focus-visible:after:h-[2px] focus-visible:after:w-7 focus-visible:after:bg-[#bd472b]",
                  shouldReduceMotion ? "duration-0" : "duration-200",
                  active
                    ? "scale-[1.06] origin-right text-[15px] font-semibold text-[#bd472b]"
                    : isLight
                      ? "text-[13px] font-medium text-[#514d46]/75 hover:scale-[1.06] hover:origin-right hover:text-[15px] hover:text-[#bd472b]"
                      : "text-[13px] font-medium text-white/65 hover:scale-[1.06] hover:origin-right hover:text-[15px] hover:text-[#ff704d]",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -left-4 top-1/2 h-px w-0 -translate-y-1/2 bg-[#bd472b] transition-[width] duration-200",
                    active ? "w-3" : "group-hover:w-2 group-focus-visible:w-2",
                  )}
                />
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
