import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Code2, Github, Linkedin, Mail } from "lucide-react";
import { content } from "@/content/content";
import { useLocation } from "wouter";

const profileLinks = [
  { label: "GitHub", detail: "Code & repositories", href: content.contact.socials.github, icon: Github },
  { label: "LinkedIn", detail: "Experience & network", href: content.contact.socials.linkedin, icon: Linkedin },
  { label: "LeetCode", detail: "Knight · 531 solved", href: content.contact.socials.leetcode, icon: Code2 },
];

const fade = (delay = 0) => ({ initial: { opacity: 0, y: 22 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" }, transition: { duration: .65, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } });

export function Contact() {
  const [, navigate] = useLocation();
  const emailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(content.contact.email)}&su=${encodeURIComponent("Backend engineering opportunity")}`;
  return <section id="contact" data-section-theme="zinc" className="relative overflow-hidden bg-[#0b0b0a] py-24 text-[#f5f1e9] md:py-32">
    <div className="pointer-events-none absolute right-[8%] top-0 hidden h-full w-px bg-white/[.07] lg:block" />
    <div className="container relative mx-auto px-5 sm:px-8 lg:px-12"><div className="mx-auto max-w-6xl">
      <motion.div {...fade(0)} className="mb-14 border-b border-white/20 pb-8">
        <p className="mb-6 font-mono text-[10px] uppercase tracking-[.27em] text-[#f26946]">Contact</p>
        <h2 className="max-w-5xl text-[clamp(3rem,8vw,7.6rem)] font-semibold leading-[.86] tracking-[-.08em]">Hiring for Java<br />or backend roles?<br /><span className="font-serif font-medium italic text-[#f26946]">Let’s talk.</span></h2>
      </motion.div>

      <div className="grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:gap-20">
        <motion.div {...fade(.08)}>
          <p className="max-w-xl text-[14px] leading-7 text-white/60">I'm open to Java / backend and full-stack software engineering roles. The fastest way to reach me is by email or LinkedIn.</p>
          <a href={emailComposeUrl} target="_blank" rel="noopener noreferrer" aria-label={`Compose an email to ${content.contact.email} in Gmail`} className="group mt-8 flex max-w-2xl items-center justify-between border-y border-white/20 py-5 text-white transition hover:border-[#f26946] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f26946]">
            <span className="flex min-w-0 items-center gap-3"><Mail className="h-4 w-4 shrink-0 text-[#f26946]"/><span className="truncate text-[14px] font-medium sm:text-lg">{content.contact.email}</span></span><ArrowRight className="ml-4 h-5 w-5 shrink-0 text-white/40 transition group-hover:translate-x-1 group-hover:text-[#f26946]" />
          </a>
          <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3 font-mono text-[10px] uppercase tracking-[.16em] text-white/40"><span>Hyderabad, India</span><span>Java · Backend · Full-stack</span></div>
          <div className="mt-10 border-t border-white/[.12] pt-5">
            <p className="font-mono text-[9px] uppercase tracking-[.22em] text-white/50">Questions about my work?</p>
            <button type="button" onClick={() => navigate("/chat")} className="group mt-3 inline-flex items-center gap-2 text-[13px] font-medium text-[#ff9477] transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f26946]">Ask a question <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></button>
          </div>
        </motion.div>

        <motion.div {...fade(.14)} className="lg:pt-2">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[.22em] text-white/50">Professional profiles</p>
          <div className="border-t border-white/20">{profileLinks.map(({ label, detail, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="group grid min-h-[84px] grid-cols-[1fr_auto] items-center gap-3 border-b border-white/[.13] transition hover:border-[#f26946]/60 focus-visible:outline-2 focus-visible:outline-[#f26946]">
            <span><span className="flex items-center gap-2 text-[15px] font-semibold text-white/90"><Icon className="h-4 w-4 text-white/35 transition group-hover:text-[#f26946]" />{label}</span><span className="mt-1 block text-[11px] text-white/55">{detail}</span></span><ArrowUpRight className="h-4 w-4 text-white/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#f26946]" />
          </a>)}</div>
        </motion.div>
      </div>
    </div></div>
  </section>;
}
