import { Component, type ErrorInfo, type ReactNode, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion, useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { content } from "@/content/content";

const orbitSkills = ["Java", "Spring Boot", "Kafka", "Redis", "MySQL", "AWS", "Docker", "React", "Android", "Firebase"];
const orbitColors = ["#67e8f9", "#86efac", "#fbbf24", "#fb7185", "#60a5fa", "#f59e0b", "#38bdf8", "#a78bfa", "#34d399", "#fcd34d"];

class GlobeBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) console.warn("Skills globe disabled; semantic skill list remains available.", error, info);
  }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

function GlobeFallback() {
  return <div className="flex h-full min-h-[330px] items-center justify-center px-8 text-center"><div><div className="mx-auto mb-5 h-32 w-32 rounded-full border border-cyan-300/30 bg-[radial-gradient(circle_at_35%_30%,rgba(103,232,249,.32),rgba(8,47,73,.7)_45%,#030712_72%)] shadow-[0_0_70px_rgba(34,211,238,.18)]"/><p className="font-mono text-xs uppercase tracking-[.2em] text-slate-300">Global technology map</p><p className="mt-2 text-sm text-slate-400">Interactive view unavailable. Every skill is listed alongside.</p></div></div>;
}

function TechnologyGlobe({ reduceMotion, activeSkill, onSelect }: { reduceMotion: boolean; activeSkill: number; onSelect: (index: number) => void }) {
  const earthRef = useRef<THREE.Mesh>(null);
  const markerCoords = [[37,-122],[48,9],[52,13],[1,104],[19,73],[47,-122],[35,139],[-23,-46],[17,78],[-6,107]];
  const positions = useMemo(() => markerCoords.map(([lat, lon]) => {
    const phi = (90 - lat) * Math.PI / 180; const theta = (lon + 180) * Math.PI / 180; const r = 1.82;
    return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
  }), []);
  const landGeometry = useMemo(() => {
    const values: number[] = [];
    const inside = (lat:number, lon:number, cy:number, cx:number, ry:number, rx:number, tilt=0) => { const x=(lon-cx)/rx; const y=(lat-cy-tilt*x)/ry; return x*x+y*y<1; };
    for (let lat=-58; lat<=78; lat+=2.25) for (let lon=-180; lon<180; lon+=2.25) {
      const land = inside(lat,lon,48,-105,25,50,-3) || inside(lat,lon,15,-82,19,18,2) || inside(lat,lon,-16,-60,35,19,-6) || inside(lat,lon,51,18,16,24,2) || inside(lat,lon,7,22,34,22,-2) || inside(lat,lon,47,80,29,70,-4) || inside(lat,lon,18,105,20,22,1) || inside(lat,lon,-25,134,14,22,2) || inside(lat,lon,64,-42,10,16);
      if (!land) continue;
      const phi=(90-lat)*Math.PI/180, theta=(lon+180)*Math.PI/180, r=1.705;
      values.push(-r*Math.sin(phi)*Math.cos(theta), r*Math.cos(phi), r*Math.sin(phi)*Math.sin(theta));
    }
    const geometry = new THREE.BufferGeometry(); geometry.setAttribute("position", new THREE.Float32BufferAttribute(values,3)); return geometry;
  }, []);
  const starGeometry = useMemo(() => {
    let seed=1729; const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296}; const values:number[]=[];
    for(let i=0;i<180;i++){const theta=random()*Math.PI*2, z=random()*2-1, r=4.2+random()*2.4, q=Math.sqrt(1-z*z); values.push(r*q*Math.cos(theta),r*z,r*q*Math.sin(theta));}
    const geometry=new THREE.BufferGeometry(); geometry.setAttribute("position",new THREE.Float32BufferAttribute(values,3)); return geometry;
  }, []);

  return <>
    <ambientLight intensity={0.16}/><directionalLight position={[4, 3, 5]} intensity={2.8} color="#b9e6ff"/><pointLight position={[-4, -2, 2]} intensity={11} color="#3730a3"/>
    <points geometry={starGeometry}><pointsMaterial color="#b8c6ff" size={.022} transparent opacity={.42} depthWrite={false}/></points>
    <group>
      <mesh ref={earthRef} rotation={[0,-.38,0]}><sphereGeometry args={[1.68,64,64]}/><meshStandardMaterial color="#061733" emissive="#07184d" emissiveIntensity={.38} roughness={.72} metalness={.15}/></mesh>
      <mesh><sphereGeometry args={[1.692,24,18]}/><meshBasicMaterial color="#60a5fa" wireframe transparent opacity={.075} depthWrite={false}/></mesh>
      <points geometry={landGeometry} rotation={[0,-.38,0]}><pointsMaterial color="#70e1c1" size={.034} transparent opacity={.86} sizeAttenuation depthWrite={false}/></points>
      <mesh><sphereGeometry args={[1.75,48,48]}/><meshBasicMaterial color="#22d3ee" transparent opacity={.055} side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false}/></mesh>
      <mesh><sphereGeometry args={[1.82,48,48]}/><meshBasicMaterial color="#818cf8" transparent opacity={.025} side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false}/></mesh>
      {positions.map((position, index) => <group key={orbitSkills[index]} position={position}>
        {activeSkill === index && <mesh><sphereGeometry args={[.12, 18, 18]}/><meshBasicMaterial color={orbitColors[index]} transparent opacity={.24} blending={THREE.AdditiveBlending} depthWrite={false}/></mesh>}
        <mesh scale={activeSkill === index ? 1.28 : 1} onPointerOver={(event) => { event.stopPropagation(); onSelect(index); }} onClick={(event) => { event.stopPropagation(); onSelect(index); }}><sphereGeometry args={[.07, 14, 14]}/><meshStandardMaterial color={orbitColors[index]} emissive={orbitColors[index]} emissiveIntensity={activeSkill === index ? 3.2 : 2.2}/></mesh>
      </group>)}
    </group>
    <OrbitControls enableDamping={!reduceMotion} dampingFactor={.07} enablePan={false} enableZoom={false} minPolarAngle={.45} maxPolarAngle={Math.PI - .45} autoRotate={!reduceMotion} autoRotateSpeed={.42} rotateSpeed={.55}/>
  </>;
}

function SafeGlobe({ reduceMotion, activeSkill, onSelect }: { reduceMotion: boolean; activeSkill: number; onSelect: (index: number) => void }) {
  const [webglAvailable] = useState(() => {
    if (typeof document === "undefined") return false;
    try { const canvas = document.createElement("canvas"); return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl")); } catch { return false; }
  });
  if (!webglAvailable) return <GlobeFallback/>;
  return <GlobeBoundary fallback={<GlobeFallback/>}><Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 7.7], fov: 42 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}><TechnologyGlobe reduceMotion={reduceMotion} activeSkill={activeSkill} onSelect={onSelect}/></Canvas></GlobeBoundary>;
}

export function Skills() {
  const reduceMotion = Boolean(useReducedMotion());
  const [activeSkill, setActiveSkill] = useState(0);
  return <section id="skills" data-section-theme="slate" className="relative overflow-hidden bg-[#04031f] py-24 text-white md:py-32">
    <div className="pointer-events-none absolute -right-36 top-20 h-[34rem] w-[34rem] rounded-full bg-cyan-300/[0.035] blur-[100px]"/>
    <div className="container relative z-10 mx-auto px-5 sm:px-8 lg:px-12">
      <header className="mx-auto mb-10 max-w-6xl pb-8 md:mb-14 md:pb-10"><p className="font-mono text-[10px] uppercase tracking-[.27em] text-cyan-200">02 / Engineering stack</p><div className="mt-5 grid items-end gap-6 border-b border-indigo-100/20 pb-8 md:grid-cols-[1fr_.7fr]"><h2 className="text-[clamp(3.2rem,7vw,6.6rem)] font-semibold leading-[.86] tracking-[-.075em]">Systems,<br/><span className="font-serif font-medium italic text-cyan-200">connected.</span></h2><p className="max-w-xl text-[14px] leading-7 text-slate-300">Java and Spring form the core. Drag the globe to explore the technologies around them.</p></div></header>
      <div className="mx-auto mb-12 grid max-w-6xl items-center border-y border-indigo-200/20 bg-[#060521]/75 lg:grid-cols-[1.15fr_.85fr]">
        <div className="relative h-[390px] min-w-0 cursor-grab overflow-hidden active:cursor-grabbing sm:h-[520px]" aria-hidden="true">
          <div className="pointer-events-none absolute left-4 top-4 z-10 font-mono text-[9px] uppercase tracking-[.16em] text-slate-300 sm:left-5 sm:top-5 sm:text-[10px]">Drag to rotate · Select a marker</div>
          <div className="pointer-events-none absolute inset-x-4 bottom-4 z-10 flex justify-center sm:inset-x-auto sm:bottom-auto sm:right-5 sm:top-5"><div className="flex max-w-full items-center gap-2 border border-white/20 bg-[#050a18]/95 px-3 py-2 shadow-[0_8px_30px_rgba(0,0,0,.5)]"><span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: orbitColors[activeSkill], boxShadow: `0 0 14px ${orbitColors[activeSkill]}` }}/><span className="truncate font-mono text-[10px] font-bold uppercase tracking-[.12em] text-white">{orbitSkills[activeSkill]}</span></div></div>
          <SafeGlobe reduceMotion={reduceMotion} activeSkill={activeSkill} onSelect={setActiveSkill}/>
        </div>
        <div className="border-t border-indigo-200/15 p-7 lg:border-l lg:border-t-0 lg:p-10"><p className="font-mono text-[10px] uppercase tracking-[.2em] text-cyan-300">Interactive technology map</p><h3 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Java backend engineering</h3><p className="mt-4 text-sm leading-6 text-slate-300">Select a technology to focus its marker. Secure APIs, event delivery, caching, relational data, testing, and cloud delivery work as one connected system.</p><div className="mt-7 grid grid-cols-2 gap-x-5 border-y border-white/15" aria-label="Globe technologies">{orbitSkills.map((skill, index) => <button key={skill} type="button" aria-label={`Select ${skill} marker`} aria-pressed={activeSkill === index} onClick={() => setActiveSkill(index)} className={`flex min-h-11 items-center gap-2 border-b border-white/[.08] px-1 py-3 text-left text-[12px] text-slate-200 transition hover:text-cyan-200 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-cyan-300 ${activeSkill === index ? "text-cyan-100" : ""}`}><span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: orbitColors[index] }}/><span>{skill}</span></button>)}</div></div>
      </div>
      <div className="mx-auto max-w-6xl border-t border-indigo-100/20">{content.skills.categories.map((category, index) => <motion.article key={category.name} initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .5, delay: index * .06 }} className="grid gap-4 border-b border-indigo-100/15 py-6 sm:grid-cols-[210px_1fr] sm:gap-8 sm:py-7"><div className="flex items-baseline gap-3"><span className="font-serif text-xl italic text-cyan-300/75">0{index + 1}</span><h3 className="text-[17px] font-semibold tracking-tight text-white">{category.name}</h3></div><ul className="flex flex-wrap gap-x-5 gap-y-2" aria-label={`${category.name} technologies`}>{category.skills.map(skill => <li key={skill} className="text-[12px] text-slate-300 after:ml-5 after:text-cyan-300/50 after:content-['/'] last:after:content-none">{skill}</li>)}</ul></motion.article>)}</div>
    </div>
  </section>;
}
