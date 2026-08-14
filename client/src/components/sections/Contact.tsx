import { motion } from "framer-motion";
import { ArrowUpRight, Code2, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { content } from "@/content/content";

const profileLinks = [
  { label: "GitHub", detail: "Code & repositories", href: content.contact.socials.github, icon: Github },
  { label: "LinkedIn", detail: "Experience & network", href: content.contact.socials.linkedin, icon: Linkedin },
  { label: "LeetCode", detail: "470+ problems solved", href: content.contact.socials.leetcode, icon: Code2 },
];

export function Contact() {
  const mailto = `mailto:${content.contact.email}?subject=${encodeURIComponent("Backend engineering opportunity")}`;
  return (
    <section id="contact" data-section-theme="zinc" className="section-flow relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:100%_48px]" />
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-6xl border border-white/10 bg-[#08090d]">
          <div className="grid lg:grid-cols-[1.2fr_.8fr]">
            <div className="p-7 sm:p-10 lg:p-14">
              <span className="font-mono text-xs uppercase tracking-[.24em] text-cyan-300">07 / Contact</span>
              <h2 className="mt-7 max-w-3xl text-4xl font-bold leading-[1.02] sm:text-6xl">Let’s talk about the system you’re building.</h2>
              <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-300">I’m open to Java/backend and full-stack software engineering opportunities. The fastest way to reach me is by email or LinkedIn.</p>
              <div className="mt-8 flex flex-wrap gap-4 text-sm text-zinc-300"><span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-amber-300"/>Hyderabad, India</span><span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400"/>Available for 2026 graduate roles</span></div>
              <a href={mailto} className="mt-10 inline-flex items-center gap-3 border border-cyan-200/25 bg-cyan-300 px-5 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"><Mail className="h-4 w-4"/>Email Shashank <ArrowUpRight className="h-4 w-4"/></a>
              <p className="mt-4 break-all font-mono text-xs text-zinc-300">{content.contact.email}</p>
            </div>
            <nav aria-label="Professional profiles" className="border-t border-white/10 lg:border-l lg:border-t-0">
              {profileLinks.map(({ label, detail, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noreferrer" className="group flex min-h-32 items-center gap-5 border-b border-white/10 p-7 transition last:border-b-0 hover:bg-white/[.04] focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-cyan-300"><Icon className="h-6 w-6 text-zinc-300 group-hover:text-cyan-300"/><span className="flex-1"><strong className="block text-lg text-white">{label}</strong><span className="mt-1 block text-sm text-zinc-300">{detail}</span></span><ArrowUpRight className="h-5 w-5 text-zinc-400 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"/></a>)}
            </nav>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
