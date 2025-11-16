"use client";

import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false); // Змінено на false, щоб приховати курсор за замовчуванням

  useEffect(() => {
    const updateCursorPosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      setIsVisible(true); // Показати курсор, коли миша входить у документ
    };

    const handleMouseLeave = () => {
      setIsVisible(false); // Приховати курсор, коли миша залишає документ
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
      className={`custom-cursor ${isVisible ? '' : 'hidden'}`} // Додати клас 'hidden' на основі стану isVisible
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    ></div>
  );
};

export default CustomCursor;