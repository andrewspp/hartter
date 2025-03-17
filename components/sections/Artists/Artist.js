import React from 'react';

const Artist = ({ name, period, role, delay }) => {
  return (
    <div className="artist reveal-on-scroll" style={{ transitionDelay: `${delay}s` }}>
      <div className="artist-name hover-shift">{name}</div>
      <div className="artist-period">{period}</div>
      <div className="artist-role">{role}</div>
    </div>
  );
};

export default Artist;