import { motion } from "framer-motion";
import { content } from "@/content/content";
import { Card, CardContent } from "@/components/ui/card";

export function About() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto grid md:grid-cols-[1fr_2fr] gap-12 items-start"
        >
          <div className="md:sticky md:top-24">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">About</h2>
            <div className="w-16 h-1 bg-primary mb-6" />
          </div>
          
          <div className="space-y-8">
            <div className="prose prose-invert prose-lg text-muted-foreground">
              {content.about.paragraphs.map((p, i) => (
                <p key={i} className="mb-4">{p}</p>
              ))}
            </div>
            
            <Card className="bg-secondary/20 border-border/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  Now
                </h3>
                <p className="text-muted-foreground">{content.about.now}</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
