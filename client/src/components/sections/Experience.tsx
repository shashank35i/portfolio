import { motion } from "framer-motion";
import { content } from "@/content/content";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

export function Experience() {
  return (
    <section id="experience" data-section-theme="stone" className="bg-[#f9f8f6] py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <motion.p {...fade(0)} className="mb-10 font-mono text-[10.5px] uppercase tracking-[0.26em] text-[#f04b23]">
            04 / Experience
          </motion.p>

          <div className="divide-y divide-black/[0.07]">
            {content.experience.map((job, idx) => (
              <motion.div
                key={job.id}
                {...fade(idx * 0.08)}
                className="grid py-10 first:pt-0 last:pb-0 md:grid-cols-[220px_1fr] md:gap-16"
              >
                {/* left meta */}
                <div className="mb-4 md:mb-0">
                  <p className="font-mono text-[11px] text-[#bbb]">{job.period}</p>
                  <p className="mt-1 text-[13px] font-semibold text-[#f04b23]">{job.company}</p>
                </div>

                {/* right content */}
                <div>
                  <h3 className="mb-5 text-[20px] font-bold tracking-tight text-[#0f0f0f]">{job.role}</h3>
                  <div className="mb-6 space-y-2.5">
                    {job.description.map((item, i) => (
                      <p key={i} className="text-[13.5px] leading-relaxed text-[#555]">{item}</p>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {job.skills.map(skill => (
                      <span key={skill} className="rounded-full border border-black/[0.09] px-2.5 py-0.5 font-mono text-[10.5px] text-[#777]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}