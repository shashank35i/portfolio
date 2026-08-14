import { Component, type ErrorInfo, type ReactNode, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { motion, useReducedMotion } from "framer-motion";
import { Braces, Boxes, CloudCog, DatabaseZap } from "lucide-react";
import * as THREE from "three";
import { content } from "@/content/content";

const icons = [Braces, DatabaseZap, CloudCog, Boxes];
const orbitSkills = ["Java", "Spring Boot", "Kafka", "Redis", "MySQL", "AWS", "Docker", "React", "Android"];
const orbitColors = ["#67e8f9", "#86efac", "#fbbf24", "#fb7185", "#60a5fa", "#f59e0b", "#38bdf8", "#a78bfa", "#34d399"];

class GlobeBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) console.warn("Skills globe disabled; semantic skill list remains available.", error, info);
  }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

function GlobeFallback() {
  return <div className="flex h-full min-h-[330px] items-center justify-center px-8 text-center"><div><div className="mx-auto mb-5 h-32 w-32 rounded-full border border-indigo-300/30 bg-[radial-gradient(circle_at_35%_30%,rgba(103,232,249,.25),rgba(67,56,202,.12)_45%,transparent_70%)] shadow-[0_0_70px_rgba(99,102,241,.2)]"/><p className="font-mono text-xs uppercase tracking-[.2em] text-slate-300">Technology network</p><p className="mt-2 text-sm text-slate-400">Interactive view unavailable. Every skill is listed alongside.</p></div></div>;
}

function TechnologyGlobe({ reduceMotion }: { reduceMotion: boolean }) {
  const positions = useMemo(() => orbitSkills.map((_, index) => {
    const y = 1 - (index / Math.max(1, orbitSkills.length - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = index * Math.PI * (3 - Math.sqrt(5));
    return new THREE.Vector3(Math.cos(theta) * radius * 2.45, y * 2.45, Math.sin(theta) * radius * 2.45);
  }), []);

  return <>
    <ambientLight intensity={0.7}/><pointLight position={[4, 4, 5]} intensity={25} color="#818cf8"/><pointLight position={[-4, -2, 3]} intensity={16} color="#22d3ee"/>
    <group>
      <mesh><icosahedronGeometry args={[1.75, 2]}/><meshBasicMaterial color="#6366f1" wireframe transparent opacity={0.16}/></mesh>
      <mesh><sphereGeometry args={[1.52, 32, 32]}/><meshStandardMaterial color="#09082d" emissive="#312e81" emissiveIntensity={0.25} roughness={0.55} metalness={0.25} transparent opacity={0.88}/></mesh>
      <mesh rotation={[Math.PI / 2.7, 0, .3]}><torusGeometry args={[2.25, .012, 8, 96]}/><meshBasicMaterial color="#67e8f9" transparent opacity={0.34}/></mesh>
      <mesh rotation={[Math.PI / 1.8, .5, 0]}><torusGeometry args={[2.6, .008, 8, 96]}/><meshBasicMaterial color="#a78bfa" transparent opacity={0.2}/></mesh>
      {positions.map((position, index) => <group key={orbitSkills[index]} position={position}>
        <mesh><sphereGeometry args={[.105, 16, 16]}/><meshStandardMaterial color={orbitColors[index]} emissive={orbitColors[index]} emissiveIntensity={1.6}/></mesh>
        <Html center distanceFactor={8.5} style={{ pointerEvents: "none" }}><span className="whitespace-nowrap border border-white/15 bg-[#08071f]/95 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[.1em] text-white shadow-[0_5px_18px_rgba(0,0,0,.4)]">{orbitSkills[index]}</span></Html>
      </group>)}
    </group>
    <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={.45} maxPolarAngle={Math.PI - .45} autoRotate={!reduceMotion} autoRotateSpeed={.55} rotateSpeed={.65}/>
  </>;
}

function SafeGlobe({ reduceMotion }: { reduceMotion: boolean }) {
  const [webglAvailable] = useState(() => {
    if (typeof document === "undefined") return false;
    try { const canvas = document.createElement("canvas"); return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl")); } catch { return false; }
  });
  if (!webglAvailable) return <GlobeFallback/>;
  return <GlobeBoundary fallback={<GlobeFallback/>}><Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 7.7], fov: 42 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}><TechnologyGlobe reduceMotion={reduceMotion}/></Canvas></GlobeBoundary>;
}

export function Skills() {
  const reduceMotion = Boolean(useReducedMotion());
  return <section id="skills" data-section-theme="slate" className="relative overflow-hidden bg-[#04031f] py-24 md:py-32">
    <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(112,104,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(112,104,255,.12)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]"/>
    <div className="container relative z-10 mx-auto px-4 sm:px-6">
      <header className="mx-auto mb-10 max-w-6xl md:mb-14"><p className="font-mono text-xs uppercase tracking-[.25em] text-indigo-300">02 / Engineering stack</p><div className="mt-4 grid items-end gap-5 md:grid-cols-[1fr_.75fr]"><h2 className="text-4xl font-extrabold leading-none text-white sm:text-6xl md:text-7xl">Built for the<br/><span className="text-indigo-300">backend.</span></h2><p className="max-w-xl text-base leading-7 text-slate-300">Java and Spring form the core. Drag the technology network to explore the systems around them.</p></div></header>
      <div className="mx-auto mb-12 grid max-w-6xl items-center border border-indigo-200/15 bg-[#060521]/75 lg:grid-cols-[1.15fr_.85fr]">
        <div className="relative h-[390px] min-w-0 cursor-grab overflow-hidden active:cursor-grabbing sm:h-[520px]" aria-hidden="true"><div className="pointer-events-none absolute left-5 top-5 z-10 font-mono text-[10px] uppercase tracking-[.18em] text-slate-300">Drag to rotate / technology orbit</div><SafeGlobe reduceMotion={reduceMotion}/></div>
        <div className="border-t border-indigo-200/15 p-7 lg:border-l lg:border-t-0 lg:p-10"><p className="font-mono text-[10px] uppercase tracking-[.2em] text-cyan-300">Core system</p><h3 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Java backend engineering</h3><p className="mt-4 text-sm leading-6 text-slate-300">Secure APIs, event delivery, caching, relational data, testing, and cloud delivery—treated as one connected system.</p><div className="mt-7 grid grid-cols-2 gap-px bg-white/10">{["Java 17", "Spring Boot", "Kafka", "Redis", "MySQL", "AWS"].map(skill => <span key={skill} className="bg-[#08072a] px-3 py-3 font-mono text-[10px] uppercase tracking-[.1em] text-slate-200">{skill}</span>)}</div></div>
      </div>
      <div className="mx-auto grid max-w-6xl border-l border-t border-indigo-200/15 md:grid-cols-2">{content.skills.categories.map((category, index) => { const Icon = icons[index] ?? Boxes; return <motion.article key={category.name} initial={reduceMotion ? false : { opacity: 0, y: 22 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .5, delay: index * .06 }} className="group relative border-b border-r border-indigo-200/15 bg-[#070625]/75 p-6 sm:p-8"><div className="flex items-start justify-between gap-6"><span className="font-mono text-[10px] uppercase tracking-[.2em] text-slate-300">System layer / {String(index + 1).padStart(2, "0")}</span><Icon className="h-5 w-5 text-indigo-300" aria-hidden="true"/></div><h3 className="mt-6 text-2xl font-bold text-white">{category.name}</h3><ul className="mt-5 flex flex-wrap gap-2" aria-label={`${category.name} technologies`}>{category.skills.map(skill => <li key={skill} className="border border-white/10 bg-black/20 px-3 py-2 font-mono text-[10px] uppercase tracking-[.1em] text-slate-200">{skill}</li>)}</ul></motion.article>; })}</div>
    </div>
  </section>;
}
