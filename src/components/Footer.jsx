import React, { useEffect, useState } from 'react';

const Footer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00' });

  useEffect(() => {
    const targetDate = new Date(2026, 2, 24, 23, 59, 59); // March 31, 2026

    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: '00', hours: '00', minutes: '00' });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0')
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="footer-section">
      <div className="contact-block">
        <div className="contact-left">
          <h3>CONTACT INFO</h3>
          <div className="contact-details">
            <span>PHONE NUMBER - +91 97757-53233, +91 95397-55923</span>
            <span>
              EMAIL - <a href="mailto:yenartificia@yit.edu.in">yenartificia@yit.edu.in</a>
            </span>
          </div>
        </div>
      </div>

      <div className="countdown-wrap">
        <span className="countdown-label">TIME REMAINING</span>
        <div className="count-item">
          <span className="count-digit">{timeLeft.days}</span>
          <span className="count-label">DAYS</span>
        </div>
        <div className="count-item">
          <span className="count-digit">{timeLeft.hours}</span>
          <span className="count-label">HOURS</span>
        </div>
        <div className="count-item">
          <span className="count-digit">{timeLeft.minutes}</span>
          <span className="count-label">MIN</span>
        </div>
      </div>

      <footer className="site-footer">
        <span>© 2026 YIT. ALL RIGHTS RESERVED</span>
        <span>DEVELOPMENT - YEN_ARTICS, <i class="ri-arrow-right-long-line"></i> <a href="https://www.google.com">IMZ</a></span>
      </footer>
    </section>
  );
};

export default Footer;
