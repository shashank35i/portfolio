import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { content, Project } from "@/content/content";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import { ProjectModal } from "@/components/ui/ProjectModal";

const projectThemes = ["indigo", "slate", "stone", "zinc"] as const;
type ProjectTheme = (typeof projectThemes)[number];

function getProjectTheme(index: number): ProjectTheme {
  return projectThemes[index % projectThemes.length];
}

function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: (p: Project) => void;
}) {
  const container = useRef(null);
  const [mediaFailed, setMediaFailed] = useState(false);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const mediaPath = project.image?.trim();
  const isVideo = /\.(mp4|webm|ogg)$/i.test(mediaPath);
  const showMedia = Boolean(mediaPath) && !mediaFailed;

  return (
    <motion.div
      ref={container}
      data-section-theme={getProjectTheme(index)}
      className="perspective-1000 mb-20 last:mb-0"
      onClick={() => onSelect(project)}
    >
      <motion.div
        style={{ rotateX, y }}
        className="preserve-3d relative group cursor-pointer"
      >
        <div className="aspect-[16/9] w-full rounded-[1.5rem] overflow-hidden bg-secondary/20 border border-border/50 relative p-2.5">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-transparent pointer-events-none" />
          <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-white/20 bg-background/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-foreground/85 backdrop-blur-md">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Product Demo
          </div>

          <div className="relative h-full w-full overflow-hidden rounded-[1.1rem] border border-white/10 bg-[#060d1d] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_55px_rgba(2,8,23,0.5)]">
            <div className="absolute left-0 right-0 top-0 z-10 flex h-8 items-center gap-1.5 border-b border-white/10 bg-black/35 px-3 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-rose-400/90" />
              <span className="h-2 w-2 rounded-full bg-amber-300/90" />
              <span className="h-2 w-2 rounded-full bg-emerald-400/90" />
              <span className="ml-3 text-[10px] uppercase tracking-[0.16em] text-white/55">{project.title}</span>
            </div>

          {showMedia ? (
            isVideo ? (
              <video
                className="absolute inset-0 h-full w-full object-cover pt-8 group-hover:scale-[1.02] transition-transform duration-700"
                src={mediaPath}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                onError={() => setMediaFailed(true)}
              />
            ) : (
              <img
                className="absolute inset-0 h-full w-full object-cover pt-8 group-hover:scale-[1.02] transition-transform duration-700"
                src={mediaPath}
                alt={`${project.title} demo`}
                loading="lazy"
                onError={() => setMediaFailed(true)}
              />
            )
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background/5 to-primary/10 animate-pulse pt-8">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-7xl font-display font-bold text-white/10 uppercase tracking-widest select-none">
                  {project.title.split(" ")[0]}
                </span>
              </div>
            </div>
          )}
          </div>

          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 group-hover:opacity-80 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <div className="mt-6 flex flex-col md:flex-row justify-between items-start gap-5">
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
            <h3 className="text-3xl md:text-4xl font-bold font-display tracking-tighter mb-3 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              {project.shortDescription}
            </p>
          </div>
          
          <div className="flex gap-4">
             <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center text-foreground group-hover:bg-primary group-hover:border-primary group-hover:text-background transition-all duration-500">
               <ArrowUpRight size={26} />
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
