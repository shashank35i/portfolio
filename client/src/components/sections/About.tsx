import { motion } from "framer-motion";
import { content } from "@/content/content";
import { Card, CardContent } from "@/components/ui/card";

export function About() {
  return (
    <section id="about" className="py-32 bg-background relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid md:grid-cols-[1fr_2fr] gap-20 items-start">
            <div className="md:sticky md:top-32">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block"
              >
                01 / Background
              </motion.span>
              <h2 className="text-4xl md:text-6xl font-bold font-display tracking-tight leading-[1.1]">
                About <br/><span className="text-muted-foreground/50">Alex Dev</span>
              </h2>
            </div>
            
            <div className="space-y-12">
              <div className="prose prose-invert prose-2xl text-foreground/80 leading-relaxed font-light">
                {content.about.paragraphs.map((p, i) => (
                  <motion.p 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="mb-8 last:mb-0"
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-3xl bg-secondary/10 border border-primary/10 backdrop-blur-xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <div className="w-24 h-24 rounded-full border-2 border-primary animate-pulse" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-4 flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                  </span>
                  Current Focus
                </h3>
                <p className="text-xl text-muted-foreground font-light leading-relaxed">
                  {content.about.now}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
