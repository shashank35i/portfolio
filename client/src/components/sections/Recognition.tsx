import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { content } from "@/content/content";

const fade = (delay = 0) => ({ initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" }, transition: { duration: .65, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } });

export function Recognition() {
  const certs = content.recognition.certifications;
  const hacks = content.recognition.hackathons;
  return <section id="recognition" data-section-theme="stone" className="bg-[#f8f6f0] py-24 text-[#181715] md:py-32">
    <div className="container mx-auto px-5 sm:px-8 lg:px-12"><div className="mx-auto max-w-6xl">
      <motion.div {...fade(0)} className="mb-14 flex flex-col justify-between gap-6 border-b border-black/20 pb-7 sm:flex-row sm:items-end">
        <div><p className="mb-5 font-mono text-[10px] uppercase tracking-[.27em] text-[#bd472b]">06 / Recognition</p><h2 className="text-[clamp(2.8rem,6.4vw,5.7rem)] font-semibold leading-[.9] tracking-[-.07em]">Proof of persistence.</h2></div>
        <p className="max-w-[260px] pb-1 text-[13px] leading-6 text-[#6c6962]">Credentials, competition, and consistent problem-solving.</p>
      </motion.div>

      <div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
        <div>
          <motion.div {...fade(.05)} className="mb-5 flex items-center justify-between border-b border-black/15 pb-3"><h3 className="font-mono text-[10px] uppercase tracking-[.22em] text-[#7b766e]">Certifications</h3><span className="font-mono text-[10px] text-[#bd472b]">02</span></motion.div>
          <div>{certs.map((cert, index) => <motion.article key={cert.title} {...fade(.08 + index * .08)} className="group border-b border-black/10 py-5 first:pt-3">
            <p className="max-w-sm text-[15px] font-semibold leading-6">{cert.title}</p><div className="mt-2 flex items-center justify-between text-[11px] text-[#7c786f]"><span>{cert.issuer}</span><span className="font-mono">{cert.year}</span></div>
          </motion.article>)}</div>
        </div>

        <div>
          <motion.div {...fade(.05)} className="mb-5 flex items-center justify-between border-b border-black/15 pb-3"><h3 className="font-mono text-[10px] uppercase tracking-[.22em] text-[#7b766e]">Competitive milestones</h3><span className="font-mono text-[10px] text-[#bd472b]">03</span></motion.div>
          <div className="divide-y divide-black/10 border-b border-black/10">{hacks.map((item, index) => <motion.article key={item.title} {...fade(.08 + index * .07)} className="grid gap-3 py-5 sm:grid-cols-[76px_1fr_auto] sm:items-start sm:gap-5">
            <span className="font-mono text-[11px] text-[#bd472b]">{item.year}</span>
            <div><h4 className="text-[15px] font-semibold">{item.title}</h4><p className="mt-1 text-[12px] font-medium text-[#6b4b3d]">{item.award}</p>{item.summary && <p className="mt-2 max-w-lg text-[12px] leading-5 text-[#77736c]">{item.summary}</p>}</div>
            {item.title.includes("LeetCode") && <a href={content.contact.socials.leetcode} target="_blank" rel="noopener noreferrer" aria-label="View LeetCode profile" className="flex h-8 w-8 items-center justify-center border border-black/15 text-[#767168] transition hover:border-[#bd472b] hover:text-[#bd472b] focus-visible:outline-2 focus-visible:outline-[#bd472b]"><ArrowUpRight className="h-4 w-4" /></a>}
          </motion.article>)}</div>
        </div>
      </div>
    </div></div>
  </section>;
}
