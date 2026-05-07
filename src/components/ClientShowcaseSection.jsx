import React from 'react';

const projects = [
  { yr: '25', name: 'Carbook.pro', tag: 'design + dev', cat: 'SERVICE STATION CRM · WEB APP', link: 'https://carbook.mobi/' },
  { yr: '25', name: 'GalInfo', tag: 'design + web', cat: 'NEWS PORTAL · EDITORIAL', link: 'https://galinfo.com.ua/' },
  { yr: '24', name: 'Brand Identity', tag: 'identity', cat: 'VISUAL IDENTITY · PRINT' },
  { yr: '24', name: 'Web Platform', tag: 'web + code', cat: 'SAAS · LANDING PAGE' },
  { yr: '23', name: 'Mobile App', tag: 'design + code', cat: 'iOS · PRODUCT' },
  { yr: '23', name: 'E-commerce', tag: 'web', cat: 'D2C · SHOPIFY' },
  { yr: '22', name: 'Design System', tag: 'design system', cat: 'INTERNAL TOOLS · SAAS' },
  { yr: '21', name: 'Brand & Site', tag: 'identity + site', cat: 'STARTUP · LAUNCH' },
];

const ClientShowcaseSection = ({ id }) => {
  const open = (link) => { if (link) window.open(link, '_blank', 'noopener,noreferrer'); };
  return (
    <>
      <div className="sec-head" id={id}>
        <h2>selected <em>work</em></h2>
        <div className="meta">2021 — 2026 · 8 PROJECTS<br />REAL CLIENTS · LIVE LINKS</div>
      </div>
      <section className="work-list">
        {projects.map((p) => (
          <div
            key={p.name}
            className="work-row"
            data-cursor-hover={p.link ? '1' : undefined}
            onClick={() => open(p.link)}
          >
            <div className="yr">'{p.yr}</div>
            <div className="name" dangerouslySetInnerHTML={{ __html: p.name.replace(/&/g, '<em>&amp;</em>') }} />
            <div className="tags">{p.tag}</div>
            <div className="tags">{p.cat}</div>
            <div className="arrow">↗</div>
          </div>
        ))}
      </section>
    </>
  );
};

export default ClientShowcaseSection;
