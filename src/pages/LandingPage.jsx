import React from 'react';
import { Navbar, HeroSection, ThreeDShowcaseSection, AboutSection, ServicesSection, ContactSection, BackToTopButton, Links } from "../components"; // Import Links

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      <HeroSection id="hero" />
      <ThreeDShowcaseSection />
      <AboutSection id="about" />
      <ServicesSection id="services" />
      <ContactSection id="contact" />

      {/* Footer/Links Section */}
      <footer className="bg-black text-white p-4 md:p-8">
        <Links /> {/* Add the Links component here */}
      </footer>

      <BackToTopButton />
    </div>
  );
};

export default LandingPage;