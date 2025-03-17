import React from 'react';
import WorkItem from './WorkItem';

const WorkCategory = ({ title, works, index }) => {
  return (
    <div className="work-category">
      <h3 className="work-category-title">{title}</h3>
      <div className="works-grid">
        {works.map((work, i) => (
          <WorkItem
            key={i}
            title={work.title}
            img={work.img}
            alt={work.alt}
            type={work.type}
            year={work.year}
            categoryIndex={index}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkCategory;