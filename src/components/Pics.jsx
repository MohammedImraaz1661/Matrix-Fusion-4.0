import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Pics = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isTouchDevice = ('ontouchstart' in window) ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(hover: none)').matches;

    if (isTouchDevice) return; // Skip animations on mobile

    const boxes = section.querySelectorAll('.pic-box');

    gsap.set(boxes, { opacity: 0, y: 60, scale: 0.95 });

    gsap.to(boxes, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section className="pics-section" id="pics" ref={sectionRef}>
      <span className="js-cursor-extend-sm section-label">PICS</span>
      <div className="pics-grid">
        <div className="pic-box">
          <img src="./DSC_0457_compressed.jpg" alt="Event photo 1" loading="lazy" decoding="async" />
        </div>
        <div className="pic-box">
          <img src="./DSC_0594_compressed.jpg" alt="Event photo 2" loading="lazy" decoding="async" />
        </div>
        <div className="pic-box">
          <img src="./DSC_3588_compressed.jpg" alt="Event photo 3" loading="lazy" decoding="async" />
        </div>
      </div>
      <div className="pics-grid-bottom">
        <div className="pic-box">
          <img src="./DSC_3608_(2)_compressed.jpg" alt="Event photo 4" loading="lazy" decoding="async" />
        </div>
        <div className="pic-box">
          <img src="./DSC_3867_compressed.jpg" alt="Event photo 5" loading="lazy" decoding="async" />
        </div>
      </div>
      <div className="pics-grid">
        <div className="pic-box">
          <img src="./DSC_0586.JPG" alt="Event photo 1" loading="lazy" decoding="async" />
        </div>
        <div className="pic-box">
          <img src="./DSC_3560.jpg" alt="Event photo 2" loading="lazy" decoding="async" />
        </div>
        <div className="pic-box">
          <img src="./DSC_0624.JPG" alt="Event photo 3" loading="lazy" decoding="async" />
        </div>
      </div>
    </section>
  );
};

export default Pics;
