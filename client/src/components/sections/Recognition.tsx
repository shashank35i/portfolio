import { motion } from "framer-motion";
import { content } from "@/content/content";

export function Recognition() {
  const { certifications, hackathons, awards, community } = content.recognition;

  return (
    <section id="recognition" data-section-theme="stone" className="section-flow py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto mb-10 md:mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">
            04 / Recognition
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold font-display tracking-tight">
            Proof of <span className="text-muted-foreground/60">Excellence</span>
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2">
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <h3 className="text-lg font-semibold mb-4">Certifications</h3>
            <div className="space-y-4">
              {certifications.map((item) => (
                <div key={item.title} className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-foreground font-medium">{item.title}</div>
                    <div className="text-sm text-muted-foreground">{item.issuer}</div>
                  </div>
                  <div className="text-xs font-mono text-muted-foreground">{item.year}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8">
            <h3 className="text-lg font-semibold mb-4">Hackathons</h3>
            <div className="space-y-4">
              {hackathons.map((item) => (
                <div key={item.title} className="space-y-1">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-foreground font-medium">{item.title}</div>
                    <div className="text-xs font-mono text-muted-foreground">{item.year}</div>
                  </div>
                  <div className="text-sm text-primary/90">{item.award}</div>
                  <p className="text-sm text-muted-foreground">{item.summary}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8">
            <h3 className="text-lg font-semibold mb-4">Awards</h3>
            <div className="space-y-4">
              {awards.map((item) => (
                <div key={item.title} className="space-y-1">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-foreground font-medium">{item.title}</div>
                    <div className="text-xs font-mono text-muted-foreground">{item.year}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{item.issuer}</div>
                  <p className="text-sm text-muted-foreground">{item.summary}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8">
            <h3 className="text-lg font-semibold mb-4">Community</h3>
            <div className="space-y-4">
              {community.map((item) => (
                <div key={item.title} className="space-y-1">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-foreground font-medium">{item.title}</div>
                    <div className="text-xs font-mono text-muted-foreground">{item.year}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{item.org}</div>
                  <p className="text-sm text-muted-foreground">{item.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

