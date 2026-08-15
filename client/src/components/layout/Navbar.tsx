import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Recognition", href: "#recognition" },
  { name: "Chat", href: "#chat" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overChat, setOverChat] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const chat = document.getElementById("chat");
      if (chat) { const rect = chat.getBoundingClientRect(); setOverChat(rect.top < 90 && rect.bottom > 40); }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent pt-[max(env(safe-area-inset-top),0.5rem)] lg:pt-0",
        overChat ? "bg-[#111113]/95 text-white backdrop-blur-md border-white/10 py-2 shadow-[0_8px_25px_rgba(0,0,0,.18)]" : scrolled ? "bg-background/80 backdrop-blur-md border-border/40 py-2" : "bg-transparent py-3 md:py-4"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">
        <Link href="/" className="text-xl font-bold font-display tracking-tight hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
          SHASHANK<span className={overChat ? "text-zinc-400" : "text-muted-foreground"}>.DEV</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={cn("text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary", overChat ? "text-zinc-300 hover:text-white" : "text-muted-foreground hover:text-foreground")}
            >
              {link.name}
            </a>
          ))}
          <Button variant="outline" size="sm" className="ml-2 hidden xl:flex" asChild>
            <a href="/resume.pdf" download="Shashank_Preetham_Pendyala_Resume.pdf">
              Resume
            </a>
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className={cn("lg:hidden p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary", overChat ? "text-white" : "text-foreground")}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border/40 overflow-hidden"
          >
            <nav className="flex max-h-[70svh] flex-col overflow-y-auto p-4 sm:p-6 gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-base font-medium text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {link.name}
                </a>
              ))}
              <Button variant="outline" className="w-full mt-2" asChild>
                <a href="/resume.pdf" download="Shashank_Preetham_Pendyala_Resume.pdf">
                  Download Resume
                </a>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
