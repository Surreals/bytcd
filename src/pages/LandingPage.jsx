import React from 'react';
import { Info, Links, HeroSection, ThreeDShowcaseSection, AboutSection, ServicesSection, ContactSection } from "../components";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header/Info Section */}
      <header className="bg-black text-white p-4 md:p-8">
        <Info />
      </header>

      <HeroSection />
      <ThreeDShowcaseSection />
      <AboutSection />
      <ServicesSection />
      <ContactSection />

      {/* Footer/Links Section */}
      <footer className="bg-black text-white p-4 md:p-8">
        <Links />
      </footer>
    </div>
  );
};

export default LandingPage;