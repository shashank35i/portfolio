import { content } from "@/content/content";

export function Footer() {
  return (
    <footer className="section-flow py-8">
      <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} {content.hero.name} Pendyala</p>
      </div>
    </footer>
  );
}

