'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import { Mesh, Vector3 } from 'three';
import { Environment, Float, MeshDistortMaterial, GradientTexture } from '@react-three/drei';

interface MousePosition {
  x: number;
  y: number;
}

interface FloatingParticlesProps {
  mouse: React.MutableRefObject<MousePosition>;
}

function FloatingParticles({ mouse }: FloatingParticlesProps) {
  const particles = useRef<Mesh[]>([]);
  const count = 50;
  const [hovered, setHovered] = useState<number | null>(null);

  useFrame((state) => {
    for (let i = 0; i < particles.current.length; i++) {
      const particle = particles.current[i];
      const time = state.clock.getElapsedTime();
      
      // Basic floating animation
      particle.position.y += Math.sin(time + i) * 0.002;
      
      // Mouse interaction
      if (mouse.current) {
        const distance = particle.position.distanceTo(new Vector3(mouse.current.x * 5, mouse.current.y * 5, 0));
        if (distance < 2) {
          particle.position.x += (mouse.current.x * 5 - particle.position.x) * 0.02;
          particle.position.y += (mouse.current.y * 5 - particle.position.y) * 0.02;
        }
      }
      
      // Rotation animation
      particle.rotation.x += 0.001;
      particle.rotation.y += 0.001;
      
      // Scale animation when hovered
      if (hovered === i) {
        particle.scale.lerp(new Vector3(0.2, 0.2, 0.2), 0.1);
      } else {
        particle.scale.lerp(new Vector3(0.1, 0.1, 0.1), 0.1);
      }
    }
  });

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Float key={i} speed={1.5} rotationIntensity={1} floatIntensity={2}>
          <mesh
            ref={(el) => el && (particles.current[i] = el)}
            position={[
              Math.random() * 10 - 5,
              Math.random() * 10 - 5,
              Math.random() * 10 - 5,
            ]}
            scale={0.1}
            onPointerOver={() => setHovered(i)}
            onPointerOut={() => setHovered(null)}
          >
            {i % 3 === 0 ? (
              <octahedronGeometry />
            ) : i % 3 === 1 ? (
              <dodecahedronGeometry />
            ) : (
              <icosahedronGeometry />
            )}
            <MeshDistortMaterial
              color={`hsl(${Math.random() * 90 + 180}, 70%, 60%)`}
              emissive={`hsl(${Math.random() * 90 + 180}, 70%, 30%)`}
              emissiveIntensity={0.5}
              transparent
              opacity={0.8}
              distort={hovered === i ? 0.6 : 0.3}
              speed={2}
            />
          </mesh>
        </Float>
      ))}
      <Environment preset="night" />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <spotLight position={[-10, -10, -10]} intensity={0.2} />
    </>
  );
}

function MovingGradient() {
  const mesh = useRef<Mesh>(null);
  
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.z = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0, -5]} scale={20}>
      <planeGeometry />
      <meshBasicMaterial transparent opacity={0.2}>
        <GradientTexture
          stops={[0, 0.5, 1]}
          colors={['#1a365d', '#2a4365', '#1a365d']}
          size={100}
        />
      </meshBasicMaterial>
    </mesh>
  );
}

function Scene() {
  const mouse = useRef<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <MovingGradient />
      <FloatingParticles mouse={mouse} />
    </>
  );
}

export default function ProjectBackground() {
  return (
    <div className="fixed inset-0 -z-10 opacity-50">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <Scene />
        <fog attach="fog" args={['#1a365d', 5, 15]} />
      </Canvas>
    </div>
  );
} 