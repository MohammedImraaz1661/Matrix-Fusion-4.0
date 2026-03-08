import React from 'react';

const Domain = () => {
  return (
    <section className="domain-section" id="domain">
      <div className="domain-inner">
        <span className="section-label js-cursor-extend-sm">DOMAIN</span>
        <p className="domain-text js-cursor-extend">
          Matrix Fusion 4.<span className='text-accent'>0</span>  focuses exclusively on the <span className='text-accent'>Artificial Intelligence & Machine Learning</span> domain, inviting participants to tackle real-world challenges through <span className='text-accent'>intelligent systems and data-driven innovation</span>. From predictive modeling and computer vision to natural language processing and intelligent automation, teams are encouraged to build impactful AI solutions. The hackathon provides a focused environment to explore <span className='text-accent'>advanced technologies</span>, <span className='text-accent'>experiment with ideas</span>, and develop practical implementations. It’s a platform for innovators to push the boundaries of AI & ML through <span className='text-accent'>collaboration</span> and <span className='text-accent'>creative problem-solving</span>.
        </p>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSdVRQIdBtHkKFEIgoKcIV07FcHz3z9T8a642Qp99xGa27WSgg/viewform?usp=header" target="_blank" rel="noopener noreferrer" className="register_link">
          {/* <span className="js-cursor-extend-sm">REGISTER NOW</span> */}
          <p className='link-closed'>Currently the registration is closed. Please check back within 24hrs.</p>
        </a>
      </div>
    </section>
  );
};

export default Domain;
