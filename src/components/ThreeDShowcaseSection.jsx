import React from 'react';
import { motion } from 'framer-motion';
import useAnimatedSection, { sectionVariants } from '../hooks/useAnimatedSection';
import ThreeDShowcase from './ThreeDShowcase';

const ThreeDShowcaseSection = () => {
  const { ref, inView } = useAnimatedSection();

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={sectionVariants}
      className="bg-black text-white p-8 md:p-16 py-20 flex flex-col items-center justify-center"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">Interactive BYTCD</h2>
      <p className="text-lg md:text-xl mb-12 text-center max-w-3xl">
        Experience our innovative design approach with this interactive 3D representation of BYTCD.
      </p>
      <div className="w-full max-w-4xl aspect-video bg-gray-900 rounded-lg overflow-hidden">
        <ThreeDShowcase />
      </div>
    </motion.section>
  );
};

export default ThreeDShowcaseSection;