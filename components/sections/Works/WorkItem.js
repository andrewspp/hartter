import React from 'react';

const WorkItem = ({ title, img, alt, type, year, categoryIndex }) => {
  return (
    <div className="work-item">
      <img className="work-img" src={img} alt={alt} />
      <div className="work-info">
        <div className="work-title hover-shift">{title}</div>
        <div className="work-meta">
          <span>{type}</span>
          <span>{year}</span>
        </div>
      </div>
    </div>
  );
};

export default WorkItem;