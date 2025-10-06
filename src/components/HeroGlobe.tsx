import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useLowDataMode } from '@/context/LowDataModeContext';

function AnimatedGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Create particle network
  const particles = useMemo(() => {
    const count = 400;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 2.5 + Math.random() * 0.5;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.04;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.025;
    }
  });

  return (
    <group>
      {/* Main Globe */}
      <Float speed={0.6} rotationIntensity={0.2} floatIntensity={0.2}>
        <Sphere ref={meshRef} args={[2, 64, 64]}>
          <MeshDistortMaterial
            color="#0ea5e9"
            attach="material"
            distort={0.15}
            speed={0.8}
            roughness={0.4}
            metalness={0.8}
            transparent
            opacity={0.6}
          />
        </Sphere>
      </Float>

      {/* Particle Network */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#00d4ff"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>

      {/* Wireframe overlay */}
      <Sphere args={[2.1, 32, 32]}>
        <meshBasicMaterial
          color="#00d4ff"
          wireframe
          transparent
          opacity={0.1}
        />
      </Sphere>

      {/* Ambient light */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
    </group>
  );
}

export default function HeroGlobe() {
  const { isLowDataMode } = useLowDataMode();

  if (isLowDataMode) {
    return (
      <div className="hero-globe absolute inset-0 opacity-80">
        <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
      </div>
    );
  }

  return (
    <div className="hero-globe absolute inset-0 opacity-40">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ alpha: true, antialias: true }}>
        <AnimatedGlobe />
      </Canvas>
    </div>
  );
}
