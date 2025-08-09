import React from "react";
import "../styles/About.css";
import backgroundImage from "../images/backgroundlanding.jpeg"; // Import the background image

const About = () => {
    return (
        <div className="about-page">
            {/* Background Image */}
            <img src={backgroundImage} alt="Background" className="background-image" />

            {/* About Section */}
            <section className="about-section">
                <div className="about-box">
                    <h2>About Student Report System</h2>
                    <p>
                        The Student Report System is designed to revolutionize the way academic performance is tracked, shared, and understood.
                        It bridges the gap between teachers, students, and parents by offering a centralized platform to manage grades, attendance, feedback, and progress analytics.
                        <br /><br />
                        Our mission is to simplify academic tracking with a clear, accessible, and intuitive interface.
                        Whether you're a teacher entering grades, a student reviewing feedback, or a parent monitoring progress — our system is tailored for seamless use and effective communication.
                        <br /><br />
                        With an emphasis on real-time insights and smart data visualization, the platform encourages meaningful academic growth and performance reflection.
                        At its core, this system is about empowering every stakeholder in the educational journey.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default About;