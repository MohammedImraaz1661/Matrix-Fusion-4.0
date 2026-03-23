import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const TEXT = 'Registration and Idea Submission has been extended upto 24th March 2026.';
const SEPARATOR = '\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0'; // spacing only

const AnnouncementBanner = () => {
    const trackRef = useRef(null);
    const contentRef = useRef(null);
    const tweenRef = useRef(null);

    useEffect(() => {
        const track = trackRef.current;
        const content = contentRef.current;
        if (!track || !content) return;

        // Clone to make seamless loop
        const clone = content.cloneNode(true);
        track.appendChild(clone);

        const initMarquee = () => {
            if (tweenRef.current) tweenRef.current.kill();
            const contentWidth = content.offsetWidth;
            tweenRef.current = gsap.fromTo(
                track,
                { x: 0 },
                {
                    x: -contentWidth,
                    ease: 'none',
                    duration: 25,
                    repeat: -1,
                }
            );
        };

        // Init after layout settles
        initMarquee();
        const timer = setTimeout(initMarquee, 400);
        window.addEventListener('resize', initMarquee);

        // Pause on hover
        const container = track.parentElement;
        const pause = () => tweenRef.current?.pause();
        const play = () => tweenRef.current?.play();
        container.addEventListener('mouseenter', pause);
        container.addEventListener('mouseleave', play);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', initMarquee);
            container.removeEventListener('mouseenter', pause);
            container.removeEventListener('mouseleave', play);
            if (tweenRef.current) tweenRef.current.kill();
        };
    }, []);

    const item = `${TEXT}${SEPARATOR}`;

    return (
        <div className="announcement-banner">
            <div className="announcement-overflow">
                <div className="announcement-track" ref={trackRef}>
                    <div className="announcement-content" ref={contentRef}>
                        {Array.from({ length: 6 }).map((_, i) => (
                            <span className="announcement-text" key={i}>{item}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementBanner;
