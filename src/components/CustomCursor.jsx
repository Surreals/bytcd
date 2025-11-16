"use client";

import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true); // New state to control visibility

  useEffect(() => {
    const updateCursorPosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      setIsVisible(true); // Show cursor when mouse enters the document
    };

    const handleMouseLeave = () => {
      setIsVisible(false); // Hide cursor when mouse leaves the document
    };

    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${isVisible ? '' : 'hidden'}`} // Add 'hidden' class based on isVisible state
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    ></div>
  );
};

export default CustomCursor;