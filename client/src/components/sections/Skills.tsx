import { Component, type ErrorInfo, type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { motion, useReducedMotion } from "framer-motion";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { content } from "@/content/content";

const orbitSkills = ["Java", "Spring Boot", "Kafka", "Redis", "MySQL", "AWS", "Docker", "React", "Android", "Firebase"];
const orbitColors = ["#67e8f9", "#86efac", "#fbbf24", "#fb7185", "#60a5fa", "#f59e0b", "#38bdf8", "#a78bfa", "#34d399", "#fcd34d"];
const skillDetails = [
  "Java is the foundation for Shashank’s backend work, including the service and API features developed during his 9X IT Solutions internship.",
  "Spring Boot powers the REST APIs and backend services in OpsPilot-AI and his internship experience.",
  "Kafka supports asynchronous event delivery in OpsPilot-AI, including its at-least-once processing pipeline.",
  "Redis is used for cache-aside reads in OpsPilot-AI to reduce repeated database work.",
  "MySQL stores transactional application data for OpsPilot-AI, including the transactional outbox workflow.",
  "AWS is part of the deployment stack used to run and deliver OpsPilot-AI.",
  "Docker packages the backend application for consistent deployment and CI workflows.",
  "React is used to build this portfolio and its interactive web experiences.",
  "Android and Java are used for BookMyTicket, a multi-role ticketing and parking application.",
  "Firebase Realtime Database supports live application data in BookMyTicket.",
];

class GlobeBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) console.warn("Skills globe disabled; semantic skill list remains available.", error, info);
  }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

function GlobeFallback() {
  return <div className="flex h-full min-h-[330px] items-center justify-center px-8 text-center"><div><div className="mx-auto mb-5 h-32 w-32 rounded-full border border-cyan-300/30 bg-[radial-gradient(circle_at_35%_30%,rgba(103,232,249,.32),rgba(8,47,73,.7)_45%,#030712_72%)] shadow-[0_0_70px_rgba(34,211,238,.18)]"/><p className="font-mono text-xs uppercase tracking-[.2em] text-slate-300">Technology map</p><p className="mt-2 text-sm text-slate-400">Interactive view unavailable. Every skill is listed alongside.</p></div></div>;
}

function TechnologyGlobe({ reduceMotion, activeSkill, onSelect, onResetReady }: { reduceMotion: boolean; activeSkill: number; onSelect: (index: number) => void; onResetReady: (reset: (() => void) | null) => void }) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const markerCoords = [[37,-122],[48,9],[52,13],[1,104],[19,73],[47,-122],[35,139],[-23,-46],[17,78],[-6,107]];
  const positions = useMemo(() => markerCoords.map(([lat, lon]) => {
    const phi = (90 - lat) * Math.PI / 180;
    const theta = (lon + 180) * Math.PI / 180;
    const radius = 1.705;
    return new THREE.Vector3(-radius * Math.sin(phi) * Math.cos(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta));
  }), []);

  return <>
    <ambientLight intensity={0.22}/><directionalLight position={[4, 3, 5]} intensity={2.4} color="#b9e6ff"/><pointLight position={[-4, -2, 2]} intensity={5} color="#3730a3"/>
    <group rotation={[0, -0.38, 0]}>
      <mesh><sphereGeometry args={[1.68, 96, 64]}/><meshStandardMaterial color="#071a38" emissive="#07184d" emissiveIntensity={0.34} roughness={0.66} metalness={0.2}/></mesh>
      <mesh><sphereGeometry args={[1.692, 48, 32]}/><meshBasicMaterial color="#75c8e8" wireframe transparent opacity={0.11} depthWrite={false}/></mesh>
      <mesh><sphereGeometry args={[1.75, 64, 48]}/><meshBasicMaterial color="#22d3ee" transparent opacity={0.045} side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false}/></mesh>
      {positions.map((position, index) => {
        const labelPosition = position.clone().normalize().multiplyScalar(1.98 - 1.705);
        return <group key={orbitSkills[index]} position={position}>
          {activeSkill === index && <>
            <mesh><sphereGeometry args={[0.14, 20, 20]}/><meshBasicMaterial color={orbitColors[index]} transparent opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false}/></mesh>
            <Html position={labelPosition} center distanceFactor={8} occlude zIndexRange={[30, 0]}>
              <span className="pointer-events-none whitespace-nowrap border border-white/25 bg-[#07111f]/95 px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[.12em] text-white shadow-lg" style={{ boxShadow: `0 0 22px ${orbitColors[index]}55` }}>{orbitSkills[index]}</span>
            </Html>
          </>}
          <mesh scale={activeSkill === index ? 1.3 : 1} onPointerOver={(event) => { event.stopPropagation(); onSelect(index); }} onClick={(event) => { event.stopPropagation(); onSelect(index); }}>
            <sphereGeometry args={[0.065, 16, 16]}/><meshStandardMaterial color={orbitColors[index]} emissive={orbitColors[index]} emissiveIntensity={activeSkill === index ? 3.1 : 2.1}/>
          </mesh>
        </group>;
      })}
    </group>
    <OrbitControls ref={controlsRef} enableDamping={!reduceMotion} dampingFactor={0.08} enablePan={false} enableZoom={false} enableRotate minPolarAngle={0.45} maxPolarAngle={Math.PI - 0.45} autoRotate={false} rotateSpeed={0.55} />
    <ResetRegistration controlsRef={controlsRef} onResetReady={onResetReady}/>
  </>;
}

function ResetRegistration({ controlsRef, onResetReady }: { controlsRef: React.RefObject<OrbitControlsImpl | null>; onResetReady: (reset: (() => void) | null) => void }) {
  useEffect(() => {
    onResetReady(() => {
      controlsRef.current?.reset();
    });
    return () => onResetReady(null);
  }, [controlsRef, onResetReady]);
  return null;
}

function SafeGlobe({ reduceMotion, activeSkill, onSelect, onResetReady }: { reduceMotion: boolean; activeSkill: number; onSelect: (index: number) => void; onResetReady: (reset: (() => void) | null) => void }) {
  const [webglAvailable] = useState(() => {
    if (typeof document === "undefined") return false;
    try { const canvas = document.createElement("canvas"); return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl")); } catch { return false; }
  });
  if (!webglAvailable) return <GlobeFallback/>;
  return <GlobeBoundary fallback={<GlobeFallback/>}><Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 7.7], fov: 42 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }} style={{ touchAction: "pan-y" }}><TechnologyGlobe reduceMotion={reduceMotion} activeSkill={activeSkill} onSelect={onSelect} onResetReady={onResetReady}/></Canvas></GlobeBoundary>;
}

export function Skills() {
  const reduceMotion = Boolean(useReducedMotion());
  const [activeSkill, setActiveSkill] = useState(0);
  const resetGlobeRef = useRef<(() => void) | null>(null);
  const registerReset = (reset: (() => void) | null) => { resetGlobeRef.current = reset; };
  return <section id="skills" data-section-theme="slate" className="relative overflow-hidden bg-[#04031f] py-24 text-white md:py-32">
    <div className="pointer-events-none absolute -right-36 top-20 h-[34rem] w-[34rem] rounded-full bg-cyan-300/[0.035] blur-[100px]"/>
    <div className="container relative z-10 mx-auto px-5 sm:px-8 lg:px-12">
      <header className="mx-auto mb-10 max-w-6xl pb-8 md:mb-14 md:pb-10"><p className="font-mono text-[10px] uppercase tracking-[.27em] text-cyan-200">Technical skills</p><div className="mt-5 grid items-end gap-6 border-b border-indigo-100/20 pb-8 md:grid-cols-[1fr_.7fr]"><h2 className="text-[clamp(3.2rem,7vw,6.6rem)] font-semibold leading-[.86] tracking-[-.075em]">Backend, data<br/><span className="font-serif font-medium italic text-cyan-200">&amp; delivery stack.</span></h2><p className="max-w-xl text-[14px] leading-7 text-slate-300">Select a technology to see where it appears in Shashank’s internship or project work.</p></div></header>
      <div className="mx-auto mb-12 grid max-w-6xl items-center border-y border-indigo-200/20 bg-[#060521]/75 lg:grid-cols-[1.15fr_.85fr]">
        <div className="relative h-[390px] min-w-0 overflow-hidden sm:h-[520px]" aria-label="Interactive technology globe">
          <div className="pointer-events-none absolute left-4 top-4 z-10 font-mono text-[9px] uppercase tracking-[.16em] text-slate-300 sm:left-5 sm:top-5 sm:text-[10px]">Drag to rotate · Select a marker</div>
          <button type="button" onClick={() => resetGlobeRef.current?.()} className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 border border-white/20 bg-[#050a18]/95 px-3 py-2 font-mono text-[10px] uppercase tracking-[.12em] text-slate-200 transition hover:border-cyan-200 hover:text-white focus-visible:outline-2 focus-visible:outline-cyan-300 sm:bottom-auto sm:left-auto sm:right-5 sm:top-5 sm:translate-x-0" aria-label="Reset globe rotation">Reset view</button>
          <SafeGlobe reduceMotion={reduceMotion} activeSkill={activeSkill} onSelect={setActiveSkill} onResetReady={registerReset}/>
        </div>
        <div className="border-t border-indigo-200/15 p-7 lg:border-l lg:border-t-0 lg:p-10"><p className="font-mono text-[10px] uppercase tracking-[.2em] text-cyan-300">Selected technology</p><h3 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl" aria-live="polite">{orbitSkills[activeSkill]}</h3><p className="mt-4 min-h-[6rem] text-sm leading-6 text-slate-300" aria-live="polite">{skillDetails[activeSkill]}</p><p className="mt-4 border-l border-cyan-300/40 pl-3 font-mono text-[9px] uppercase leading-5 tracking-[.12em] text-slate-400">Marker positions are illustrative; select a skill to view its project context</p><div className="mt-6 grid grid-cols-2 gap-x-5 border-y border-white/15" aria-label="Globe technologies">{orbitSkills.map((skill, index) => <button key={skill} type="button" aria-label={`Select ${skill} marker`} aria-pressed={activeSkill === index} onClick={() => setActiveSkill(index)} className={`flex min-h-11 items-center gap-2 border-b border-white/[.08] px-1 py-3 text-left text-[12px] transition hover:text-cyan-200 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-cyan-300 ${activeSkill === index ? "font-semibold text-cyan-100" : "text-slate-200"}`}><span className="h-2 w-2 shrink-0 rounded-full" style={{ background: orbitColors[index] }}/><span>{skill}</span></button>)}</div></div>
      </div>
      <div className="mx-auto max-w-6xl border-t border-indigo-100/20">{content.skills.categories.map((category, index) => <motion.article key={category.name} initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .5, delay: index * .06 }} className="grid gap-4 border-b border-indigo-100/15 py-6 sm:grid-cols-[210px_1fr] sm:gap-8 sm:py-7"><div className="flex items-baseline"><h3 className="text-[17px] font-semibold tracking-tight text-white">{category.name}</h3></div><ul className="flex flex-wrap gap-x-5 gap-y-2" aria-label={`${category.name} technologies`}>{category.skills.map(skill => <li key={skill} className="text-[12px] text-slate-300 after:ml-5 after:text-cyan-300/50 after:content-['/'] last:after:content-none">{skill}</li>)}</ul></motion.article>)}</div>
    </div>
  </section>;
}
