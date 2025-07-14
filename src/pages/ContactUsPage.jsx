"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Navbar, Links, ContactForm } from '../components';
import useAnimatedSection, { sectionVariants } from '../hooks/useAnimatedSection';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const ContactUsPage = () => {
  const { ref, inView } = useAnimatedSection();
  const { t } = useTranslation(); // Initialize useTranslation

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Header/Info Section - Replaced with Navbar */}
      <Navbar />

      <motion.section
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="flex-grow bg-white text-black p-8 md:p-16 py-20 flex flex-col items-center justify-center"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">{t('contact_us_page.title')}</h1>
          <p className="text-lg md:text-xl mb-12 leading-relaxed">
            {t('contact_us_page.description')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center text-center p-6 bg-gray-100 rounded-lg shadow-md">
              <Mail size={48} className="text-blue-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">{t('contact_us_page.email_title')}</h3>
              <a href="mailto:bytcdco@gmail.com" className="text-lg text-blue-600 hover:underline">bytcdco@gmail.com</a>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-100 rounded-lg shadow-md">
              <Phone size={48} className="text-blue-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">{t('contact_us_page.phone_title')}</h3>
              <a href="tel:+380508489815" className="text-lg text-blue-600 hover:underline">+380 (50) 848-98-15</a>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-100 rounded-lg shadow-md">
              <MapPin size={48} className="text-blue-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">{t('contact_us_page.location_title')}</h3>
              <p className="text-lg">{t('contact_us_page.location_text')}</p>
            </div>
          </div>

          <p className="text-lg md:text-xl">
            {t('contact_us_page.form_intro')}
          </p>
          <ContactForm />
        </div>
      </motion.section>

      {/* Footer/Links Section */}
      <footer className="bg-black text-white p-4 md:p-8 mt-auto">
        <Links />
      </footer>
    </div>
  );
};

export default ContactUsPage;