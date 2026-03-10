import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Marquee.css';

const Marquee = () => {
    const marqueeRef = useRef(null);
    const contentRef = useRef(null);
    const tweenRef = useRef(null);

    useEffect(() => {
        const marquee = marqueeRef.current;
        const content = contentRef.current;
        if (!marquee || !content) return;

        // Clone the content to make it seamless
        const clone = content.cloneNode(true);
        marquee.appendChild(clone);

        // Wait for fonts/layout to settle before initializing animation
        const initAnimation = () => {
            if (tweenRef.current) tweenRef.current.kill();

            // Calculate the width of one set of content
            const contentWidth = content.offsetWidth;

            // Create the GSAP tween for infinite scrolling
            tweenRef.current = gsap.to(marquee, {
                x: -contentWidth,
                ease: 'none',
                duration: 15, // Slower speed
                repeat: -1,
            });
        };

        // Initialize and handle resize
        initAnimation();

        // Wait a bit for webfonts just in case, then recompute
        const timer = setTimeout(initAnimation, 500);
        window.addEventListener('resize', initAnimation);

        // Add hover pause/play listeners
        const handleMouseEnter = () => tweenRef.current?.pause();
        const handleMouseLeave = () => tweenRef.current?.play();

        const marqueeContainer = marquee.parentElement;
        marqueeContainer.addEventListener('mouseenter', handleMouseEnter);
        marqueeContainer.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', initAnimation);
            if (tweenRef.current) tweenRef.current.kill();
            marqueeContainer.removeEventListener('mouseenter', handleMouseEnter);
            marqueeContainer.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div className="marquee-container">
            <div className="marquee-track" ref={marqueeRef}>
                <div className="marquee-content" ref={contentRef}>
                    <span className="marquee-text">PROBLEM STATEMENTS FOR THE SHORTLISTING ROUND WILL BE LIVE SOON</span>
                    <span className="marquee-separator">•</span>
                    <span className="marquee-text">PROBLEM STATEMENTS FOR THE SHORTLISTING ROUND WILL BE LIVE SOON</span>
                    <span className="marquee-separator">•</span>
                    <span className="marquee-text">PROBLEM STATEMENTS FOR THE SHORTLISTING ROUND WILL BE LIVE SOON</span>
                    <span className="marquee-separator">•</span>
                </div>
            </div>
        </div>
    );
};

export default Marquee;
