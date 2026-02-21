import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { motion, useScroll, type MotionValue } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import type { Group, Sprite, Texture } from "three";
import { TextureLoader, Vector3 } from "three";
import * as THREE from "three";

type TechNode = {
  label: string;
  hoverLabel: string;
  logo: string;
  lat: number;
  lon: number;
  size: number;
  opacity?: number;
  glow?: string;
};

type DragState = {
  isDragging: boolean;
  lastX: number;
  lastY: number;
  rotX: number;
  rotY: number;
  velocityX: number;
  velocityY: number;
};

const techNodes: TechNode[] = [
  { label: "Spring Boot", hoverLabel: "SPRING BOOT", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg", lat: 57, lon: -20, size: 0.3, opacity: 1, glow: "#7cd74a" },
  { label: "TypeScript", hoverLabel: "TS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", lat: 70, lon: 30, size: 0.27, opacity: 0.95, glow: "#4d94ff" },
  { label: "JavaScript", hoverLabel: "JS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", lat: 22, lon: 74, size: 0.35, opacity: 1, glow: "#ffe864" },
  { label: "Node.js", hoverLabel: "NODE.JS", logo: "https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg", lat: -2, lon: 8, size: 0.35, opacity: 1, glow: "#59cf67" },
  { label: "PostgreSQL", hoverLabel: "POSTGRESQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", lat: 8, lon: -70, size: 0.29, opacity: 0.92, glow: "#4c88ff" },
  { label: "Docker", hoverLabel: "DOCKER", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", lat: -34, lon: 40, size: 0.32, opacity: 1, glow: "#4ab6ff" },
  { label: "Figma", hoverLabel: "FIGMA", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", lat: -57, lon: -48, size: 0.29, opacity: 0.95, glow: "#f57954" },
  { label: "Tailwind", hoverLabel: "TAILWIND", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", lat: -30, lon: 76, size: 0.27, opacity: 0.9, glow: "#50d8ff" },
  { label: "React", hoverLabel: "REACT", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", lat: 44, lon: -84, size: 0.25, opacity: 0.45, glow: "#58dbff" },
  { label: "Java", hoverLabel: "JAVA", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", lat: 2, lon: 56, size: 0.24, opacity: 0.72 },
  { label: "PHP", hoverLabel: "PHP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", lat: 24, lon: 30, size: 0.24, opacity: 0.7 },
  { label: "HTML", hoverLabel: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", lat: 38, lon: -18, size: 0.24, opacity: 0.7 },
  { label: "CSS", hoverLabel: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", lat: -28, lon: 12, size: 0.24, opacity: 0.7 },
  { label: "GitHub", hoverLabel: "GITHUB", logo: "https://cdn.simpleicons.org/github/FFFFFF", lat: -64, lon: 14, size: 0.28, opacity: 0.95 },
  { label: "Kubernetes", hoverLabel: "K8S", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg", lat: -14, lon: -16, size: 0.25, opacity: 0.62 },
  { label: "Firebase", hoverLabel: "FIREBASE", logo: "https://cdn.simpleicons.org/firebase/FFCA28", lat: -44, lon: -10, size: 0.26, opacity: 0.95 },
  { label: "MongoDB", hoverLabel: "MONGO", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", lat: 14, lon: 88, size: 0.24, opacity: 0.62 },
  { label: "MySQL", hoverLabel: "MYSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", lat: -8, lon: -6, size: 0.24, opacity: 0.58 },
  { label: "Python", hoverLabel: "PYTHON", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", lat: -2, lon: -96, size: 0.24, opacity: 0.72, glow: "#4aa8ff" },
  { label: "Git", hoverLabel: "GIT", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", lat: -50, lon: -86, size: 0.24, opacity: 0.72, glow: "#ff6a4a" },
];

const GLOBE_RADIUS = 2.18;
const LOGO_RADIUS = 2.32;
const LOGO_SCALE = 1.15;

function latLonToVector(lat: number, lon: number, radius: number) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function buildRandomSpherePositions(count: number, radius: number) {
  const points: Vector3[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i += 1) {
    const y = 1 - (2 * i) / Math.max(1, count - 1);
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = i * goldenAngle;
    points.push(new Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius));
  }

  // Deterministic shuffle so layout stays stable across renders/reloads.
  let seed = 20260214;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  for (let i = points.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [points[i], points[j]] = [points[j], points[i]];
  }

  // Rotate entire distribution so it doesn't align to a vertical column.
  const axis = new Vector3(0.47, 0.78, 0.41).normalize();
  const quat = new THREE.Quaternion().setFromAxisAngle(axis, 1.18);
  return points.map((p) => p.clone().applyQuaternion(quat));
}

function GlobeLogos({
  radius,
  labelPortal,
}: {
  radius: number;
  labelPortal?: React.RefObject<HTMLElement | null>;
}) {
  const textures = useLoader(TextureLoader, techNodes.map((node) => node.logo)) as Texture[];
  const positions = useMemo(
    () => buildRandomSpherePositions(techNodes.length, radius),
    [radius],
  );
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const spriteRefs = useRef<Array<Sprite | null>>([]);
  const logoGroupRefs = useRef<Array<THREE.Group | null>>([]);
  const glowTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const g = ctx.createRadialGradient(128, 128, 6, 128, 128, 120);
      g.addColorStop(0, "rgba(255,255,255,0.92)");
      g.addColorStop(0.42, "rgba(255,255,255,0.36)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 256, 256);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame(() => {
    const worldPos = new THREE.Vector3();
    for (let i = 0; i < techNodes.length; i += 1) {
      const sprite = spriteRefs.current[i];
      if (!sprite) continue;
      const base = techNodes[i].opacity ?? 1;
      sprite.getWorldPosition(worldPos);

      // Front hemisphere (z > 0) stays strong; backside fades aggressively.
      const hemisphere = THREE.MathUtils.clamp((worldPos.z / radius + 1) * 0.5, 0, 1);
      const fade = THREE.MathUtils.lerp(0.03, 1, hemisphere * hemisphere * hemisphere);
      const material = sprite.material as THREE.SpriteMaterial;
      material.opacity = hoveredIdx === i ? 1 : THREE.MathUtils.clamp(base * fade, 0, 1);
    }

    if (hoveredIdx !== null) {
      const group = logoGroupRefs.current[hoveredIdx];
      if (group) {
        group.getWorldPosition(worldPos);
        if (worldPos.z <= 0) {
          setHoveredIdx(null);
          document.body.style.cursor = "default";
        }
      }
    }
  });

  return (
    <group renderOrder={20}>
      {techNodes.map((node, idx) => (
        <group
          key={node.label}
          position={positions[idx]}
          renderOrder={21}
          ref={(el) => {
            logoGroupRefs.current[idx] = el;
          }}
        >
          {/** Keep front-side logos visually strong; backside is handled by depth occlusion sphere. */}
          {(() => {
            const visibleOpacity = node.opacity ?? 1;
            return (
              <>
          <sprite
            scale={[node.size * 1.95 * LOGO_SCALE, node.size * 1.95 * LOGO_SCALE, 1]}
            renderOrder={21}
            onPointerOver={(event) => {
              event.stopPropagation();
              const group = logoGroupRefs.current[idx];
              if (group) {
                const worldPos = new THREE.Vector3();
                group.getWorldPosition(worldPos);
                if (worldPos.z <= 0) {
                  setHoveredIdx(null);
                  document.body.style.cursor = "default";
                  return;
                }
              }
              setHoveredIdx(idx);
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              setHoveredIdx(null);
              document.body.style.cursor = "default";
            }}
          >
            <spriteMaterial transparent opacity={0} depthWrite={false} depthTest />
          </sprite>
          {hoveredIdx === idx ? (
            <sprite scale={[node.size * 1.55 * LOGO_SCALE, node.size * 1.55 * LOGO_SCALE, 1]} renderOrder={22}>
              <spriteMaterial
                map={glowTexture}
                color={node.glow ?? "#cfe3ff"}
                blending={THREE.AdditiveBlending}
                transparent
                opacity={0.46}
                depthWrite={false}
                depthTest
                toneMapped={false}
              />
            </sprite>
          ) : null}
          {hoveredIdx === idx ? (
            <sprite scale={[node.size * 2.05 * LOGO_SCALE, node.size * 2.05 * LOGO_SCALE, 1]} renderOrder={22}>
              <spriteMaterial
                map={glowTexture}
                color={node.glow ?? "#dce7ff"}
                blending={THREE.AdditiveBlending}
                transparent
                opacity={0.2}
                depthWrite={false}
                depthTest
                toneMapped={false}
              />
            </sprite>
          ) : null}
          <sprite
            ref={(el) => {
              spriteRefs.current[idx] = el;
            }}
            scale={
              hoveredIdx === idx
                ? [node.size * 1.24 * LOGO_SCALE, node.size * 1.24 * LOGO_SCALE, 1]
                : [node.size * LOGO_SCALE, node.size * LOGO_SCALE, 1]
            }
            renderOrder={23}
          >
            <spriteMaterial
              map={textures[idx]}
              transparent
              depthWrite={false}
              depthTest
              alphaTest={0.01}
              opacity={visibleOpacity}
              toneMapped={false}
            />
          </sprite>
          {hoveredIdx === idx ? (
            <Html
              position={[0, 0, 0]}
              distanceFactor={10}
              occlude={false}
              portal={labelPortal as React.RefObject<HTMLElement> | undefined}
              style={{
                pointerEvents: "none",
                transform: "translate(-50%, 20px)",
              }}
            >
              <div
                className="whitespace-nowrap rounded-full bg-[#25579a] px-2.5 py-[2px] font-extrabold tracking-[0.08em] text-[#edf3ff] shadow-[0_0_10px_rgba(58,102,188,0.4)]"
                style={{ fontSize: "clamp(8px, 2vw, 10px)", lineHeight: 1.1 }}
              >
                {node.hoverLabel}
              </div>
            </Html>
          ) : null}
              </>
            );
          })()}
        </group>
      ))}
    </group>
  );
}

function GlobeMesh({
  scrollYProgress,
  dragRef,
  labelPortal,
}: {
  scrollYProgress: MotionValue<number>;
  dragRef: React.MutableRefObject<DragState>;
  labelPortal?: React.RefObject<HTMLElement | null>;
}) {
  const groupRef = useRef<Group>(null);

  const pointsGeometry = useMemo(() => {
    const positions: number[] = [];
    const radius = GLOBE_RADIUS;

    for (let i = 0; i < 760; i += 1) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      positions.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta),
      );
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    if (!dragRef.current.isDragging) {
      const decay = Math.exp(-8 * delta);
      dragRef.current.rotY += dragRef.current.velocityY;
      dragRef.current.rotX = THREE.MathUtils.clamp(dragRef.current.rotX + dragRef.current.velocityX, -1.1, 1.1);
      dragRef.current.velocityX *= decay;
      dragRef.current.velocityY *= decay;
      dragRef.current.rotY += delta * 0.16;
    }

    const targetY = dragRef.current.rotY + scrollYProgress.get() * Math.PI * 0.72;
    const targetX = dragRef.current.rotX;
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetY, 7, delta);
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetX, 7, delta);
    groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, 0, 7, delta);
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 44, 44]} />
        <meshBasicMaterial color="#3a34a0" wireframe transparent opacity={0.09} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS - 0.11, 26, 26]} />
        <meshBasicMaterial color="#4b43b6" wireframe transparent opacity={0.035} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS + 0.13, 30, 30]} />
        <meshBasicMaterial color="#4a44ae" transparent opacity={0.02} side={THREE.BackSide} depthWrite={false} />
      </mesh>
      <points geometry={pointsGeometry}>
        <pointsMaterial color="#9d99f6" size={0.0085} transparent opacity={0.09} sizeAttenuation depthWrite={false} />
      </points>
      <GlobeLogos radius={LOGO_RADIUS} labelPortal={labelPortal} />
    </group>
  );
}

function GlobeCanvas({
  scrollYProgress,
  dragRef,
  labelPortal,
}: {
  scrollYProgress: MotionValue<number>;
  dragRef: React.MutableRefObject<DragState>;
  labelPortal?: React.RefObject<HTMLElement | null>;
}) {
  return (
    <Canvas camera={{ position: [0, 0, 8.1], fov: 37 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.62} />
      <pointLight position={[3.2, 2.7, 4]} intensity={0.9} color="#8d84ff" />
      <pointLight position={[-3.7, -2.4, -2.4]} intensity={0.24} color="#4d72ff" />
      <GlobeMesh scrollYProgress={scrollYProgress} dragRef={dragRef} labelPortal={labelPortal} />
    </Canvas>
  );
}

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelPortalRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState>({
    isDragging: false,
    lastX: 0,
    lastY: 0,
    rotX: 0,
    rotY: 0,
    velocityX: 0,
    velocityY: 0,
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      id="skills"
      data-section-theme="slate"
      className="relative overflow-hidden pb-24 pt-28 md:pb-24 md:pt-36"
      style={{
        backgroundColor: "#04031f",
        backgroundImage:
          "linear-gradient(to bottom, #070529 0%, #060426 26%, #050322 52%, #04031f 78%, #04031f 100%), radial-gradient(circle at 50% 22%, rgba(92,78,228,0.1), rgba(4,3,31,0) 60%), radial-gradient(circle at 50% 68%, rgba(30,22,102,0.12), rgba(4,3,31,0) 64%)",
        backgroundSize: "100% 100%, 100% 100%, 100% 100%",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(55,48,166,0.04),transparent_62%)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-transparent via-[#08122f]/70 to-[hsl(var(--background))]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mb-8 text-center md:mb-10">
          <p className="text-[clamp(11px,2.2vw,22px)] font-extrabold uppercase tracking-[0.18em] text-[#d8dce8]">
            TECH STACK
          </p>
          <h2 className="mt-2 text-[clamp(34px,9vw,82px)] font-extrabold leading-[0.92]">
            <span className="text-[#f2f3f7]">My </span>
            <span className="inline-block bg-gradient-to-r from-[#b06af5] via-[#d663d8] to-[#e64ea9] bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="mx-auto w-full max-w-5xl"
        >
          <div
            className="relative mx-auto aspect-square w-[86vw] max-w-[360px] rounded-full sm:w-[76vw] sm:max-w-[460px] md:w-[80vw] md:max-w-[560px]"
            style={{ touchAction: "none", WebkitTapHighlightColor: "transparent" }}
            onPointerDown={(event) => {
              event.preventDefault();
              dragRef.current.isDragging = true;
              dragRef.current.lastX = event.clientX;
              dragRef.current.lastY = event.clientY;
              dragRef.current.velocityX = 0;
              dragRef.current.velocityY = 0;
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerMove={(event) => {
              if (!dragRef.current.isDragging) return;
              event.preventDefault();
              const dx = event.clientX - dragRef.current.lastX;
              const dy = event.clientY - dragRef.current.lastY;
              const speedY = dx * 0.0048;
              const speedX = dy * 0.0042;
              dragRef.current.rotY += speedY;
              dragRef.current.rotX = THREE.MathUtils.clamp(dragRef.current.rotX + speedX, -1.1, 1.1);
              dragRef.current.velocityY = THREE.MathUtils.clamp(speedY * 0.28, -0.12, 0.12);
              dragRef.current.velocityX = THREE.MathUtils.clamp(speedX * 0.2, -0.08, 0.08);
              dragRef.current.lastX = event.clientX;
              dragRef.current.lastY = event.clientY;
            }}
            onPointerUp={(event) => {
              dragRef.current.isDragging = false;
              event.currentTarget.releasePointerCapture(event.pointerId);
            }}
            onPointerCancel={() => {
              dragRef.current.isDragging = false;
            }}
            onPointerLeave={() => {
              dragRef.current.isDragging = false;
            }}
          >
            <div className="absolute inset-0 overflow-hidden rounded-full bg-[#04031f] [clip-path:circle(50%_at_50%_50%)]">
              <GlobeCanvas
                scrollYProgress={scrollYProgress}
                dragRef={dragRef}
                labelPortal={labelPortalRef}
              />
            </div>
            <div ref={labelPortalRef} className="pointer-events-none absolute inset-0 z-20" />
            <div className="pointer-events-none absolute inset-[2.5%] rounded-full border border-violet-300/5" />
            <div
              className="pointer-events-none absolute inset-[10%] rounded-full"
              style={{
                background: "radial-gradient(circle at 50% 18%, rgba(255,255,255,0.04), rgba(255,255,255,0.007) 28%, transparent 55%)",
                mixBlendMode: "screen",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
