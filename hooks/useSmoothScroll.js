import { useState, useEffect, useCallback } from 'react';

const useSmoothScroll = (totalItems) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Fonction pour naviguer vers un élément spécifique
  const navigateTo = useCallback((index) => {
    if (index < 0 || index >= totalItems) return;
    
    const element = document.getElementById(`work-item-${index}`);
    if (element) {
      // Défilement doux vers l'élément
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center' // Centre l'élément dans la vue
      });
      
      // Mettre à jour l'index actif
      setActiveIndex(index);
    }
  }, [totalItems]);
  
  // Navigation vers l'élément suivant
  const navigateNext = useCallback(() => {
    navigateTo(activeIndex + 1);
  }, [activeIndex, navigateTo]);
  
  // Navigation vers l'élément précédent
  const navigatePrev = useCallback(() => {
    navigateTo(activeIndex - 1);
  }, [activeIndex, navigateTo]);
  
  // Fonction appelée quand un élément est en vue
  const handleItemInView = useCallback((index) => {
    setActiveIndex(index);
  }, []);
  
  // Gestion des touches flèches
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        navigateNext();
      } else if (e.key === 'ArrowUp') {
        navigatePrev();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigateNext, navigatePrev]);
  
  return {
    activeIndex,
    navigateTo,
    navigateNext,
    navigatePrev,
    handleItemInView
  };
};

export default useSmoothScroll;