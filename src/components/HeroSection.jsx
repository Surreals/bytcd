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
        <p className="mt-8 text-xl md:text-2xl text-center max-w-2xl">
          Crafting unique and convenient design and development solutions for your digital presence.
        </p>
      </div>
    </motion.section>
  );
};

export default HeroSection;