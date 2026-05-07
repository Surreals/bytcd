import React, { useEffect, useRef } from 'react';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

const EasterEggs = () => {
  const toastRef = useRef(null);
  const saverRef = useRef(null);
  const floaterRef = useRef(null);

  useEffect(() => {
    console.log(
      '%cBYTCD%c — code · design · web\n\n%cyou opened the console. nice.\ntry the konami code → ↑ ↑ ↓ ↓ ← → ← → b a\nor type "BYTCD" anywhere on the page\nor click the logo seven times\nor stand still for 30s\nor hold any block for 1.5s\n\nwe\'re hiring. hi@bytcd.com',
      'font:800 28px ui-monospace;background:#c6ff00;color:#0a0a0a;padding:4px 10px',
      'font:400 14px ui-monospace;color:inherit',
      'font:400 12px ui-monospace;color:#888'
    );
  }, []);

  const showToast = (msg, ms = 2200) => {
    const el = toastRef.current;
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => el.classList.remove('show'), ms);
  };

  useEffect(() => {
    const onCustom = (e) => showToast(e.detail);
    window.addEventListener('bytcd-toast', onCustom);
    return () => window.removeEventListener('bytcd-toast', onCustom);
  }, []);

  // Konami + type "BYTCD"
  useEffect(() => {
    let kIdx = 0, typed = '';
    const onKey = (e) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (k === KONAMI[kIdx]) {
        kIdx++;
        if (kIdx === KONAMI.length) {
          kIdx = 0;
          document.documentElement.classList.toggle('surprise');
          showToast('★ KONAMI · surprise mode toggled');
        }
      } else {
        kIdx = (k === KONAMI[0]) ? 1 : 0;
      }

      if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
      if (e.key.length !== 1) return;
      typed = (typed + e.key.toUpperCase()).slice(-5);
      if (typed === 'BYTCD') {
        showToast('✦ B Y T C D ✦');
        document.documentElement.animate(
          [{ filter: 'invert(0)' }, { filter: 'invert(1)' }, { filter: 'invert(0)' }],
          { duration: 600 }
        );
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Idle screensaver
  useEffect(() => {
    let idleT, raf, fX = 120, fY = 120, vX = 2.2, vY = 1.6, pi = 0;
    const phrases = ['BYTCD ✦', 'code · design · web', 'press any key', 'still here?', 'byte‑sized studio', '✦ ✦ ✦', 'hi@bytcd.com'];
    const start = () => {
      const saver = saverRef.current, floater = floaterRef.current;
      if (!saver) return;
      saver.classList.add('on');
      const bounce = () => {
        const w = window.innerWidth, h = window.innerHeight;
        const fw = floater.offsetWidth || 200, fh = floater.offsetHeight || 60;
        fX += vX; fY += vY;
        if (fX < 0 || fX + fw > w) { vX *= -1; pi = (pi + 1) % phrases.length; floater.textContent = phrases[pi]; }
        if (fY < 0 || fY + fh > h) { vY *= -1; pi = (pi + 1) % phrases.length; floater.textContent = phrases[pi]; }
        floater.style.transform = `translate(${fX}px,${fY}px)`;
        raf = requestAnimationFrame(bounce);
      };
      bounce();
    };
    const stop = () => {
      const saver = saverRef.current;
      if (saver && saver.classList.contains('on')) {
        saver.classList.remove('on');
        cancelAnimationFrame(raf);
      }
    };
    const reset = () => { stop(); clearTimeout(idleT); idleT = setTimeout(start, 30000); };
    const evs = ['mousemove', 'keydown', 'scroll', 'touchstart', 'click'];
    evs.forEach((ev) => window.addEventListener(ev, reset, { passive: true }));
    reset();
    return () => {
      evs.forEach((ev) => window.removeEventListener(ev, reset));
      clearTimeout(idleT);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Long-press blocks
  useEffect(() => {
    const wire = () => {
      document.querySelectorAll('[data-block]').forEach((blk) => {
        if (blk.dataset.lpWired) return;
        blk.dataset.lpWired = '1';
        let lpT = null, fired = false;
        blk.addEventListener('mousedown', () => {
          fired = false;
          lpT = setTimeout(() => {
            fired = true;
            blk.style.transition = 'transform .4s ease';
            blk.style.transform = 'rotate(-1deg) scale(.98)';
            const which = blk.dataset.block;
            showToast(`☷ ${which.toUpperCase()} · built ${Math.floor(Math.random() * 40 + 10)}h · v${Math.floor(Math.random() * 9) + 1}.${Math.floor(Math.random() * 9)}`);
          }, 1500);
        });
        blk.addEventListener('mouseup', () => { clearTimeout(lpT); if (fired) setTimeout(() => { blk.style.transform = ''; }, 400); });
        blk.addEventListener('mouseleave', () => { clearTimeout(lpT); if (fired) { blk.style.transform = ''; fired = false; } });
      });
    };
    wire();
    const mo = new MutationObserver(wire);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, []);

  return (
    <>
      <div className="egg-toast" ref={toastRef} />
      <div className="saver" ref={saverRef}>
        <div className="floater" ref={floaterRef}>BYTCD ✦</div>
      </div>
    </>
  );
};

export default EasterEggs;
