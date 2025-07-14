import React from 'react';
import { Info, Links, Title } from "../components";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header/Info Section */}
      <header className="bg-black text-white p-4 md:p-8">
        <Info />
      </header>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen bg-white text-black p-4 md:p-8">
        <Title />
        <p className="mt-8 text-xl md:text-2xl text-center max-w-2xl">
          Crafting unique and convenient design and development solutions for your digital presence.
        </p>
      </section>

      {/* About Section */}
      <section className="bg-black text-white p-8 md:p-16 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">About BYTCD</h2>
          <p className="text-lg md:text-xl leading-relaxed">
            BYTCD is a creative studio specializing in bespoke design and robust development. We transform ideas into stunning digital experiences, focusing on user-centric design and cutting-edge technology to deliver solutions that stand out.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white text-black p-8 md:p-16 py-20">
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
      </section>

      {/* Contact Section */}
      <section className="bg-black text-white p-8 md:p-16 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Get in Touch</h2>
          <p className="text-lg md:text-xl mb-8">
            Ready to start your next project? Let's create something amazing together.
          </p>
          <a
            href="mailto:info@bytcd.com"
            className="inline-block bg-white text-black px-8 py-4 rounded-full text-xl font-semibold hover:bg-gray-200 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* Footer/Links Section */}
      <footer className="bg-black text-white p-4 md:p-8">
        <Links />
      </footer>
    </div>
  );
};

export default LandingPage;