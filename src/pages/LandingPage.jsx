import React from 'react';
import { Info, Links, Title, ThreeDShowcase } from "../components";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const LandingPage = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const useAnimatedSection = () => {
    const [ref, inView] = useInView({
      triggerOnce: true, // Only trigger the animation once
      threshold: 0.1,    // Trigger when 10% of the section is visible
    });
    return { ref, inView };
  };

  const { ref: heroRef, inView: heroInView } = useAnimatedSection();
  const { ref: threeDRef, inView: threeDInView } = useAnimatedSection();
  const { ref: aboutRef, inView: aboutInView } = useAnimatedSection();
  const { ref: servicesRef, inView: servicesInView } = useAnimatedSection();
  const { ref: contactRef, inView: contactInView } = useAnimatedSection();

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header/Info Section */}
      <header className="bg-black text-white p-4 md:p-8">
        <Info />
      </header>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="relative flex flex-col items-center justify-center min-h-screen bg-white text-black p-4 md:p-8"
      >
        <Title />
        <p className="mt-8 text-xl md:text-2xl text-center max-w-2xl">
          Crafting unique and convenient design and development solutions for your digital presence.
        </p>
      </motion.section>

      {/* Three.js Showcase Section */}
      <motion.section
        ref={threeDRef}
        initial="hidden"
        animate={threeDInView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="bg-black text-white p-8 md:p-16 py-20 flex flex-col items-center justify-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">Our Creative Vision</h2>
        <p className="text-lg md:text-xl mb-12 text-center max-w-3xl">
          Explore a glimpse of our innovative design approach through interactive 3D experiences.
        </p>
        <div className="w-full max-w-4xl aspect-video bg-gray-900 rounded-lg overflow-hidden">
          <ThreeDShowcase />
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        ref={aboutRef}
        initial="hidden"
        animate={aboutInView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="bg-black text-white p-8 md:p-16 py-20"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">About BYTCD</h2>
          <p className="text-lg md:text-xl leading-relaxed">
            BYTCD is a creative studio specializing in bespoke design and robust development. We transform ideas into stunning digital experiences, focusing on user-centric design and cutting-edge technology to deliver solutions that stand out.
          </p>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        ref={servicesRef}
        initial="hidden"
        animate={servicesInView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="bg-white text-black p-8 md:p-16 py-20"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Design</h3>
              <ul className="list-disc list-inside space-y-2 text-lg">
                <li>UI/UX Design</li>
                <li>Brand Identity & Logo Design</li>
                <li>Web & Mobile App Design</li>
                <li>Graphic Design</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Development</h3>
              <ul className="list-disc list-inside space-y-2 text-lg">
                <li>Frontend Development (React, Vue)</li>
                <li>Backend Development (Node.js, Firebase)</li>
                <li>Custom Web Applications</li>
                <li>E-commerce Solutions</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        ref={contactRef}
        initial="hidden"
        animate={contactInView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="bg-black text-white p-8 md:p-16 py-20"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Get in Touch</h2>
          <p className="text-lg md:text-xl mb-8">
            Ready to start your next project? Let's create something amazing together.
          </p>
          <a
            href="mailto:info@bytcd.com"
            className="inline-block bg-white text-black px-8 py-4 rounded-full text-xl font-semibold hover:bg-blue-500 hover:text-white transition-colors"
          >
            Contact Us
          </a>
        </div>
      </motion.section>

      {/* Footer/Links Section */}
      <footer className="bg-black text-white p-4 md:p-8">
        <Links />
      </footer>
    </div>
  );
};

export default LandingPage;