'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

interface Achievement {
  title: string;
  organization: string;
  date: string;
  description: string;
  certificateUrl?: string;
  imageUrl?: string;
}

const achievements: Achievement[] = [
  {
    title: "First Place - Innovation and Problem Solving",
    organization: "IEEE Genesis",
    date: "October 5, 2024",
    description: "Secured first position for demonstrating exceptional innovation and problem-solving skills in developing cutting-edge solutions",
    certificateUrl: "/certificates/ieee-genesis.pdf",
    imageUrl: "/certificates/WhatsApp Image 2025-02-25 at 21.20.58_96ab4aa6.jpg"
  },
  {
    title: "Third Position",
    organization: "Insitescape 2024",
    date: "November 28-29, 2024",
    description: "Organized by Department of Data Science and Engineering, Manipal University Jaipur with E-Cell",
    certificateUrl: "/certificates/Sourav Suman1.pdf",
    imageUrl: "/certificates/Sourav Suman1_page-0001.jpg"
  }
];

const ImageModal = ({ imageUrl, onClose }: { imageUrl: string; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      onClick={onClose}
    >
      <div className="relative w-screen h-screen">
        <Image
          src={imageUrl}
          alt="Certificate"
          fill
          className="object-contain"
          priority
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
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
        </button>
      </div>
    </motion.div>
  );
};

const AchievementCard = ({ achievement, index }: { achievement: Achievement; index: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
    >
      <div className="flex flex-col gap-4">
        {achievement.imageUrl && achievement.imageUrl.endsWith('.pdf') ? (
          <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
        ) : achievement.imageUrl ? (
          <div 
            className="relative w-full h-48 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => setIsModalOpen(true)}
          >
            <Image
              src={achievement.imageUrl}
              alt={`${achievement.title} certificate`}
              fill
              className="object-cover"
            />
          </div>
        ) : null}
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{achievement.title}</h3>
          <p className="text-gray-400">{achievement.organization}</p>
          <p className="text-sm text-gray-500">{achievement.date}</p>
        </div>
        <p className="text-gray-300">{achievement.description}</p>
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <ImageModal
            imageUrl={achievement.imageUrl!}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function HackathonAchievements() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
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