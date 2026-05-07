import React from 'react';

const cards = [
  { num: '01', title: 'Code', em: 'that ships', items: ['Web apps', 'Next · Astro · Svelte', 'APIs · edge fns', 'Postgres · D1 · Turso', 'WebGL · Canvas', 'Anim · physics', 'CMS', 'CI / CD'] },
  { num: '02', title: 'Design', em: 'with intent', items: ['Identity', 'Typography', 'Product UI', 'Design systems', 'Motion', 'Editorial', 'Iconography', 'Sound'] },
  { num: '03', title: 'Web,', em: 'made well', items: ['Marketing sites', 'Landing pages', 'E-commerce', 'Portfolios', 'SEO + perf', 'Analytics', 'A11y audits', 'Hosting'] },
];

const ServicesSection = ({ id }) => (
  <>
    <div className="sec-head" id={id}>
      <h2>what we <em>do</em></h2>
      <div className="meta">THREE DISCIPLINES · ONE TEAM<br />NO HAND-OFFS · NO AGENCIES</div>
    </div>
    <section className="svc">
      {cards.map((c) => (
        <div className="svc-card" key={c.num}>
          <div className="svc-icon">↗</div>
          <span className="num">— {c.num}</span>
          <h3>{c.title} <em>{c.em}</em></h3>
          <ul>{c.items.map((i) => <li key={i}>{i}</li>)}</ul>
        </div>
      ))}
    </section>
  </>
);

export default ServicesSection;
