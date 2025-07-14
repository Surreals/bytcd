"use client";

import React from 'react';
import { motion } from 'framer-motion';
import useAnimatedSection, { sectionVariants } from '../hooks/useAnimatedSection';
import ClientCard3D from './ClientCard3D';
import { clientProjects } from '../utils/constants';

const ClientShowcaseSection = ({ id }) => {
  const { ref, inView } = useAnimatedSection();

  // Define positions and rotations for each card to create a scattered 3D effect
  const cardConfigs = [
    { position: [-1.5, 0.5, 0], rotation: [0.1, -0.2, 0] },
    { position: [1.5, -0.5, 0], rotation: [-0.1, 0.2, 0] },
    { position: [-0.5, -1.0, 0], rotation: [0.05, 0.1, 0] },
    { position: [0.5, 1.0, 0], rotation: [-0.05, -0.1, 0] },
  ];

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={sectionVariants}
      className="bg-black text-white p-8 md:p-16 py-20 flex flex-col items-center justify-center relative overflow-hidden"
      style={{ minHeight: '80vh' }}
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center z-10">Our Work</h2>
      <p className="text-lg md:text-xl mb-16 text-center max-w-3xl z-10">
        Explore some of our recent projects that blend innovative design with robust development.
      </p>

      <div className="relative w-full max-w-6xl h-[500px] md:h-[700px] flex items-center justify-center z-0">
        {clientProjects.map((project, index) => (
          <div
            key={project.id}
            className="absolute w-64 h-48 md:w-80 md:h-60" // Adjust size as needed
            style={{
              // These values will be overridden by the 3D positions, but provide a fallback
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <ClientCard3D
              project={project}
              position={cardConfigs[index % cardConfigs.length].position}
              rotation={cardConfigs[index % cardConfigs.length].rotation}
            />
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default ClientShowcaseSection;