import React from 'react';
import { motion } from 'framer-motion';
import useAnimatedSection, { sectionVariants } from '../hooks/useAnimatedSection';
import ServiceCard from './ServiceCard'; // Import the new ServiceCard
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

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
  const { t } = useTranslation(); // Initialize useTranslation

  const services = [
    {
      title: t("services_section.design_title"),
      iconName: "Palette", // Icon from Lucide React
      items: [
        t("services_section.design_items.0"),
        t("services_section.design_items.1"),
        t("services_section.design_items.2"),
        t("services_section.design_items.3"),
      ],
    },
    {
      title: t("services_section.development_title"),
      iconName: "Code", // Icon from Lucide React
      items: [
        t("services_section.development_items.0"),
        t("services_section.development_items.1"),
        t("services_section.development_items.2"),
        t("services_section.development_items.3"),
      ],
    },
    {
      title: t("services_section.consulting_title"),
      iconName: "Lightbulb", // Icon from Lucide React
      items: [
        t("services_section.consulting_items.0"),
        t("services_section.consulting_items.1"),
        t("services_section.consulting_items.2"),
        t("services_section.consulting_items.3"),
      ],
    },
    {
      title: t("services_section.maintenance_title"),
      iconName: "Wrench", // Icon from Lucide React
      items: [
        t("services_section.maintenance_items.0"),
        t("services_section.maintenance_items.1"),
        t("services_section.maintenance_items.2"),
        t("services_section.maintenance_items.3"),
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
      className="bg-white text-black p-8 md:p-16 py-20"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">{t('services_section.title')}</h2>
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