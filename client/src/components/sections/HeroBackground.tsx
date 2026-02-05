import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

function GeometricShape({ position, rotation, scale, color }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.8}
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    </Float>
  );
}

export function HeroBackground() {
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    return (
      <div className="absolute inset-0 -z-10 bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)] opacity-10 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 -z-10 bg-background">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <GeometricShape position={[-4, 2, -5]} rotation={[0, 0, 0]} scale={2} color="#52525b" />
        <GeometricShape position={[4, -2, -2]} rotation={[0.5, 0.5, 0]} scale={1.5} color="#71717a" />
        <GeometricShape position={[0, 3, -8]} rotation={[0.2, 0, 0]} scale={3} color="#3f3f46" />
        <GeometricShape position={[-5, -3, -4]} rotation={[0, 0.2, 0.4]} scale={1} color="#a1a1aa" />
        
        <Environment preset="city" />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_100%)]" />
    </div>
  );
}
