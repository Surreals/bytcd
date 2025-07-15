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
      const totalLetters = characters.length;
      const midIndex = totalLetters / 2 - 0.5; // Center index for odd/even
      const distanceFactor = Math.abs(i - midIndex) / midIndex; // 0 at center, 1 at edges

      // Base rotation from mouse position (reduced intensity)
      const baseRotateY = mousePosition.x * 8;
      const baseRotateX = -mousePosition.y * 8;

      // Parallax translation (reduced intensity)
      const parallaxX = mousePosition.x * 5 * (i - midIndex);
      const parallaxY = mousePosition.y * 5 * (i - midIndex);

      // Depth effect: letters pop out more when mouse is further from center (reduced intensity)
      const depthZ = (Math.abs(mousePosition.x) + Math.abs(mousePosition.y)) * 5;

      return {
        rotateX: baseRotateX + (mousePosition.y * 3 * distanceFactor), // Add slight variation based on letter position
        rotateY: baseRotateY + (mousePosition.x * 3 * distanceFactor),
        translateZ: depthZ,
        x: parallaxX,
        y: parallaxY,
        transition: {
          type: "spring",
          stiffness: 100, // Reduced stiffness for smoother movement
          damping: 20,    // Increased damping to reduce oscillation
          delay: i * 0.02, // Staggered delay
        },
      };
    },
    reset: (i) => ({ // Changed to a function that accepts 'i'
      rotateX: 0, rotateY: 0, translateZ: 0, x: 0, y: 0,
      transition: {
        type: "spring",
        stiffness: 80, // Reduced stiffness for smoother reset
        damping: 15,   // Increased damping for smoother reset
        delay: characters.length * 0.02 - i * 0.02, // Staggered reset
      },
    })
  };

  return (
    <motion.h1
      ref={titleRef}
      className="font-bold uppercase text-8xl md:text-9xl tracking-wides flex justify-center items-center" // Use flex to center spans
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