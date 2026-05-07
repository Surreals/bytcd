import dynamic from 'next/dynamic';
import {
  HeroSection,
  Marquee,
  ServicesSection,
  ClientShowcaseSection,
  ProcessSection,
  AboutSection,
  ContactSection,
  Links,
} from '../components';

const PlaygroundSection = dynamic(
  () => import('../components/PlaygroundSection'),
  { ssr: false }
);

export default function Home() {
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
