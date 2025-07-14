"use client";

import React from 'react';
// Removed Three.js and GSAP imports as they are no longer needed for a 2D card

const ClientCard3D = ({ project, onClick }) => {
  return (
    <div onClick={() => onClick(project)} className="block w-full h-full relative group cursor-pointer overflow-hidden rounded-lg">
      {/* Image for the logo */}
      <img
        src={project.logo}
        alt={`${project.title} Logo`}
        className="w-full h-full object-contain p-4 bg-gray-900 transition-transform duration-300 group-hover:scale-105"
      />

      {/* Overlay for title and description on hover */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-white text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-300 text-sm">{project.description}</p>
      </div>
    </div>
  );
};

export default ClientCard3D;