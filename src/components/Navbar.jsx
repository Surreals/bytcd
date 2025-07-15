"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Icons for mobile menu

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // New state for visibility
  const lastScrollY = useRef(0); // Ref to store the last scroll position
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

  // Effect for scroll-based visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Only update visibility if scrolling significantly
      if (Math.abs(currentScrollY - lastScrollY.current) > 50) { // Threshold of 50px
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) { // Scrolling down and past initial offset
          setIsVisible(false);
        } else { // Scrolling up
          setIsVisible(true);
        }
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array means this runs once on mount

  const navLinks = [
    { name: 'Home', path: '/', sectionId: 'hero' },
    { name: 'About', path: '/', sectionId: 'about' },
    { name: 'Services', path: '/', sectionId: 'services' },
    { name: 'Contact Us', path: '/contact-us' },
  ];

  return (
    <nav
      className={`bg-black/80 backdrop-blur-md text-white px-6 py-4 md:px-12 md:py-5 sticky top-0 z-50 shadow-lg transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl md:text-3xl font-bold hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md">
          BYTCD
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-10 text-lg font-light">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={(e) => link.sectionId ? handleNavLinkClick(e, link.sectionId) : setIsOpen(false)}
              className="hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-black/90 mt-4 pb-4 rounded-b-lg">
          <div className="flex flex-col items-center space-y-4 text-lg">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => link.sectionId ? handleNavLinkClick(e, link.sectionId) : setIsOpen(false)}
                className="block w-full text-center py-3 hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md"
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