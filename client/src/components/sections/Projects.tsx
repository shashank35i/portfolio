import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { content, Project } from "@/content/content";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { ProjectModal } from "@/components/ui/ProjectModal";

function ProjectCard({ project, index, onSelect }: { project: Project, index: number, onSelect: (p: Project) => void }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <motion.div
      ref={container}
      className="perspective-1000 mb-32 last:mb-0"
      onClick={() => onSelect(project)}
    >
      <motion.div
        style={{ rotateX, y }}
        className="preserve-3d relative group cursor-pointer"
      >
        <div className="aspect-[16/10] w-full rounded-[2rem] overflow-hidden bg-secondary/20 border border-border/50 relative">
          {/* Abstract mesh/gradient background for placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 group-hover:scale-110 transition-transform duration-1000" />
          
          <div className="absolute inset-0 flex items-center justify-center">
             <span className="text-8xl font-display font-bold text-white/5 uppercase tracking-widest select-none">
               {project.title.split(' ')[0]}
             </span>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <div className="mt-8 flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="max-w-xl">
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex gap-3 mb-4"
            >
              {project.tags.map(tag => (
                <Badge key={tag} variant="outline" className="rounded-full px-4 py-1 border-primary/20 text-primary uppercase tracking-widest text-[10px]">
                  {tag}
                </Badge>
              ))}
            </motion.div>
            <h3 className="text-4xl md:text-5xl font-bold font-display tracking-tighter mb-4 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-xl text-muted-foreground font-light leading-relaxed">
              {project.shortDescription}
            </p>
          </div>
          
          <div className="flex gap-4">
             <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-all duration-500">
               <ArrowUpRight size={32} />
             </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-32 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto mb-32"
        >
          <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">03 / Selection</span>
          <h2 className="text-5xl md:text-7xl font-bold font-display tracking-tight leading-[1.1]">
            Curated <br/><span className="text-muted-foreground/50">Works</span>
          </h2>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {content.projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      </div>

      <ProjectModal 
        project={selectedProject} 
        open={!!selectedProject} 
        onOpenChange={(open) => !open && setSelectedProject(null)} 
      />
    </section>
  );
}
