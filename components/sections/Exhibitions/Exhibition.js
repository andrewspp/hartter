import React from 'react';

const Exhibition = ({ year, title, location, curator, delay }) => {
  return (
    <div className="exhibition reveal-on-scroll" style={{ transitionDelay: `${delay}s` }}>
      <div className="exhibition-year">{year}</div>
      <div className="exhibition-title hover-shift">{title}</div>
      <div className="exhibition-location">{location}</div>
      <div className="exhibition-curator">
        {curator.startsWith('CURATED BY') ? (
          <>
            CURATED BY <a href="#">{curator.substring(11)}</a>
          </>
        ) : (
          curator
        )}
      </div>
    </div>
  );
};

export default Exhibition;