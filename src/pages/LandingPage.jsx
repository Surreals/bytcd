import React from 'react';
import { Navbar, HeroSection, ThreeDShowcaseSection, AboutSection, ServicesSection, ContactSection, Links, ProcessSection, ClientShowcaseSection } from "../components"; // Added ProcessSection and ClientShowcaseSection

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      <HeroSection id="hero" />
      <ThreeDShowcaseSection />
      <AboutSection id="about" />
      <ProcessSection id="process" />
      <ClientShowcaseSection id="work" /> {/* New Client Showcase Section */}
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