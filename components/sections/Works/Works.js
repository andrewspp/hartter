import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Works.css';
import SectionTitle from '../../common/SectionTitle/SectionTitle';

// Import des images
import lueurTriade from '../../../public/images/Lueur triade.jpg';
import pauseContemporaine from '../../../public/images/Pause contemporaine.png';
import planDeMatch from '../../../public/images/Plan de match.png';
import stationsImmobiles from '../../../public/images/Stations immobiles.png';

const Works = () => {
  // États pour le carrousel
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [dragCurrentY, setDragCurrentY] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [showInstruction, setShowInstruction] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenViewed, setHasBeenViewed] = useState(false);
  
  // Référence pour le container principal
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  
  // Définition des œuvres
  const works = [
    {
      category: "GRAPHIC ART",
      title: 'CHROMATIC WAVES',
      img: lueurTriade,
      alt: 'Chromatic Waves',
      type: 'DIGITAL ART',
      year: '2024'
    },
    {
      category: "GRAPHIC ART",
      title: 'URBAN TEXTURES',
      img: pauseContemporaine,
      alt: 'Urban Textures',
      type: 'PHOTOGRAPHY',
      year: '2022'
    },
    {
      category: "MUSIC",
      title: 'SONIC LANDSCAPES',
      img: planDeMatch,
      alt: 'Sonic Landscapes',
      type: 'SOUND',
      year: '2023'
    },
    {
      category: "MUSIC",
      title: 'TEMPORAL ECHOES',
      img: stationsImmobiles,
      alt: 'Temporal Echoes',
      type: 'AUDIO-VISUAL',
      year: '2022'
    },
    {
      category: "LITERATURE",
      title: 'FRAGMENTS',
      img: '/api/placeholder/800/600',
      alt: 'Fragments',
      type: 'MIXED MEDIA',
      year: '2023'
    },
    {
      category: "LITERATURE",
      title: 'RESONANT FORMS',
      img: '/api/placeholder/800/600',
      alt: 'Resonant Forms',
      type: 'TEXT INSTALLATION',
      year: '2021'
    }
  ];
  
  // Navigation vers un index spécifique
  const navigateTo = useCallback((index) => {
    if (index < 0 || index >= works.length || transitioning) return;
    
    setTransitioning(true);
    setActiveIndex(index);
    setShowInstruction(false);
    
    setTimeout(() => {
      setTransitioning(false);
    }, 500);
  }, [works.length, transitioning]);
  
  // Navigation vers l'élément suivant
  const navigateNext = useCallback(() => {
    if (activeIndex < works.length - 1) {
      navigateTo(activeIndex + 1);
    }
  }, [activeIndex, navigateTo, works.length]);
  
  // Navigation vers l'élément précédent
  const navigatePrev = useCallback(() => {
    if (activeIndex > 0) {
      navigateTo(activeIndex - 1);
    }
  }, [activeIndex, navigateTo]);
  
  // Gestionnaires d'événements pour le glissement
  const handleMouseDown = useCallback((e) => {
    if (transitioning) return;
    setIsDragging(true);
    setDragStartY(e.clientY);
    setDragCurrentY(e.clientY);
  }, [transitioning]);
  
  const handleTouchStart = useCallback((e) => {
    if (transitioning) return;
    setIsDragging(true);
    setDragStartY(e.touches[0].clientY);
    setDragCurrentY(e.touches[0].clientY);
  }, [transitioning]);
  
  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    setDragCurrentY(e.clientY);
    e.preventDefault();
  }, [isDragging]);
  
  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    setDragCurrentY(e.touches[0].clientY);
  }, [isDragging]);
  
  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    
    const dragDistance = dragCurrentY - dragStartY;
    const viewportHeight = window.innerHeight;
    const dragPercentage = Math.abs(dragDistance) / viewportHeight;
    
    // Seuil de déclenchement (15% de la hauteur de l'écran)
    const SWIPE_THRESHOLD = 0.15;
    
    // Si le glissement dépasse le seuil
    if (dragPercentage > SWIPE_THRESHOLD) {
      if (dragDistance > 0 && activeIndex > 0) {
        // Glissement vers le bas (précédent)
        navigatePrev();
      } else if (dragDistance < 0 && activeIndex < works.length - 1) {
        // Glissement vers le haut (suivant)
        navigateNext();
      }
    }
    
    // Réinitialiser l'état de glissement
    setIsDragging(false);
  }, [isDragging, dragCurrentY, dragStartY, activeIndex, navigateNext, navigatePrev, works.length]);
  
  // Détecter la visibilité de la section et réinitialiser à la première slide quand on sort de la vue
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          // Si la section devient visible
          if (entry.isIntersecting) {
            setIsVisible(true);
            
            // Si la section a été vue avant (et probablement parcourue), montre à nouveau les instructions
            if (hasBeenViewed && activeIndex !== 0) {
              setShowInstruction(true);
            }
          } 
          // Si la section devient invisible
          else {
            setIsVisible(false);
            
            // Si l'utilisateur a parcouru au moins une slide, marquer comme déjà vu
            if (activeIndex > 0) {
              setHasBeenViewed(true);
            }
            
            // Réinitialiser à la première slide quand on quitte la section
            // Mais seulement si on n'est pas en train de charger la page (évite reset involontaire)
            if (document.readyState === 'complete') {
              setActiveIndex(0);
              setShowInstruction(true);
            }
          }
        });
      },
      { threshold: 0.1 } // Détecte quand au moins 10% de la section est visible
    );
    
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [activeIndex, hasBeenViewed]);
  
  // Intercepter le défilement global
  useEffect(() => {
    const handleGlobalWheel = (e) => {
      const section = sectionRef.current;
      if (!section || !isVisible) return;
      
      const rect = section.getBoundingClientRect();
      
      // Si la section est visible et on défile vers le bas
      if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
        if (e.deltaY > 0 && activeIndex < works.length - 1) {
          e.preventDefault();
          navigateNext();
        } else if (e.deltaY < 0 && activeIndex > 0) {
          e.preventDefault();
          navigatePrev();
        }
      }
    };
    
    window.addEventListener('wheel', handleGlobalWheel, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleGlobalWheel);
    };
  }, [activeIndex, navigateNext, navigatePrev, works.length, isVisible]);
  
  // Ajouter les écouteurs d'événements
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleDragEnd);
    
    container.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleDragEnd);
    
    const handleKeyDown = (e) => {
      if (transitioning || !isVisible) return;
      
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
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleDragEnd);
      
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleDragEnd);
      
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
    transitioning,
    isVisible
  ]);
  
  // Calculer la translation
  const getTranslateY = useCallback(() => {
    if (!isDragging) return -activeIndex * 100;
    
    const dragDistance = dragCurrentY - dragStartY;
    const viewportHeight = window.innerHeight;
    const dampedDragPercentage = (dragDistance / viewportHeight) * 0.3;
    
    return -activeIndex * 100 + dampedDragPercentage * 100;
  }, [activeIndex, isDragging, dragCurrentY, dragStartY]);
  
  // Style pour le slider
  const sliderStyle = {
    transform: `translateY(${getTranslateY()}%)`
  };

  return (
    <div ref={sectionRef} className="works-section" id="works">
      <div className="section-number">02</div>
      <div className="section-title-container">
        <SectionTitle title="WORKS" />
      </div>
      
      <div className="works-carousel-container">
        <div 
          ref={containerRef}
          className={`works-slider ${isDragging ? 'dragging' : ''}`}
          style={sliderStyle}
        >
          {works.map((work, index) => (
            <div 
              key={index}
              className={`work-item ${activeIndex === index ? 'active' : ''}`}
              id={`work-item-${index}`}
            >
              {activeIndex === index && (
                <h2 className="category-title">{work.category}</h2>
              )}
              <div className="work-image-container">
                <img 
                  src={work.img} 
                  alt={work.alt} 
                  className="work-image loaded"
                />
              </div>
              <div className="work-info">
                <h3 className="work-title">{work.title}</h3>
                <div className="work-details">
                  <span className="work-type">{work.type}</span>
                  <span className="work-year">{work.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Indicateurs de navigation */}
      <div className="carousel-indicators">
        {works.map((_, index) => (
          <div 
            key={index}
            className={`indicator ${activeIndex === index ? 'active' : ''}`}
            onClick={() => navigateTo(index)}
          />
        ))}
      </div>
      
      {/* Flèches de navigation */}
      <div className="carousel-arrows">
        {activeIndex > 0 && (
          <div className="arrow-up" onClick={navigatePrev}>
            ↑
          </div>
        )}
        {activeIndex < works.length - 1 && (
          <div className="arrow-down" onClick={navigateNext}>
            ↓
          </div>
        )}
      </div>
      
      {/* Instructions */}
      {showInstruction && (
        <div className="swipe-instruction">
          Faites glisser pour découvrir les œuvres
        </div>
      )}
    </div>
  );
};

export default Works;