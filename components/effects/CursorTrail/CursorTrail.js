import React, { useEffect, useRef } from 'react';
import './CursorTrail.css';

const CursorTrail = () => {
  const cursorDotsRef = useRef([]);
  
  useEffect(() => {
    // Effet de traînée de curseur
    const cursorDots = [];
    const maxDots = 10;
    
    for (let i = 0; i < maxDots; i++) {
      const dot = document.createElement('div');
      dot.className = 'cursor-dot';
      dot.style.opacity = 1 - (i / maxDots);
      document.body.appendChild(dot);
      cursorDots.push({
        element: dot,
        x: 0,
        y: 0
      });
      cursorDotsRef.current.push(dot);
    }
    
    const handleMouseMove = (e) => {
      // Mettre à jour la position du premier point
      cursorDots[0].x = e.clientX;
      cursorDots[0].y = e.clientY;
      
      // Mettre à jour la position des points suivants avec un délai
      for (let i = 1; i < cursorDots.length; i++) {
        setTimeout(() => {
          cursorDots[i].x = cursorDots[i-1].x;
          cursorDots[i].y = cursorDots[i-1].y;
          cursorDots[i].element.style.left = `${cursorDots[i].x}px`;
          cursorDots[i].element.style.top = `${cursorDots[i].y}px`;
        }, i * 40);
      }
      
      // Mettre à jour immédiatement le premier point
      cursorDots[0].element.style.left = `${cursorDots[0].x}px`;
      cursorDots[0].element.style.top = `${cursorDots[0].y}px`;
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cursorDotsRef.current.forEach(dot => {
        if (dot && dot.parentNode) {
          dot.parentNode.removeChild(dot);
        }
      });
    };
  }, []);

  return null;
};

export default CursorTrail;