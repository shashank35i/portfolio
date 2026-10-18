import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowRight, Download, Github, Linkedin, Code2 } from "lucide-react";
import { content } from "@/content/content";
import { useLocation } from "wouter";

const proof = [
  { value: "23", label: "secure REST endpoints" },
  { value: "288/s", label: "load-tested throughput" },
  { value: "531", label: "problems solved" },
];

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function Hero() {
  const [, navigate] = useLocation();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.25]);

  return (
    <section ref={containerRef} data-section-theme="zinc" className="relative isolate min-h-[100svh] overflow-hidden bg-[#0b0b0a] text-[#f5f1e9]">
      <div className="pointer-events-none absolute inset-y-0 left-[8.3%] hidden w-px bg-white/[0.07] lg:block" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-[42%] border-l border-white/[0.045] bg-[linear-gradient(160deg,rgba(240,75,35,.08),transparent_48%)]" />
      <motion.div style={{ y, opacity }} className="relative mx-auto grid min-h-[100svh] max-w-[1440px] grid-cols-1 items-center gap-12 px-5 pb-20 pt-32 sm:px-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(260px,.55fr)] lg:gap-16 lg:px-20 lg:pb-24 lg:pt-28">
        <div className="relative z-10 lg:pl-10">
          <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .65, ease }} className="mb-8 flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[.3em] text-[#f26946]">Portfolio · 2026</span>
            <span className="h-px w-12 bg-[#f26946]/70" />
            <span className="font-mono text-[10px] uppercase tracking-[.18em] text-white/45">Hyderabad, India</span>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .05, ease }} className="mb-4 font-display text-sm font-semibold uppercase tracking-[.24em] text-white/65">
            {content.hero.name} Pendyala
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .1, ease }} className="max-w-5xl text-[clamp(3.8rem,9.4vw,8.7rem)] font-bold leading-[.82] tracking-[-.085em] text-[#f8f5ef]">
            Java, built<br />to <span className="font-serif font-medium italic tracking-[-.075em] text-[#f26946]">hold up.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .2, ease }} className="mt-8 max-w-xl text-[15px] leading-7 text-white/58 sm:text-[17px] sm:leading-8">
            {content.hero.tagline}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .28, ease }} className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className="group inline-flex h-12 items-center gap-3 bg-[#f5f1e9] px-5 text-[13px] font-semibold text-[#111] transition hover:bg-[#f26946] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f26946]">
              Selected engineering <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <button type="button" onClick={() => navigate("/chat")} className="inline-flex h-12 items-center border border-white/20 px-5 text-[13px] font-medium text-white/80 transition hover:border-[#f26946] hover:text-[#ff9a7d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f26946]">
              Start a conversation
            </button>
            <a href="/resume.pdf" download="Shashank_Preetham_Pendyala_Resume.pdf" aria-label="Download resume" className="inline-flex h-12 w-12 items-center justify-center border border-white/20 text-white/65 transition hover:border-white/50 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f26946]"><Download className="h-4 w-4" /></a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .7, delay: .4 }} className="mt-10 flex items-center gap-4">
            {[
              { href: content.contact.socials.github, Icon: Github, label: "GitHub" },
              { href: content.contact.socials.linkedin, Icon: Linkedin, label: "LinkedIn" },
              { href: content.contact.socials.leetcode, Icon: Code2, label: "LeetCode" },
            ].map(({ href, Icon, label }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-white/45 transition hover:text-[#f26946] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f26946]"><Icon className="h-4 w-4" /></a>)}
          </motion.div>
        </div>

        <motion.aside initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .85, delay: .24, ease }} className="relative z-10 self-end border-t border-white/20 pt-5 lg:mb-12 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <div className="mb-9 flex items-center justify-between font-mono text-[10px] uppercase tracking-[.2em] text-white/40"><span>Selected evidence</span><span>01—03</span></div>
          <div className="space-y-0">
            {proof.map(({ value, label }, index) => <div key={value} className="grid grid-cols-[70px_1fr] items-baseline gap-4 border-t border-white/[.12] py-5 first:border-t-0 first:pt-0 lg:grid-cols-1 lg:gap-1 lg:py-6">
              <span className="font-display text-3xl font-semibold tracking-tight text-[#f26946] sm:text-4xl">{value}</span>
              <span className="text-[12px] text-white/58 sm:text-[13px]">{label}</span>
              <span className="sr-only">Evidence {index + 1}</span>
            </div>)}
          </div>
          <a href="#about" className="group mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.22em] text-white/45 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f26946]">Explore profile <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" /></a>
        </motion.aside>
      </motion.div>
    </section>
  );
}
