import React, { useEffect, useRef } from 'react';
import './Particles.css';
import useScroll from '../../../hooks/useScroll';

const Particles = () => {
  const gridBackgroundRef = useRef(null);

  useEffect(() => {
    // Initialiser la grille de fond
    const gridBackground = gridBackgroundRef.current;
    if (gridBackground) {
      for (let i = 0; i < 400; i++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        gridBackground.appendChild(cell);
      }
    }
  }, []);

  const handleScroll = () => {
    // Animation de grille de fond
    const gridCells = document.querySelectorAll('.grid-cell');
    gridCells.forEach((cell, index) => {
      if (Math.random() < 0.01) {
        cell.style.backgroundColor = index % 5 === 0 ? 'rgba(255, 107, 107, 0.1)' : 'rgba(0, 0, 0, 0.05)';
        setTimeout(() => {
          cell.style.backgroundColor = '';
        }, 500);
      }
    });
  };

  useScroll(handleScroll);

  return <div className="grid-background" id="grid-background" ref={gridBackgroundRef}></div>;
};

export default Particles;