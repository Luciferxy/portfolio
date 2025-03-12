'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

interface Achievement {
  title: string;
  organization: string;
  date: string;
  description: string;
  previewImageUrl: string;
}

const achievements: Achievement[] = [
  {
    title: "First Place - Innovation and Problem Solving",
    organization: "IEEE Genesis",
    date: "October 5, 2024",
    description: "Secured first position for demonstrating exceptional innovation and problem-solving skills in developing cutting-edge solutions",
    previewImageUrl: "/certificates/WhatsApp Image 2025-02-25 at 21.20.58_96ab4aa6.jpg"
  },
  {
    title: "Third Position",
    organization: "Insitescape 2024",
    date: "November 28-29, 2024",
    description: "Organized by Department of Data Science and Engineering, Manipal University Jaipur with E-Cell",
    previewImageUrl: "/certificates/Sourav Suman1_page-0001.jpg"
  }
];

const ImageModal = ({ imageUrl, onClose }: { imageUrl: string; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        className="relative w-[90vw] h-[90vh] max-w-7xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 120 }}
      >
        <Image
          src={imageUrl}
          alt="Certificate"
          fill
          className="object-contain"
          priority
          sizes="90vw"
        />
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Close image"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

const AchievementCard = ({ achievement, index }: { achievement: Achievement; index: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-xl"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex flex-col gap-4">
        {achievement.previewImageUrl && (
          <motion.div 
            className="relative w-full h-48 rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => setIsModalOpen(true)}
            whileHover={{ scale: 1.02 }}
            animate={isHovered ? { y: 0 } : { y: 0 }}
          >
            <Image
              src={achievement.previewImageUrl}
              alt={`${achievement.title} certificate`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4"
              initial={false}
              animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            >
              <span className="text-white font-medium">Click to view</span>
            </motion.div>
          </motion.div>
        )}
        <div>
          <motion.h3 
            className="text-xl font-bold text-white mb-1"
            animate={isHovered ? { color: '#60A5FA' } : { color: '#FFFFFF' }}
          >
            {achievement.title}
          </motion.h3>
          <p className="text-gray-400">{achievement.organization}</p>
          <p className="text-sm text-gray-500">{achievement.date}</p>
        </div>
        <p className="text-gray-300">{achievement.description}</p>
      </div>
      <AnimatePresence>
        {isModalOpen && achievement.previewImageUrl && (
          <ImageModal
            imageUrl={achievement.previewImageUrl}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const BackgroundPattern = () => (
  <div className="absolute inset-0 -z-10">
    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900/80 backdrop-blur-sm" />
    <div className="absolute inset-0" style={{
      backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
      backgroundSize: '40px 40px'
    }} />
  </div>
);

export default function HackathonAchievements() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <BackgroundPattern />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Hackathon Achievements</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Recognition and awards from various hackathons and competitions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {achievements.map((achievement, index) => (
            <AchievementCard key={index} achievement={achievement} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
} 