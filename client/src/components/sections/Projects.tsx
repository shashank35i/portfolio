import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, Github, QrCode, ScanLine, ShieldCheck, TicketCheck } from "lucide-react";
import { content, Project, AndroidProject } from "@/content/content";
import { Badge } from "@/components/ui/badge";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { AndroidProjectModal } from "@/components/ui/AndroidProjectModal";

const opsPilot = content.projects.find((project) => project.id === "opspilot-ai")!;
const bookMyTicket = content.androidProjects.find((project) => project.id === "bookmyticket")!;
const additionalWeb = content.projects.filter((project) => project.id !== "opspilot-ai");
const additionalMobile = content.androidProjects.filter((project) => project.id !== "bookmyticket");

function ActionLink({ href, children }: { href?: string; children: React.ReactNode }) {
  if (!href) return null;
  return <a href={href} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()} className="inline-flex items-center gap-2 border border-white/15 bg-white/[0.04] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:border-white/35 hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"><Github className="h-4 w-4" />{children}</a>;
}

function FlagshipDossier({ kind, onOpen }: { kind: "ops" | "ticket"; onOpen: () => void }) {
  const ops = kind === "ops";
  const project = ops ? opsPilot : bookMyTicket;
  const metrics = ops ? [
    ["288", "requests / second"], ["0", "load-test failures"], ["86.9%", "fewer repeat DB reads"], ["43", "JUnit / Mockito tests"],
  ] : [["93.0%", "OCR exact match"], ["500", "labeled plate images"], ["3", "role-specific flows"], ["1×", "QR validation"],];
  const tags = project.tags;
  const github = ops ? opsPilot.links.github : bookMyTicket.links?.repo;
  const demo = ops ? opsPilot.links.demo : undefined;
  return (
    <motion.article initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} className={`group relative overflow-hidden border ${ops ? "border-cyan-300/20 bg-[#081426]" : "border-amber-300/20 bg-[#171309]"}`}>
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_center,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="relative grid lg:grid-cols-[1.05fr_.95fr]">
        <div className="p-6 sm:p-9 lg:p-12">
          <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-4 font-mono text-[10px] uppercase tracking-[.24em] text-zinc-400"><span>Flagship / {ops ? "01" : "02"}</span><span className={ops ? "text-cyan-300" : "text-emerald-300"}>● Engineering dossier</span></div>
          <p className={`mb-3 font-mono text-xs uppercase tracking-[.2em] ${ops ? "text-cyan-300" : "text-amber-300"}`}>{ops ? "Incident command · event-driven backend" : "Ticketing · identity · validation"}</p>
          <h3 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{project.title}</h3>
          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300">{project.description}</p>
          <div className="mt-7 flex flex-wrap gap-2">{tags.map((tag) => <Badge key={tag} variant="outline" className="rounded-none border-white/10 bg-black/20 text-[10px] text-zinc-300">{tag}</Badge>)}</div>
          <div className="mt-8 flex flex-wrap gap-3"><ActionLink href={github}>Repository</ActionLink><ActionLink href={demo}>Live system</ActionLink><button onClick={onOpen} className="inline-flex items-center gap-2 px-3 py-2 text-xs font-bold uppercase tracking-[.14em] text-zinc-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">Open dossier <ArrowUpRight className="h-4 w-4" /></button></div>
        </div>
        <div className={`relative min-h-[360px] border-t border-white/10 p-6 sm:p-9 lg:border-l lg:border-t-0 ${ops ? "bg-cyan-950/20" : "bg-amber-950/20"}`}>
          {ops ? <img src={opsPilot.image} alt="OpsPilot AI incident operations dashboard" className="mb-6 aspect-video w-full border border-cyan-200/15 object-cover object-top opacity-90" /> : <div className="relative mb-6 flex aspect-video items-center justify-center overflow-hidden border border-amber-200/15 bg-black/30"><div className="absolute inset-4 grid grid-cols-5 gap-2 opacity-30">{Array.from({length:25}).map((_,i)=><span key={i} className={`${i%3===0 ? "bg-amber-300" : "border border-emerald-300/60"}`} />)}</div><QrCode className="relative h-24 w-24 text-amber-200"/><ScanLine className="absolute h-40 w-40 text-emerald-300/50"/><div className="absolute bottom-4 flex gap-3 text-[10px] uppercase tracking-widest text-zinc-300"><span className="flex items-center gap-1"><TicketCheck className="h-3 w-3"/> one-time entry</span><span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3"/> idempotent</span></div></div>}
          <div className="grid grid-cols-2 gap-px bg-white/10">{metrics.map(([value,label])=><div key={label} className="bg-[#080b12] p-4 sm:p-5"><div className={`font-display text-2xl font-bold sm:text-3xl ${ops ? "text-cyan-200" : "text-amber-200"}`}>{value}</div><div className="mt-1 text-[10px] uppercase tracking-[.12em] text-zinc-400">{label}</div></div>)}</div>
        </div>
      </div>
    </motion.article>
  );
}

function WebArchiveCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <motion.article initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} className="group overflow-hidden border border-white/10 bg-[#090a0f]">
      <button type="button" onClick={onOpen} className="block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">
        <div className="relative aspect-[16/8] overflow-hidden border-b border-white/10 bg-slate-950">
          <img src={project.image} alt={`${project.title} product demo`} loading="lazy" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]" />
          <span className="absolute left-4 top-4 border border-white/20 bg-black/70 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[.2em] text-cyan-200">Web system / live demo</span>
        </div>
        <div className="p-6 sm:p-8">
          <h3 className="text-3xl font-bold">{project.title}</h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">{project.shortDescription}</p>
          <div className="mt-5 flex flex-wrap gap-2">{project.tags.map(tag => <Badge key={tag} variant="outline" className="rounded-none border-white/10 text-[9px] uppercase tracking-wider text-zinc-300">{tag}</Badge>)}</div>
        </div>
      </button>
    </motion.article>
  );
}

function AndroidArchiveCard({ project, index, onOpen }: { project: AndroidProject; index: number; onOpen: () => void }) {
  const screens = project.screens.slice(0, 3);
  return (
    <motion.article initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ delay: (index % 2) * .08 }} className="group min-w-0">
      <button type="button" onClick={onOpen} className="block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
        <div className="mb-4 flex items-end justify-between gap-4 px-1">
          <div><span className="font-mono text-[9px] uppercase tracking-[.22em] text-zinc-300">Android showcase / {String(index + 1).padStart(2, "0")}</span><h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">{project.title}</h3></div>
          <ArrowUpRight className="h-5 w-5 shrink-0 text-zinc-300 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
        </div>
        <div className="relative h-[430px] overflow-hidden rounded-[2rem] border border-white/15 p-5 shadow-[0_28px_65px_rgba(0,0,0,.42)] sm:h-[500px] sm:p-7" style={{ background: `linear-gradient(145deg, ${project.accent}, color-mix(in_srgb, ${project.accent} 68%, #05070d))` }}>
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:22px_22px]" />
          <p className="relative z-20 max-w-md text-sm font-semibold leading-6 text-white/95 sm:text-base">{project.description}</p>
          <div className="absolute inset-x-0 bottom-[-18%] top-[30%] sm:top-[27%]">
            {screens.map((screen, screenIndex) => {
              const placement = screenIndex === 0 ? "left-[3%] -rotate-[7deg] scale-[.88] z-10" : screenIndex === 1 ? "left-1/2 -translate-x-1/2 z-30 group-hover:-translate-y-2" : "right-[3%] rotate-[7deg] scale-[.88] z-20";
              return <div key={screen} className={`absolute bottom-0 h-[112%] aspect-[9/19.5] rounded-[1.65rem] border-[5px] border-[#090d17] bg-[#090d17] p-0.5 shadow-[0_24px_45px_rgba(0,0,0,.5)] transition-transform duration-500 ${placement}`}><span className="absolute left-1/2 top-1 z-10 h-2 w-[38%] -translate-x-1/2 rounded-b-lg bg-[#090d17]"/><img src={screen} alt={`${project.title} app screen ${screenIndex + 1}`} loading="lazy" className="h-full w-full rounded-[1.25rem] object-cover object-top" /></div>;
            })}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 px-1">{project.tags.map(tag => <Badge key={tag} variant="outline" className="rounded-none border-white/10 bg-white/[.03] text-[9px] uppercase tracking-[.12em] text-zinc-300">{tag}</Badge>)}</div>
      </button>
    </motion.article>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedAndroidProject, setSelectedAndroidProject] = useState<AndroidProject | null>(null);
  return <section id="projects" className="section-flow relative z-10 py-20 md:py-28">
    <div className="container mx-auto px-4 sm:px-6">
      <header className="mx-auto mb-12 max-w-6xl"><span className="font-mono text-xs uppercase tracking-[.25em] text-cyan-300">03 / Selected engineering</span><h2 className="mt-4 text-4xl font-bold sm:text-6xl">Flagship systems</h2><p className="mt-4 max-w-2xl text-zinc-400">Two production-minded systems where reliability claims are backed by architecture, tests, and measured outcomes.</p></header>
      <div className="mx-auto grid max-w-6xl gap-8"><FlagshipDossier kind="ops" onOpen={()=>setSelectedProject(opsPilot)} /><FlagshipDossier kind="ticket" onOpen={()=>setSelectedAndroidProject(bookMyTicket)} /></div>
      <div className="mx-auto mt-24 max-w-6xl border-t border-white/10 pt-12"><div className="mb-8 flex items-end justify-between gap-5"><div><span className="font-mono text-xs uppercase tracking-[.25em] text-zinc-300">04 / Project archive</span><h2 className="mt-3 text-3xl font-bold sm:text-4xl">Web & Android builds</h2></div><span className="font-mono text-xs text-zinc-300">09 SYSTEMS</span></div>
        <div className="mb-16"><WebArchiveCard project={additionalWeb[0]} onOpen={()=>setSelectedProject(additionalWeb[0])} /></div>
        <div className="grid min-w-0 gap-x-8 gap-y-16 md:grid-cols-2 lg:gap-x-12 lg:gap-y-20">{additionalMobile.map((project, index)=><AndroidArchiveCard key={project.id} project={project} index={index} onOpen={()=>setSelectedAndroidProject(project)} />)}</div>
      </div>
    </div>
    <ProjectModal project={selectedProject} open={!!selectedProject} onOpenChange={(open)=>!open&&setSelectedProject(null)} />
    <AndroidProjectModal project={selectedAndroidProject} open={!!selectedAndroidProject} onOpenChange={(open)=>!open&&setSelectedAndroidProject(null)} />
  </section>;
}
