import React from 'react';
import './About.css';
import SectionTitle from '../../common/SectionTitle/SectionTitle';
import useIntersectionObserver from '../../../hooks/useIntersectionObserver';

const About = () => {
  useIntersectionObserver('.reveal-on-scroll, .about-content', 0.15);

  return (
    <div className="section" id="about">
      <div className="section-number">01</div>
      <SectionTitle title="MANIFESTO" />
      
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
  );
};

export default About;