import { motion } from "framer-motion";
import { content } from "@/content/content";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

const stats = [
  { value: "23",    label: "Secure REST endpoints" },
  { value: "43",    label: "JUnit / Mockito tests" },
  { value: "288/s", label: "req · zero failures" },
  { value: "531",   label: "LeetCode solved" },
];

const strengths = [
  "Java 17, Spring Boot & Spring Security",
  "Role-safe APIs and access control",
  "Kafka delivery guarantees & Redis caching",
  "Load testing and measurable performance",
];

export function About() {
  return (
    <section id="about" data-section-theme="stone" className="bg-[#f9f8f6] py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">

          {/* section label */}
          <motion.p {...fade(0)} className="mb-10 font-mono text-[10.5px] uppercase tracking-[0.26em] text-[#f04b23]">
            01 / About
          </motion.p>

          {/* stat row — numbers as the visual anchor */}
          <motion.div {...fade(0.06)} className="mb-14 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-black/[0.08]">
            {stats.map(({ value, label }) => (
              <div key={value} className="sm:px-6 sm:first:pl-0 sm:last:pr-0">
                <div className="text-[2.2rem] font-bold leading-none tracking-tight text-[#0f0f0f]">{value}</div>
                <div className="mt-1.5 text-[11px] text-[#999]">{label}</div>
              </div>
            ))}
          </motion.div>

          {/* main content — two columns */}
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <motion.h2 {...fade(0.1)} className="text-4xl font-bold leading-[1.06] tracking-tight text-[#0f0f0f] sm:text-5xl">
                Engineering<br />Profile
              </motion.h2>
              <motion.div {...fade(0.16)} className="mt-6 space-y-4 text-[14.5px] leading-[1.75] text-[#555]">
                {content.about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </motion.div>
              <motion.p {...fade(0.22)} className="mt-6 border-l-2 border-[#f04b23] pl-4 text-[13px] leading-relaxed text-[#888]">
                {content.about.now}
              </motion.p>
            </div>

            {/* strengths — no cards, just a clean numbered list */}
            <div>
              <motion.p {...fade(0.12)} className="mb-6 font-mono text-[10.5px] uppercase tracking-[0.22em] text-[#aaa]">
                Core strengths
              </motion.p>
              <motion.ol {...fade(0.18)} className="space-y-0 divide-y divide-black/[0.07]">
                {strengths.map((s, i) => (
                  <li key={s} className="flex items-baseline gap-4 py-4">
                    <span className="w-5 shrink-0 font-mono text-[10px] text-[#ccc]">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[14px] text-[#333]">{s}</span>
                  </li>
                ))}
              </motion.ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}