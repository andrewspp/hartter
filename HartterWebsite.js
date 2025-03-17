import React, { useEffect, useRef, useState } from 'react';
import './HartterWebsite.css';

function HartterWebsite() {
  const gridBackgroundRef = useRef(null);
  const mainTitleRef = useRef(null);
  const scrollProgressRef = useRef(null);
  const cursorDotsRef = useRef([]);
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    // Initialiser la grille de fond
    const gridBackground = gridBackgroundRef.current;
    if (gridBackground) {
      for (let i = 0; i < 400; i++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        gridBackground.appendChild(cell);
      }
    }

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
    
    // Observer d'intersection pour animations au défilement
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
    
    // Observer pour révéler les éléments au défilement
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });
    
    document.querySelectorAll('.reveal-on-scroll, .about-content, .artist, .exhibition, .work-item, .collaborators-title, .work-category').forEach(el => {
      revealObserver.observe(el);
    });
    
    // Basculement thème clair/sombre
    const themeToggle = document.getElementById('theme-toggle');
    
    themeToggle.addEventListener('click', () => {
      setDarkMode(!darkMode);
      
      if (!darkMode) {
        document.documentElement.style.setProperty('--color-bg', '#000000');
        document.documentElement.style.setProperty('--color-text', '#ffffff');
      } else {
        document.documentElement.style.setProperty('--color-bg', '#ffffff');
        document.documentElement.style.setProperty('--color-text', '#000000');
      }
    });
    
    // Effet parallaxe au défilement
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Mettre à jour l'indicateur de défilement
      const scrollMax = document.body.scrollHeight - window.innerHeight;
      const scrollProgress = scrollProgressRef.current;
      if (scrollProgress) {
        scrollProgress.style.width = `${(scrollPosition / scrollMax) * 100}%`;
      }
      
      // Effet parallaxe sur le titre principal
      const mainTitle = mainTitleRef.current;
      if (mainTitle && scrollPosition < window.innerHeight) {
        const translateY = scrollPosition * 0.5;
        mainTitle.style.transform = `translateY(${translateY}px)`;
      }
      
      // Animation de grille de fond
      const gridCells = document.querySelectorAll('.grid-cell');
      gridCells.forEach((cell, index) => {
        if (Math.random() < 0.01) {
          cell.style.backgroundColor = index % 5 === 0 ? 'rgba(255, 107, 107, 0.1)' : 'rgba(0, 0, 0, 0.05)';
          setTimeout(() => {
            cell.style.backgroundColor = '';
          }, 500);
        }
      });
      
      // Animation de "glitch" occasionnel sur le titre
      if (Math.random() < 0.01) {
        const glitchElement = document.querySelector('.glitch-effect');
        if (glitchElement) {
          glitchElement.classList.add('active');
          setTimeout(() => {
            glitchElement.classList.remove('active');
          }, 200);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Effet de traînée de curseur
    const cursorDots = [];
    const maxDots = 10;
    
    for (let i = 0; i < maxDots; i++) {
      const dot = document.createElement('div');
      dot.className = 'cursor-dot';
      dot.style.opacity = 1 - (i / maxDots);
      document.body.appendChild(dot);
      cursorDots.push({
        element: dot,
        x: 0,
        y: 0
      });
      cursorDotsRef.current.push(dot);
    }
    
    const handleMouseMove = (e) => {
      // Mettre à jour la position du premier point
      cursorDots[0].x = e.clientX;
      cursorDots[0].y = e.clientY;
      
      // Mettre à jour la position des points suivants avec un délai
      for (let i = 1; i < cursorDots.length; i++) {
        setTimeout(() => {
          cursorDots[i].x = cursorDots[i-1].x;
          cursorDots[i].y = cursorDots[i-1].y;
          cursorDots[i].element.style.left = `${cursorDots[i].x}px`;
          cursorDots[i].element.style.top = `${cursorDots[i].y}px`;
        }, i * 40);
      }
      
      // Mettre à jour immédiatement le premier point
      cursorDots[0].element.style.left = `${cursorDots[0].x}px`;
      cursorDots[0].element.style.top = `${cursorDots[0].y}px`;
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
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
    
    // Nettoyage
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
      clearInterval(titleDistortionInterval);
      cursorDotsRef.current.forEach(dot => {
        if (dot && dot.parentNode) {
          dot.parentNode.removeChild(dot);
        }
      });
    };
  }, [darkMode]);

  return (
    <>
      {/* NAVIGATION */}
      <div className="nav">
        <div className="nav-item active hover-shift" data-target="header">HOME</div>
        <div className="nav-item hover-shift" data-target="about">ABOUT</div>
        <div className="nav-item hover-shift" data-target="works">WORKS</div>
        <div className="nav-item hover-shift" data-target="artists">ARTISTS</div>
        <div className="nav-item hover-shift" data-target="exhibitions">EXHIBITIONS</div>
      </div>

      {/* THEME TOGGLE */}
      <div className="theme-toggle" id="theme-toggle"></div>

      {/* SCROLL INDICATOR */}
      <div className="scroll-indicator">
        <div className="scroll-progress" id="scroll-progress" ref={scrollProgressRef}></div>
      </div>

      {/* HEADER */}
      <div className="header" id="header">
        <div className="grid-background" id="grid-background" ref={gridBackgroundRef}></div>
        <h1 className="main-title glitch-effect" data-text="HARTTER" ref={mainTitleRef}>
          HART<br />TER
        </h1>
      </div>

      {/* ABOUT */}
      <div className="section" id="about">
        <div className="section-number">01</div>
        <h2 className="section-title reveal-on-scroll">MANIFESTO</h2>
        
        <div className="about-content reveal-on-scroll">
          HARTTER<br />
          PIERRE ANDREWS & VICTOR ROCHE<br />
          EST. 2020<br />
          <br />
          GRAPHIC ARTS | MUSIC | LITERATURE<br />
          <br />
          CONTACT@HARTTER.FR<br />
          +33 6XX XX XX XX<br />
          <br />
          INSTAGRAM: @HARTTER_ARTS<br />
          SOUNDCLOUD: @HARTTER_MUSIC<br />
          <br />
          10 RUE DES ARTISTES 75014 PARIS, FRANCE
        </div>
      </div>

      {/* WORKS */}
      <div className="section" id="works">
        <div className="section-number">02</div>
        <h2 className="section-title reveal-on-scroll">WORKS</h2>
        
        {/* GRAPHIC ART */}
        <div className="work-category">
          <h3 className="work-category-title">GRAPHIC ART</h3>
          <div className="works-grid">
            <div className="work-item">
              <img className="work-img" src="/api/placeholder/800/600" alt="Chromatic Waves" />
              <div className="work-info">
                <div className="work-title hover-shift">CHROMATIC WAVES</div>
                <div className="work-meta">
                  <span>DIGITAL ART</span>
                  <span>2024</span>
                </div>
              </div>
            </div>
            
            <div className="work-item">
              <img className="work-img" src="/api/placeholder/800/600" alt="Urban Textures" />
              <div className="work-info">
                <div className="work-title hover-shift">URBAN TEXTURES</div>
                <div className="work-meta">
                  <span>PHOTOGRAPHY</span>
                  <span>2022</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* MUSIC */}
        <div className="work-category">
          <h3 className="work-category-title">MUSIC</h3>
          <div className="works-grid">
            <div className="work-item">
              <img className="work-img" src="/api/placeholder/800/600" alt="Sonic Landscapes" />
              <div className="work-info">
                <div className="work-title hover-shift">SONIC LANDSCAPES</div>
                <div className="work-meta">
                  <span>SOUND</span>
                  <span>2023</span>
                </div>
              </div>
            </div>
            
            <div className="work-item">
              <img className="work-img" src="/api/placeholder/800/600" alt="Temporal Echoes" />
              <div className="work-info">
                <div className="work-title hover-shift">TEMPORAL ECHOES</div>
                <div className="work-meta">
                  <span>AUDIO-VISUAL</span>
                  <span>2022</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* LITERATURE */}
        <div className="work-category">
          <h3 className="work-category-title">LITERATURE</h3>
          <div className="works-grid">
            <div className="work-item">
              <img className="work-img" src="/api/placeholder/800/600" alt="Fragments" />
              <div className="work-info">
                <div className="work-title hover-shift">FRAGMENTS</div>
                <div className="work-meta">
                  <span>MIXED MEDIA</span>
                  <span>2023</span>
                </div>
              </div>
            </div>
            
            <div className="work-item">
              <img className="work-img" src="/api/placeholder/800/600" alt="Resonant Forms" />
              <div className="work-info">
                <div className="work-title hover-shift">RESONANT FORMS</div>
                <div className="work-meta">
                  <span>TEXT INSTALLATION</span>
                  <span>2021</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ARTISTS */}
      <div className="section" id="artists">
        <div className="section-number">03</div>
        <h2 className="section-title reveal-on-scroll">ARTISTS</h2>
        
        <div className="artists-list">
          <div className="artist reveal-on-scroll" style={{ transitionDelay: '0.1s' }}>
            <div className="artist-name hover-shift">PIERRE ANDREWS</div>
            <div className="artist-period">2020-PRESENT</div>
            <div className="artist-role">VISUAL ARTS • COMPOSITION</div>
          </div>
          
          <div className="artist reveal-on-scroll" style={{ transitionDelay: '0.2s' }}>
            <div className="artist-name hover-shift">VICTOR ROCHE</div>
            <div className="artist-period">2020-PRESENT</div>
            <div className="artist-role">LITERATURE • SOUND DESIGN</div>
          </div>
          
          <div className="collaborators-title reveal-on-scroll">COLLABORATIONS</div>
          
          <div className="artist reveal-on-scroll" style={{ transitionDelay: '0.3s' }}>
            <div className="artist-name hover-shift">CLARA DUBOIS</div>
            <div className="artist-period">2023-2024</div>
            <div className="artist-role">LITERATURE</div>
          </div>
          
          <div className="artist reveal-on-scroll" style={{ transitionDelay: '0.4s' }}>
            <div className="artist-name hover-shift">JEAN MARTIN</div>
            <div className="artist-period">2022-2023</div>
            <div className="artist-role">PHOTOGRAPHY</div>
          </div>
          
          <div className="artist reveal-on-scroll" style={{ transitionDelay: '0.5s' }}>
            <div className="artist-name hover-shift">SARAH KLEIN</div>
            <div className="artist-period">2021-2022</div>
            <div className="artist-role">SOUND DESIGN</div>
          </div>
          
          <div className="artist reveal-on-scroll" style={{ transitionDelay: '0.6s' }}>
            <div className="artist-name hover-shift">THOMAS BAILLOT</div>
            <div className="artist-period">2020-2021</div>
            <div className="artist-role">VISUAL ARTS</div>
          </div>
        </div>
      </div>

      {/* EXHIBITIONS */}
      <div className="section" id="exhibitions">
        <div className="section-number">04</div>
        <h2 className="section-title reveal-on-scroll">EXHIBITIONS</h2>
        
        <div className="exhibitions-list">
          <div className="exhibition reveal-on-scroll" style={{ transitionDelay: '0.1s' }}>
            <div className="exhibition-year">2024</div>
            <div className="exhibition-title hover-shift">ÉCHOS GRAPHIQUES</div>
            <div className="exhibition-location">GALERIE CONTEMPORAINE, PARIS</div>
            <div className="exhibition-curator">CURATED BY <a href="#">CHRISTINE DUBOIS</a></div>
          </div>
          
          <div className="exhibition reveal-on-scroll" style={{ transitionDelay: '0.2s' }}>
            <div className="exhibition-year">2023</div>
            <div className="exhibition-title hover-shift">SONS & VISIONS</div>
            <div className="exhibition-location">FESTIVAL DES ARTS NUMÉRIQUES, LYON</div>
            <div className="exhibition-curator">CURATED BY <a href="#">COLLECTIF NUMÉRIQUE</a></div>
          </div>
          
          <div className="exhibition reveal-on-scroll" style={{ transitionDelay: '0.3s' }}>
            <div className="exhibition-year">2023</div>
            <div className="exhibition-title hover-shift">MONDES PARALLÈLES</div>
            <div className="exhibition-location">MUSÉE D'ART MODERNE, BORDEAUX</div>
            <div className="exhibition-curator">CURATED BY <a href="#">MARIE FONTAINE</a></div>
          </div>
          
          <div className="exhibition reveal-on-scroll" style={{ transitionDelay: '0.4s' }}>
            <div className="exhibition-year">2022</div>
            <div className="exhibition-title hover-shift">RÉSONANCES</div>
            <div className="exhibition-location">CITÉ DE LA MUSIQUE, PARIS</div>
            <div className="exhibition-curator">PERFORMANCE WITH LIVE ELECTRONICS AND VISUAL PROJECTIONS</div>
          </div>
          
          <div className="exhibition reveal-on-scroll" style={{ transitionDelay: '0.5s' }}>
            <div className="exhibition-year">2021</div>
            <div className="exhibition-title hover-shift">FRONTIÈRES</div>
            <div className="exhibition-location">BIENNALE D'ART CONTEMPORAIN, MARSEILLE</div>
            <div className="exhibition-curator">INSTALLATION AND SOUND DESIGN</div>
          </div>
          
          <div className="exhibition reveal-on-scroll" style={{ transitionDelay: '0.6s' }}>
            <div className="exhibition-year">2020</div>
            <div className="exhibition-title hover-shift">PREMIÈRE LUMIÈRE</div>
            <div className="exhibition-location">GALERIE NOUVELLE, PARIS</div>
            <div className="exhibition-curator">INAUGURAL EXHIBITION OF HARTTER</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HartterWebsite;