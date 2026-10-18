import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Recognition } from "@/components/sections/Recognition";
import { Contact } from "@/components/sections/Contact";
import { ChatLauncher } from "@/components/sections/PortfolioChat";

function AIChatStrip() {
  const [, navigate] = useLocation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="bg-[#f9f8f6] px-4 py-10 sm:px-6 md:py-14"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-5 border-y border-black/[0.12] py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:py-7">
        <div>
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#f04b23]">A closer look</p>
          <p className="text-[17px] font-semibold tracking-tight text-[#0f0f0f] sm:text-[19px]">Ask about my work, projects, and experience.</p>
          <p className="mt-1 text-[13px] text-[#777]">A direct conversation about the engineering behind this portfolio.</p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/chat")}
          className="group inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start border border-[#0f0f0f]/20 px-5 text-[13px] font-semibold text-[#0f0f0f] transition hover:border-[#f04b23] hover:text-[#c53a18] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f04b23] sm:self-auto"
        >
          Open the chat <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </button>
      </div>
    </motion.div>
  );
}

export default function Home() {
  useEffect(() => {
    document.documentElement.setAttribute("data-section-theme", "zinc");
  }, []);

  useEffect(() => {
    const themedSections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section-theme]")
    );
    if (themedSections.length === 0) return;
    const entriesMap = new Map<Element, IntersectionObserverEntry>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => entriesMap.set(e.target, e));
        let bestScore = Infinity;
        let bestTheme = "zinc";
        const center = window.innerHeight / 2;
        entriesMap.forEach((entry, el) => {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.1) return;
          const dist = Math.abs(entry.boundingClientRect.top + entry.boundingClientRect.height / 2 - center);
          if (dist < bestScore) { bestScore = dist; bestTheme = (el as HTMLElement).getAttribute("data-section-theme") ?? "zinc"; }
        });
        document.documentElement.setAttribute("data-section-theme", bestTheme);
      },
      { root: null, rootMargin: "-20% 0px -20% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    );
    themedSections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-700 selection:bg-[#f04b23] selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <AIChatStrip />
        <Projects />
        <Experience />
        <Education />
        <Recognition />
        <Contact />
      </main>
      <Footer />
      <ChatLauncher />
    </div>
  );
}
