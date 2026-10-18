import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
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
      className="bg-[#f9f8f6] px-4 py-8 sm:px-6"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 rounded-2xl border border-[#f04b23]/15 bg-white px-6 py-5 shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f04b23]/10">
            <Sparkles className="h-4 w-4 text-[#f04b23]" />
          </div>
          <div>
            <p className="text-[13.5px] font-semibold text-[#0f0f0f]">Ask AI about Shashank</p>
            <p className="text-[12px] text-[#999]">Get instant answers about projects, skills and experience</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate("/chat")}
          className="shrink-0 rounded-xl bg-[#0f0f0f] px-4 py-2 text-[12.5px] font-semibold text-white transition hover:bg-[#222]"
        >
          Try it
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