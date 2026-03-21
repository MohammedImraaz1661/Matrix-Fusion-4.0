import React from 'react';

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="header-logo js-cursor-extend-sm">
          <img src="MF 4.0 Logo.png" alt="Matrix Fusion 4.0 Logo" />
        </div>
        <div className="header-center-logo">
          <img src="Artics-removebg-preview.png" alt="Yen-Artics Logo" />
        </div>
        <nav className="header-nav">
          <a href="#about" className="js-cursor-contract">
            <span className="nav-item-inner">
              <span className="nav-item-link nav-item-link__default">ABOUT</span>
              <span className="nav-item-link nav-item-link__active">ABOUT</span>
            </span>
          </a>
          <a href="#flow-section" className="js-cursor-contract">
            <span className="nav-item-inner">
              <span className="nav-item-link nav-item-link__default">ROADMAP</span>
              <span className="nav-item-link nav-item-link__active">ROADMAP</span>
            </span>
          </a>
          <a href="#domain" className="js-cursor-contract">
            <span className="nav-item-inner">
              <span className="nav-item-link nav-item-link__default">DOMAIN </span>
              <span className="nav-item-link nav-item-link__active">DOMAIN</span>
            </span>
          </a>
          <a href="#domain" className="js-cursor-contract">
            <span className="nav-item-inner">
              <span className="nav-item-link nav-item-link__default">REGISTRATION</span>
              <span className="nav-item-link nav-item-link__active">REGISTRATION</span>
            </span>
          </a>
          <a href="#idea-submission" className="js-cursor-contract">
            <span className="nav-item-inner">
              <span className="nav-item-link nav-item-link__default">SUBMIT IDEA</span>
              <span className="nav-item-link nav-item-link__active">SUBMIT IDEA</span>
            </span>
          </a>
          <a href="#cood" className="js-cursor-contract">
            <span className="nav-item-inner">
              <span className="nav-item-link nav-item-link__default">ORGANIZERS</span>
              <span className="nav-item-link nav-item-link__active">ORGANIZERS</span>
            </span>
          </a>
          <a href="#pics" className="js-cursor-contract">
            <span className="nav-item-inner">
              <span className="nav-item-link nav-item-link__default">GALLERY</span>
              <span className="nav-item-link nav-item-link__active">GALLERY</span>
            </span>
          </a>
          <a href="#faq" className="js-cursor-contract">
            <span className="nav-item-inner">
              <span className="nav-item-link nav-item-link__default">FAQs</span>
              <span className="nav-item-link nav-item-link__active">FAQs</span>
            </span>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
