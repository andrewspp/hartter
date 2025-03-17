import { useState, useEffect, useCallback, useRef } from 'react';

const useTikTokCarousel = (totalItems) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFirstInteraction, setIsFirstInteraction] = useState(true);
  const carouselRef = useRef(null);
  const lastScrollTop = useRef(0);
  const scrollingTimeout = useRef(null);
  
  // Fonction pour naviguer vers un élément spécifique
  const navigateTo = useCallback((index) => {
    if (index < 0 || index >= totalItems) return;
    
    setIsFirstInteraction(false);
    
    const element = document.getElementById(`work-item-${index}`);
    if (element && carouselRef.current) {
      carouselRef.current.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
      
      // Mettre à jour l'index actif
      setActiveIndex(index);
    }
  }, [totalItems]);
  
  // Navigation vers l'élément suivant
  const navigateNext = useCallback(() => {
    if (activeIndex < totalItems - 1) {
      navigateTo(activeIndex + 1);
    }
  }, [activeIndex, navigateTo, totalItems]);
  
  // Navigation vers l'élément précédent
  const navigatePrev = useCallback(() => {
    if (activeIndex > 0) {
      navigateTo(activeIndex - 1);
    }
  }, [activeIndex, navigateTo]);
  
  // Fonction appelée quand un élément est en vue
  const handleItemInView = useCallback((index) => {
    setActiveIndex(index);
    setIsFirstInteraction(false);
  }, []);
  
  // Fonction pour initialiser le hook avec une référence au carousel
  const initCarousel = useCallback((ref) => {
    carouselRef.current = ref;
  }, []);
  
  // Détecter le défilement du carousel et mettre à jour activeIndex
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    
    const handleScroll = () => {
      // Annuler le timeout précédent
      if (scrollingTimeout.current) {
        clearTimeout(scrollingTimeout.current);
      }
      
      // Laisser le défilement normal se produire
      // puis après un léger délai, vérifier quelle slide est la plus visible
      scrollingTimeout.current = setTimeout(() => {
        const scrollPosition = carousel.scrollTop;
        
        // Calculer la direction du défilement
        const scrollDirection = scrollPosition > lastScrollTop.current ? 'down' : 'up';
        lastScrollTop.current = scrollPosition;
        
        // Trouver l'élément le plus visible
        const workItems = Array.from(carousel.querySelectorAll('.work-item'));
        const viewportHeight = carousel.clientHeight;
        
        let maxVisibleItem = null;
        let maxVisibleRatio = 0;
        
        workItems.forEach((item, idx) => {
          const rect = item.getBoundingClientRect();
          const carouselRect = carousel.getBoundingClientRect();
          
          // Calcul du ratio de visibilité (combien de l'élément est visible)
          const visibleTop = Math.max(rect.top, carouselRect.top);
          const visibleBottom = Math.min(rect.bottom, carouselRect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const visibilityRatio = visibleHeight / rect.height;
          
          if (visibilityRatio > maxVisibleRatio) {
            maxVisibleRatio = visibilityRatio;
            maxVisibleItem = {
              item, 
              index: idx,
              visibilityRatio,
              rect
            };
          }
        });
        
        // Mettre à jour l'élément actif si un élément a été trouvé
        if (maxVisibleItem && maxVisibleItem.index !== activeIndex) {
          setActiveIndex(maxVisibleItem.index);
          setIsFirstInteraction(false);
        }
      }, 50);
    };
    
    carousel.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      if (carousel) {
        carousel.removeEventListener('scroll', handleScroll);
      }
      if (scrollingTimeout.current) {
        clearTimeout(scrollingTimeout.current);
      }
    };
  }, [activeIndex]);
  
  // Gestion des touches clavier
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        navigateNext();
        e.preventDefault();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        navigatePrev();
        e.preventDefault();
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
    handleItemInView,
    initCarousel,
    isFirstInteraction
  };
};

export default useTikTokCarousel;