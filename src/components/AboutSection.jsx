import React from 'react';
import { Link } from 'react-router-dom';

const team = [
  { letter: 'a', name: 'Ana Silva', role: 'Design / co-founder' },
  { letter: 'm', name: 'Marc Petrov', role: 'Code / co-founder' },
  { letter: 'k', name: 'Kira Okafor', role: 'Web / engineer' },
];

const AboutSection = ({ id }) => (
  <>
    <div className="sec-head" id={id}>
      <h2>who we <em>are</em></h2>
      <div className="meta">THREE PEOPLE · UZHHOROD, UKRAINE<br />HIRING · 2026</div>
    </div>
    <section className="about">
      <div>
        <h3>A studio of <em>three</em>.</h3>
        <p>BYTCD is a small, independent practice for code, design and the web. We started in 2024 and we still answer our own emails. Every project is led by the people who'll build it — no account managers, no junior hand-offs.</p>
        <p>We charge fixed prices, we ship weekly, and we'd rather miss a deadline than miss the point. If we don't think we're the right shop for the job, we'll tell you and recommend someone who is.</p>
        <p style={{ color: 'var(--mute)', fontSize: 12 }}>↳ <Link style={{ borderBottom: '1px solid currentColor' }} to="/contact-us">read the long version →</Link></p>
      </div>
      <div className="team">
        {team.map((p) => (
          <div className="person" key={p.letter}>
            <div className="av">{p.letter}</div>
            <h5>{p.name}</h5>
            <p>{p.role}</p>
          </div>
        ))}
        <div className="person" style={{ background: 'var(--ink)', color: 'var(--paper)', borderColor: 'var(--ink)' }}>
          <div className="av" style={{
            borderColor: 'rgba(246,245,241,.16)',
            background: 'repeating-linear-gradient(45deg,rgba(246,245,241,.08) 0,rgba(246,245,241,.08) 1px,transparent 1px,transparent 8px)',
            color: 'var(--paper)',
          }}>?</div>
          <h5 style={{ color: 'var(--paper)' }}>You</h5>
          <p style={{ color: 'color-mix(in oklab,var(--paper) 60%,transparent)' }}>we're hiring</p>
        </div>
      </div>
    </section>
  </>
);

export default AboutSection;
