import { motion } from "framer-motion";
import { content } from "@/content/content";

export function Education() {
  return (
    <section id="education" data-section-theme="slate" className="section-flow py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-10 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display mb-5 md:mb-6">Education</h2>
          <div className="w-16 h-1 bg-primary" />
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {content.education.map((edu) => (
            <div key={edu.id} className="glass-card rounded-2xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="text-xl font-semibold">{edu.degree}</div>
                  <div className="text-muted-foreground">{edu.school}</div>
                </div>
                <div className="text-sm font-mono text-muted-foreground">{edu.period}</div>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {edu.details.map((item) => (
                  <li key={item} className="pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-border">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

