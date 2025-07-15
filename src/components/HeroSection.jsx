import React from 'react';
import { motion } from 'framer-motion';
import useAnimatedSection, { sectionVariants } from '../hooks/useAnimatedSection';
import Title from './Title';
import AnimatedBackground from './AnimatedBackground';

const HeroSection = ({ id }) => {
  const { ref, inView } = useAnimatedSection();

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={sectionVariants}
      className="relative flex flex-col items-center justify-center min-h-screen bg-white text-black p-4 md:p-8 overflow-hidden"
    >
      <AnimatedBackground />
      <div className="relative z-10 flex flex-col items-center justify-center">
        <Title />
        <p className="mt-8 text-xl md:text-3xl font-light text-center max-w-3xl leading-relaxed">
          Crafting <span className="font-medium hover:text-blue-600 transition-colors">unique</span> and <span className="font-medium hover:text-blue-600 transition-colors">convenient</span> design and development solutions for your digital presence.
        </p>
      </div>
    </motion.section>
  );
};

export default HeroSection;