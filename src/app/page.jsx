import {
  HeroSection,
  Marquee,
  PlaygroundSection,
  ServicesSection,
  ClientShowcaseSection,
  ProcessSection,
  AboutSection,
  ContactSection,
  Links,
} from '../components';

export default async function Home() {
  return (
    <>
      <HeroSection id="hero" />
      <Marquee />
      <PlaygroundSection />
      <ServicesSection id="services" />
      <ClientShowcaseSection id="work" />
      <ProcessSection id="process" />
      <AboutSection id="about" />
      <ContactSection id="contact" />
      <Links />
    </>
  );
}
