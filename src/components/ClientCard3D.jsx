"use client";

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for project link

const ClientCard3D = ({ project }) => { // Removed onClick prop
  return (
    <div className="block w-full h-full relative group cursor-pointer overflow-hidden rounded-xl shadow-lg">
      {/* Default state: Logo */}
      <img
        src={project.logo}
        alt={`${project.title} Logo`}
        className="absolute inset-0 w-full h-full object-contain p-8 bg-gray-300 transition-opacity duration-300 group-hover:opacity-0"
      />

      {/* Hover state: Project Image, Title, Description, and Link */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          backgroundImage: `url(${project.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay', // Blend the image with the black overlay
        }}
      >
        <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-300 text-base md:text-lg mb-4 font-light" dangerouslySetInnerHTML={{ __html: project.description }}></p>
        {project.link && project.link !== '#' && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Visit Project
          </a>
        )}
      </div>
    </div>
  );
};

export default ClientCard3D;