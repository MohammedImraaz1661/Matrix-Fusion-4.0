import React from 'react';

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-inner">
        <span className="section-label js-cursor-extend-sm">ABOUT</span>
        <p className="about-text js-cursor-extend">
          Matrix Fusion 4.<span className="text-accent">0</span> is a national-level hackathon 
          hosted by Yenepoya Institute of Technology, Moodbidri under the{' '}
          <span className="text-accent">Department of Artificial Intelligence and Machine Learning — YEN ARTIFICIA, Student Association of AIML</span>. The event brings together <span className="text-accent">innovators</span> to design impactful solutions within an intensive collaborative environment. It is conducted in association with <span className='text-accent'>IEEE Student Branch</span> and <span className='text-accent'>ISTE Student Chapter</span>, promoting technical excellence and interdisciplinary <span className='text-accent'>problem-solving</span>.
        </p>
      </div>
    </section>
  );
};

export default About;
