import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Title = () => {
  const titleRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!titleRef.current) return;

      const { left, top, width, height } = titleRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Calculate offset from center, normalized to -1 to 1
      const offsetX = (mouseX - centerX) / (width / 2);
      const offsetY = (mouseY - centerY) / (height / 2);

      // Map offset to rotation angles (e.g., -10 to 10 degrees)
      const rotateY = offsetX * 10; // Rotate around Y-axis based on X mouse position
      const rotateX = -offsetY * 10; // Rotate around X-axis based on Y mouse position (inverted for natural feel)

      setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
      setRotation({ x: 0, y: 0 }); // Reset rotation on mouse leave
    };

    const currentTitleRef = titleRef.current;
    if (currentTitleRef) {
      currentTitleRef.addEventListener('mousemove', handleMouseMove);
      currentTitleRef.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (currentTitleRef) {
        currentTitleRef.removeEventListener('mousemove', handleMouseMove);
        currentTitleRef.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <motion.h1
      ref={titleRef}
      className="font-bold uppercase text-8xl md:text-9xl tracking-wides"
      style={{
        rotateX: rotation.x,
        rotateY: rotation.y,
        perspective: 1000, // Add perspective for 3D effect
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 10,
      }}
    >
      BYTCD
    </motion.h1>
  );
};

export default Title;