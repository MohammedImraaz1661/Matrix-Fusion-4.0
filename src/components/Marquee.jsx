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

        // Calculate the width of one set of content
        const contentWidth = content.offsetWidth;

        // Create the GSAP tween for infinite scrolling
        // We move the container by exactly one content width, then reset instantly
        tweenRef.current = gsap.to(marquee, {
            x: -contentWidth,
            ease: 'none',
            duration: 15, // Adjust speed here
            repeat: -1,
        });

        // Add hover pause/play listeners (only affects desktop/mouse users)
        const handleMouseEnter = () => tweenRef.current?.pause();
        const handleMouseLeave = () => tweenRef.current?.play();

        const marqueeContainer = marquee.parentElement;
        marqueeContainer.addEventListener('mouseenter', handleMouseEnter);
        marqueeContainer.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            if (tweenRef.current) {
                tweenRef.current.kill();
            }
            marqueeContainer.removeEventListener('mouseenter', handleMouseEnter);
            marqueeContainer.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div className="marquee-container">
            <div className="marquee-track" ref={marqueeRef}>
                <div className="marquee-content" ref={contentRef}>
                    <span className="marquee-text">1ST SHORTLISTING STAGE WILL BE LIVE SOON</span>
                    <span className="marquee-separator">•</span>
                    <span className="marquee-text">1ST SHORTLISTING STAGE WILL BE LIVE SOON</span>
                    <span className="marquee-separator">•</span>
                    <span className="marquee-text">1ST SHORTLISTING STAGE WILL BE LIVE SOON</span>
                    <span className="marquee-separator">•</span>
                </div>
            </div>
        </div>
    );
};

export default Marquee;
