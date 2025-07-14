"use client";

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Icons for mobile menu

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavLinkClick = (e, targetId) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false); // Close menu on click
  };

  // Close menu if route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/', sectionId: 'hero' },
    { name: 'About', path: '/', sectionId: 'about' },
    { name: 'Services', path: '/', sectionId: 'services' },
    // { name: 'Contact', path: '/', sectionId: 'contact' },
    { name: 'Contact Us', path: '/contact-us' },
  ];

  return (
    <nav className="bg-black text-white p-4 md:p-8 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl md:text-3xl font-bold hover:text-blue-500 transition-colors">
          BYTCD
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 text-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={(e) => link.sectionId ? handleNavLinkClick(e, link.sectionId) : setIsOpen(false)}
              className="hover:text-blue-500 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-black mt-4 pb-4">
          <div className="flex flex-col items-center space-y-4 text-lg">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => link.sectionId ? handleNavLinkClick(e, link.sectionId) : setIsOpen(false)}
                className="block w-full text-center py-2 hover:bg-gray-800 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;