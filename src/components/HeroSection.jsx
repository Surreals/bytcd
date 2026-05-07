'use client';

import React, { useEffect, useState } from 'react';

const HeroSection = ({ id }) => {
  const [time, setTime] = useState('— : —');

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Kyiv' }) + ' EET');
    tick();
    const i = setInterval(tick, 30000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    document.querySelectorAll('#bytcd-hero-title [data-ch]').forEach((el, i) => {
      el.style.transform = 'translateY(110%)';
      el.style.transition = `transform .9s cubic-bezier(.2,.8,.2,1) ${i * .09 + .1}s`;
      requestAnimationFrame(() => { el.style.transform = 'translateY(0)'; });
    });
  }, []);

  return (
    <header id={id} className="hero">
      <div className="meta-row">
        <div><b>STUDIO</b>independent · est. 2024</div>
        <div><b>STACK</b>code · design · web</div>
        <div><b>STATUS</b>{time} · online</div>
        <div><b>NEXT SLOT</b>q3 · 2026</div>
      </div>

      <h1 className="hero-title" id="bytcd-hero-title">
        <span className="ln"><span data-ch>BYTE‑</span></span>
        <span className="ln"><span data-ch><em>coded</em><span className="accent-bar" /></span></span>
        <span className="ln"><span data-ch>STUDIO.</span></span>
      </h1>

      <div className="hero-sub">
        <p>We build websites, products and identities with the care of a typesetter and the speed of a <span className="hl">make file</span>. Three humans. One pipeline. Zero stock components.</p>
        <a href="#contact" className="hero-cta" onClick={(e) => {
          e.preventDefault();
          const el = document.getElementById('contact');
          if (el) window.scrollTo({ top: el.offsetTop - 30, behavior: 'smooth' });
        }}>start a project <span className="arrow">→</span></a>
      </div>

      <div className="scroll-mark">scroll · 8 live demos below</div>
    </header>
  );
};

export default HeroSection;
