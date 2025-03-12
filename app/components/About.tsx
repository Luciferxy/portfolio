'use client';

import { motion } from 'framer-motion';

const About = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-black">About Me</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">Education</h3>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-medium text-gray-800">B.Tech in Computer Science</h4>
                <p className="text-gray-600">Specialization in Data Science</p>
                <p className="text-gray-600">Manipal University Jaipur</p>
                <p className="text-blue-600 font-medium">2023 - Present</p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">Technical Background</h3>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <ul className="space-y-2 text-gray-600">
                  <li>• Strong foundation in Computer Science fundamentals</li>
                  <li>• Expertise in Web Development technologies</li>
                  <li>• Experience with Machine Learning and AI projects</li>
                  <li>• Data Science and Analytics skills</li>
                  <li>• Problem-solving and analytical thinking</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 