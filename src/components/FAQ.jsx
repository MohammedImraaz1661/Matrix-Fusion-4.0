import React, { useState, useRef, useEffect } from 'react';
import './FAQ.css';

const faqData = [
    {
        question: "Do I need to know how to code?",
        answer: "No! We welcome all skill levels. Whether you’re a designer, manager, or a total beginner, there’s a place for you to learn and contribute."
    },
    {
        question: "Can I start working on my project before the event?",
        answer: "All coding must happen during the event. However, feel free to brainstorm ideas and research tools ahead of time!"
    },
    {
        question: "Who owns the intellectual property of the projects?",
        answer: "You do. All projects created during the hackathon remain the full intellectual property of the participants and their teams."
    },
    {
        question: "What are the official judging criteria?",
        answer: "Projects are scored on Innovation, Technical Execution, Real-world Impact, and Presentation."
    },
    {
        question: "Will there be Wi-Fi and power outlets?",
        answer: "Yes. High-speed Wi-Fi and power strips will be available at every team station."
    },
    {
        question: "Are meals provided?",
        answer: "Yes. We provide meals and snacks 24/7."
    },
    {
        question: "Can I sleep at the venue?",
        answer: "The venue stays open overnight. We provide separate power nap rooms for boys and girls."
    },
    {
        question: "Are there showers available?",
        answer: "Yes, we suggest bringing a small \"freshen-up\" kit."
    },
    {
        question: "Is there a secure area for my belongings?",
        answer: "No individual lockers are provided. Please keep your valuables with you at your team station at all times."
    },
    {
        question: "Who do I contact if I have a problem?",
        answer: "Find us at the Info Desk, or message us instantly via mobile - +91 97787-53233/95397-55923"
    },
    {
        question: "Is a College ID mandatory for entry?",
        answer: "Yes. Please bring a valid College ID for check-in and security."
    },
    {
        question: "Registrations last date",
        answer: "Although the last date of registration and of idea submission is the same, March 22nd 2026, They are seperate activities. Registration is currently open. An early registration by you will be useful to us."
    },
    {
        question: "Can a team formed of students from different colleges?",
        answer: "No, a team has to be from a single institute"
    },
    {
        question: "Will a panel of experts evaluate idea submission?",
        answer: "Yes"
    },
    {
        question: "Can an idea be submitted in related fields of AI&ML?",
        answer: "Yes, though our focus is on AI&ML, we are open to ideas in related fields."
    }
];

const FAQItem = ({ faq, index, isOpen, toggleOpen }) => {
    const contentRef = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (isOpen) {
            setHeight(contentRef.current.scrollHeight);
        } else {
            setHeight(0);
        }
    }, [isOpen]);

    return (
        <div className={`faq-item ${isOpen ? 'open' : ''}`} onClick={() => toggleOpen(index)}>
            <div className="faq-question-container">
                <p className="faq-question">{faq.question}</p>
                <div className="faq-icon">
                    <div className="vertical-line"></div>
                    <div className="horizontal-line"></div>
                </div>
            </div>
            <div
                className="faq-answer-container"
                style={{ height: `${height}px` }}
            >
                <div className="faq-answer" ref={contentRef}>
                    {faq.answer}
                </div>
            </div>
            <div className="faq-divider"></div>
        </div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleOpen = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="faq-section" id="faq">
            <div className="faq-inner">
                <span className="section-label">FAQ</span>
                <div className="faq-list">
                    {faqData.map((faq, index) => (
                        <FAQItem
                            key={index}
                            faq={faq}
                            index={index}
                            isOpen={openIndex === index}
                            toggleOpen={toggleOpen}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
