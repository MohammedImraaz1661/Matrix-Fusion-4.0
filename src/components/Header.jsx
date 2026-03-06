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
          <a href="#domain" className="js-cursor-contract">
            <span className="nav-item-inner">
              <span className="nav-item-link nav-item-link__default">DOMAIN</span>
              <span className="nav-item-link nav-item-link__active">DOMAIN</span>
            </span>
          </a>
          <a href="#cood" className="js-cursor-contract">
            <span className="nav-item-inner">
              <span className="nav-item-link nav-item-link__default">CO-OD'S</span>
              <span className="nav-item-link nav-item-link__active">CO-OD'S</span>
            </span>
          </a>
          <a href="#pics" className="js-cursor-contract">
            <span className="nav-item-inner">
              <span className="nav-item-link nav-item-link__default">PIC'S</span>
              <span className="nav-item-link nav-item-link__active">PIC'S</span>
            </span>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
