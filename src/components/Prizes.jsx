import React from 'react';

const Prizes = () => {
    const handleMouseEnter = (e) => {
        const parent = e.currentTarget.closest('.heading-mask');
        if (parent) parent.classList.add('is-hover');
    };

    const handleMouseLeave = (e) => {
        const parent = e.currentTarget.closest('.heading-mask');
        if (parent) parent.classList.remove('is-hover');
    };

    const prizes = [
        { label: '1st', amount: '₹30,000' },
        { label: '2nd', amount: '₹20,000' },
        { label: '3rd', amount: '₹10,000' },
    ];

    return (
        <section className="prizes-section" id="prizes-section">
            <span className="js-cursor-extend-sm section-label">PRIZE'S</span>
            <div className="prizes-list">
                {prizes.map((prize, i) => (
                    <div className="heading-mask js-simple-masking_el" key={i}>
                        <div
                            className="heading-mask_el heading-mask_el__deep"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="prize-row">
                                <div className="prize-label">{prize.label}</div>
                            </div>
                        </div>
                        <div className="heading-mask_el heading-mask_el__masking">
                            <div className="prize-row text-dark">
                                <div className="prize-amount">{prize.amount}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Mobile-only: show amounts directly */}
            <div className="prizes-mobile">
                {prizes.map((prize, i) => (
                    <div className="prize-mobile-card" key={i}>
                        <div className="prize-label">{prize.label}</div>
                        <div className="prize-amount">{prize.amount}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Prizes;
