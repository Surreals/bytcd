import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useAnimatedSection, { sectionVariants } from '../hooks/useAnimatedSection';
import ThreeDShowcase from './ThreeDShowcase';
import FlappyBlockGame from './FlappyBlockGame'; // Import the new game component

const ThreeDShowcaseSection = () => {
  const { ref, inView } = useAnimatedSection();
  const [showGame, setShowGame] = useState(false);

  const toggleContent = () => {
    setShowGame(!showGame);
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={sectionVariants}
      className="bg-black text-white p-8 md:p-16 py-20 flex flex-col items-center justify-center"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
        Our{' '}
        <span
          className={`cursor-pointer transition-colors duration-300 ${
            showGame ? 'text-blue-400 underline' : 'hover:text-blue-400'
          }`}
          onClick={toggleContent}
        >
          Creative
        </span>{' '}
        Vision
      </h2>
      <p className="text-lg md:text-xl mb-12 text-center max-w-3xl">
        {showGame
          ? 'Try your skills in our Flappy Block game!'
          : 'Explore a glimpse of our innovative design approach through interactive 3D experiences.'}
      </p>
      <div className="w-full max-w-4xl aspect-video bg-gray-900 rounded-lg overflow-hidden">
        {showGame ? <FlappyBlockGame /> : <ThreeDShowcase />}
      </div>
    </motion.section>
  );
};

export default ThreeDShowcaseSection;