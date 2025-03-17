import React from 'react';
import './SectionTitle.css';

const SectionTitle = ({ title }) => {
  return (
    <h2 className="section-title reveal-on-scroll">{title}</h2>
  );
};

export default SectionTitle;