import { motion, useReducedMotion } from "framer-motion";
import { Braces, Boxes, CloudCog, DatabaseZap } from "lucide-react";
import { content } from "@/content/content";

const icons = [Braces, DatabaseZap, CloudCog, Boxes];

export function Skills() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="skills" data-section-theme="slate" className="relative overflow-hidden bg-[#04031f] py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(112,104,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(112,104,255,.12)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[110px]" />
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <header className="mx-auto mb-14 max-w-6xl md:mb-20">
          <p className="font-mono text-xs uppercase tracking-[.25em] text-indigo-300">02 / Engineering stack</p>
          <div className="mt-4 grid items-end gap-5 md:grid-cols-[1fr_.75fr]">
            <h2 className="text-4xl font-extrabold leading-none text-white sm:text-6xl md:text-7xl">Built for the<br/><span className="text-indigo-300">backend.</span></h2>
            <p className="max-w-xl text-base leading-7 text-slate-300">Java and Spring form the core. Messaging, caching, data, cloud delivery, and product interfaces complete the system.</p>
          </div>
        </header>

        <div className="mx-auto grid max-w-6xl border-l border-t border-indigo-200/15 md:grid-cols-2">
          {content.skills.categories.map((category, index) => {
            const Icon = icons[index] ?? Boxes;
            return (
              <motion.article
                key={category.name}
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: .2 }}
                transition={{ duration: .5, delay: index * .06 }}
                className="group relative min-h-64 border-b border-r border-indigo-200/15 bg-[#070625]/75 p-7 transition-colors hover:bg-indigo-950/45 sm:p-9"
              >
                <div className="flex items-start justify-between gap-6">
                  <span className="font-mono text-[10px] uppercase tracking-[.24em] text-slate-500">System layer / {String(index + 1).padStart(2, "0")}</span>
                  <Icon className="h-6 w-6 text-indigo-300" aria-hidden="true" />
                </div>
                <h3 className="mt-8 text-2xl font-bold text-white sm:text-3xl">{category.name}</h3>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${category.name} technologies`}>
                  {category.skills.map((skill) => <li key={skill} className="border border-white/10 bg-black/20 px-3 py-2 font-mono text-[10px] uppercase tracking-[.12em] text-slate-300">{skill}</li>)}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
