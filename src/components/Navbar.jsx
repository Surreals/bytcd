'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { scrollToEl } from './SmoothScroller';

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) scrollToEl(el);
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const clicksRef = useRef(0);
  const resetTimer = useRef(null);

  const onLogoClick = (e) => {
    e.preventDefault();
    if (resetTimer.current) clearTimeout(resetTimer.current);
    clicksRef.current += 1;
    const n = clicksRef.current;
    if (n === 7) {
      document.documentElement.classList.toggle('surprise');
      window.dispatchEvent(new CustomEvent('bytcd-toast', { detail: 'SECRET MODE · click logo again to undo' }));
      clicksRef.current = 0;
    } else {
      if (n >= 3) window.dispatchEvent(new CustomEvent('bytcd-toast', { detail: `${7 - n} more...` }));
      if (pathname !== '/') router.push('/');
      resetTimer.current = setTimeout(() => { clicksRef.current = 0; }, 1500);
    }
  };

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close mobile sheet on route change, then scroll to hash if present
  useEffect(() => {
    setOpen(false);
    const hash = window.location.hash.slice(1);
    if (hash) setTimeout(() => scrollTo(hash), 80);
  }, [pathname]);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleDark = () => {
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    setDark(next);
  };

  const handleAnchor = (e, id) => {
    setOpen(false);
    if (pathname !== '/') return; // let Next.js navigate to /#id, pathname effect handles scroll
    e.preventDefault();
    scrollTo(id);
  };

  return (
    <>
      <nav className="nav">
        <Link href="/" className="logo" id="bytcd-logo" onClick={onLogoClick} title="bit + code">
          BYTCD<span className="dot" />
        </Link>
        <div className="nav-links">
          <Link href="/#work"     onClick={(e) => handleAnchor(e, 'work')}>work</Link>
          <Link href="/#services" onClick={(e) => handleAnchor(e, 'services')}>services</Link>
          <Link href="/#process"  onClick={(e) => handleAnchor(e, 'process')}>process</Link>
          <Link href="/#about"    onClick={(e) => handleAnchor(e, 'about')}>about</Link>
          <button
            className="theme-btn"
            aria-label={dark ? 'switch to light mode' : 'switch to dark mode'}
            onClick={toggleDark}
          >
            {dark ? '○' : '●'}
          </button>
          <Link href="/contact-us" className="nav-pill">
            <span className="pulse" aria-hidden="true" />
            <span>open</span>
            <span className="nav-pill-sep" aria-hidden="true">·</span>
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
        <Link href="/#work"     onClick={(e) => handleAnchor(e, 'work')}>work <span className="arr">→</span></Link>
        <Link href="/#services" onClick={(e) => handleAnchor(e, 'services')}>services <span className="arr">→</span></Link>
        <Link href="/#process"  onClick={(e) => handleAnchor(e, 'process')}>process <span className="arr">→</span></Link>
        <Link href="/#about"    onClick={(e) => handleAnchor(e, 'about')}>about <span className="arr">→</span></Link>
        <Link href="/contact-us" onClick={() => setOpen(false)}><em>contact</em> <span className="arr">↗</span></Link>
        <div className="ms-foot">
          <span>BYTCD © {new Date().getFullYear()}</span>
          <button
            className="theme-btn"
            style={{ border: 'none', color: 'rgba(246,245,241,.55)', padding: 0, background: 'none' }}
            onClick={toggleDark}
          >
            {dark ? '○ light' : '● dark'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
