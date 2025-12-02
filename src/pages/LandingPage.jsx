import React from 'react';
import { Navbar, HeroSection, ThreeDShowcaseSection, AboutSection, ServicesSection, ContactSection, Links, ProcessSection, ClientShowcaseSection } from "../components"; // Removed CustomCursor
import SEO from '../components/SEO';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <SEO
        title="BYTCD - Creative Design & Development Studio | UI/UX, Web Development"
        description="BYTCD is a creative studio specializing in bespoke design and robust development. We transform ideas into stunning digital experiences, focusing on user-centric design and cutting-edge technology."
        keywords="web development, UI/UX design, digital design, web design, custom web applications, e-commerce solutions, brand identity, graphic design, digital strategy, frontend development, backend development"
        url="https://bytcd.com/"
      />
      {/* CustomCursor removed from here */}
      <Navbar />

      <HeroSection id="hero" />
      <ThreeDShowcaseSection />
      <AboutSection id="about" />
      <ProcessSection id="process" />
      <ClientShowcaseSection id="partners" /> {/* Змінено id з "work" на "partners" */}
      <ServicesSection id="services" />
      <ContactSection id="contact" />

      {/* Footer/Links Section */}
      <footer className="bg-black text-white p-4 md:p-8">
        <Links />
      </footer>
    </div>
  );
};

export default LandingPage;