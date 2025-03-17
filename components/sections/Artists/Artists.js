import React from 'react';
import './Artists.css';
import SectionTitle from '../../common/SectionTitle/SectionTitle';
import Artist from './Artist';
import Collaborators from './Collaborators';
import useIntersectionObserver from '../../../hooks/useIntersectionObserver';

const Artists = () => {
  useIntersectionObserver('.artist, .collaborators-title', 0.15);

  const mainArtists = [
    {
      name: 'PIERRE ANDREWS',
      period: '2020-PRESENT',
      role: 'VISUAL ARTS • COMPOSITION'
    },
    {
      name: 'VICTOR ROCHE',
      period: '2020-PRESENT',
      role: 'LITERATURE • SOUND DESIGN'
    }
  ];

  const collaborators = [
    {
      name: 'CLARA DUBOIS',
      period: '2023-2024',
      role: 'LITERATURE'
    },
    {
      name: 'JEAN MARTIN',
      period: '2022-2023',
      role: 'PHOTOGRAPHY'
    },
    {
      name: 'SARAH KLEIN',
      period: '2021-2022',
      role: 'SOUND DESIGN'
    },
    {
      name: 'THOMAS BAILLOT',
      period: '2020-2021',
      role: 'VISUAL ARTS'
    }
  ];

  return (
    <div className="section" id="artists">
      <div className="section-number">03</div>
      <SectionTitle title="ARTISTS" />
      
      <div className="artists-list">
        {mainArtists.map((artist, index) => (
          <Artist 
            key={index}
            name={artist.name} 
            period={artist.period} 
            role={artist.role} 
            delay={0.1 * (index + 1)}
          />
        ))}
        
        <Collaborators collaborators={collaborators} />
      </div>
    </div>
  );
};

export default Artists;