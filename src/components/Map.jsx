import React from 'react';

const Map = () => {
    return (
        <section className="map-section" id="map">
            <span className="section-label js-cursor-extend-sm">LOCATION</span>
            <div className="map-inner">
                {/* Left: college name + arrow (hidden on mobile) */}
                <div className="map-info">
                    <div className="map-name">
                        <span>YENEPOYA INSTITUTE OF</span>
                        <span>TECHNOLOGY, MOODBIDRI</span>
                    </div>
                    <a
                        href="https://maps.app.goo.gl/57GDNFSwWBGzNj1s6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="map-arrow js-cursor-extend-sm"
                        aria-label="Open in Google Maps"
                    >
                        <i className="ri-arrow-right-up-line"></i>
                    </a>
                </div>

                {/* Right: map embed */}
                <div className="map-embed">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4593.032467896642!2d74.96971835463664!3d13.045783291112475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4aa7ba88df529%3A0x551812777ca20e10!2sYenepoya%20Institute%20Of%20Technology!5e1!3m2!1sen!2sin!4v1772845233821!5m2!1sen!2sin" 
                    allowFullScreen="" 
                    loading="lazy"
                    policy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </section>
    );
};

export default Map;
