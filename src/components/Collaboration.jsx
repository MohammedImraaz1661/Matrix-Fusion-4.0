import React from 'react';

const Collaboration = () => {
  return (
    <section className="collab-section">
      <h2 className="collab-title">
        In <span className="text-accent">Collaboration</span> with
      </h2>
      <div className="sponsor-boxes">
        <div className="sponsor-box">
          <img src="./Iste-removebg-preview.png" alt="ISTE" />
        </div>
        <div className="sponsor-box">
          <img src="./Iic-removebg-preview.png" alt="IIC" />
        </div>
        <div className="sponsor-box">
          <img src="./IEEE Logo.png" alt="IEEE" />
        </div>
        <div className="sponsor-box">
          <img src="./clardo.png" alt="Clardo" />
        </div>
      </div>
    </section>
  );
};

export default Collaboration;
