import React from 'react';
import {
  Navbar,
  HeroSection,
  Marquee,
  PlaygroundSection,
  ServicesSection,
  ClientShowcaseSection,
  ProcessSection,
  AboutSection,
  ContactSection,
  Links,
  EasterEggs,
} from '../components';
import SEO from '../components/SEO';

const LandingPage = () => (
  <>
    <SEO
      title="BYTCD — Code · Design · Web"
      description="BYTCD is a byte-sized studio for code, design and the web. Three humans, fixed prices, weekly demos. Selected work includes Carbook.pro and GalInfo."
      keywords="bytcd, web development, ui/ux design, web design, react, vite, brand identity, frontend, backend, custom web applications, carbook, galinfo"
      url="https://bytcd.com/"
    />
    <Navbar />
    <HeroSection id="hero" />
    <Marquee />
    <PlaygroundSection />
    <ServicesSection id="services" />
    <ClientShowcaseSection id="work" />
    <ProcessSection id="process" />
    <AboutSection id="about" />
    <ContactSection id="contact" />
    <Links />
    <EasterEggs />
  </>
);

export default LandingPage;
