import React from 'react';

const CoOd = () => {
  const handleMouseEnter = (e) => {
    const parent = e.currentTarget.closest('.heading-mask');
    if (parent) parent.classList.add('is-hover');
  };

  const handleMouseLeave = (e) => {
    const parent = e.currentTarget.closest('.heading-mask');
    if (parent) parent.classList.remove('is-hover');
  };

  return (
    <section className="cood-section" id="cood">
      <span className="section-label js-cursor-extend-sm">CO-OD</span>
      <div className="cood-list">
        {/* Staff Row */}
        <div className="heading-mask js-simple-masking_el">
          <div 
            className="heading-mask_el heading-mask_el__deep"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="cood-row">
              <div className="cood-label">Staff</div>
              <div className="cood-content">
                <h4>Prasanna Kumar</h4>
                <h4>Abdul Majeed K M</h4>
                <h4>Ramya A</h4>
                <h4>Safmina P K</h4>
              </div>
            </div>
          </div>
          <div className="heading-mask_el heading-mask_el__masking">
            <div className="cood-row text-dark">
              <div className="cood-label">Department of</div>
              <div className="cood-content">
                <h4>prasanna@yit.edu.in</h4>
                <h4>abdulmajeed@yit.edu.in</h4>
                <h4>ramya@yit.edu.in</h4>
                <h4>safmina@yit.edu.in</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Student Row */}
        <div className="heading-mask js-simple-masking_el">
          <div 
            className="heading-mask_el heading-mask_el__deep"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="cood-row">
              <div className="cood-label">Student</div>
              <div className="cood-content">
                <h4>Vyshnav S Madhav</h4>
                <h4>Vaibhav Rai A V</h4>
                <h4>Saima Sharmin</h4>
              </div>
            </div>
          </div>
          <div className="heading-mask_el heading-mask_el__masking">
            <div className="cood-row text-dark">
              <div className="cood-label">AIML</div>
              <div className="cood-content">
                <h4>+91 97787-53233</h4>
                <h4>+91 95397-55923</h4>
                <h4>+91 90081-87826</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoOd;
