'use client';
import React, { useState, useEffect } from 'react';

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      style={{
        position: 'fixed', bottom: 28, right: 28, zIndex: 48,
        fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700,
        letterSpacing: '.06em', textTransform: 'uppercase',
        background: 'var(--ink)', color: 'var(--paper)',
        border: '1px solid var(--ink)', borderRadius: 999,
        padding: '8px 14px', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 6,
        transition: 'background .2s, color .2s, border-color .2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--accent)';
        e.currentTarget.style.color = 'var(--accent-ink)';
        e.currentTarget.style.borderColor = 'var(--accent)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--ink)';
        e.currentTarget.style.color = 'var(--paper)';
        e.currentTarget.style.borderColor = 'var(--ink)';
      }}
    >
      ↑ top
    </button>
  );
};

export default BackToTopButton;
