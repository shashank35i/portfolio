import { motion } from "framer-motion";
import { content } from "@/content/content";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

export function Recognition() {
  const certs = content.recognition.certifications;
  const hacks = content.recognition.hackathons;
  return (
    <section id="recognition" data-section-theme="stone" className="bg-[#f9f8f6] py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <motion.p {...fade(0)} className="mb-10 font-mono text-[10.5px] uppercase tracking-[0.26em] text-[#f04b23]">
            06 / Recognition
          </motion.p>

          <motion.div {...fade(0.03)} className="mb-10 border-b border-black/[0.12] pb-7 sm:mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-[#0f0f0f] sm:text-4xl">Credentials earned through practice</h2>
          </motion.div>

          <div className="grid gap-14 md:grid-cols-2 md:gap-20">
            {/* Certifications */}
            <div>
              <motion.p {...fade(0.06)} className="mb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-[#bbb]">
                Certifications
              </motion.p>
              <div className="divide-y divide-black/[0.07]">
                {certs.map((c, i) => (
                  <motion.div key={c.title} {...fade(0.06 + i * 0.07)} className="py-5 first:pt-0">
                    <p className="text-[14.5px] font-semibold leading-snug text-[#0f0f0f]">{c.title}</p>
                    <p className="mt-1 text-[12px] text-[#aaa]">{c.issuer} &middot; {c.year}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <motion.p {...fade(0.06)} className="mb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-[#bbb]">
                Achievements
              </motion.p>
              <div className="divide-y divide-black/[0.07]">
                {hacks.map((h, i) => (
                  <motion.div key={h.title} {...fade(0.06 + i * 0.07)} className="py-5 first:pt-0">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-[14.5px] font-semibold leading-snug text-[#0f0f0f]">{h.title}</p>
                      <span className="shrink-0 font-mono text-[10.5px] text-[#bbb]">{h.year}</span>
                    </div>
                    <p className="mt-0.5 text-[12px] font-semibold text-[#f04b23]">{h.award}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
