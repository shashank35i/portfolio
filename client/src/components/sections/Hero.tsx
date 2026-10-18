import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Code2 } from "lucide-react";
import { content } from "@/content/content";
import { useLocation } from "wouter";

const proof = [
  { value: "288 req/s", label: "Load tested" },
  { value: "531",       label: "LeetCode solved" },
  { value: "Oracle",    label: "Java 17 certified" },
  { value: "AWS",       label: "Cloud certified" },
];

export function Hero() {
  const [, navigate] = useLocation();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y       = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      ref={containerRef}
      data-section-theme="zinc"
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* single warm glow only — no dot grid */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-[60%] rounded-full bg-[#f04b23]/[0.06] blur-[140px]" />

      <motion.div style={{ y, opacity }} className="container relative z-10 mx-auto px-4 sm:px-6 pt-32 pb-16 text-center">
        <div className="mx-auto max-w-4xl">

          {/* availability — plain text, no pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mb-5 flex items-center justify-center gap-2"
          >
            <span className="h-[6px] w-[6px] rounded-full bg-emerald-400" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.26em] text-white/40">
              Open to backend &amp; full-stack roles
            </span>
          </motion.div>

          {/* headline — pure typography, no decorations */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="mb-7 text-[clamp(3rem,9vw,6rem)] font-bold leading-[0.95] tracking-tighter text-white"
          >
            Java &amp; Backend<br />
            <span className="text-white/20">Software Engineer</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18 }}
            className="mx-auto mb-10 max-w-md text-[15px] leading-[1.7] text-white/40"
          >
            {content.hero.tagline}
          </motion.p>

          {/* CTAs — three distinct weights, no icons except arrow */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.26 }}
            className="mb-12 flex flex-wrap items-center justify-center gap-3"
          >
            <a href="#projects"
              className="group inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-[13.5px] font-semibold text-[#0a0a0a] transition hover:bg-white/90"
            >
              View flagship work
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>

            {/* Chat — plain, no sparkles icon */}
            <button
              type="button"
              onClick={() => navigate("/chat")}
              className="inline-flex h-11 items-center rounded-full border border-[#f04b23]/35 px-6 text-[13.5px] font-medium text-[#f98060] transition hover:border-[#f04b23]/65 hover:bg-[#f04b23]/10"
            >
              Chat with my AI
            </button>

            <a href="/resume.pdf" download="Shashank_Preetham_Pendyala_Resume.pdf"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-white/10 px-6 text-[13.5px] font-medium text-white/45 transition hover:border-white/20 hover:text-white/70"
            >
              <Download className="h-3.5 w-3.5" />
              Resume
            </a>
          </motion.div>

          {/* proof — minimal horizontal bar */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.36 }}
            className="mx-auto mb-10 flex max-w-md flex-wrap justify-center divide-x divide-white/[0.08]"
          >
            {proof.map(({ value, label }) => (
              <div key={value} className="px-5 py-2 text-center first:pl-0 last:pr-0">
                <div className="text-[17px] font-bold text-white">{value}</div>
                <div className="text-[10px] uppercase tracking-[0.12em] text-white/25">{label}</div>
              </div>
            ))}
          </motion.div>

          {/* socials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.46, duration: 0.6 }}
            className="flex items-center justify-center gap-2.5"
          >
            {[
              { href: content.contact.socials.github,   Icon: Github,   label: "GitHub" },
              { href: content.contact.socials.linkedin,  Icon: Linkedin,  label: "LinkedIn" },
              { href: content.contact.socials.leetcode,  Icon: Code2,     label: "LeetCode" },
            ].map(({ href, Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.09] text-white/30 transition hover:border-white/20 hover:text-white/60"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* scroll line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.26em] text-white/15">Scroll</span>
        <div className="h-10 w-px bg-gradient-to-b from-white/15 to-transparent" />
      </motion.div>
    </section>
  );
}