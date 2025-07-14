"use client";

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for project link

const ClientCard3D = ({ project }) => { // Removed onClick prop
  return (
    <div className="block w-full h-full relative group cursor-pointer overflow-hidden rounded-lg shadow-lg">
      {/* Default state: Logo */}
      <img
        src={project.logo}
        alt={`${project.title} Logo`}
        className="absolute inset-0 w-full h-full object-contain p-4 bg-gray-900 transition-opacity duration-300 group-hover:opacity-0"
      />

      {/* Hover state: Project Image, Title, Description, and Link */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-black bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          backgroundImage: `url(${project.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay', // Blend the image with the black overlay
        }}
      >
        <h3 className="text-white text-2xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-300 text-base mb-4">{project.description}</p>
        {project.link && project.link !== '#' && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Visit Project
          </a>
        )}
      </div>
    </div>
  );
};

export default ClientCard3D;