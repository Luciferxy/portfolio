'use client';

import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Web Development',
    skills: ['React', 'Next.js', 'TypeScript', 'HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS']
  },
  {
    title: 'Machine Learning & AI',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Natural Language Processing']
  },
  {
    title: 'Data Science',
    skills: ['Data Analysis', 'Data Visualization', 'Statistical Analysis', 'Pandas', 'NumPy']
  },
  {
    title: 'Tools & Technologies',
    skills: ['Git', 'Docker', 'VS Code', 'Jupyter Notebook', 'SQL']
  }
];

const Skills = () => {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-16">Technical Skills</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800 p-6 rounded-xl"
              >
                <h3 className="text-xl font-semibold mb-4 text-blue-400">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 