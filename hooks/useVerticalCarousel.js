import { useState, useEffect, useCallback } from 'react';

const useVerticalCarousel = (totalItems) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  
  // Fonction pour naviguer vers un élément spécifique
  const navigateTo = useCallback((index) => {
    if (index < 0 || index >= totalItems || isScrolling) return;
    
    setIsScrolling(true);
    
    const element = document.getElementById(`work-item-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      
      // Mettre à jour l'index actif
      setActiveIndex(index);
      
      // Réactiver le défilement après l'animation
      setTimeout(() => {
        setIsScrolling(false);
      }, 600);
    } else {
      setIsScrolling(false);
    }
  }, [totalItems, isScrolling]);
  
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
    if (!isScrolling) {
      setActiveIndex(index);
    }
  }, [isScrolling]);
  
  // Gestion du défilement avec la molette de la souris
  useEffect(() => {
    const handleWheel = (e) => {
      // Si déjà en train de défiler, ignorer
      if (isScrolling) {
        e.preventDefault();
        return;
      }
      
      // Défilement vers le bas
      if (e.deltaY > 0) {
        navigateNext();
      } 
      // Défilement vers le haut
      else if (e.deltaY < 0) {
        navigatePrev();
      }
    };
    
    // Gestion des flèches clavier
    const handleKeyDown = (e) => {
      if (isScrolling) return;
      
      if (e.key === 'ArrowDown') {
        navigateNext();
        e.preventDefault();
      } else if (e.key === 'ArrowUp') {
        navigatePrev();
        e.preventDefault();
      }
    };
    
    // Appliquer les écouteurs d'événements
    window.addEventListener('keydown', handleKeyDown);
    
    // Nettoyer les écouteurs d'événements lors du démontage
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isScrolling, navigateNext, navigatePrev]);
  
  return {
    activeIndex,
    navigateTo,
    navigateNext,
    navigatePrev,
    handleItemInView
  };
};

export default useVerticalCarousel;