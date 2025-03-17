import { useEffect } from 'react';

const useIntersectionObserver = (selectors, threshold = 0.1, rootMargin = '0px') => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin,
      threshold
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);
    
    const elements = document.querySelectorAll(selectors);
    elements.forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      elements.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, [selectors, threshold, rootMargin]);
};

export default useIntersectionObserver;