import React from 'react';
import { motion } from 'framer-motion';
import useAnimatedSection, { sectionVariants } from '../hooks/useAnimatedSection';

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.3 } }, // Added delay
};

const AboutSection = ({ id }) => { // Accept id prop
  const { ref, inView } = useAnimatedSection();

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={sectionVariants}
      className="bg-black text-white p-8 md:p-16 py-24"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-8">About BYTCD</h2>
        <motion.p
          variants={textVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-lg md:text-2xl leading-relaxed font-light"
        >
          BYTCD is a creative studio specializing in <strong>bespoke design</strong> and <strong>robust development</strong>. We transform ideas into <strong>stunning digital experiences</strong>, focusing on <strong>user-centric design</strong> and <strong>cutting-edge technology</strong> to deliver solutions that <strong>stand out</strong>.
        </motion.p>
      </div>
    </motion.section>
  );
};

export default AboutSection;