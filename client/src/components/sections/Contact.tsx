import { useState } from "react";
import { motion } from "framer-motion";
import { content } from "@/content/content";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Github, Linkedin, Twitter, Mail, Send, Code2 } from "lucide-react";

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent",
      description: "Thanks for reaching out! I'll get back to you soon.",
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" data-section-theme="slate" className="section-flow py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display mb-5 md:mb-6">Get in Touch</h2>
              <div className="w-16 h-1 bg-primary mb-8" />
              <p className="text-muted-foreground text-base md:text-lg mb-8">
                I'm currently open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
              
              <div className="space-y-4">
                <a 
                  href={`mailto:${content.contact.email}`} 
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  {content.contact.email}
                </a>
                
                <div className="flex gap-4 mt-8">
                  <a href={content.contact.socials.github} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-secondary/50 hover:bg-secondary text-foreground transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href={content.contact.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-secondary/50 hover:bg-secondary text-foreground transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href={content.contact.socials.leetcode} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-secondary/50 hover:bg-secondary text-foreground transition-colors">
                    <Code2 className="w-5 h-5" />
                  </a>
                  <a href={content.contact.socials.twitter} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-secondary/50 hover:bg-secondary text-foreground transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            <Card className="bg-secondary/10 border-border/50">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <Input id="name" required placeholder="John Doe" className="bg-background/50" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input id="email" type="email" required placeholder="john@example.com" className="bg-background/50" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <Textarea id="message" required placeholder="Hello, I'd like to discuss..." className="min-h-[150px] bg-background/50" />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

