import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Title = () => {
  const titleRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ pixelX: 0, pixelY: 0, normalizedX: 0, normalizedY: 0 });
  const text = "BYTCD";
  const characters = text.split("");

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!titleRef.current) return;

      const { left, top, width, height } = titleRef.current.getBoundingClientRect();
      const mouseX_pixel = e.clientX - left; // Mouse X relative to title element's top-left
      const mouseY_pixel = e.clientY - top; // Mouse Y relative to title element's top-left

      // Normalized offsets from center (for rotation/depth)
      const centerX = width / 2;
      const centerY = height / 2;
      const offsetX_normalized = (mouseX_pixel - centerX) / centerX; // -1 to 1
      const offsetY_normalized = (mouseY_pixel - centerY) / centerY; // -1 to 1

      setMousePosition({
        pixelX: mouseX_pixel,
        pixelY: mouseY_pixel,
        normalizedX: offsetX_normalized,
        normalizedY: offsetY_normalized,
      });
    };

    const handleMouseLeave = () => {
      setMousePosition({ pixelX: 0, pixelY: 0, normalizedX: 0, normalizedY: 0 }); // Reset position on mouse leave
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
      if (!titleRef.current) return {};

      const { width: titleWidth, height: titleHeight } = titleRef.current.getBoundingClientRect();
      const avgLetterWidth = titleWidth / characters.length; // Average width of each letter

      // Calculate the starting X position of the first letter to account for justify-center
      const contentWidth = characters.length * avgLetterWidth;
      const startX = (titleWidth - contentWidth) / 2;

      // Approximate center position of the current letter within the h1
      const letterCenterX = startX + (i * avgLetterWidth) + (avgLetterWidth / 2);
      const letterCenterY = titleHeight / 2; // Assuming letters are vertically centered

      // Mouse position in pixels relative to the h1's top-left
      const mouseX_pixel = mousePosition.pixelX;
      const mouseY_pixel = mousePosition.pixelY;

      // Vector from mouse to letter center
      const dx = letterCenterX - mouseX_pixel;
      const dy = letterCenterY - mouseY_pixel;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const maxRepulsionDistance = 100; // Increased max distance (in pixels) for the repulsion effect
      const repulsionStrength = 80; // Increased max pixel movement for repulsion

      let repulsionTranslateX = 0;
      let repulsionTranslateY = 0;

      if (distance < maxRepulsionDistance && distance > 0) { // Apply repulsion if within range and not exactly on top
        const forceMagnitude = (1 - (distance / maxRepulsionDistance)) * repulsionStrength;
        const angle = Math.atan2(dy, dx); // Angle from mouse to letter
        repulsionTranslateX = Math.cos(angle) * forceMagnitude;
        repulsionTranslateY = Math.sin(angle) * forceMagnitude;
      }

      // Original rotation and depth based on normalized mouse position
      const baseRotateY = mousePosition.normalizedX * 8;
      const baseRotateX = -mousePosition.normalizedY * 8;
      const depthZ = (Math.abs(mousePosition.normalizedX) + Math.abs(mousePosition.normalizedY)) * 5;

      return {
        rotateX: baseRotateX,
        rotateY: baseRotateY,
        translateZ: depthZ,
        x: repulsionTranslateX, // Apply repulsion translation
        y: repulsionTranslateY, // Apply repulsion translation
        transition: {
          type: "spring",
          stiffness: 50, // Further reduced stiffness for smoother movement
          damping: 25,    // Further increased damping to reduce oscillation
          delay: i * 0.01, // Staggered delay
        },
      };
    },
    reset: (i) => ({ // Changed to a function that accepts 'i'
      rotateX: 0, rotateY: 0, translateZ: 0, x: 0, y: 0, // Reset x and y too
      transition: {
        type: "spring",
        stiffness: 40, // Further reduced stiffness for smoother reset
        damping: 20,   // Further increased damping for smoother reset
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
          animate={mousePosition.normalizedX !== 0 || mousePosition.normalizedY !== 0 ? "hovered" : "reset"}
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