"use client";

import React from 'react';
import { motion } from 'framer-motion';
import useAnimatedSection, { sectionVariants } from '../hooks/useAnimatedSection';
import ServiceCard from './ServiceCard'; // Import the new ServiceCard

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger the animation of child components
    },
  },
};

const ServicesSection = ({ id }) => { // Accept id prop
  const { ref, inView } = useAnimatedSection();

  const services = [
    {
      title: "Development",
      iconName: "Code", // Icon from Lucide React
      items: [
        "Frontend Development",
        "Backend Development",
        "Custom Web Applications",
        "E-commerce Solutions",
      ],
    },
    {
      title: "Design",
      iconName: "Palette", // Icon from Lucide React
      items: [
        "UI/UX Design",
        "Brand Identity & Logo Design",
        "Web & Mobile App Design",
        "Graphic Design",
      ],
    },
    {
      title: "Consulting",
      iconName: "Lightbulb", // Icon from Lucide React
      items: [
        "Digital Strategy",
        "Technology Roadmapping",
        "Performance Optimization",
        "Scalability Planning",
      ],
    },
    {
      title: "Maintenance",
      iconName: "Wrench", // Icon from Lucide React
      items: [
        "Technical Support",
        "Ongoing Maintenance",
        "Security Updates",
        "Content Management",
      ],
    },
  ];

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={sectionVariants}
      className="text-black p-8 md:p-16 py-24 relative overflow-hidden"
      style={{
        backgroundColor: '#ffffff',
        backgroundImage: `
          linear-gradient(#eef1f4 1px, transparent 1px),
          linear-gradient(to right, #eef1f4 1px, #ffffff 1px)
        `,
        backgroundSize: '40px 80px',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-16">Our Services</h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              items={service.items}
              iconName={service.iconName}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ServicesSection;