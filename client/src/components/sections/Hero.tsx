import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Github, Linkedin, Code2, ChevronDown } from "lucide-react";
import { content } from "@/content/content";
import { HeroBackground } from "./HeroBackground";

export function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section
      ref={containerRef}
      data-section-theme="zinc"
      className="relative min-h-[100svh] md:min-h-screen flex items-center justify-center overflow-hidden"
    >
      <HeroBackground />
      
      <motion.div 
        style={{ y, opacity, scale }}
        className="container mx-auto px-4 sm:px-6 relative z-10 text-center pt-24 md:pt-24 pb-6 md:pb-0"
      >
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs uppercase tracking-[0.28em] text-primary/85 mb-5"
          >
            {content.hero.name}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-display tracking-tighter mb-6 md:mb-8 leading-[0.94] md:leading-[0.92]"
          >
            {content.hero.title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-8 md:mb-12 leading-relaxed"
          >
            {content.hero.tagline}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col min-[520px]:flex-row items-stretch min-[520px]:items-center justify-center gap-4 sm:gap-6"
          >
            <Button
              size="lg"
              className="w-full min-[520px]:w-auto rounded-full text-base h-12 md:h-14 px-8 md:px-10 group bg-white text-zinc-900 hover:bg-white/90"
              asChild
            >
              <a href="#projects">
                {content.hero.cta.primary}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full min-[520px]:w-auto rounded-full text-base h-12 md:h-14 px-8 md:px-10 group border-white/25 bg-white/5 hover:bg-white/10"
              asChild
            >
              <a href="/resume.pdf" download="Shashank_Preetham_Pendyala_Resume.pdf">
                {content.hero.cta.secondary}
                <Download className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 flex items-center justify-center gap-3"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Profiles
            </span>
            <div className="h-4 w-px bg-border/60" />
            <a
              href={content.contact.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-secondary/30 hover:bg-secondary text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={content.contact.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-secondary/30 hover:bg-secondary text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={content.contact.socials.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-secondary/30 hover:bg-secondary text-foreground transition-colors"
              aria-label="LeetCode"
            >
              <Code2 className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.a
            href="#about"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 inline-flex md:hidden items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/75"
            aria-label="Scroll to About section"
          >
            Swipe to explore
            <ChevronDown className="h-3.5 w-3.5 animate-bounce text-primary" />
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 hidden md:flex flex-col items-center gap-3"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Scroll
            </span>
            <div className="w-[1px] h-10 bg-gradient-to-b from-primary to-transparent" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
