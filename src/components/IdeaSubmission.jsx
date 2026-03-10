import React from 'react';

const IdeaSubmission = () => {
    return (
        <section className="idea-submission-section" id="idea-submission">
            <div className="domain-inner">
                <span className="section-label js-cursor-extend-sm">IDEA SUBMISSION</span>
                <p className="domain-text js-cursor-extend" style={{ marginBottom: "0.5rem" }}>
                    Ready to showcase your innovation? Submit your project ideas for the first shortlisting stage!
                    Please ensure your proposal aligns with the <span className='text-accent'>AI & ML</span> domain.
                    Download the provided PPT template, fill in your project details, and submit it through the Google Form below.
                </p>
                <p className="domain-text js-cursor-extend" style={{ fontSize: "1rem", marginBottom: "3rem", opacity: 0.8 }}>
                    Note: Please register before submitting your idea and abstract.
                </p>

                <div className="submission-buttons">
                    <a href="./MatrixFusion 4.0 PPT.pptx" download className="register_link">
                        <span className="js-cursor-extend-sm">PPT TEMPLATE</span>
                    </a>
                    
                    <a href="https://forms.gle/wn5FHJFvPfm7UuSs7" target='_blank' rel='noopener noreferrer' className="register_link">
                        <span className="js-cursor-extend-sm">SUBMIT ABSTRACT AND PPT</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default IdeaSubmission;
