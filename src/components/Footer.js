import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>About Us</h3>
                    <p>Student Report System is a comprehensive platform designed to streamline academic performance tracking and communication between teachers, students, and parents.</p>
                </div>
                
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/faq">FAQ</Link></li>
                    </ul>
                </div>
                
                <div className="footer-section">
                    <h3>Contact Info</h3>
                    <p>Email: support@studentreportsystem.com</p>
                    <p>Phone: (555) 123-4567</p>
                    <p>Address: 123 Education St, Learning City, ED 12345</p>
                </div>
            </div>
            
            <div className="footer-bottom">
                <p>© 2024 Student Report System. All rights reserved.</p>
                <div className="social-links">
                    <a href="#" aria-label="Facebook">📘</a>
                    <a href="#" aria-label="Twitter">🐦</a>
                    <a href="#" aria-label="LinkedIn">💼</a>
                    <a href="#" aria-label="Instagram">📸</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;