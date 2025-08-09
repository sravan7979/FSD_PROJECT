import React from "react";
import "../styles/FAQ.css";
import backgroundImage from "../images/backgroundlanding.jpeg";
const FAQ = () => {
    return (
        <div className="faq-page">
            {/* Background Image */}
            <img src={backgroundImage} alt="Background" className="background-image" />

            {/* FAQ Section */}
            <section className="faq-section">
                <div className="faq-box">
                    <h2>Frequently Asked Questions</h2>

                    <div className="faq-item">
                        <h4>📊 How do teachers input student grades?</h4>
                        <p>Teachers can log in to their dashboard and access the grade input module. It’s designed for quick, bulk entry and automatic saving.</p>
                    </div>

                    <div className="faq-item">
                        <h4>🧑‍🎓 How can students view their performance?</h4>
                        <p>Students can log in to their profile and view dashboards showing their grades, feedback, and attendance statistics in real-time.</p>
                    </div>

                    <div className="faq-item">
                        <h4>👪 Can parents access reports too?</h4>
                        <p>Yes, parents are given access credentials to monitor their child’s performance, view teacher feedback, and check attendance.</p>
                    </div>

                    <div className="faq-item">
                        <h4>🔐 Is my data secure?</h4>
                        <p>Absolutely. We use end-to-end encryption and follow best practices to ensure the security and privacy of your data.</p>
                    </div>

                    <div className="faq-item">
                        <h4>📱 Is this system mobile-friendly?</h4>
                        <p>Yes! The entire platform is optimized for mobile devices, allowing access from phones and tablets without any compromise in experience.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FAQ;