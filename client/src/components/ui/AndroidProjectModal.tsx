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
import { AndroidProject } from "@/content/content";

interface AndroidProjectModalProps {
  project: AndroidProject | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AndroidProjectModal({
  project,
  open,
  onOpenChange,
}: AndroidProjectModalProps) {
  if (!project) return null;

  const screens = project.screens ?? [];
  const highlights = project.highlights ?? [];
  const links = project.links ?? {};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 gap-0 bg-background/95 backdrop-blur-xl border-border/40">
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
                {project.description}
              </DialogDescription>
            </DialogHeader>

            <div className="grid md:grid-cols-[2fr_1fr] gap-8">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Highlights</h4>
                  <ul className="space-y-2">
                    {highlights.map((highlight, i) => (
                      <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                        <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {screens.length > 0 ? (
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Screens</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {screens.map((src, index) => (
                        <div
                          key={`${project.id}-screen-${index}`}
                          className="aspect-[9/16] rounded-xl overflow-hidden border border-border/40 bg-secondary/20"
                        >
                          <img
                            src={src}
                            alt={`${project.title} screen ${index + 1}`}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Links</h4>
                  <div className="flex flex-col gap-2">
                    {links.demo ? (
                      <Button asChild className="w-full justify-between group">
                        <a href={links.demo} target="_blank" rel="noopener noreferrer">
                          Live Demo
                          <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </Button>
                    ) : null}
                    {links.repo ? (
                      <Button variant="outline" asChild className="w-full justify-between group">
                        <a href={links.repo} target="_blank" rel="noopener noreferrer">
                          View Code
                          <Github className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </Button>
                    ) : null}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">Category</h4>
                  <Badge variant="secondary" className="font-mono text-xs">
                    {project.category}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
