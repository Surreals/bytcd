import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react'; // Import all icons

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const ServiceCard = ({ title, items, iconName }) => {
  const Icon = LucideIcons[iconName] || LucideIcons.Box; // Fallback to a default icon

  return (
    <motion.div
      variants={itemVariants}
      className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center border border-gray-100"
    >
      {Icon && <Icon size={48} className="text-blue-600 mb-4" />}
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <ul className="list-none space-y-2 text-sm text-gray-700">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </motion.div>
  );
};

export default ServiceCard;