"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: {
    y: "0",
    opacity: 1,
    transition: { delay: 0.1, type: "spring", stiffness: 100, damping: 15 },
  },
  exit: { y: "100vh", opacity: 0, transition: { duration: 0.3 } },
};

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose} // Close modal when clicking outside
      >
        <motion.div
          className="bg-white text-black rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative p-6 md:p-8"
          variants={modalVariants}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full p-1"
            aria-label="Close modal"
          >
            <X size={28} />
          </button>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">{project.title}</h2>
          <p className="text-lg md:text-xl text-gray-700 mb-6 text-center">{project.description}</p>

          {project.image && (
            <div className="mb-6">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto rounded-md shadow-md object-cover"
              />
            </div>
          )}

          {project.link && project.link !== '#' && (
            <div className="text-center">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Visit Project
              </a>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;