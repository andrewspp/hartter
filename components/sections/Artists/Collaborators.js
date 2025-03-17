import React from 'react';
import Artist from './Artist';

const Collaborators = ({ collaborators }) => {
  return (
    <>
      <div className="collaborators-title reveal-on-scroll">COLLABORATIONS</div>
      
      {collaborators.map((collaborator, index) => (
        <Artist 
          key={index}
          name={collaborator.name} 
          period={collaborator.period} 
          role={collaborator.role} 
          delay={0.3 + (0.1 * index)}
        />
      ))}
    </>
  );
};

export default Collaborators;