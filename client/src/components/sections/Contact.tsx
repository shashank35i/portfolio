import { motion } from "framer-motion";
import { ArrowUpRight, Code2, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { content } from "@/content/content";
import { useLocation } from "wouter";

const profileLinks = [
  { label: "GitHub",   detail: "Code & repositories",     href: content.contact.socials.github,   icon: Github },
  { label: "LinkedIn", detail: "Experience & network",     href: content.contact.socials.linkedin,  icon: Linkedin },
  { label: "LeetCode", detail: "Knight · 531 solved",      href: content.contact.socials.leetcode,  icon: Code2 },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

export function Contact() {
  const [, navigate] = useLocation();
  const mailto = `mailto:${content.contact.email}?subject=${encodeURIComponent("Backend engineering opportunity")}`;

  return (
    <section id="contact" data-section-theme="stone" className="bg-[#f9f8f6] py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">

          <motion.div {...fade(0)} className="mb-12">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-[#f04b23]">07 / Contact</p>
            <h2 className="text-3xl font-bold tracking-tight text-[#0f0f0f] sm:text-4xl md:text-5xl">
              Let's talk about<br />
              <span className="text-[#0f0f0f]/45">what you're building.</span>
            </h2>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">

            {/* left — email card */}
            <motion.div {...fade(0.08)} className="border-y border-black/[0.12] bg-white p-6 sm:p-9 lg:border lg:border-black/[0.09]">
              <p className="mb-4 text-[14px] leading-relaxed text-[#555]">
                I'm open to Java / backend and full-stack software engineering roles.<br />
                The fastest way to reach me is by email or LinkedIn.
              </p>
              <div className="mb-6 flex flex-wrap gap-4 text-[13px] text-[#888]">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-[#f04b23]" /> Hyderabad, India
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" /> Available for engineering roles
                </span>
              </div>

              <a href={mailto}
                className="group inline-flex items-center gap-2.5 rounded-xl bg-[#0f0f0f] px-5 py-3 text-[13.5px] font-semibold text-white transition hover:bg-[#222] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0f0f0f]"
              >
                <Mail className="h-4 w-4" />
                Email Shashank
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <p className="mt-3 font-mono text-[11px] text-[#bbb]">{content.contact.email}</p>

              {/* AI chat highlight */}
              <div className="mt-8 border-t border-black/[0.09] pt-5">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#f04b23]">Portfolio conversation</p>
                <p className="mb-3 text-[13px] leading-relaxed text-[#666]">
                  Ask a question about the projects, tools, or decisions behind my work.
                </p>
                <button
                  type="button"
                  onClick={() => navigate("/chat")}
                  className="group inline-flex min-h-10 items-center gap-2 border-b border-[#f04b23]/50 pb-1 text-[13px] font-semibold text-[#c84b1f] transition hover:border-[#c84b1f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f04b23]"
                >
                  Open the chat <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
              </div>
            </motion.div>

            {/* right — social links */}
            <motion.div {...fade(0.14)} className="flex flex-col gap-3">
              {profileLinks.map(({ label, detail, href, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="group flex min-h-[82px] items-center gap-4 border-b border-black/[0.1] bg-transparent py-4 transition hover:border-[#f04b23]/50 sm:min-h-[92px]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-black/[0.1] bg-white transition group-hover:border-[#f04b23]/30">
                    <Icon className="h-4.5 w-4.5 text-[#666] transition group-hover:text-[#f04b23]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] font-semibold text-[#0f0f0f]">{label}</p>
                    <p className="text-[12px] text-[#aaa]">{detail}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[#ccc] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#f04b23]" />
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
