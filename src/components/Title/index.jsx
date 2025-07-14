import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const Title = () => {
  const ref = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (ref.current) {
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = event.clientX - (left + width / 2);
        const y = event.clientY - (top + height / 2);
        setMousePosition({ x, y });
      }
    };

    const currentRef = ref.current;
    if (currentRef) {
      currentRef.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const springConfig = {
    stiffness: 100,
    damping: 10,
    mass: 0.5,
  };

  const mouseXSpring = useSpring(mousePosition.x, springConfig);
  const mouseYSpring = useSpring(mousePosition.y, springConfig);

  const rotateX = useTransform(
    mouseYSpring,
    [-100, 100], // Input range (based on typical mouse movement over the element)
    [-10, 10]    // Output range (degrees of rotation)
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-100, 100], // Input range
    [10, -10]    // Output range (inverted for natural tilt)
  );

  const handleMouseLeave = () => {
    setIsHovering(false);
    // Reset rotation when mouse leaves
    mouseXSpring.set(0);
    mouseYSpring.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  return (
    <motion.h1
      ref={ref}
      className="font-bold uppercase text-8xl md:text-9xl tracking-wides cursor-pointer"
      style={{
        rotateX: isHovering ? rotateX : 0,
        rotateY: isHovering ? rotateY : 0,
        transformStyle: "preserve-3d", // Enable 3D transformations
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      BYTCD
    </motion.h1>
  );
};

export default Title;