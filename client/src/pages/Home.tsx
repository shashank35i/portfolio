import { motion } from "framer-motion";
import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MouseDotsOverlay } from "@/components/layout/MouseDotsOverlay";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Recognition } from "@/components/sections/Recognition";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  useEffect(() => {
    document.documentElement.setAttribute("data-section-theme", "zinc");
  }, []);

  useEffect(() => {
    const themedSections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section-theme]")
    );

    if (themedSections.length === 0) {
      return;
    }

    const entriesMap = new Map<Element, IntersectionObserverEntry>();
    const getViewportCenter = () => window.innerHeight / 2;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entriesMap.set(entry.target, entry);
        });

        let bestScore = Number.POSITIVE_INFINITY;
        let bestTheme = "zinc";

        const viewportCenter = getViewportCenter();

        entriesMap.forEach((entry, element) => {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.1) {
            return;
          }
          const rect = entry.boundingClientRect;
          const elementCenter = rect.top + rect.height / 2;
          const distance = Math.abs(elementCenter - viewportCenter);
          if (distance < bestScore) {
            bestScore = distance;
            bestTheme =
              (element as HTMLElement).getAttribute("data-section-theme") ??
              "zinc";
          }
        });
        document.documentElement.setAttribute("data-section-theme", bestTheme);
      },
      {
        root: null,
        rootMargin: "-20% 0px -20% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    themedSections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-700 selection:bg-primary selection:text-primary-foreground">
      <div
        className="pointer-events-none fixed inset-0 z-[30]"
        style={{
          background:
            "radial-gradient(140% 95% at 50% 44%, rgba(12,10,36,0) 42%, rgba(5,3,18,0.42) 74%, rgba(2,1,10,0.68) 100%)",
        }}
      />
      <MouseDotsOverlay />
      <Navbar />
      <main className="relative">
        <Hero />
        
        <div className="relative z-10 transition-colors duration-700">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <About />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Skills />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Projects />
          </motion.div>

          <Experience />
          <Education />
          <Recognition />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}

