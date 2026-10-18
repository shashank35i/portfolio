import { motion } from "framer-motion";
import { content } from "@/content/content";

const fade = (delay = 0) => ({ initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" }, transition: { duration: .65, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } });

export function Education() {
  return <section id="education" data-section-theme="stone" className="relative overflow-hidden bg-[#e8e4da] py-24 text-[#181715] md:py-28">
    <div className="container mx-auto px-5 sm:px-8 lg:px-12"><div className="mx-auto max-w-6xl">
      <motion.div {...fade(0)} className="mb-12 grid items-end gap-6 border-b border-black/20 pb-7 sm:grid-cols-[1fr_auto]">
        <div><p className="mb-5 font-mono text-[10px] uppercase tracking-[.27em] text-[#bd472b]">05 / Education</p><h2 className="text-[clamp(2.8rem,6.5vw,5.8rem)] font-semibold leading-[.9] tracking-[-.07em]">The foundation<br className="sm:hidden" /> beneath the work.</h2></div>
        <span className="pb-1 font-mono text-[10px] uppercase tracking-[.18em] text-black/45">Learning · 2022—2026</span>
      </motion.div>
      <div className="grid gap-x-14 gap-y-0 md:grid-cols-[1.15fr_.85fr]">
        {content.education.map((edu, idx) => <motion.article key={edu.id} {...fade(idx * .09)} className={`relative py-7 first:pt-0 md:py-8 ${idx === 0 ? "md:row-span-2 md:border-r md:border-black/15 md:pr-12" : "border-t border-black/15 md:pl-8"}`}>
          <p className="font-mono text-[10px] uppercase tracking-[.18em] text-[#8b867d]">{edu.period}</p>
          <h3 className={`mt-3 max-w-xl font-semibold leading-tight tracking-tight ${idx === 0 ? "text-2xl sm:text-3xl" : "text-xl"}`}>{edu.degree}</h3>
          <p className="mt-2 text-[13px] text-[#6d6961]">{edu.school}</p>
          <ul className="mt-5 space-y-2">{edu.details.map(detail => <li key={detail} className="flex gap-3 text-[12px] leading-5 text-[#514f49]"><span className="mt-[8px] h-1 w-1 shrink-0 bg-[#bd472b]" />{detail}</li>)}</ul>
        </motion.article>)}
      </div>
    </div></div>
  </section>;
}
