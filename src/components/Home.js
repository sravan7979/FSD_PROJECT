import React from "react";
import "../styles/Home.css";
import backgroundImage from "../images/backgroundlanding.jpeg";



const Home = () => {
    return (
        <div>
            <section className="hero-features">
                <img src={backgroundImage} alt="Background" className="bg" />

                <div className="hero-content">
                    <h2>Track. Analyze. Improve.</h2>
                    <p>A powerful, user-friendly way to manage student performance for teachers, students, and parents.</p>
                    <a href="/login"><button>Login Now</button></a>
                </div>

                <div className="features" id="features">
                    <div className="feature-box">
                        <h3>For Teachers</h3>
                        <p>Input grades, monitor attendance, and provide feedback easily with an intuitive interface.</p>
                    </div>
                    <div className="feature-box">
                        <h3>For Students</h3>
                        <p>Check your progress, review feedback, and stay on top of your academic performance anytime.</p>
                    </div>
                    <div className="feature-box">
                        <h3>For Parents</h3>
                        <p>Stay informed about your child’s growth, attendance, and learning journey at a glance.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;