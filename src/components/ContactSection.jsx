import React from 'react';
import { motion } from 'framer-motion';
import useAnimatedSection, { sectionVariants } from '../hooks/useAnimatedSection';
import { Mail } from 'lucide-react'; // Import Mail icon

const ContactSection = ({ id }) => { // Accept id prop
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
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-8">Get in Touch</h2>
        <p className="text-lg md:text-2xl mb-12 font-light">
          Ready to start your <strong>next project</strong>? Let's create something <strong>amazing</strong> together.
        </p>
        <a
          href="mailto:bytcdco@gmail.com"
          className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full text-xl font-semibold hover:bg-blue-500 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Mail size={24} />
          Contact Us
        </a>
      </div>
    </motion.section>
  );
};

export default ContactSection;