import React, { useState } from 'react'; // Import useState
import { Navbar, HeroSection, ThreeDShowcaseSection, AboutSection, ServicesSection, ContactSection, Links, ProcessSection, ClientShowcaseSection, FlappyBlockGame } from "../components"; // Added FlappyBlockGame

const LandingPage = () => {
  const [showFlappyGame, setShowFlappyGame] = useState(false);

  const handleCreativeClick = () => {
    setShowFlappyGame(true);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      <HeroSection id="hero" />
      <ThreeDShowcaseSection onCreativeClick={handleCreativeClick} /> {/* Pass the callback */}
      {showFlappyGame && (
        <section className="w-full h-screen bg-black flex items-center justify-center">
          <FlappyBlockGame />
        </section>
      )}
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