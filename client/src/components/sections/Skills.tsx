import { Component, type ErrorInfo, type ReactNode, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { motion, useReducedMotion } from "framer-motion";
import { Braces, Boxes, CloudCog, DatabaseZap } from "lucide-react";
import * as THREE from "three";
import { content } from "@/content/content";

const icons = [Braces, DatabaseZap, CloudCog, Boxes];
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

function TechnologyGlobe({ reduceMotion }: { reduceMotion: boolean }) {
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
        <mesh><sphereGeometry args={[.065, 14, 14]}/><meshStandardMaterial color={orbitColors[index]} emissive={orbitColors[index]} emissiveIntensity={2.2}/></mesh>
        <Html center distanceFactor={9.2} occlude="blending" style={{ pointerEvents: "none" }}><span className="whitespace-nowrap rounded-sm border border-white/20 bg-[#050a18]/95 px-2 py-1 font-mono text-[8px] font-bold uppercase tracking-[.09em] text-white shadow-[0_5px_20px_rgba(0,0,0,.55)] sm:text-[9px]">{orbitSkills[index]}</span></Html>
      </group>)}
    </group>
    <OrbitControls enableDamping={!reduceMotion} dampingFactor={.07} enablePan={false} enableZoom={false} minPolarAngle={.45} maxPolarAngle={Math.PI - .45} autoRotate={!reduceMotion} autoRotateSpeed={.42} rotateSpeed={.55}/>
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
      <header className="mx-auto mb-10 max-w-6xl md:mb-14"><p className="font-mono text-xs uppercase tracking-[.25em] text-indigo-300">02 / Engineering stack</p><div className="mt-4 grid items-end gap-5 md:grid-cols-[1fr_.75fr]"><h2 className="text-4xl font-extrabold leading-none text-white sm:text-6xl md:text-7xl">Built for the<br/><span className="text-indigo-300">backend.</span></h2><p className="max-w-xl text-base leading-7 text-slate-300">Java and Spring form the core. Drag the globe to explore the technologies around them.</p></div></header>
      <div className="mx-auto mb-12 grid max-w-6xl items-center border border-indigo-200/15 bg-[#060521]/75 lg:grid-cols-[1.15fr_.85fr]">
        <div className="relative h-[390px] min-w-0 cursor-grab overflow-hidden active:cursor-grabbing sm:h-[520px]" aria-hidden="true"><div className="pointer-events-none absolute left-5 top-5 z-10 font-mono text-[10px] uppercase tracking-[.18em] text-slate-300">Drag to rotate / global stack</div><SafeGlobe reduceMotion={reduceMotion}/></div>
        <div className="border-t border-indigo-200/15 p-7 lg:border-l lg:border-t-0 lg:p-10"><p className="font-mono text-[10px] uppercase tracking-[.2em] text-cyan-300">Core system</p><h3 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Java backend engineering</h3><p className="mt-4 text-sm leading-6 text-slate-300">Secure APIs, event delivery, caching, relational data, testing, and cloud delivery—treated as one connected system.</p><div className="mt-7 grid grid-cols-2 gap-px bg-white/10">{["Java 17", "Spring Boot", "Kafka", "Redis", "MySQL", "AWS"].map(skill => <span key={skill} className="bg-[#08072a] px-3 py-3 font-mono text-[10px] uppercase tracking-[.1em] text-slate-200">{skill}</span>)}</div></div>
      </div>
      <div className="mx-auto grid max-w-6xl border-l border-t border-indigo-200/15 md:grid-cols-2">{content.skills.categories.map((category, index) => { const Icon = icons[index] ?? Boxes; return <motion.article key={category.name} initial={reduceMotion ? false : { opacity: 0, y: 22 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .5, delay: index * .06 }} className="group relative border-b border-r border-indigo-200/15 bg-[#070625]/75 p-6 sm:p-8"><div className="flex items-start justify-between gap-6"><span className="font-mono text-[10px] uppercase tracking-[.2em] text-slate-300">System layer / {String(index + 1).padStart(2, "0")}</span><Icon className="h-5 w-5 text-indigo-300" aria-hidden="true"/></div><h3 className="mt-6 text-2xl font-bold text-white">{category.name}</h3><ul className="mt-5 flex flex-wrap gap-2" aria-label={`${category.name} technologies`}>{category.skills.map(skill => <li key={skill} className="border border-white/10 bg-black/20 px-3 py-2 font-mono text-[10px] uppercase tracking-[.1em] text-slate-200">{skill}</li>)}</ul></motion.article>; })}</div>
    </div>
  </section>;
}
