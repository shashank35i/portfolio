import { content } from "@/content/content";

export function Footer() {
  return (
    <footer className="py-8 bg-background border-t border-border/40">
      <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} {content.hero.name}. All rights reserved.</p>
        <p className="mt-2">Built with Next.js, Tailwind, and React Three Fiber.</p>
      </div>
    </footer>
  );
}
