import React, { useRef, useEffect } from 'react';
import './ScrollIndicator.css';
import useScroll from '../../../hooks/useScroll';

const ScrollIndicator = () => {
  const scrollProgressRef = useRef(null);

  const handleScroll = (scrollPosition) => {
    const scrollMax = document.body.scrollHeight - window.innerHeight;
    const scrollProgress = scrollProgressRef.current;
    if (scrollProgress) {
      scrollProgress.style.width = `${(scrollPosition / scrollMax) * 100}%`;
    }
  };

  useScroll(handleScroll);

  return (
    <div className="scroll-indicator">
      <div className="scroll-progress" id="scroll-progress" ref={scrollProgressRef}></div>
    </div>
  );
};

export default ScrollIndicator;