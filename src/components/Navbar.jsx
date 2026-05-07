import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [clicks, setClicks] = useState(0);
  const location = useLocation();

  const onLogoClick = () => {
    setClicks((c) => {
      const next = c + 1;
      if (next === 7) {
        document.documentElement.classList.toggle('surprise');
        window.dispatchEvent(new CustomEvent('bytcd-toast', { detail: 'SECRET MODE · click logo again to undo' }));
        return 0;
      }
      if (next >= 3) {
        window.dispatchEvent(new CustomEvent('bytcd-toast', { detail: `${7 - next} more...` }));
      }
      return next;
    });
  };

  useEffect(() => {
    const t = setTimeout(() => setClicks(0), 1500);
    return () => clearTimeout(t);
  }, [clicks]);

  const handleAnchor = (e, id) => {
    if (location.pathname !== '/') return;
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 30, behavior: 'smooth' });
  };

  return (
    <nav className="nav">
      <div className="logo" id="bytcd-logo" onClick={onLogoClick} title="bit + code">
        BYTCD<span className="dot" />
      </div>
      <div className="nav-links">
        <Link to="/" onClick={(e) => handleAnchor(e, 'work')}>work</Link>
        <Link to="/" onClick={(e) => handleAnchor(e, 'services')}>services</Link>
        <Link to="/" onClick={(e) => handleAnchor(e, 'process')}>process</Link>
        <Link to="/" onClick={(e) => handleAnchor(e, 'about')}>about</Link>
        <Link to="/contact-us" className="nav-pill">
          <span className="pulse" />open · q3
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
