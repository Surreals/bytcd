"use client";

import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let timeoutId;

    const updateCursorPosition = (e) => {
      // Clear any previous timeout
      clearTimeout(timeoutId);

      // Set a new timeout to update the position after a short delay
      timeoutId = setTimeout(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      }, 10); // Debounce delay of 10ms
    };

    document.addEventListener('mousemove', updateCursorPosition);

    // Clean up event listener and any pending timeout
    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      className="custom-cursor"
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    ></div>
  );
};

export default CustomCursor;