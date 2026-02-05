import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content, Project } from "@/content/content";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { ProjectModal } from "@/components/ui/ProjectModal";

const allTags = ["All", ...Array.from(new Set(content.projects.flatMap(p => p.tags)))];

export function Projects() {
  const [selectedTag, setSelectedTag] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = selectedTag === "All"
    ? content.projects
    : content.projects.filter(p => p.tags.includes(selectedTag));

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">Featured Projects</h2>
          <div className="w-16 h-1 bg-primary mb-8" />
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedTag === tag 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card 
                  className="h-full group cursor-pointer border-border/50 bg-card/50 hover:bg-card hover:border-border transition-all duration-300 overflow-hidden"
                  onClick={() => setSelectedProject(project)}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <CardTitle className="text-2xl font-display">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6 line-clamp-3">
                      {project.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.techStack.slice(0, 3).map(tech => (
                        <span key={tech} className="text-xs font-mono text-muted-foreground/60">
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="text-xs font-mono text-muted-foreground/60">
                          +{project.techStack.length - 3}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal 
        project={selectedProject} 
        open={!!selectedProject} 
        onOpenChange={(open) => !open && setSelectedProject(null)} 
      />
    </section>
  );
}
