import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowRight, Download, Github, Linkedin, Code2 } from "lucide-react";
import { content } from "@/content/content";
import { useLocation } from "wouter";

const proof = [
  { value: "23", label: "OpsPilot AI REST endpoints" },
  { value: "288/s", label: "requests per second under load" },
  { value: "531", label: "LeetCode problems solved" },
];

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function Hero() {
  const [, navigate] = useLocation();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.25]);

  return (
    <section id="top" ref={containerRef} data-section-theme="zinc" className="relative isolate min-h-[100svh] overflow-hidden bg-[#0b0b0a] text-[#f5f1e9]">
      <div className="pointer-events-none absolute right-0 top-0 h-full w-[38%] bg-[linear-gradient(160deg,rgba(240,75,35,.055),transparent_58%)]" />
      <motion.div style={{ y, opacity }} className="hero-layout relative mx-auto grid min-h-[100svh] max-w-[1440px] grid-cols-1 items-center gap-10 px-5 pb-16 pt-28 sm:px-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(260px,.55fr)] lg:gap-14 lg:px-20 lg:pb-12 lg:pt-24">
        <div className="relative z-10">
          <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .65, ease }} className="mb-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] sm:text-sm">
            <span className="font-medium text-[#f26946]">Java and Spring Boot microservices</span>
            <span className="text-white/55">Hyderabad, India</span>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .05, ease }} className="mb-3 font-sans text-[15px] font-medium text-white/65 sm:text-base">
            {content.hero.name} Pendyala
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .1, ease }} className="max-w-5xl font-sans text-[clamp(3.2rem,5.4vw,6.1rem)] font-semibold leading-[.98] tracking-[-.055em] text-[#f8f5ef]">
            Java Backend<br />Engineer<span className="font-medium text-[#f26946]">.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .2, ease }} className="mt-6 max-w-2xl text-[15px] leading-6 text-white/72 sm:mt-7 sm:text-[17px] sm:leading-7">
            {content.hero.tagline}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .28, ease }} className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7">
            <a href="#projects" className="group inline-flex h-11 items-center gap-3 bg-[#f5f1e9] px-5 text-[13px] font-semibold text-[#111] transition hover:bg-[#f26946] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f26946]">
              View projects <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="/resume.pdf" download="Shashank_Preetham_Pendyala_Resume.pdf" className="inline-flex h-11 items-center gap-2 border border-white/25 px-4 text-[13px] font-medium text-white/85 transition hover:border-white/60 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f26946]"><Download className="h-4 w-4" /> Download resume</a>
            <button type="button" onClick={() => navigate("/chat")} className="inline-flex h-11 items-center border border-white/20 px-4 text-[13px] font-medium text-white/70 transition hover:border-[#f26946] hover:text-[#ff9a7d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f26946]">
              Start a conversation
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .7, delay: .4 }} className="mt-6 flex items-center gap-4">
            {[
              { href: content.contact.socials.github, Icon: Github, label: "GitHub" },
              { href: content.contact.socials.linkedin, Icon: Linkedin, label: "LinkedIn" },
              { href: content.contact.socials.leetcode, Icon: Code2, label: "LeetCode" },
            ].map(({ href, Icon, label }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-white/45 transition hover:text-[#f26946] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f26946]"><Icon className="h-4 w-4" /></a>)}
          </motion.div>
        </div>

        <motion.aside initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .85, delay: .24, ease }} className="relative z-10 self-center border-t border-white/15 pt-5 lg:border-0 lg:pl-8 lg:pt-0">
          <div className="mb-5 text-[13px] font-medium text-white/65 sm:text-sm">Selected engineering results</div>
          <div className="space-y-0">
            {proof.map(({ value, label }) => <div key={value} className="grid grid-cols-[max-content_minmax(0,1fr)] items-baseline gap-4 border-t border-white/[.12] py-4 first:border-t-0 first:pt-0 lg:grid-cols-1 lg:gap-1 lg:py-5">
              <span className="font-display text-3xl font-semibold tracking-tight text-[#f26946] sm:text-4xl">{value}</span>
              <span className="text-[12px] text-white/58 sm:text-[13px]">{label}</span>
            </div>)}
          </div>
          <a href="#about" className="group mt-3 inline-flex items-center gap-2 text-[13px] font-medium text-white/60 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f26946]">More about my work <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" /></a>
        </motion.aside>
      </motion.div>
    </section>
  );
}
