import React, { useRef, useEffect } from 'react';
import './Header.css';
import Particles from '../../effects/Particles/Particles';
import GlitchEffect from '../../effects/GlitchEffect/GlitchEffect';
import useScroll from '../../../hooks/useScroll';

const Header = () => {
  const mainTitleRef = useRef(null);

  const handleScroll = (scrollPosition) => {
    // Effet parallaxe sur le titre principal
    const mainTitle = mainTitleRef.current;
    if (mainTitle && scrollPosition < window.innerHeight) {
      const translateY = scrollPosition * 0.5;
      mainTitle.style.transform = `translateY(${translateY}px)`;
    }
  };

  useScroll(handleScroll);

  useEffect(() => {
    // Animation de distorsion subtile sur le titre principal
    const titleDistortionInterval = setInterval(() => {
      const mainTitle = mainTitleRef.current;
      if (mainTitle) {
        // Appliquer une légère distorsion aléatoire
        const skewX = (Math.random() - 0.5) * 2;
        const skewY = (Math.random() - 0.5) * 2;
        mainTitle.style.transform = `skew(${skewX}deg, ${skewY}deg)`;
        
        // Revenir à la normale après un court délai
        setTimeout(() => {
          mainTitle.style.transform = '';
        }, 500);
      }
    }, 5000);
    
    return () => {
      clearInterval(titleDistortionInterval);
    };
  }, []);

  return (
    <div className="header" id="header">
      <Particles />
      <h1 className="main-title" ref={mainTitleRef}>
        <GlitchEffect text="HARTTER">
          HART<br />TER
        </GlitchEffect>
      </h1>
    </div>
  );
};

export default Header;