import React from 'react';

const flowSteps = [
    {
        title: 'REGISTRATION',
        desc: 'Teams register through the google form before the deadline, forming groups of 2–4 members. No fee required for first round shortlisting.',
        side: 'left',
    },
    {
        title: 'IDEA SUBMISSION',
        desc: 'Registered teams submit their idea as a PPT presentation along with a 500-word abstract using the official template provided on the website and Google Form. Submissions are evaluated by expert panels.',
        side: 'right',
    },
    {
        title: 'SHORTLISTING',
        desc: 'Based on evaluation, the top 20 teams are shortlisted and notified. Selected teams confirm participation and proceed to the next stage.',
        side: 'left',
    },
    {
        title: 'FINAL ROUND CONFIRMATION',
        desc: 'Selected teams complete final registration by paying the ₹600 team fee. A concessional fee of ₹300 per team applies if at least one member is an IEEE or ISTE member.',
        side: 'right',
    },
    {
        title: 'GRAND FINALE - HACKATHON ',
        desc: 'Participants report onsite for registration and verification, followed by inauguration and team briefing. The hackathon begins with an on-spot problem statement and continues through intensive build sessions from April 1st to April 2nd 2026.',
        side: 'left',
    },
    {
        title: 'EVALUATION & RESULT',
        desc: 'Teams present their solutions before the judging panel on the final day. Evaluation concludes with the valedictory session and announcement of results.',
        side: 'right',
    },
];

const Flow = () => {
    const handleMouseEnter = (e) => {
        const mask = e.currentTarget.closest('.flow-mask');
        if (mask) mask.classList.add('is-hover');
    };

    const handleMouseLeave = (e) => {
        const mask = e.currentTarget.closest('.flow-mask');
        if (mask) mask.classList.remove('is-hover');
    };

    return (
        <section className="flow-section" id="flow-section">
            <span className="section-label js-cursor-extend-sm">EVENT FLOW</span>
            <div className="flow-timeline">
                <div className="flow-line" />
                {flowSteps.map((step, i) => (
                    <div
                        className={`flow-mask flow-mask--${step.side}`}
                        key={i}
                    >
                        <div
                            className="flow-mask_deep"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className={`flow-card flow-card--${step.side}`}>
                                <span className="flow-card-title">{step.title}</span>
                            </div>
                        </div>
                        <div className="flow-mask_reveal">
                            <div className={`flow-card flow-card--${step.side} flow-card--accent`}>
                                <span className="flow-card-desc">{step.desc}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* <div className="flow-cta">
                <a href="./MatrixFusion 4.0 PPT.pptx" download className="register_link">
                    <span className="js-cursor-extend-sm">PPT TEMPLATE</span>
                </a>
            </div> */}
        </section>
    );
};

export default Flow;
