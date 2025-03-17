import React, { useEffect } from 'react';
import './navigation.css';

const Navigation = () => {
  useEffect(() => {
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        // Activer l'élément de navigation cliqué
        document.querySelectorAll('.nav-item').forEach(navItem => {
          navItem.classList.remove('active');
        });
        item.classList.add('active');
        
        // Faire défiler jusqu'à la section correspondante
        const targetId = item.getAttribute('data-target');
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Observer d'intersection pour sections
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetId = entry.target.id;
          
          // Activer les éléments de navigation
          document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-target') === targetId) {
              item.classList.add('active');
            }
          });
          
          // Animer le numéro de section
          const sectionNumber = entry.target.querySelector('.section-number');
          if (sectionNumber) {
            sectionNumber.classList.add('visible');
          }
          
          // Animer le titre de section
          const sectionTitle = entry.target.querySelector('.section-title');
          if (sectionTitle) {
            sectionTitle.classList.add('visible');
          }
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('.section, .header').forEach(section => {
      sectionObserver.observe(section);
    });
  }, []);

  return (
    <div className="nav">
      <div className="nav-item active hover-shift" data-target="header">HOME</div>
      <div className="nav-item hover-shift" data-target="about">ABOUT</div>
      <div className="nav-item hover-shift" data-target="works">WORKS</div>
      <div className="nav-item hover-shift" data-target="artists">ARTISTS</div>
      <div className="nav-item hover-shift" data-target="exhibitions">EXHIBITIONS</div>
    </div>
  );
};

export default Navigation;