import { motion } from "framer-motion";
import { content } from "@/content/content";

const profilePillars = [
  "Full-stack system design",
  "Role-based product architecture",
  "Cloud deployment and reliability",
  "Performance-focused frontend UX",
];

const profileMetrics = [
  "3+ multi-role healthcare platforms",
  "Production deployments across web stacks",
  "Web + Android product execution",
];

export function About() {
  return (
    <section
      id="about"
      data-section-theme="slate"
      className="section-flow py-20 md:py-32 relative z-10"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid lg:grid-cols-[0.9fr_2fr] gap-10 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">
                01 / About
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display tracking-tight leading-[1.05]">
                Engineering <br />
                <span className="text-muted-foreground/55">Profile</span>
              </h2>
            </div>

            <div className="space-y-7 sm:space-y-8">
              <div className="space-y-5 sm:space-y-6 text-foreground/85 text-base sm:text-lg leading-relaxed">
                {content.about.paragraphs.map((paragraph, index) => (
                  <motion.p
                    key={paragraph}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.12 }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-[#08142a]/90 via-[#0a1a32]/88 to-[#071126]/90 shadow-[0_20px_50px_rgba(2,8,23,0.45)] p-5 sm:p-6 md:p-8"
              >
                <h3 className="text-primary text-xs sm:text-sm font-mono tracking-[0.2em] uppercase mb-2">
                  Core Strengths
                </h3>
                <p className="text-foreground/65 text-sm sm:text-base mb-5 sm:mb-6">
                  Product-focused technical capabilities with delivery depth across web and mobile.
                </p>
                <div className="grid sm:grid-cols-2 gap-2.5 sm:gap-3.5 mb-5 sm:mb-6">
                  {profilePillars.map((pillar, idx) => (
                    <div
                      key={pillar}
                      className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm sm:text-[0.95rem] text-foreground/85"
                    >
                      <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full border border-primary/30 bg-primary/15 text-[11px] text-primary/90">
                        {idx + 1}
                      </span>
                      {pillar}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {profileMetrics.map((metric) => (
                    <span
                      key={metric}
                      className="rounded-xl border border-primary/25 bg-primary/10 px-3.5 py-2 text-xs sm:text-sm text-primary/90"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="rounded-2xl border border-border/45 bg-background/30 px-5 py-5 sm:px-6"
              >
                <div className="text-primary font-mono text-xs uppercase tracking-[0.2em] mb-2">
                  Current Focus
                </div>
                <p className="text-muted-foreground leading-relaxed">{content.about.now}</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
