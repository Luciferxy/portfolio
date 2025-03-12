'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import { Mesh, Vector3, Group } from 'three';
import { Environment, Float, MeshDistortMaterial, GradientTexture } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let isGsapInitialized = false;

interface MousePosition {
  x: number;
  y: number;
}

interface FloatingParticlesProps {
  mouse: React.MutableRefObject<MousePosition>;
}

interface ScrollTriggerState {
  progress: number;
}

function FloatingParticles({ mouse }: FloatingParticlesProps) {
  const particles = useRef<Mesh[]>([]);
  const count = 50;
  const [hovered, setHovered] = useState<number | null>(null);
  const groupRef = useRef<Group>(null);

  useEffect(() => {
    if (!groupRef.current) return;

    // GSAP animation for the entire particle group
    gsap.to(groupRef.current.rotation, {
      y: Math.PI * 2,
      duration: 20,
      repeat: -1,
      ease: "none"
    });

    // Scroll-triggered animation
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self: ScrollTriggerState) => {
        if (groupRef.current) {
          groupRef.current.position.y = self.progress * 2 - 1;
        }
      }
    });
  }, []);

  useFrame((state: { clock: { getElapsedTime: () => number } }) => {
    for (let i = 0; i < particles.current.length; i++) {
      const particle = particles.current[i];
      const time = state.clock.getElapsedTime();
      
      // Enhanced floating animation with multiple sine waves
      particle.position.y += Math.sin(time + i) * 0.002;
      particle.position.x += Math.cos(time * 0.5 + i) * 0.001;
      particle.position.z += Math.sin(time * 0.3 + i) * 0.001;
      
      // Mouse interaction with smoother transitions
      if (mouse.current) {
        const distance = particle.position.distanceTo(new Vector3(mouse.current.x * 5, mouse.current.y * 5, 0));
        if (distance < 2) {
          gsap.to(particle.position, {
            x: particle.position.x + (mouse.current.x * 5 - particle.position.x) * 0.1,
            y: particle.position.y + (mouse.current.y * 5 - particle.position.y) * 0.1,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      }
      
      // Dynamic rotation based on distance from center
      const distanceFromCenter = particle.position.length();
      particle.rotation.x += 0.001 * (1 + distanceFromCenter * 0.1);
      particle.rotation.y += 0.001 * (1 + distanceFromCenter * 0.1);
      
      // Scale animation with GSAP
      if (hovered === i) {
        gsap.to(particle.scale, {
          x: 0.2,
          y: 0.2,
          z: 0.2,
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      } else {
        gsap.to(particle.scale, {
          x: 0.1,
          y: 0.1,
          z: 0.1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: count }).map((_, i) => (
        <Float 
          key={i} 
          speed={1.5} 
          rotationIntensity={1} 
          floatIntensity={2}
          floatingRange={[-0.5, 0.5]}
        >
          <mesh
            ref={(el) => {
              if (el) particles.current[i] = el;
            }}
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
    </group>
  );
}

function MovingGradient() {
  const mesh = useRef<Mesh>(null);
  
  useEffect(() => {
    if (!mesh.current) return;

    // GSAP animation for gradient rotation
    gsap.to(mesh.current.rotation, {
      z: Math.PI * 2,
      duration: 20,
      repeat: -1,
      ease: "none"
    });

    // Scroll-triggered scale animation
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self: ScrollTriggerState) => {
        if (mesh.current) {
          gsap.to(mesh.current.scale, {
            x: 20 + self.progress * 5,
            y: 20 + self.progress * 5,
            duration: 0.5
          });
        }
      }
    });
  }, []);

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
    if (!isGsapInitialized) {
      gsap.registerPlugin(ScrollTrigger);
      isGsapInitialized = true;
    }

    const handleMouseMove = (event: MouseEvent) => {
      gsap.to(mouse.current, {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
        duration: 0.5,
        ease: "power2.out"
      });
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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="fixed inset-0 -z-10 bg-gray-900 opacity-50" />;
  }

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