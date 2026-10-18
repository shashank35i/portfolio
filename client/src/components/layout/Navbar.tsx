import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "About",       href: "#about" },
  { name: "Skills",      href: "#skills" },
  { name: "Projects",    href: "#projects" },
  { name: "Experience",  href: "#experience" },
  { name: "Education",   href: "#education" },
  { name: "Recognition", href: "#recognition" },
  { name: "Chat",        href: "/chat", isRoute: true },
  { name: "Contact",     href: "#contact" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isOpen,   setIsOpen]   = useState(false);
  const [pendingSection, setPendingSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isLight,  setIsLight]  = useState(false);   // true when over white sections

  const isChatPage = /^\/chat\/?$/.test(location);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      // detect section theme — stone = light bg
      const theme = document.documentElement.getAttribute("data-section-theme") ?? "zinc";
      setIsLight(theme === "stone");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // also watch attribute mutations for theme changes
  useEffect(() => {
    const obs = new MutationObserver(() => {
      const theme = document.documentElement.getAttribute("data-section-theme") ?? "zinc";
      setIsLight(theme === "stone");
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-section-theme"] });
    return () => obs.disconnect();
  }, []);

  const scrollToTarget = (href: string) => {
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;
    const header = document.querySelector<HTMLElement>("header");
    const headerOffset = header?.getBoundingClientRect().height ?? 0;
    const top = window.scrollY + target.getBoundingClientRect().top - headerOffset;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    window.scrollTo({ top, behavior });
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (!document.querySelector(href)) return;
    if (isOpen) {
      setPendingSection(href);
      setIsOpen(false);
      return;
    }
    scrollToTarget(href);
  };

  const handleMobileMenuExit = () => {
    if (!pendingSection) return;
    const target = pendingSection;
    setPendingSection(null);
    requestAnimationFrame(() => scrollToTarget(target));
  };

  const textCls    = isLight ? "text-[#333] hover:text-[#0f0f0f]" : "text-white/60 hover:text-white";
  const bgScrolled = isLight
    ? "bg-white/95 backdrop-blur-md border-black/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.07)]"
    : "bg-[#0a0a0a]/90 backdrop-blur-md border-white/[0.07]";
  const bgTop = "bg-transparent";

  /* ── Chat page variant ── */
  if (isChatPage) {
    return (
      <header className="fixed top-0 z-50 w-full border-b border-black/[0.07] bg-white/95 text-[#111] backdrop-blur-md pt-[max(env(safe-area-inset-top),0.5rem)] lg:pt-0">
        <div className="container mx-auto flex h-16 items-center justify-between gap-3 px-4 sm:h-[72px] sm:px-6">
          <Link href="/" className="font-display text-base font-bold tracking-tight transition-opacity hover:opacity-60 sm:text-xl">
            SHASHANK<span className="text-black/30">.DEV</span>
          </Link>
          <span className="hidden font-mono text-[10px] font-bold uppercase tracking-[.18em] text-[#c84b1f]/70 sm:inline">Portfolio assistant</span>
          <Link href="/"
            className="inline-flex items-center gap-1.5 rounded-lg border border-black/[0.09] bg-white px-3 py-2 text-xs font-medium text-[#444] shadow-sm transition hover:border-black/[0.16] hover:text-[#111] sm:px-4 sm:text-sm"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Portfolio</span>
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent pt-[max(env(safe-area-inset-top),0.5rem)] lg:pt-0",
        scrolled ? `${bgScrolled} py-2` : `${bgTop} py-3 md:py-4`
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">
        <Link href="/" className={cn("text-xl font-bold font-display tracking-tight transition-opacity hover:opacity-80", isLight ? "text-[#0f0f0f]" : "text-white")}>
          SHASHANK<span className={isLight ? "text-black/30" : "text-white/30"}>.DEV</span>
        </Link>

        {/* Keep section navigation in the right-side rail (wide screens) or menu. */}
        <div className="flex items-center gap-2">
          <Link href="/chat" className={cn("hidden px-2 py-2 text-sm font-medium transition-colors sm:inline-flex", isOpen && "sm:hidden", textCls)}>
            Chat
          </Link>
          <a href="/resume.pdf" download="Shashank_Preetham_Pendyala_Resume.pdf"
            className={cn(
              "hidden rounded-full px-4 py-2 text-sm font-semibold transition sm:inline-flex",
              isOpen && "sm:hidden",
              isLight
                ? "border border-black/[0.12] bg-white text-[#0f0f0f] hover:bg-[#f3f3f3]"
                : "border border-white/15 bg-white/[0.06] text-white hover:bg-white/[0.12]"
            )}
          >
            Resume
          </a>
          <button
            className={cn("p-2 min-[1280px]:hidden", isLight ? "text-[#0f0f0f]" : "text-white")}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close section menu" : "Open section menu"}
            aria-expanded={isOpen}
            aria-controls="portfolio-mobile-menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile toggle */}
      </div>

      {/* Mobile nav */}
      <AnimatePresence onExitComplete={handleMobileMenuExit}>
        {isOpen && (
          <motion.div id="portfolio-mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={cn("min-[1280px]:hidden overflow-hidden border-t", isLight ? "bg-white border-black/[0.07]" : "bg-[#0a0a0a] border-white/[0.07]")}
          >
            <nav className="flex max-h-[70svh] flex-col overflow-y-auto p-4 sm:p-5 gap-1">
              {navLinks.map(link => link.isRoute ? (
                <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)}
                  className={cn("rounded-lg px-3 py-2.5 text-sm font-medium transition-colors", isLight ? "text-[#444] hover:bg-[#f5f5f5] hover:text-[#0f0f0f]" : "text-white/60 hover:bg-white/[0.06] hover:text-white")}
                >
                  {link.name}
                </Link>
              ) : (
                <a key={link.name} href={link.href} onClick={e => scrollToSection(e, link.href)}
                  className={cn("rounded-lg px-3 py-2.5 text-sm font-medium transition-colors", isLight ? "text-[#444] hover:bg-[#f5f5f5] hover:text-[#0f0f0f]" : "text-white/60 hover:bg-white/[0.06] hover:text-white")}
                >
                  {link.name}
                </a>
              ))}
              <a href="/resume.pdf" download="Shashank_Preetham_Pendyala_Resume.pdf"
                className={cn("mt-2 rounded-lg px-3 py-2.5 text-sm font-semibold border transition", isLight ? "border-black/[0.10] text-[#0f0f0f] hover:bg-[#f5f5f5]" : "border-white/15 text-white hover:bg-white/[0.08]")}
              >
                Download Resume
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
