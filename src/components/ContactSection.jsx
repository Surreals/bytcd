import React from 'react';
import { Link } from 'react-router-dom';

const ContactSection = ({ id }) => (
  <section className="cta" id={id}>
    <h2>let's <em>build</em><br />something.</h2>
    <Link to="/contact-us" className="big">→ START A PROJECT</Link>
    <div style={{ marginTop: 24, fontSize: 11, color: 'color-mix(in oklab,var(--paper) 60%,transparent)' }}>
      or bytcdco@gmail.com · we reply within a day
    </div>
  </section>
);

export default ContactSection;
