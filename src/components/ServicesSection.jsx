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
      title: "Maintenance & Support",
      iconName: "Wrench", // Icon from Lucide React
      items: [
        "Ongoing Website Maintenance",
        "Technical Support",
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
      className="bg-white text-black p-8 md:p-16 py-24"
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