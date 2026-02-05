import { motion } from "framer-motion";
import { content } from "@/content/content";

export function Experience() {
  return (
    <section id="experience" className="py-24 bg-secondary/5">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">Experience</h2>
          <div className="w-16 h-1 bg-primary" />
        </motion.div>

        <div className="max-w-3xl mx-auto relative border-l border-border/40 ml-4 md:ml-0 pl-8 md:pl-0">
          {content.experience.map((job, idx) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="mb-12 relative md:grid md:grid-cols-[200px_1fr] md:gap-8"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-primary md:hidden" />
              
              <div className="mb-2 md:mb-0 md:text-right">
                <span className="text-sm font-mono text-muted-foreground block md:pr-8 relative">
                   {job.period}
                   {/* Desktop Dot */}
                   <div className="absolute right-[-38px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-primary hidden md:block" />
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-foreground mb-1">{job.role}</h3>
                <div className="text-lg text-primary/90 mb-4">{job.company}</div>
                <ul className="space-y-3 mb-4">
                  {job.description.map((item, i) => (
                    <li key={i} className="text-muted-foreground text-sm leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-border before:rounded-full">
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map(skill => (
                    <span key={skill} className="text-xs font-mono text-muted-foreground/80 bg-secondary/30 px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
