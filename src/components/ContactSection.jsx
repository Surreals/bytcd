import React from 'react';
import { motion } from 'framer-motion';
import useAnimatedSection, { sectionVariants } from '../hooks/useAnimatedSection';
import { Mail } from 'lucide-react'; // Import Mail icon
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const ContactSection = ({ id }) => { // Accept id prop
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
        <h2 className="text-4xl md:text-5xl font-bold mb-8">{t('contact_section.title')}</h2>
        <p className="text-lg md:text-xl mb-8">
          {t('contact_section.description')}
        </p>
        <a
          href="mailto:bytcdco@gmail.com"
          className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full text-xl font-semibold hover:bg-blue-500 hover:text-white transition-colors"
        >
          <Mail size={24} />
          {t('contact_section.button')}
        </a>
      </div>
    </motion.section>
  );
};

export default ContactSection;