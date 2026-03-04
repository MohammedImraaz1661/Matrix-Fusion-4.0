import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="hero-section">
      <div className="hero-content">
        <p className="hero-pretitle">
          <span className="text-accent">YEN-ARTIFICIA</span> PRESENTS
        </p>
        <div className="title-stack js-cursor-extend">
          <div className="title-big">MATRIX</div>
          <div className="title-row-2">
            <div className="title-big">FUSION</div>
            <div className="title-big title-4o">4.0</div>
          </div>
        </div>
        <p className="hero-tagline">
          TECHNICAL <span>PARTNER</span>
        </p>
        <div className="hero-sponsor-box">
          <img src="./kokosai.png" alt="Kokosai" />
        </div>
        <p className="hero-tagline">
          WHERE CODING MEETS <span>AI.</span>
        </p>
      </div>
    </section>
  );
};

export default Hero;
