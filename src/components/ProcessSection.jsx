import React from 'react';

const steps = [
  { n: '01', t: 'Brief', d: 'One call. We listen. You leave with a written scope and a fixed quote within 48 hours.' },
  { n: '02', t: 'Sketch', d: 'Wireframes, mood boards, type tests. We commit to a direction before we touch the keyboard.' },
  { n: '03', t: 'Build', d: 'Weekly demos in your inbox. You can poke at the staging URL whenever you like.' },
  { n: '04', t: 'Ship', d: 'We deploy, hand over keys, and stay on retainer for six weeks of bug-fixes and polish.' },
];

const ProcessSection = ({ id }) => (
  <>
    <div className="sec-head" id={id}>
      <h2>how we <em>work</em></h2>
      <div className="meta">FOUR PHASES · 4–12 WEEKS<br />FIXED PRICE · WEEKLY DEMOS</div>
    </div>
    <section className="proc">
      {steps.map((s) => (
        <div className="proc-step" key={s.n}>
          <div className="n">{s.n}</div>
          <div>
            <h4>{s.t}</h4>
            <p>{s.d}</p>
          </div>
        </div>
      ))}
    </section>
  </>
);

export default ProcessSection;
