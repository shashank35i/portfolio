import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, Github, TicketCheck } from "lucide-react";
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
  ] : [["93%", "OCR exact match"], ["500", "labeled plate images"], ["3", "role-specific workflows"], ["Razorpay", "payment integration"],];
  const tags = project.tags;
  const github = ops ? opsPilot.links.github : bookMyTicket.links?.repo;
  const demo = ops ? opsPilot.links.demo : undefined;
  return (
    <motion.article initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} className="group relative overflow-hidden border border-white/15 bg-[#10100f]">
      <div className="relative grid lg:grid-cols-[1.05fr_.95fr]">
        <div className="p-6 sm:p-9 lg:p-12">
          <div className="mb-8 flex items-center justify-between border-b border-white/15 pb-4 font-mono text-[10px] uppercase tracking-[.24em] text-zinc-400"><span>{ops ? "Incident response platform" : "Android ticketing and parking app"}</span></div>
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[.2em] text-[#f0805f]">{ops ? "Java · Spring Boot · Kafka · Redis" : "Java · Android · Firebase · Razorpay"}</p>
          <h3 className="text-4xl font-semibold tracking-[-.055em] text-white sm:text-5xl">{project.title}</h3>
          <p className="mt-5 max-w-2xl text-[14px] leading-7 text-zinc-300">{project.description}</p>
          <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2">{tags.map((tag) => <span key={tag} className="font-mono text-[9px] uppercase tracking-[.1em] text-zinc-400">{tag}</span>)}</div>
          <div className="mt-8 flex flex-wrap items-center gap-3"><ActionLink href={github}>View repository</ActionLink><ActionLink href={demo}>Open live demo</ActionLink><button onClick={onOpen} className="group/link inline-flex items-center gap-2 px-3 py-2 text-xs font-bold uppercase tracking-[.14em] text-zinc-300 transition hover:text-[#f0805f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f0805f]">View project details <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" /></button></div>
        </div>
        <div className="relative min-h-[360px] border-t border-white/10 bg-[#161513] p-6 sm:p-9 lg:border-l lg:border-t-0">
          {ops ? <img src={opsPilot.image} alt="OpsPilot AI incident operations dashboard" className="mb-6 aspect-video w-full border border-white/10 object-cover object-top opacity-90" /> : <div className="relative mb-6 flex aspect-video items-center justify-center overflow-hidden border border-white/10 bg-[#0a0a09] p-5"><div className="w-full max-w-sm border-y border-white/20 py-5"><div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[.18em] text-zinc-400"><span>Admission pass</span><span className="text-[#f0805f]">Booking flow</span></div><div className="my-5 flex items-center gap-4"><span className="font-serif text-5xl italic text-[#f0805f]">B</span><span className="h-10 w-px bg-white/20"/><div><p className="text-lg font-semibold text-white">BookMyTicket</p><p className="mt-1 text-[10px] uppercase tracking-[.12em] text-zinc-400">Payment · QR · entry</p></div></div><div className="flex items-center justify-between border-t border-dashed border-white/20 pt-3 font-mono text-[9px] uppercase tracking-[.12em] text-zinc-500"><span>One-time validation</span><span>Idempotent</span></div></div><TicketCheck className="absolute bottom-5 right-5 h-5 w-5 text-[#f0805f]" aria-hidden="true"/></div>}
          <div className="grid grid-cols-2 border-l border-t border-white/15">{metrics.map(([value,label])=><div key={label} className="border-b border-r border-white/15 bg-[#10100f] p-4 sm:p-5"><div className="font-display text-2xl font-semibold tracking-tight text-[#ff9a7c] sm:text-3xl">{value}</div><div className="mt-1 text-[9px] uppercase tracking-[.12em] text-zinc-400">{label}</div></div>)}</div>
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
          <span className="absolute left-4 top-4 border border-white/20 bg-black/70 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[.2em] text-cyan-200">Web application</span>
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
          <div><span className="font-mono text-[9px] uppercase tracking-[.22em] text-zinc-300">Android application</span><h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">{project.title}</h3></div>
          <ArrowUpRight className="h-5 w-5 shrink-0 text-zinc-300 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
        </div>
        <div className="relative h-[430px] overflow-hidden rounded-[2rem] border border-white/15 p-5 shadow-[0_28px_65px_rgba(0,0,0,.42)] sm:h-[500px] sm:p-7" style={{ background: `linear-gradient(145deg, ${project.accent}, color-mix(in_srgb, ${project.accent} 68%, #05070d))` }}>
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
    <div className="container mx-auto px-5 sm:px-8 lg:px-12">
      <header className="mx-auto mb-12 max-w-6xl border-b border-white/15 pb-7 sm:mb-16 sm:pb-9"><span className="font-mono text-[10px] uppercase tracking-[.27em] text-[#f0805f]">OpsPilot AI · BookMyTicket</span><div className="mt-5 grid items-end gap-5 md:grid-cols-[1fr_.72fr]"><h2 className="text-[clamp(3rem,7vw,6.7rem)] font-semibold leading-[.88] tracking-[-.075em]">Backend &amp;<br/><span className="font-serif font-medium italic text-[#f0805f]">mobile apps.</span></h2><p className="max-w-xl pb-1 text-[14px] leading-7 text-zinc-300">Secure Spring Boot endpoints, Kafka event delivery, Redis caching, Android booking workflows, and measured test results.</p></div></header>
      <div className="mx-auto grid max-w-6xl gap-8"><FlagshipDossier kind="ops" onOpen={()=>setSelectedProject(opsPilot)} /><FlagshipDossier kind="ticket" onOpen={()=>setSelectedAndroidProject(bookMyTicket)} /></div>
      <div className="mx-auto mt-24 max-w-6xl border-t border-white/15 pt-12"><div className="mb-8 flex items-end justify-between gap-5"><div><span className="font-mono text-[10px] uppercase tracking-[.27em] text-zinc-300">More projects</span><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Web &amp; Android applications</h2></div></div>
        <div className="mb-16"><WebArchiveCard project={additionalWeb[0]} onOpen={()=>setSelectedProject(additionalWeb[0])} /></div>
        <div className="grid min-w-0 gap-x-8 gap-y-16 md:grid-cols-2 lg:gap-x-12 lg:gap-y-20">{additionalMobile.map((project, index)=><AndroidArchiveCard key={project.id} project={project} index={index} onOpen={()=>setSelectedAndroidProject(project)} />)}</div>
      </div>
    </div>
    <ProjectModal project={selectedProject} open={!!selectedProject} onOpenChange={(open)=>!open&&setSelectedProject(null)} />
    <AndroidProjectModal project={selectedAndroidProject} open={!!selectedAndroidProject} onOpenChange={(open)=>!open&&setSelectedAndroidProject(null)} />
  </section>;
}
