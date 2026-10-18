import { useEffect, useState } from "react";
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

    const updateTheme = () => {
      setIsLight(document.documentElement.getAttribute("data-section-theme") === "stone");
    };

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

  const scrollToSection = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    setActiveId(id);
    const headerHeight = document.querySelector<HTMLElement>("header")?.getBoundingClientRect().height ?? 0;
    const top = window.scrollY + target.getBoundingClientRect().top - headerHeight - 12;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    window.scrollTo({ top, behavior });
  };

  return (
    <nav
      aria-label="Portfolio sections"
      className="fixed top-1/2 z-40 hidden -translate-y-1/2 min-[1280px]:block"
      style={{ right: "1.25rem" }}
    >
      <ul className="flex flex-col gap-1">
        {sections.map(({ id, label }) => {
          const active = activeId === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(event) => scrollToSection(event, id)}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "group relative flex min-h-10 min-w-[124px] items-center justify-end border-r-2 px-3 text-right text-[12px] font-medium transition-[color,background-color,border-color,transform] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f26946]",
                  isLight
                    ? active
                      ? "translate-x-0 border-[#bd472b] bg-black/[.045] text-[#171614]"
                      : "border-transparent text-[#57544f] hover:border-black/25 hover:bg-black/[.025] hover:text-[#171614]"
                    : active
                      ? "translate-x-0 border-[#f26946] bg-white/[.07] text-white"
                      : "border-transparent text-white/55 hover:border-white/35 hover:bg-white/[.035] hover:text-white/90"
                )}
              >
                <span className={cn("transition-transform duration-300", active ? "translate-x-0" : "group-hover:-translate-x-0.5")}>
                  {label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
