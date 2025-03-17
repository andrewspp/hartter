import React, { useRef } from 'react';
import WorkItem from './WorkItem';

const WorkCategory = ({ 
  title, 
  works = [], 
  index, 
  activeIndex, 
  startIndex, 
  setItemRef 
}) => {
  // Créer des refs pour chaque WorkItem
  const itemRefs = useRef(works.map(() => React.createRef()));
  
  const isCategoryVisible = works.some((_, i) => 
    startIndex + i === activeIndex || 
    startIndex + i === activeIndex - 1 || 
    startIndex + i === activeIndex + 1
  );
  
  return (
    <div className="work-category" id={`category-${index}`}>
      {isCategoryVisible && <h2 className="category-title">{title}</h2>}
      <div className="works-container">
        {works.map((work, i) => (
          <WorkItem 
            key={`${index}-${i}`} 
            ref={itemRefs.current[i]}
            work={work} 
            index={startIndex + i}
            isActive={activeIndex === startIndex + i}
            setItemRef={setItemRef}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkCategory;