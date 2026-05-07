import React from 'react';
import { mainLinks } from '../utils/constants';

const Links = () => (
  <footer className="bk-footer">
    <div>
      <div>BYTCD © {new Date().getFullYear()} · made by hand</div>
      <div style={{ marginTop: 6, color: 'var(--mute)' }}>
        try the konami code · or type "BYTCD" anywhere · or click the logo seven times
      </div>
      {mainLinks.length > 0 && (
        <div style={{ marginTop: 8, display: 'flex', gap: 14 }}>
          {mainLinks.map((l) => (
            <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer" style={{ borderBottom: '1px solid currentColor' }}>
              {l.name}
            </a>
          ))}
        </div>
      )}
    </div>
    <pre className="ascii" aria-hidden="true">{`   ___ __ __ ____ ___ ___
  | _ ) \\ V /_   _/ __|   \\
  | _ \\\\   /  | || (__| |) |
  |___/ |_|   |_| \\___|___/`}</pre>
  </footer>
);

export default Links;
