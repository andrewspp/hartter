import React, { useEffect } from 'react';
import './GlitchEffect.css';

const GlitchEffect = ({ children, text, className }) => {
  useEffect(() => {
    // Animation de "glitch" occasionnel
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.01) {
        const glitchElement = document.querySelector('.glitch-effect');
        if (glitchElement) {
          glitchElement.classList.add('active');
          setTimeout(() => {
            glitchElement.classList.remove('active');
          }, 200);
        }
      }
    }, 1000);
    
    return () => {
      clearInterval(glitchInterval);
    };
  }, []);

  return (
    <div className={`glitch-effect ${className || ''}`} data-text={text}>
      {children}
    </div>
  );
};

export default GlitchEffect;