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
          WHERE CODING MEETS <span>AI & ML.</span>
        </p>
        <div className="hero-btn-group">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdVRQIdBtHkKFEIgoKcIV07FcHz3z9T8a642Qp99xGa27WSgg/viewform?usp=header"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-register-btn js-cursor-extend-sm"
          >
            REGISTER NOW
          </a>
          <div className="hero-btn-row">
            <a href="./MatrixFusion 4.0 PPT.pptx" download className="hero-secondary-btn js-cursor-extend-sm">
              PPT TEMPLATE
            </a>
            <a href="https://forms.gle/wn5FHJFvPfm7UuSs7" target="_blank" rel="noopener noreferrer" className="hero-secondary-btn js-cursor-extend-sm">
              SUBMIT ABSTRACT &amp; PPT
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
