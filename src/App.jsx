import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import Loader from './components/Loader';
import Header from './components/Header';
import SocialIcons from './components/SocialIcons';
import Hero from './components/Hero';
import About from './components/About';
import Flow from './components/Flow';
import Domain from './components/Domain';
import CoOd from './components/CoOd';
import Pics from './components/Pics';
import Prizes from './components/Prizes';
import Collaboration from './components/Collaboration';
import Footer from './components/Footer';
import InteractiveGrid from './components/InteractiveGrid';
import GradientBlinds from './components/GradientBlinds';
import Map from './components/Map';
import IdeaSubmission from './components/IdeaSubmission';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Touch detection
    const touchDetected = ('ontouchstart' in window) ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(hover: none)').matches;
    setIsTouch(touchDetected);

    if (touchDetected) {
      document.body.classList.add('is-touch');
    }

    // Fix VH
    const fixVh = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    fixVh();
    window.addEventListener('resize', fixVh);

    return () => window.removeEventListener('resize', fixVh);
  }, []);

  // Initialize Lenis and cursor after loading completes
  useEffect(() => {
    if (!loading) {
      // Lenis Smooth Scroll
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        smooth: true,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // Custom Cursor
      if (!isTouch) {
        const cursorEl = document.getElementById('custom-cursor');
        const SIZE = { default: 20, extend: 200, extendSm: 50, contract: 0 };
        const cur = { x: -200, y: -200, targetX: -200, targetY: -200, size: SIZE.default };
        let rafTs = null;
        let active = false;

        function renderCursor() {
          cursorEl.style.setProperty('--size', `${cur.size}px`);
          cursorEl.style.setProperty('--x', `${cur.x}px`);
          cursorEl.style.setProperty('--y', `${cur.y}px`);
          cursorEl.style.setProperty('--opacity', '1');
        }

        function tickCursor(time) {
          if (rafTs === null) { rafTs = time; return; }
          const dt = time - rafTs;
          rafTs = time;
          const f = 1 - Math.pow(0.001, dt);
          cur.x += (cur.targetX - cur.x) * f;
          cur.y += (cur.targetY - cur.y) * f;
          if (active) renderCursor();
        }

        gsap.ticker.add(tickCursor);

        const handleMouseMove = (e) => {
          cur.targetX = e.clientX;
          cur.targetY = e.clientY;
          if (!active) {
            cur.x = e.clientX;
            cur.y = e.clientY;
            active = true;
          }
        };

        document.addEventListener('mousemove', handleMouseMove);

        const onExtend = () => {
          gsap.killTweensOf(cur);
          gsap.to(cur, { size: SIZE.extend, duration: 0.6, ease: 'power3.out' });
          cursorEl.classList.add('is-extended');
        };

        const onExtendSmall = () => {
          gsap.killTweensOf(cur);
          gsap.to(cur, { size: SIZE.extendSm, duration: 0.4, ease: 'power3.out' });
          cursorEl.classList.add('is-extended');
        };

        const onContract = () => {
          gsap.killTweensOf(cur);
          gsap.to(cur, { size: SIZE.contract, duration: 0.35, ease: 'power3.out' });
          cursorEl.classList.remove('is-extended');
        };

        const onLeave = () => {
          gsap.killTweensOf(cur);
          gsap.to(cur, { size: SIZE.default, duration: 0.5, ease: 'power3.out' });
          cursorEl.classList.remove('is-extended');
        };

        document.querySelectorAll('.js-cursor-extend').forEach(el => {
          el.addEventListener('mouseenter', onExtend);
          el.addEventListener('mouseleave', onLeave);
        });

        document.querySelectorAll('.js-cursor-extend-sm').forEach(el => {
          el.addEventListener('mouseenter', onExtendSmall);
          el.addEventListener('mouseleave', onLeave);
        });

        document.querySelectorAll('.js-cursor-contract').forEach(el => {
          el.addEventListener('mouseenter', onContract);
          el.addEventListener('mouseleave', onLeave);
        });
      }

      // Video Parallax
      if (!isTouch) {
        const heroSection = document.getElementById('hero-section');
        const scaleEl = document.getElementById('video-scale');
        const bgEl = document.getElementById('video-bg');

        if (heroSection && scaleEl && bgEl) {
          gsap.fromTo(scaleEl,
            { scale: 1.2 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: heroSection,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
              }
            }
          );

          gsap.to(bgEl, {
            yPercent: -20,
            ease: 'none',
            scrollTrigger: {
              trigger: heroSection,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            }
          });
        }
      }

      // Section Reveal Animations (desktop only)
      if (!isTouch) {
        const sections = document.querySelectorAll('.about-section, .flow-section, .domain-section, .idea-submission-section, .cood-section, .prizes-section, .collab-sponsored-wrapper, .map-section, .footer-section');
        sections.forEach((section) => {
          gsap.set(section, { opacity: 0, y: 50 });
          gsap.to(section, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          });
        });
      }

      // Toggle fixed-element colors when scrolling past the hero
      const heroEl = document.getElementById('hero-section');
      if (heroEl) {
        ScrollTrigger.create({
          trigger: heroEl,
          start: 'bottom top',
          onEnter: () => document.documentElement.classList.add('scrolled-past-hero'),
          onLeaveBack: () => document.documentElement.classList.remove('scrolled-past-hero'),
        });
      }
    }
  }, [loading, isTouch]);

  return (
    <>
      {loading && <Loader onLoadComplete={() => setLoading(false)} />}

      {!loading && (
        <>
          {/* Custom Cursor */}
          <div className="custom-cursor" id="custom-cursor"></div>

          {/* Gradient Background */}
          <div className="video-bg-fixed" id="video-bg">
            <div className="video-scale-wrapper" id="video-scale">
              <GradientBlinds
                gradientColors={['#EDF2FB', '#5F1C9B']}
                angle={0}
                noise={0.15}
                blindCount={14}
                blindMinWidth={40}
                mouseDampening={0.12}
                spotlightRadius={0.6}
                spotlightSoftness={1.2}
                spotlightOpacity={0.8}
                distortAmount={0}
                shineDirection="left"
                mixBlendMode="normal"
              />
            </div>
          </div>
          <div className="video-overlay"></div>

          {/* Main Content */}
          <div id="main">
            <Header />
            <SocialIcons />
            <a href="/Matrix_fusion_4.0_brochure.pdf" download className="brochure-fixed js-cursor-extend-sm">
              <span>BROCHURE</span>
            </a>

            <Hero />

            <div className="below-fold">
              <InteractiveGrid />
              <About />
              <Flow />
              <Domain />
              <IdeaSubmission />
              <CoOd />
              <Prizes />
              <Pics />
              <Collaboration />
              <Map />
              <Footer />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
