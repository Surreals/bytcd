import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Title = () => {
  const titleRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const text = "BYTCD";
  const characters = text.split("");

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

      setMousePosition({ x: offsetX, y: offsetY });
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 }); // Reset position on mouse leave
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

  const letterVariants = {
    initial: { rotateX: 0, rotateY: 0, translateZ: 0, x: 0, y: 0 },
    hovered: (i) => {
      // Apply a more uniform rotation and translation based on mouse position
      const rotateY = mousePosition.x * 10; // Increased intensity
      const rotateX = -mousePosition.y * 10; // Increased intensity
      const translateX = mousePosition.x * 8; // Increased intensity
      const translateY = mousePosition.y * 8; // Increased intensity
      const translateZ = (Math.abs(mousePosition.x) + Math.abs(mousePosition.y)) * 10; // Increased intensity

      return {
        rotateX: rotateX,
        rotateY: rotateY,
        translateZ: translateZ,
        x: translateX,
        y: translateY,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: i * 0.02, // Staggered delay remains
        },
      };
    },
    reset: (i) => ({
      rotateX: 0, rotateY: 0, translateZ: 0, x: 0, y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        delay: characters.length * 0.02 - i * 0.02, // Staggered reset remains
      },
    })
  };

  return (
    <motion.h1
      ref={titleRef}
      className="font-bold uppercase text-8xl md:text-9xl tracking-widest flex justify-center items-center" // Corrected typo: tracking-wides to tracking-widest
      style={{ perspective: 1000 }} // Apply perspective to the container
    >
      {characters.map((char, i) => (
        <motion.span
          key={i}
          variants={letterVariants}
          initial="initial"
          animate={mousePosition.x !== 0 || mousePosition.y !== 0 ? "hovered" : "reset"}
          custom={i} // Pass index as custom prop for variants
          className="inline-block" // Ensure each span is a block for transformations
        >
          {char === " " ? "\u00A0" : char} {/* Handle spaces */}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export default Title;