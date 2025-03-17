import React from 'react';
import './Works.css';
import SectionTitle from '../../common/SectionTitle/SectionTitle';
import WorkCategory from './WorkCategory';
import useIntersectionObserver from '../../../hooks/useIntersectionObserver';

const Works = () => {
  useIntersectionObserver('.work-item', 0.15);

  const graphicArtWorks = [
    {
      title: 'CHROMATIC WAVES',
      img: '/api/placeholder/800/600',
      alt: 'Chromatic Waves',
      type: 'DIGITAL ART',
      year: '2024'
    },
    {
      title: 'URBAN TEXTURES',
      img: '/api/placeholder/800/600',
      alt: 'Urban Textures',
      type: 'PHOTOGRAPHY',
      year: '2022'
    }
  ];

  const musicWorks = [
    {
      title: 'SONIC LANDSCAPES',
      img: '/api/placeholder/800/600',
      alt: 'Sonic Landscapes',
      type: 'SOUND',
      year: '2023'
    },
    {
      title: 'TEMPORAL ECHOES',
      img: '/api/placeholder/800/600',
      alt: 'Temporal Echoes',
      type: 'AUDIO-VISUAL',
      year: '2022'
    }
  ];

  const literatureWorks = [
    {
      title: 'FRAGMENTS',
      img: '/api/placeholder/800/600',
      alt: 'Fragments',
      type: 'MIXED MEDIA',
      year: '2023'
    },
    {
      title: 'RESONANT FORMS',
      img: '/api/placeholder/800/600',
      alt: 'Resonant Forms',
      type: 'TEXT INSTALLATION',
      year: '2021'
    }
  ];

  return (
    <div className="section" id="works">
      <div className="section-number">02</div>
      <SectionTitle title="WORKS" />
      
      <WorkCategory title="GRAPHIC ART" works={graphicArtWorks} index={1} />
      <WorkCategory title="MUSIC" works={musicWorks} index={2} />
      <WorkCategory title="LITERATURE" works={literatureWorks} index={3} />
    </div>
  );
};

export default Works;