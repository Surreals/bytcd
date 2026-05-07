'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [clicks, setClicks] = useState(0);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  );
  const pathname = usePathname();

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

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  const handleAnchor = (e, id) => {
    setOpen(false);
    if (pathname !== '/') return;
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 30, behavior: 'smooth' });
  };

  return (
    <>
      <nav className="nav">
        <div className="logo" id="bytcd-logo" onClick={onLogoClick} title="bit + code">
          BYTCD<span className="dot" />
        </div>
        <div className="nav-links">
          <Link href="/" onClick={(e) => handleAnchor(e, 'work')}>work</Link>
          <Link href="/" onClick={(e) => handleAnchor(e, 'services')}>services</Link>
          <Link href="/" onClick={(e) => handleAnchor(e, 'process')}>process</Link>
          <Link href="/" onClick={(e) => handleAnchor(e, 'about')}>about</Link>
          <button
            className="theme-btn"
            aria-label={dark ? 'switch to light mode' : 'switch to dark mode'}
            onClick={() => setDark((v) => !v)}
          >
            {dark ? '○' : '●'}
          </button>
          <Link href="/contact-us" className="nav-pill">
            <span className="pulse" aria-hidden="true" />
            <span>open</span>
            <span className="nav-pill-sep" aria-hidden="true">
              ·
            </span>
            <span>q3</span>
          </Link>
        </div>
        <button
          className={`menu-btn${open ? ' on' : ''}`}
          aria-label="menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-sheet open${open ? ' on' : ''}`} aria-hidden={!open}>
        <Link href="/" onClick={(e) => handleAnchor(e, 'work')}>work <span className="arr">→</span></Link>
        <Link href="/" onClick={(e) => handleAnchor(e, 'services')}>services <span className="arr">→</span></Link>
        <Link href="/" onClick={(e) => handleAnchor(e, 'process')}>process <span className="arr">→</span></Link>
        <Link href="/" onClick={(e) => handleAnchor(e, 'about')}>about <span className="arr">→</span></Link>
        <Link href="/contact-us" onClick={() => setOpen(false)}><em>contact</em> <span className="arr">↗</span></Link>
        <div className="ms-foot">
          <span>BYTCD © {new Date().getFullYear()}</span>
          <button
            className="theme-btn"
            style={{ border: 'none', color: 'rgba(246,245,241,.55)', padding: 0, background: 'none' }}
            onClick={() => setDark((v) => !v)}
          >
            {dark ? '○ light' : '● dark'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
