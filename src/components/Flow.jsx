import React from 'react';

const flowSteps = [
    {
        title: 'REGISTRATION',
        desc: 'Teams register through the official website before March 22, 2026. Each team must consist of 2–4 members and complete submission details during registration under the open domain format.',
        side: 'left',
    },
    {
        title: 'INITIAL IDEA SUBMISSION',
        desc: 'Registered teams submit a brief concept presentation (maximum 4 slides) outlining their proposed solution. Submissions are evaluated for clarity, feasibility, and innovation.',
        side: 'right',
    },
    {
        title: 'SHORTLISTING & CONFIRMATION',
        desc: 'Based on evaluation, the top 20 teams are shortlisted and notified. Selected teams confirm participation and proceed to the next stage.',
        side: 'left',
    },
    {
        title: 'FINAL PROPOSAL SUBMISSION',
        desc: 'Shortlisted teams submit a refined project presentation (maximum 5 slides) clearly detailing their concept, objectives, and implementation strategy before the final round.',
        side: 'right',
    },
    {
        title: 'FINAL HACKATHON',
        desc: 'The offline hackathon begins with verification and inauguration on April 1. Teams work on the on-spot problem statement, with final presentations and judging conducted on April 2.',
        side: 'left',
    },
    {
        title: 'EVALUATION & RESULT',
        desc: 'Projects are evaluated based on innovation, technical execution, feasibility, and impact. Winners are announced and recognized for their outstanding solutions.',
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
        </section>
    );
};

export default Flow;
