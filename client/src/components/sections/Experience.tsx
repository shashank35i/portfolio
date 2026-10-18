import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { content } from "@/content/content";

const fade = (delay = 0) => ({ initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" }, transition: { duration: .65, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } });

export function Experience() {
  return <section id="experience" data-section-theme="stone" className="relative overflow-hidden bg-[#f8f6f0] py-24 text-[#181715] md:py-32">
    <div className="container mx-auto px-5 sm:px-8 lg:px-12"><div className="mx-auto max-w-6xl">
      <motion.div {...fade(0)} className="mb-14 grid items-end gap-8 border-b border-black/20 pb-7 sm:grid-cols-[1fr_auto]">
        <div><p className="mb-5 font-mono text-[10px] uppercase tracking-[.27em] text-[#bd472b]">Experience</p><h2 className="max-w-3xl text-[clamp(2.8rem,6.3vw,5.8rem)] font-semibold leading-[.9] tracking-[-.07em]">Software engineering<br className="sm:hidden" /> internship.</h2></div>
        <p className="max-w-[290px] pb-1 text-[13px] leading-6 text-[#6c6962]">Java REST APIs, Spring Security, MySQL query analysis, and JMeter performance testing.</p>
      </motion.div>

      {content.experience.map((job, idx) => <motion.article key={job.id} {...fade(idx * .08)} className="grid gap-8 md:grid-cols-[210px_1fr] md:gap-14">
        <aside className="relative border-l border-[#bd472b]/45 pl-5 md:border-l-0 md:pl-0 md:pt-1">
          <span className="absolute -left-[5px] top-[5px] h-[9px] w-[9px] rounded-full border-2 border-[#bd472b] bg-[#f8f6f0] md:hidden" />
          <p className="font-mono text-[11px] uppercase tracking-[.12em] text-[#6f6b64]">{job.period}</p>
          <p className="mt-3 text-[14px] font-semibold text-[#bd472b]">{job.company}</p>
        </aside>

        <div className="border-t border-black/20 pt-6 md:pt-5">
          <div className="flex flex-wrap items-start justify-between gap-3"><h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{job.role}</h3></div>
          <ul className="mt-7 divide-y divide-black/[.09] border-y border-black/[.12]">
            {job.description.map((item, index) => <li key={index} className="grid gap-2 py-4 sm:grid-cols-[12px_1fr] sm:gap-4"><span aria-hidden="true" className="mt-[.65rem] h-1.5 w-1.5 bg-[#bd472b]"/><p className="max-w-3xl text-[13.5px] leading-6 text-[#514f49]">{item}</p></li>)}
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2"><span className="mr-1 font-mono text-[9px] uppercase tracking-[.2em] text-[#8b867e]">Technologies</span>{job.skills.map(skill => <span key={skill} className="text-[11px] text-[#514f49] after:ml-3 after:text-[#bd472b]/60 after:content-['/'] last:after:content-none">{skill}</span>)}</div>
          <a href="#projects" className="group mt-7 inline-flex items-center gap-2 text-[12px] font-semibold text-[#bd472b] transition hover:text-[#91351e]">See related project work <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
        </div>
      </motion.article>)}
    </div></div>
  </section>;
}
