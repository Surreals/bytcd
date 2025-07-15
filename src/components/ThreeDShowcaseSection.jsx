import React, { useState } from 'react'; // Import useState
import { motion } from 'framer-motion';
import useAnimatedSection, { sectionVariants } from '../hooks/useAnimatedSection';
import ThreeDShowcase from './ThreeDShowcase';

const ThreeDShowcaseSection = ({ onCreativeClick }) => { // Accept onCreativeClick prop
  const { ref, inView } = useAnimatedSection();
  const [creativeClickCount, setCreativeClickCount] = useState(0);

  const handleCreativeClick = () => {
    setCreativeClickCount(prevCount => {
      const newCount = prevCount + 1;
      if (newCount >= 2) { // Trigger after 2 clicks
        onCreativeClick(); // Call the callback to show the game
        return 0; // Reset count after triggering
      }
      return newCount;
    });
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={sectionVariants}
      className="bg-black text-white p-8 md:p-16 py-20 flex flex-col items-center justify-center"
    >
      <h2
        className="text-4xl md:text-5xl font-bold mb-8 text-center cursor-pointer" // Add cursor-pointer
        onClick={handleCreativeClick} // Add click handler
      >
        Our Creative Vision
      </h2>
      <p className="text-lg md:text-xl mb-12 text-center max-w-3xl">
        Explore a glimpse of our innovative design approach through interactive 3D experiences.
      </p>
      <div className="w-full max-w-4xl aspect-video bg-gray-900 rounded-lg overflow-hidden">
        <ThreeDShowcase />
      </div>
    </motion.section>
  );
};

export default ThreeDShowcaseSection;