import React from 'react';
import { motion } from 'framer-motion';
import useAnimatedSection, { sectionVariants } from '../hooks/useAnimatedSection';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.3 } }, // Added delay
};

const AboutSection = ({ id }) => { // Accept id prop
  const { ref, inView } = useAnimatedSection();
  const { t } = useTranslation(); // Initialize useTranslation

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={sectionVariants}
      className="bg-black text-white p-8 md:p-16 py-20"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">{t('about_section.title')}</h2>
        <motion.p
          variants={textVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-lg md:text-xl leading-relaxed"
        >
          {t('about_section.description')}
        </motion.p>
      </div>
    </motion.section>
  );
};

export default AboutSection;