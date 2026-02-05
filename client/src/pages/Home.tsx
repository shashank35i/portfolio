import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";

const themes = ["zinc", "slate", "stone", "indigo", "zinc"];

export default function Home() {
  const [currentTheme, setCurrentTheme] = useState("zinc");
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      const index = Math.min(
        Math.floor(latest * themes.length),
        themes.length - 1
      );
      if (themes[index] !== currentTheme) {
        setCurrentTheme(themes[index]);
        document.documentElement.setAttribute("data-section-theme", themes[index]);
      }
    });
  }, [scrollYProgress, currentTheme]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-700 selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <main className="relative">
        <section className="sticky top-0 h-screen overflow-hidden">
           <Hero />
        </section>
        
        <div className="relative z-10 bg-background transition-colors duration-700">
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
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
