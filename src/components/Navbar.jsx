import React from 'react';
import { Link } from 'react-router-dom';
import logo from '/icon.svg'; // Виправлено шлях імпорту до icon.svg з папки public

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-4 md:px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center text-2xl md:text-3xl font-archivo-black hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md leading-none mt-[-2px]">
          <img src={logo} alt="BYTCD Logo" className="h-7 md:h-8 mr-2 filter invert" />
          BYTCD
        </Link>
        {/* Navigation links or other elements can go here */}
      </div>
    </nav>
  );
};

export default Navbar;