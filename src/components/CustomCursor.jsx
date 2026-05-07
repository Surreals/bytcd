'use client';

import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(max-width: 780px)').matches) return;
    let x = 0, y = 0, tx = 0, ty = 0, raf;
    const onMove = (e) => {
      tx = e.clientX; ty = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${tx - 2}px,${ty - 2}px)`;
        dotRef.current.classList.add('ready');
        ringRef.current?.classList.add('ready');
      }
    };
    const tick = () => {
      x += (tx - x) * 0.2; y += (ty - y) * 0.2;
      if (ringRef.current) ringRef.current.style.transform = `translate(${x - 12}px,${y - 12}px)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', onMove);
    tick();

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
};

export default CustomCursor;
