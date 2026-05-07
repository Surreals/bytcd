import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Navbar, Links, ContactForm } from '../components';
import useAnimatedSection, { sectionVariants } from '../hooks/useAnimatedSection';
import SEO from '../components/SEO';

const cardStyle = {
  background: 'color-mix(in oklab, var(--ink) 4%, var(--paper))',
  border: '1px solid var(--line)',
};

const ContactUsPage = () => {
  const { ref, inView } = useAnimatedSection();

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Contact Us - BYTCD | Get in Touch"
        description="Get in touch with BYTCD. We'd love to hear from you! Whether you have a project in mind, a question, or just want to say hello, feel free to reach out."
        keywords="contact BYTCD, web development contact, UI/UX design contact, digital design services, get in touch"
        url="https://bytcd.com/contact-us"
      />
      <Navbar />

      <motion.section
        ref={ref}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={sectionVariants}
        className="flex-grow p-8 md:p-16 py-24 flex flex-col items-center justify-center"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">Contact Us</h1>
          <p className="text-lg md:text-2xl mb-12 leading-relaxed font-light">
            We'd love to hear from you! Whether you have a project in mind, a question, or just want to say hello, feel free to reach out.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center text-center p-6 rounded-xl shadow-sm" style={cardStyle}>
              <Mail size={48} className="mb-4" style={{ color: 'var(--ink)' }} />
              <h3 className="text-2xl font-semibold mb-2">Email</h3>
              <a href="mailto:bytcdco@gmail.com" className="text-lg hover:underline" style={{ color: 'var(--ink)' }}>bytcdco@gmail.com</a>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl shadow-sm" style={cardStyle}>
              <Phone size={48} className="mb-4" style={{ color: 'var(--ink)' }} />
              <h3 className="text-2xl font-semibold mb-2">Phone</h3>
              <a href="tel:+380508489815" className="text-lg hover:underline" style={{ color: 'var(--ink)' }}>+380 (50) 848-98-15</a>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl shadow-sm" style={cardStyle}>
              <MapPin size={48} className="mb-4" style={{ color: 'var(--ink)' }} />
              <h3 className="text-2xl font-semibold mb-2">Location</h3>
              <p className="text-lg" style={{ color: 'var(--mute)' }}>Uzhhorod, Ukraine</p>
            </div>
          </div>

          <p className="text-lg md:text-xl font-light">
            Alternatively, you can fill out the form below, and we'll get back to you as soon as possible.
          </p>
          <ContactForm />
        </div>
      </motion.section>

      <Links />
    </div>
  );
};

export default ContactUsPage;
