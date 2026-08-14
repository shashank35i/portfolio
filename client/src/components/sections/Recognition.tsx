import { motion } from "framer-motion";
import { Award, BadgeCheck } from "lucide-react";
import { content } from "@/content/content";

export function Recognition() {
  const credentials = [
    ...content.recognition.certifications.map(item => ({ ...item, result: item.issuer, kind: "Certification" })),
    ...content.recognition.hackathons.map(item => ({ title: item.title, year: item.year, result: item.award, kind: "Achievement" })),
  ];
  return <section id="recognition" data-section-theme="stone" className="section-flow py-20 md:py-28">
    <div className="container mx-auto px-4 sm:px-6">
      <header className="mx-auto mb-12 max-w-6xl"><span className="font-mono text-xs uppercase tracking-[.24em] text-amber-300">06 / Credentials</span><div className="mt-4 grid items-end gap-5 md:grid-cols-2"><h2 className="text-4xl font-bold sm:text-6xl">Shashank’s certifications<br/><span className="text-zinc-300">and hackathon results.</span></h2><p className="max-w-xl text-zinc-300">Java and cloud foundations, backed by competitive engineering outcomes.</p></div></header>
      <div className="mx-auto grid max-w-6xl border-l border-t border-white/10 md:grid-cols-2">{credentials.map((item, index) => <motion.article key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .05 }} className="relative min-h-52 border-b border-r border-white/10 bg-black/15 p-7 sm:p-9"><div className="flex items-start justify-between gap-5"><span className="font-mono text-[10px] uppercase tracking-[.2em] text-zinc-300">{item.kind} / {String(index + 1).padStart(2,"0")}</span>{item.kind === "Certification" ? <BadgeCheck className="h-6 w-6 text-cyan-300"/> : <Award className="h-6 w-6 text-amber-300"/>}</div><h3 className="mt-8 max-w-md text-xl font-bold leading-tight text-white sm:text-2xl">{item.title}</h3><div className="mt-5 flex items-center justify-between gap-4 border-t border-white/10 pt-4 text-sm"><span className="font-semibold text-zinc-200">{item.result}</span><span className="font-mono text-xs text-zinc-300">{item.year}</span></div></motion.article>)}</div>
    </div>
  </section>;
}
