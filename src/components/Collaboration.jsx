import React from 'react';

const Collaboration = () => {
  return (
    <section className="collab-sponsored-wrapper">
      {/* Collaboration */}
      <div className="collab-block">
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
            <img src="./IEEE2.jpeg" alt="IEEE" />
          </div>
          <div className="sponsor-box sponsor-box--purple">
            <img src="./clardo.png" alt="Clardo" />
          </div>
          <div className="sponsor-box">
            <img src="./Genesis.png" alt="Genesis" />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="collab-divider" />

      {/* Sponsored By */}
      <div className="collab-block">
        <h2 className="collab-title">
          <span className="text-accent">Sponsored</span> by
        </h2>
        <div className="sponsor-boxes">
          {/* Add your sponsor images here — same structure as collab boxes */}
          <div className="sponsor-box">
            <img src="./ReachX.png" alt="ReachX" />
          </div>
          <div className="sponsor-box">
            <img src="./Abhimo.png" alt="Abhinmo" />
          </div>
          {/* <div className="sponsor-box"> */}
            {/* <img src="./sponsor3.png" alt="Sponsor 3" /> */}
          {/* </div> */}
        </div>
      </div>
    </section>
  );
};

export default Collaboration;
