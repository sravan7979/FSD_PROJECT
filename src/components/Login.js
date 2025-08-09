import React from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import backgroundImage from "../images/backgroundlanding.jpeg"; // Import the background image

const Login = () => {
    return (
        <div className="login-page">
            {/* Background Image */}
            <img src={backgroundImage} alt="Background" className="background-image" />

            {/* Login Section */}
            <section className="login-section">
                <div className="login-overlay"></div>
                <div className="login-content">
                    <h2 className="login-heading">Welcome Back!</h2>
                    <p className="login-subtitle">Please select your role to continue</p>
                    
                    <div className="login-options">
                        <div className="login-card">
                            <div className="icon-wrapper">
                            <i className="fas fa-user-graduate"></i>
                            </div>
                            <h3>Student</h3>
                            <p>Access your academic records and track your progress</p>
                            <Link to="/studentlogin" className="btn-primary">Login as Student</Link>
                        </div>
                        
                        <div className="login-card">
                            <div className="icon-wrapper">
                            <i className="fas fa-chalkboard-teacher"></i>
                            </div>
                            <h3>Teacher</h3>
                            <p>Manage your classes and student performance</p>
                            <Link to="/teacherlogin" className="btn-primary">Login as Teacher</Link>
                        </div>
                        
                        <div className="login-card">
                            <div className="icon-wrapper">
                            <i className="fas fa-user-friends"></i>
                            </div>
                            <h3>Parent</h3>
                            <p>Monitor your child's academic journey</p>
                            <Link to="/parentlogin" className="btn-primary">Login as Parent</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;