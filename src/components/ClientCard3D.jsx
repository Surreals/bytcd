import React from 'react';
import { Link } from 'react-router-dom'; // Assuming Link is used for navigation
import { ArrowUpRight } from 'lucide-react'; // Assuming Lucide React is used for icons

const ClientCard3D = ({ project }) => {
  return (
    <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg group perspective-1000">
      {/* Front of the card: Logo and Title */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-white p-4 rounded-xl backface-hidden transition-all duration-500 transform-gpu group-hover:rotateY-180">
        {project.logo && (
          <img src={project.logo} alt={`${project.title} Logo`} className="h-16 object-contain mb-4" />
        )}
        <h3 className="text-xl font-semibold text-center">{project.title}</h3>
      </div>

      {/* Back of the card: Project Image, Title, Description, and Link */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-cover bg-center rounded-xl backface-hidden transition-all duration-500 transform-gpu rotateY-180 group-hover:rotateY-0"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${project.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
        <p className="text-sm text-gray-300 mb-4 line-clamp-3">{project.description}</p>
        {project.link && (
          <Link
            to={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            View Project
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default ClientCard3D;