"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import Info from '../components/Info';
import Links from '../components/Links';
import ContactForm from '../components/ContactForm'; // Import the new ContactForm
import useAnimatedSection, { sectionVariants } from '../hooks/useAnimatedSection';

const ContactUsPage = () => {
  const { ref, inView } = useAnimatedSection();

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Header/Info Section */}
      <header className="bg-black text-white p-4 md:p-8">
        <Info />
      </header>

      <motion.section
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="flex-grow bg-white text-black p-8 md:p-16 py-20 flex flex-col items-center justify-center"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Contact Us</h1>
          <p className="text-lg md:text-xl mb-12 leading-relaxed">
            We'd love to hear from you! Whether you have a project in mind, a question, or just want to say hello, feel free to reach out.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center text-center p-6 bg-gray-100 rounded-lg shadow-md">
              <Mail size={48} className="text-blue-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Email</h3>
              <a href="mailto:bytcdco@gmail.com" className="text-lg text-blue-600 hover:underline">info@bytcd.com</a>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-100 rounded-lg shadow-md">
              <Phone size={48} className="text-blue-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Phone</h3>
              <a href="tel:+380508489815" className="text-lg text-blue-600 hover:underline">+1 (234) 567-890</a>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-100 rounded-lg shadow-md">
              <MapPin size={48} className="text-blue-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Location</h3>
              <p className="text-lg">Uzhhorod, Ukraine</p>
            </div>
          </div>

          {/* Add the ContactForm component here */}
          <p className="text-lg md:text-xl">
            Alternatively, you can fill out the form below, and we'll get back to you as soon as possible.
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