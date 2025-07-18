"use client";

import React from 'react';
import { motion } from 'framer-motion';
import useAnimatedSection, { sectionVariants } from '../hooks/useAnimatedSection';
import ClientCard3D from './ClientCard3D';
import { clientProjects } from '../utils/constants';

const ClientShowcaseSection = ({ id }) => {
  const { ref, inView } = useAnimatedSection();

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={sectionVariants}
      className="bg-black text-white p-8 md:p-16 py-24 flex flex-col items-center justify-center relative overflow-hidden"
    >
      <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center z-10">Our Work</h2>
      <p className="text-lg md:text-2xl mb-16 text-center max-w-3xl font-light z-10">
        Explore some of our recent projects that blend innovative design with robust development.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 w-full max-w-6xl z-0">
        {clientProjects.map((project) => (
          <div
            key={project.id}
            className="w-full aspect-video bg-gray-300 rounded-xl overflow-hidden shadow-lg"
          >
            <ClientCard3D project={project} />
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default ClientShowcaseSection;