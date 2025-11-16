import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg'; // Ensure this path is correct

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center text-2xl md:text-3xl font-hubot-sans font-black hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md leading-none mt-[-2px]">
            <img src={logo} alt="BYTCD Logo" className="h-7 md:h-8 mr-2 filter invert" />
            BYTCD
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link to="/about" className="text-gray-800 hover:text-blue-600 transition-colors text-lg font-medium">About</Link>
            <Link to="/services" className="text-gray-800 hover:text-blue-600 transition-colors text-lg font-medium">Services</Link>
            <Link to="/portfolio" className="text-gray-800 hover:text-blue-600 transition-colors text-lg font-medium">Portfolio</Link>
            <Link to="/contact" className="text-gray-800 hover:text-blue-600 transition-colors text-lg font-medium">Contact</Link>
          </div>
          <div className="md:hidden">
            {/* Mobile menu button */}
            <button className="text-gray-800 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;