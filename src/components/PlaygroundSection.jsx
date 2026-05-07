import React, { useEffect, useRef, useState } from 'react';

// ── 01 Magnet grid ─────────────────────────────────────────────
const MagnetBlock = () => {
  const stageRef = useRef(null);
  const cvRef = useRef(null);
  useEffect(() => {
    const stage = stageRef.current;
    const cv = cvRef.current;
    const ctx = cv.getContext('2d');
    let W, H, dots = [], mouse = { x: -9e3, y: -9e3, inside: false }, raf;
    const fit = () => {
      const r = stage.getBoundingClientRect();
      W = cv.width = r.width * devicePixelRatio;
      H = cv.height = r.height * devicePixelRatio;
      cv.style.width = r.width + 'px'; cv.style.height = r.height + 'px';
      const gap = 18 * devicePixelRatio;
      dots = [];
      for (let y = gap; y < H; y += gap)
        for (let x = gap; x < W; x += gap) dots.push({ x, y, ox: x, oy: y });
    };
    fit();
    const onResize = () => fit();
    window.addEventListener('resize', onResize);
    const setM = (cx, cy) => {
      const r = stage.getBoundingClientRect();
      mouse.x = (cx - r.left) * devicePixelRatio;
      mouse.y = (cy - r.top) * devicePixelRatio;
      mouse.inside = true;
    };
    const onMove = (e) => setM(e.clientX, e.clientY);
    const onLeave = () => { mouse.inside = false; };
    const onTouch = (e) => { e.preventDefault(); setM(e.touches[0].clientX, e.touches[0].clientY); };
    const onTouchEnd = () => { mouse.inside = false; };
    stage.addEventListener('mousemove', onMove);
    stage.addEventListener('mouseleave', onLeave);
    stage.addEventListener('touchmove', onTouch, { passive: false });
    stage.addEventListener('touchend', onTouchEnd);
    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#c6ff00';
      const ink = getComputedStyle(document.documentElement).getPropertyValue('--ink').trim() || '#000';
      for (const d of dots) {
        const dx = mouse.x - d.x, dy = mouse.y - d.y;
        const dist = Math.hypot(dx, dy);
        const R = 90 * devicePixelRatio;
        const force = mouse.inside && dist < R ? 1 - dist / R : 0;
        const tx = d.ox - dx / Math.max(dist, 1) * force * 40 * devicePixelRatio;
        const ty = d.oy - dy / Math.max(dist, 1) * force * 40 * devicePixelRatio;
        d.x += (tx - d.x) * 0.18; d.y += (ty - d.y) * 0.18;
        ctx.fillStyle = force > 0.05 ? accent : ink;
        ctx.fillRect(d.x - 1, d.y - 1, 2 + force * 3, 2 + force * 3);
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      window.removeEventListener('resize', onResize);
      stage.removeEventListener('mousemove', onMove);
      stage.removeEventListener('mouseleave', onLeave);
      stage.removeEventListener('touchmove', onTouch);
      stage.removeEventListener('touchend', onTouchEnd);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <article className="blk span-6" data-block="magnet">
      <div className="blk-hd"><span className="num">[01]</span><span>cursor · magnet</span></div>
      <h3 className="blk-ti">Magnet grid</h3>
      <p className="blk-tag">512 dots warp toward your cursor with realistic field decay. Move slowly across the canvas.</p>
      <div className="stage" ref={stageRef}>
        <canvas ref={cvRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
        <span className="legend">hover anywhere</span>
      </div>
    </article>
  );
};

// ── 02 Live editor ─────────────────────────────────────────────
const EditorBlock = () => {
  const initial = `<h1>hello, world.</h1>
<p>edit me →</p>
<button>click</button>
<style>
  h1 { font-family: serif; font-style: italic; }
  button {
    background: #c6ff00;
    border: 0; padding: 8px 14px;
  }
</style>`;
  const [code, setCode] = useState(initial);
  return (
    <article className="blk span-6" data-block="editor">
      <div className="blk-hd"><span className="num">[02]</span><span>live · editor</span></div>
      <h3 className="blk-ti">Type. We render.</h3>
      <p className="blk-tag">An actual HTML/CSS sandbox. Edit the left, watch the right. No iframe smoke and mirrors.</p>
      <div className="code-editor">
        <span className="pane-tag" style={{ left: 6, top: 6 }}>SOURCE</span>
        <span className="pane-tag" style={{ right: 6, top: 6 }}>RENDER</span>
        <div className="code-pane"><textarea spellCheck="false" value={code} onChange={(e) => setCode(e.target.value)} /></div>
        <div className="preview-pane" dangerouslySetInnerHTML={{ __html: code }} />
      </div>
    </article>
  );
};

// ── 03 Particles ───────────────────────────────────────────────
const ParticlesBlock = () => {
  const stageRef = useRef(null);
  const cvRef = useRef(null);
  useEffect(() => {
    const stage = stageRef.current, cv = cvRef.current;
    const ctx = cv.getContext('2d');
    let W, H, parts = [], mouse = { x: -9e3, y: -9e3 }, raf;
    const fit = () => {
      const r = stage.getBoundingClientRect();
      W = cv.width = r.width * devicePixelRatio;
      H = cv.height = r.height * devicePixelRatio;
      cv.style.width = r.width + 'px'; cv.style.height = r.height + 'px';
      parts = [];
      const N = Math.floor((W * H) / (70 * 70));
      for (let i = 0; i < N; i++) parts.push({ x: Math.random() * W, y: Math.random() * H, vx: 0, vy: 0, r: 1 + Math.random() * 2 });
    };
    fit();
    const onResize = () => fit();
    window.addEventListener('resize', onResize);
    const setM = (cx, cy) => {
      const r = stage.getBoundingClientRect();
      mouse.x = (cx - r.left) * devicePixelRatio;
      mouse.y = (cy - r.top) * devicePixelRatio;
    };
    const onMove = (e) => setM(e.clientX, e.clientY);
    const onLeave = () => { mouse.x = -9e3; mouse.y = -9e3; };
    const onTouch = (e) => { e.preventDefault(); setM(e.touches[0].clientX, e.touches[0].clientY); };
    const onTouchEnd = () => { mouse.x = -9e3; mouse.y = -9e3; };
    stage.addEventListener('mousemove', onMove);
    stage.addEventListener('mouseleave', onLeave);
    stage.addEventListener('touchmove', onTouch, { passive: false });
    stage.addEventListener('touchend', onTouchEnd);
    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#c6ff00';
      const ink = getComputedStyle(document.documentElement).getPropertyValue('--ink').trim() || '#000';
      for (const p of parts) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy), R = 80 * devicePixelRatio;
        if (d < R) { const f = (1 - d / R) * 1.5; p.vx += dx / Math.max(d, 1) * f; p.vy += dy / Math.max(d, 1) * f; }
        p.vx *= 0.94; p.vy *= 0.94; p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.fillStyle = Math.hypot(p.vx, p.vy) > 0.5 ? accent : ink;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * devicePixelRatio, 0, Math.PI * 2); ctx.fill();
      }
      ctx.strokeStyle = 'rgba(128,128,128,0.18)'; ctx.lineWidth = 1 * devicePixelRatio;
      for (let i = 0; i < parts.length; i++) for (let j = i + 1; j < parts.length; j++) {
        const a = parts[i], b = parts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 60 * devicePixelRatio) {
          ctx.globalAlpha = 1 - d / (60 * devicePixelRatio);
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      window.removeEventListener('resize', onResize);
      stage.removeEventListener('mousemove', onMove);
      stage.removeEventListener('mouseleave', onLeave);
      stage.removeEventListener('touchmove', onTouch);
      stage.removeEventListener('touchend', onTouchEnd);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <article className="blk span-4" data-block="particles">
      <div className="blk-hd"><span className="num">[03]</span><span>physics · field</span></div>
      <h3 className="blk-ti">Particle field</h3>
      <p className="blk-tag">Lightweight Verlet sim. Cursor pushes, gravity pulls, friction settles.</p>
      <div className="stage" ref={stageRef}>
        <canvas ref={cvRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
        <span className="legend">push particles</span>
      </div>
    </article>
  );
};

// ── 04 Sketchpad ───────────────────────────────────────────────
const DrawBlock = () => {
  const stageRef = useRef(null);
  const svgRef = useRef(null);
  useEffect(() => {
    const stage = stageRef.current, svg = svgRef.current;
    let path = null;
    const onMove = (e) => {
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width * 400;
      const y = (e.clientY - r.top) / r.height * 300;
      if (!path) {
        path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', 'currentColor');
        path.setAttribute('stroke-width', '1.2');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('d', `M${x.toFixed(1)} ${y.toFixed(1)}`);
        svg.appendChild(path);
      } else {
        path.setAttribute('d', path.getAttribute('d') + ` L${x.toFixed(1)} ${y.toFixed(1)}`);
      }
    };
    const onLeave = () => { path = null; };
    const onDbl = () => { svg.innerHTML = ''; path = null; };
    stage.addEventListener('mousemove', onMove);
    stage.addEventListener('mouseleave', onLeave);
    stage.addEventListener('dblclick', onDbl);
    return () => {
      stage.removeEventListener('mousemove', onMove);
      stage.removeEventListener('mouseleave', onLeave);
      stage.removeEventListener('dblclick', onDbl);
    };
  }, []);
  return (
    <article className="blk span-4" data-block="draw">
      <div className="blk-hd"><span className="num">[04]</span><span>svg · trail</span></div>
      <h3 className="blk-ti">Sketchpad</h3>
      <p className="blk-tag">Hover to draw. Double-click to clear. We export to SVG in real life.</p>
      <div className="stage" ref={stageRef}>
        <svg ref={svgRef} viewBox="0 0 400 300" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }} />
        <span className="legend">hover · dbl-click clears</span>
      </div>
    </article>
  );
};

// ── 05 ASCII ──────────────────────────────────────────────────
const AsciiBlock = () => {
  const stageRef = useRef(null);
  const preRef = useRef(null);
  useEffect(() => {
    const stage = stageRef.current, pre = preRef.current;
    const ramp = ' .·:-=+*#%@';
    let cols = 40, rows = 18, mouse = { x: cols / 2, y: rows / 2 }, t = 0, raf;
    const fit = () => {
      const r = stage.getBoundingClientRect();
      cols = Math.floor(r.width / 6.5);
      rows = Math.floor(r.height / 11);
    };
    fit();
    window.addEventListener('resize', fit);
    const setM = (cx, cy) => {
      const r = stage.getBoundingClientRect();
      mouse.x = (cx - r.left) / r.width * cols;
      mouse.y = (cy - r.top) / r.height * rows;
    };
    const onMove = (e) => setM(e.clientX, e.clientY);
    const onTouch = (e) => { e.preventDefault(); setM(e.touches[0].clientX, e.touches[0].clientY); };
    stage.addEventListener('mousemove', onMove);
    stage.addEventListener('touchmove', onTouch, { passive: false });
    const tick = () => {
      t += 0.04;
      let s = '';
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const dx = x - mouse.x, dy = (y - mouse.y) * 1.8, d = Math.hypot(dx, dy);
          const wave = Math.sin(d * 0.6 - t * 1.4);
          const v = Math.max(0, Math.min(1, 0.5 + 0.5 * wave - d * 0.02));
          s += ramp[Math.floor(v * (ramp.length - 1))];
        }
        s += '\n';
      }
      pre.textContent = s;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      window.removeEventListener('resize', fit);
      stage.removeEventListener('mousemove', onMove);
      stage.removeEventListener('touchmove', onTouch);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <article className="blk span-4" data-block="ascii">
      <div className="blk-hd"><span className="num">[05]</span><span>ascii · morph</span></div>
      <h3 className="blk-ti">ASCII engine</h3>
      <p className="blk-tag">A real-time density field. Cursor distance maps to character ramp.</p>
      <div className="stage" ref={stageRef}>
        <pre ref={preRef} style={{ margin: 0, fontSize: 10, lineHeight: 1.05, letterSpacing: '.5px', color: 'var(--ink)' }} />
      </div>
    </article>
  );
};

// ── 06 Color mixer ────────────────────────────────────────────
const ColorBlock = () => {
  const [stops, setStops] = useState([
    { h: 84, c: 0.18, l: 0.92 },
    { h: 140, c: 0.14, l: 0.55 },
    { h: 230, c: 0.18, l: 0.32 },
    { h: 330, c: 0.16, l: 0.55 },
  ]);
  const stopsRef = useRef(stops);
  stopsRef.current = stops;

  const startDrag = (i) => (e) => {
    e.preventDefault();
    const startY = e.clientY, startX = e.clientX;
    const sH = stopsRef.current[i].h, sL = stopsRef.current[i].l;
    const move = (ev) => {
      const dy = (ev.clientY - startY) / 200;
      const dx = (ev.clientX - startX) / 200;
      setStops((cur) => cur.map((s, j) => j === i
        ? { ...s, l: Math.max(0.1, Math.min(0.95, sL - dy)), h: (sH + dx * 120 + 360) % 360 }
        : s));
    };
    const up = () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  return (
    <article className="blk span-6" data-block="color">
      <div className="blk-hd"><span className="num">[06]</span><span>color · oklch playground</span></div>
      <h3 className="blk-ti">Mix a palette</h3>
      <p className="blk-tag">Drag the swatches. We compute a five-stop ramp in OKLCH so it never goes muddy.</p>
      <div className="stage" style={{ padding: 0 }}>
        <div style={{ display: 'flex', width: '100%', height: '100%' }}>
          {stops.map((s, i) => (
            <div key={i} onMouseDown={startDrag(i)} style={{
              flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 10,
              background: `oklch(${s.l} ${s.c} ${s.h})`,
              color: s.l > 0.55 ? '#0a0a0a' : '#f6f5f1',
              fontSize: 9, letterSpacing: '.04em', cursor: 'ns-resize', position: 'relative',
              fontFamily: 'var(--mono)',
            }}>
              <div style={{ opacity: .75 }}>OKLCH</div>
              <div>{s.l.toFixed(2)} · {s.c.toFixed(2)} · {Math.round(s.h)}°</div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

// ── 07 Tilt card ──────────────────────────────────────────────
const TiltBlock = () => {
  const stageRef = useRef(null);
  const cardRef = useRef(null);
  useEffect(() => {
    const stage = stageRef.current, card = cardRef.current;
    const onMove = (e) => {
      const r = stage.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `rotateY(${px * 30}deg) rotateX(${-py * 30}deg) translateZ(0)`;
    };
    const onLeave = () => { card.style.transform = 'rotateY(0) rotateX(0)'; };
    stage.addEventListener('mousemove', onMove);
    stage.addEventListener('mouseleave', onLeave);
    return () => { stage.removeEventListener('mousemove', onMove); stage.removeEventListener('mouseleave', onLeave); };
  }, []);
  return (
    <article className="blk span-6" data-block="tilt">
      <div className="blk-hd"><span className="num">[07]</span><span>3d · tilt</span></div>
      <h3 className="blk-ti">Tilt card</h3>
      <p className="blk-tag">CSS 3D. Follows your cursor.</p>
      <div className="stage" ref={stageRef} style={{ perspective: '600px' }}>
        <div ref={cardRef} style={{
          width: '60%', aspectRatio: '.7', background: 'var(--ink)', color: 'var(--paper)',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 14,
          fontFamily: 'var(--mono)', fontSize: 10, transition: 'transform .12s ease',
          transformStyle: 'preserve-3d', border: '1px solid var(--ink)', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>BYTCD</span><span>★</span></div>
          <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 24, lineHeight: 1 }}>made<br />by<br />hand</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: 'color-mix(in oklab,var(--paper) 55%,transparent)' }}>
            <span>2026</span><span>NO. 0007</span>
          </div>
        </div>
      </div>
    </article>
  );
};

// ── 08 Terminal ───────────────────────────────────────────────
const TerminalBlock = () => {
  const stageRef = useRef(null);
  const outRef = useRef(null);
  useEffect(() => {
    const stage = stageRef.current, out = outRef.current;
    let buf = '', history = ['<div style="color:#6b7280">BYTCD shell v1.0 · type \'help\'</div>'];
    const esc = (s) => s.replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));
    const prompt = () => `<div><span style="color:#6b7280">guest@bytcd</span> <span style="opacity:.5">~</span> $ ${esc(buf)}<span style="background:#c6ff00;color:#0a0a0a">_</span></div>`;
    const render = () => { out.innerHTML = history.join('') + prompt(); stage.scrollTop = stage.scrollHeight; };
    const run = (cmd) => {
      const c = cmd.trim().toLowerCase(); let r = '';
      if (c === 'help') r = `available: help · about · services · clear · whoami · sudo · open work · ls · echo &lt;text&gt;`;
      else if (c === 'about') r = `BYTCD — three humans making code, design and the web. since 2021.`;
      else if (c === 'services') r = `1. code     2. design     3. web`;
      else if (c === 'whoami') r = `you are: a person of taste`;
      else if (c === 'ls') r = `index.html  contact-us  ./.secrets`;
      else if (c === 'clear') { history = []; return; }
      else if (c === 'open work') { window.scrollTo({ top: document.getElementById('work')?.offsetTop - 30, behavior: 'smooth' }); return; }
      else if (c.startsWith('echo ')) r = esc(cmd.slice(5));
      else if (c === 'sudo') r = `<span style="color:#ff6b6b">nice try.</span>`;
      else if (c === '') r = '';
      else r = `<span style="color:#ff6b6b">cmd not found:</span> ${esc(c)} · try 'help'`;
      history.push(`<div><span style="color:#6b7280">guest@bytcd</span> <span style="opacity:.5">~</span> $ ${esc(cmd)}</div>`);
      if (r) history.push(`<div style="color:#e7e5dc">${r}</div>`);
    };
    stage.tabIndex = 0;
    const onClick = () => stage.focus();
    const onKey = (e) => {
      e.preventDefault();
      if (e.key === 'Enter') { run(buf); buf = ''; }
      else if (e.key === 'Backspace') buf = buf.slice(0, -1);
      else if (e.key.length === 1) buf += e.key;
      render();
    };
    stage.addEventListener('click', onClick);
    stage.addEventListener('keydown', onKey);
    render();
    return () => { stage.removeEventListener('click', onClick); stage.removeEventListener('keydown', onKey); };
  }, []);
  return (
    <article className="blk span-6" data-block="terminal">
      <div className="blk-hd"><span className="num">[08]</span><span>shell · type</span></div>
      <h3 className="blk-ti">Terminal</h3>
      <p className="blk-tag">Type <span className="kbd">help</span>.</p>
      <div className="stage" ref={stageRef} style={{
        background: '#0a0a0a', color: '#c6ff00', padding: 12,
        alignItems: 'flex-start', justifyContent: 'flex-start',
        fontSize: 11, lineHeight: 1.5, textAlign: 'left',
      }}>
        <div ref={outRef} style={{ whiteSpace: 'pre-wrap', width: '100%' }} />
      </div>
    </article>
  );
};

// ── 09 Variable type ──────────────────────────────────────────
const TypeBlock = () => {
  const stageRef = useRef(null);
  const wordRef = useRef(null);
  useEffect(() => {
    const stage = stageRef.current, word = wordRef.current;
    let locked = false;
    const onMove = (e) => {
      if (locked) return;
      const r = stage.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      word.style.fontWeight = Math.round(200 + px * 600);
      word.style.fontSize = Math.round(40 + (1 - py) * 120) + 'px';
    };
    const onClick = () => { locked = !locked; word.style.color = locked ? 'var(--accent)' : 'var(--ink)'; };
    stage.addEventListener('mousemove', onMove);
    stage.addEventListener('click', onClick);
    return () => { stage.removeEventListener('mousemove', onMove); stage.removeEventListener('click', onClick); };
  }, []);
  return (
    <article className="blk span-6" data-block="type">
      <div className="blk-hd"><span className="num">[09]</span><span>type · variable axis</span></div>
      <h3 className="blk-ti">Variable type</h3>
      <p className="blk-tag">Cursor X drives weight. Y drives size. Click to lock.</p>
      <div className="stage" ref={stageRef} style={{ padding: 0 }}>
        <div ref={wordRef} style={{
          fontFamily: 'var(--mono)', fontWeight: 400, fontSize: 60,
          letterSpacing: '-.02em', lineHeight: 1, transition: 'font-weight .08s',
        }}>BYTCD</div>
      </div>
    </article>
  );
};

const PlaygroundSection = () => {
  return (
    <>
      <div className="sec-head">
        <h2>live <em>playground</em></h2>
        <div className="meta">NINE BLOCKS · MOVE YOUR CURSOR<br />EVERY DEMO IS REAL CODE · NO IMAGES</div>
      </div>
      <section className="bk-grid">
        <MagnetBlock />
        <EditorBlock />
        <ParticlesBlock />
        <DrawBlock />
        <AsciiBlock />
        <ColorBlock />
        <TiltBlock />
        <TerminalBlock />
        <TypeBlock />
      </section>
    </>
  );
};

export default PlaygroundSection;
