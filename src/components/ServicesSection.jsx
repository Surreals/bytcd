import React from 'react';
import { motion } from 'framer-motion';
import useAnimatedSection, { sectionVariants } from '../hooks/useAnimatedSection';

const ServicesSection = () => {
  const { ref, inView } = useAnimatedSection();

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={sectionVariants}
      className="bg-white text-black p-8 md:p-16 py-20"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Design</h3>
            <ul className="list-disc list-inside space-y-2 text-lg">
              <li>UI/UX Design</li>
              <li>Brand Identity & Logo Design</li>
              <li>Web & Mobile App Design</li>
              <li>Graphic Design</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Development</h3>
            <ul className="list-disc list-inside space-y-2 text-lg">
              <li>Frontend Development (React, Vue)</li>
              <li>Backend Development (Node.js, Firebase)</li>
              <li>Custom Web Applications</li>
              <li>E-commerce Solutions</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ServicesSection;