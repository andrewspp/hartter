import React, { useState, useEffect, forwardRef } from 'react';
import './Works.css';

const WorkItem = forwardRef(({ work, index, isActive, setItemRef }, ref) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  
  // Vérification que work est défini avant de le destructurer
  if (!work) {
    return null;
  }
  
  const { title, img, alt, type, year } = work;
  
  // Encoder l'URL de l'image pour gérer les espaces et caractères spéciaux
  const encodedImgUrl = img ? encodeURI(img) : null;
  
  // Utiliser forwardRef et useEffect pour la référence
  useEffect(() => {
    if (ref && typeof setItemRef === 'function') {
      setItemRef(ref.current, index);
    }
  }, [ref, setItemRef, index]);
  
  // Gestionnaire pour quand l'image est chargée
  const handleImageLoad = () => {
    setImgLoaded(true);
  };
  
  return (
    <div 
      ref={ref}
      className={`work-item ${isActive ? 'active' : ''}`}
      id={`work-item-${index}`}
    >
      <div className="work-image-container">
        {img && (
          <img 
            src={encodedImgUrl} 
            alt={alt || title} 
            className={`work-image ${imgLoaded ? 'loaded' : ''}`}
            loading="eager" // Chargement immédiat pour éviter les problèmes
            onLoad={handleImageLoad}
            onError={(e) => {
              console.error(`Erreur de chargement pour l'image: ${img}`);
              e.target.src = '/api/placeholder/600/400';
              e.target.alt = 'Image non disponible';
              setImgLoaded(true);
            }}
          />
        )}
      </div>
      <div className="work-info">
        <h3 className="work-title">{title}</h3>
        <div className="work-details">
          <span className="work-type">{type}</span>
          <span className="work-year">{year}</span>
        </div>
      </div>
    </div>
  );
});

export default WorkItem;