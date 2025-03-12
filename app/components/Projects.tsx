'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, useRef, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';

const ProjectBackground = dynamic(() => import('./ProjectBackground'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 -z-10 bg-gray-900 opacity-50" />
});

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'iPhone Website Clone',
    description: 'A pixel-perfect recreation of the Apple iPhone website featuring smooth animations, 3D models, and responsive design.',
    technologies: ['React', 'Tailwind CSS', 'Vite', 'GSAP', 'Three.js'],
    category: 'Web Development',
    mediaType: 'image',
    image: '/videos/Screenshot 2025-03-12 151801.png',
    githubLink: 'https://github.com/Luciferxy/iPHONE'
  },
  {
    title: 'Vehicle Detection System',
    description: 'Real-time vehicle detection system using YOLO (You Only Look Once) algorithm for accurate object detection and classification.',
    technologies: ['Python', 'YOLO', 'OpenCV', 'Machine Learning'],
    category: 'Machine Learning',
    mediaType: 'image',
    image: '/images/yolov8.jpg',
    githubLink: 'https://github.com/Luciferxy/Cars_tracking-_yolov8'
  },
  {
    title: 'AI Car Driving Algorithm',
    description: 'Self-driving car simulation implementing advanced AI algorithms for autonomous navigation and decision making.',
    technologies: ['Python', 'TensorFlow', 'Neural Networks', 'Simulation'],
    category: 'Artificial Intelligence',
    mediaType: 'image',
    image: '/images/ai cars.jpg',
    githubLink: 'https://github.com/yourusername/ai-car'
  },
  {
    title: 'Game Landing Page',
    description: 'Dynamic and interactive landing page for a gaming platform with stunning animations and smooth transitions.',
    technologies: ['React', 'Tailwind CSS', 'Vite', 'GSAP'],
    category: 'Web Development',
    mediaType: 'image',
    image: '/images/game landing page.png',
    githubLink: 'https://github.com/Luciferxy/3DWebsite_Animation'
  },
  {
    title: 'AI Email Reply Interface',
    description: 'Smart email interface that generates contextual responses using AI, improving email communication efficiency.',
    technologies: ['AI/ML', 'NLP', 'React', 'API Integration'],
    category: 'AI/Web Development',
    mediaType: 'video',
    videoUrl: '/videos/email_agent.mp4',
    githubLink: 'https://github.com/Luciferxy/AI_Agents'
  }
];

const Projects = () => {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Set initial window size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });

    // Handle window resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate section title
    gsap.fromTo(
      '.projects-title',
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.projects-title',
          start: 'top 80%',
        },
      }
    );

    // Animate project cards
    projectRefs.current.forEach((project, index) => {
      if (!project) return;

      gsap.fromTo(
        project,
        {
          opacity: 0,
          x: index % 2 === 0 ? -50 : 50,
          rotateY: index % 2 === 0 ? -10 : 10,
        },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: project,
            start: 'top 80%',
          },
          ease: 'power2.out',
        }
      );
    });

    // Animate technology tags with a stagger effect
    gsap.fromTo(
      '.tech-tag',
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.tech-tag',
          start: 'top 80%',
        },
        ease: 'back.out(1.7)',
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gray-900 relative overflow-hidden">
      <Suspense fallback={<div className="fixed inset-0 -z-10 bg-gray-900 opacity-50" />}>
        <ProjectBackground />
      </Suspense>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="projects-title text-4xl font-bold text-center text-white mb-16">Projects</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                ref={el => { projectRefs.current[index] = el; }}
                className="bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 project-card"
                onMouseEnter={() => setActiveVideo(index)}
                onMouseLeave={() => setActiveVideo(null)}
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? -50 : 50,
                  y: 20
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1
                }}
              >
                <div className="relative aspect-video overflow-hidden bg-gray-900">
                  {project.mediaType === 'video' ? (
                    <video
                      src={project.videoUrl}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      autoPlay={activeVideo === index}
                      onMouseEnter={e => e.currentTarget.play()}
                      onMouseLeave={e => {
                        e.currentTarget.pause();
                        e.currentTarget.currentTime = 0;
                      }}
                    />
                  ) : (
                    <Image
                      src={project.image!}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                    <span className="px-3 py-1 bg-blue-600 text-sm text-white rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="tech-tag px-3 py-1 bg-gray-700 text-sm text-gray-300 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <motion.a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-400 hover:text-gray-300 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" clipRule="evenodd"/>
                      </svg>
                      <span>Source Code</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 