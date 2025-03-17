import { useState, useEffect, useCallback, useRef } from 'react';

function useSwipeCarousel(totalItems) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [dragCurrentY, setDragCurrentY] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  
  // Seuil de swipe (en pourcentage de la hauteur de l'écran)
  const SWIPE_THRESHOLD = 0.15;
  
  // Initialiser les refs pour les éléments
  const setItemRef = useCallback((element, index) => {
    if (element) {
      itemRefs.current[index] = element;
    }
  }, []);
  
  // Navigation directe à un index spécifique
  const navigateTo = useCallback((index) => {
    if (index < 0 || index >= totalItems || transitioning) return;
    
    setTransitioning(true);
    setActiveIndex(index);
    
    // Réinitialiser après la transition
    setTimeout(() => {
      setTransitioning(false);
    }, 500); // Correspond à la durée de la transition CSS
  }, [totalItems, transitioning]);
  
  // Navigation au suivant
  const navigateNext = useCallback(() => {
    if (activeIndex < totalItems - 1) {
      navigateTo(activeIndex + 1);
    }
  }, [activeIndex, navigateTo, totalItems]);
  
  // Navigation au précédent
  const navigatePrev = useCallback(() => {
    if (activeIndex > 0) {
      navigateTo(activeIndex - 1);
    }
  }, [activeIndex, navigateTo]);
  
  // Gestionnaire d'événement de début de glissement (souris)
  const handleMouseDown = useCallback((e) => {
    if (transitioning) return;
    setIsDragging(true);
    setDragStartY(e.clientY);
    setDragCurrentY(e.clientY);
  }, [transitioning]);
  
  // Gestionnaire d'événement de début de glissement (tactile)
  const handleTouchStart = useCallback((e) => {
    if (transitioning) return;
    setIsDragging(true);
    setDragStartY(e.touches[0].clientY);
    setDragCurrentY(e.touches[0].clientY);
  }, [transitioning]);
  
  // Gestionnaire d'événement de glissement (souris)
  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    setDragCurrentY(e.clientY);
    e.preventDefault(); // Empêcher le défilement normal de la page
  }, [isDragging]);
  
  // Gestionnaire d'événement de glissement (tactile)
  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    setDragCurrentY(e.touches[0].clientY);
  }, [isDragging]);
  
  // Gestionnaire de fin de glissement (souris et tactile)
  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    
    const dragDistance = dragCurrentY - dragStartY;
    const viewportHeight = window.innerHeight;
    const dragPercentage = Math.abs(dragDistance) / viewportHeight;
    
    // Si le glissement dépasse le seuil
    if (dragPercentage > SWIPE_THRESHOLD) {
      if (dragDistance > 0 && activeIndex > 0) {
        // Glissement vers le bas (précédent)
        navigatePrev();
      } else if (dragDistance < 0 && activeIndex < totalItems - 1) {
        // Glissement vers le haut (suivant)
        navigateNext();
      }
    }
    
    // Réinitialiser l'état de glissement
    setIsDragging(false);
  }, [isDragging, dragCurrentY, dragStartY, activeIndex, navigateNext, navigatePrev, totalItems]);
  
  // Ajouter les écouteurs d'événements pour la souris et le tactile
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Souris
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleDragEnd);
    
    // Tactile
    container.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleDragEnd);
    
    // Flèches clavier
    const handleKeyDown = (e) => {
      if (transitioning) return;
      
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        navigateNext();
        e.preventDefault();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        navigatePrev();
        e.preventDefault();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Nettoyer les écouteurs
    return () => {
      if (container) {
        container.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleDragEnd);
        
        container.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleDragEnd);
      }
      
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    handleMouseDown, 
    handleMouseMove, 
    handleDragEnd, 
    handleTouchStart, 
    handleTouchMove, 
    navigateNext, 
    navigatePrev,
    transitioning
  ]);
  
  // Calculer la translation pour l'animation
  const getTranslateY = useCallback(() => {
    if (!isDragging) return -activeIndex * 100; // Position normale basée sur l'index
    
    // Pendant le glissement, calculer la translation basée sur la distance de glissement
    const dragDistance = dragCurrentY - dragStartY;
    const viewportHeight = window.innerHeight;
    
    // Ajouter une résistance au glissement (moins de mouvement quand on atteint les limites)
    const dampedDragPercentage = (dragDistance / viewportHeight) * 0.3;
    
    return -activeIndex * 100 + dampedDragPercentage * 100;
  }, [activeIndex, isDragging, dragCurrentY, dragStartY]);
  
  return {
    activeIndex,
    setActiveIndex,
    navigateTo,
    navigateNext,
    navigatePrev,
    containerRef,
    setItemRef,
    getTranslateY,
    isDragging,
    transitioning
  };
}

// Assurez-vous d'exporter correctement la fonction
export { useSwipeCarousel };
// Pour la compatibilité, exportez aussi par défaut
export default useSwipeCarousel;