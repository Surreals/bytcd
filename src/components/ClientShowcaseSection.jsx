"use client";

import React from 'react'; // Removed useState
import { motion } from 'framer-motion';
import useAnimatedSection, { sectionVariants } from '../hooks/useAnimatedSection';
import ClientCard3D from './ClientCard3D';
// Removed ProjectModal import
import { clientProjects } from '../utils/constants';

const ClientShowcaseSection = ({ id }) => {
  const { ref, inView } = useAnimatedSection();
  // Removed selectedProject and isModalOpen state

  // Removed handleCardClick and handleCloseModal functions

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={sectionVariants}
      className="bg-black text-white p-8 md:p-16 py-20 flex flex-col items-center justify-center relative overflow-hidden"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center z-10">Our Work</h2>
      <p className="text-lg md:text-xl mb-16 text-center max-w-3xl z-10">
        Explore some of our recent projects that blend innovative design with robust development.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 w-full max-w-6xl z-0">
        {clientProjects.map((project) => (
          <div
            key={project.id}
            className="w-full aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-lg"
          >
            <ClientCard3D project={project} /> {/* Removed onClick prop */}
          </div>
        ))}
      </div>

      {/* Removed ProjectModal rendering */}
    </motion.section>
  );
};

export default ClientShowcaseSection;