import React from 'react';

const Marquee = () => {
  const items = ['CODE', 'DESIGN', 'WEB', 'BUILT BY HAND', 'NO TEMPLATES', 'SHIPPED FAST'];
  const Loop = () => (
    <>
      {items.map((t, i) => (
        <React.Fragment key={i}><span>{t}</span><span className="star">✦</span></React.Fragment>
      ))}
    </>
  );
  return (
    <div className="marquee" aria-hidden="true">
      <div className="track"><Loop /><Loop /></div>
    </div>
  );
};

export default Marquee;
