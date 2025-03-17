import React from 'react';
import './Exhibitions.css';
import SectionTitle from '../../common/SectionTitle/SectionTitle';
import Exhibition from './Exhibition';
import useIntersectionObserver from '../../../hooks/useIntersectionObserver';

const Exhibitions = () => {
  useIntersectionObserver('.exhibition', 0.15);

  const exhibitions = [
    {
      year: '2024',
      title: 'ÉCHOS GRAPHIQUES',
      location: 'GALERIE CONTEMPORAINE, PARIS',
      curator: 'CURATED BY CHRISTINE DUBOIS'
    },
    {
      year: '2023',
      title: 'SONS & VISIONS',
      location: 'FESTIVAL DES ARTS NUMÉRIQUES, LYON',
      curator: 'CURATED BY COLLECTIF NUMÉRIQUE'
    },
    {
      year: '2023',
      title: 'MONDES PARALLÈLES',
      location: 'MUSÉE D\'ART MODERNE, BORDEAUX',
      curator: 'CURATED BY MARIE FONTAINE'
    },
    {
      year: '2022',
      title: 'RÉSONANCES',
      location: 'CITÉ DE LA MUSIQUE, PARIS',
      curator: 'PERFORMANCE WITH LIVE ELECTRONICS AND VISUAL PROJECTIONS'
    },
    {
      year: '2021',
      title: 'FRONTIÈRES',
      location: 'BIENNALE D\'ART CONTEMPORAIN, MARSEILLE',
      curator: 'INSTALLATION AND SOUND DESIGN'
    },
    {
      year: '2020',
      title: 'PREMIÈRE LUMIÈRE',
      location: 'GALERIE NOUVELLE, PARIS',
      curator: 'INAUGURAL EXHIBITION OF HARTTER'
    }
  ];

  return (
    <div className="section" id="exhibitions">
      <div className="section-number">04</div>
      <SectionTitle title="EXHIBITIONS" />
      
      <div className="exhibitions-list">
        {exhibitions.map((exhibition, index) => (
          <Exhibition
            key={index}
            year={exhibition.year}
            title={exhibition.title}
            location={exhibition.location}
            curator={exhibition.curator}
            delay={0.1 * (index + 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default Exhibitions;