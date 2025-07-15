"use client";

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Title = () => {
  const titleRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const mainText = "BYTCD";
  const subText = "SOLUTIONS"; // New subtitle for the hover effect
  const mainCharacters = mainText.split("");
  const subCharacters = subText.split("");

  // Variants for the container (h1 elements) to stagger children
  const containerVariants = {
    initial: {
      // No specific animation for container itself, just for staggering children
    },
    visible: {
      transition: {
        staggerChildren: 0.02, // Stagger for initial reveal
      },
    },
    hovered: {
      transition: {
        staggerChildren: 0.02, // Stagger for hover effect
      },
    },
  };

  // Variants for individual letters (spans)
  const letterVariants = {
    initial: { y: "100%" }, // Start below the visible area
    visible: { y: "0%", transition: { duration: 0.6, ease: [0.65, 0, 0.21, 1.47] } }, // Animate to visible position
    hovered: { y: "-100%", transition: { duration: 0.6, ease: [0.65, 0, 0.21, 1.47] } }, // Animate up on hover
  };

  return (
    <div
      ref={titleRef}
      className="titleWrapper relative h-20 md:h-24 overflow-hidden w-full text-center flex items-center justify-center" // Adjusted height for text size
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* First line of text (main title) */}
      <motion.h1
        className="first absolute top-0 left-0 right-0 bottom-0 m-auto text-8xl md:text-9xl font-bold uppercase tracking-wide flex justify-center items-center"
        style={{ lineHeight: '1em' }} // Ensure line height matches font size for vertical alignment
        variants={containerVariants}
        initial="initial"
        animate={isHovered ? "hovered" : "visible"}
      >
        {mainCharacters.map((char, i) => (
          <motion.span
            key={`main-${i}`}
            variants={letterVariants}
            className="inline-block relative z-10 bg-white" // Background to hide the second line initially
          >
            {char === " " ? "\u00A0" : char} {/* Handle spaces */}
          </motion.span>
        ))}
      </motion.h1>

      {/* Second line of text (subtitle) */}
      <motion.h1
        className="second absolute top-0 left-0 right-0 bottom-0 m-auto text-8xl md:text-9xl font-bold uppercase tracking-wide flex justify-center items-center"
        style={{ lineHeight: '1em' }} // Ensure line height matches font size for vertical alignment
        variants={containerVariants}
        initial="initial"
        animate={isHovered ? "hovered" : "visible"}
      >
        {subCharacters.map((char, i) => (
          <motion.span
            key={`sub-${i}`}
            variants={letterVariants}
            className="inline-block relative z-0" // No background, will be revealed
          >
            {char === " " ? "\u00A0" : char} {/* Handle spaces */}
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
};

export default Title;