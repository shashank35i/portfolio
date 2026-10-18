import { motion } from "framer-motion";
import { content } from "@/content/content";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

export function Education() {
  return (
    <section id="education" data-section-theme="stone" className="bg-[#f9f8f6] py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <motion.p {...fade(0)} className="mb-10 font-mono text-[10.5px] uppercase tracking-[0.26em] text-[#f04b23]">
            05 / Education
          </motion.p>

          <div className="divide-y divide-black/[0.07]">
            {content.education.map((edu, idx) => (
              <motion.div key={edu.id} {...fade(idx * 0.08)}
                className="grid py-8 first:pt-0 last:pb-0 md:grid-cols-[220px_1fr] md:gap-16"
              >
                <p className="mb-2 font-mono text-[11px] text-[#bbb] md:mb-0">{edu.period}</p>
                <div>
                  <h3 className="text-[18px] font-bold tracking-tight text-[#0f0f0f]">{edu.degree}</h3>
                  <p className="mb-3 text-[13px] text-[#888]">{edu.school}</p>
                  <div className="flex flex-wrap gap-x-6 gap-y-1">
                    {edu.details.map(d => (
                      <span key={d} className="text-[12.5px] text-[#666]">{d}</span>
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