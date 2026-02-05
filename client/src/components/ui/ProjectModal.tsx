import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { Project } from "@/content/content";

interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectModal({ project, open, onOpenChange }: ProjectModalProps) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0 gap-0 bg-background/95 backdrop-blur-xl border-border/40">
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6 md:p-8 space-y-8">
            <DialogHeader>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <DialogTitle className="text-3xl font-display font-bold mb-2">
                {project.title}
              </DialogTitle>
              <DialogDescription className="text-lg text-muted-foreground">
                {project.shortDescription}
              </DialogDescription>
            </DialogHeader>

            <div className="grid md:grid-cols-[2fr_1fr] gap-8">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Overview</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {project.caseStudy && (
                  <div className="space-y-6">
                    <div className="bg-secondary/20 p-4 rounded-lg border border-border/50">
                      <h4 className="font-semibold text-foreground mb-2">The Challenge</h4>
                      <p className="text-sm text-muted-foreground">
                        {project.caseStudy.problem}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Implementation</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        {project.caseStudy.approach}
                      </p>
                      <ul className="space-y-2">
                        {project.highlights.map((highlight, i) => (
                          <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                            <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Links</h4>
                  <div className="flex flex-col gap-2">
                    {project.links.demo && (
                      <Button asChild className="w-full justify-between group">
                        <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                          Live Demo
                          <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </Button>
                    )}
                    {project.links.github && (
                      <Button variant="outline" asChild className="w-full justify-between group">
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                          View Code
                          <Github className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="font-mono text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {project.metrics && project.metrics.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Impact</h4>
                    <ul className="space-y-2">
                      {project.metrics.map((metric, i) => (
                        <li key={i} className="text-sm text-green-400 font-medium">
                          + {metric}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
