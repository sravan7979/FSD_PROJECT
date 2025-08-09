import React, { useState } from "react";
import "../styles/Contact.css";
import backgroundImage from "../images/backgroundlanding.jpeg";
import axios from "axios";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [status, setStatus] = useState({ type: "", message: "" });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/contact", formData);
            setStatus({
                type: "success",
                message: "Message sent successfully! We'll get back to you soon."
            });
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: ""
            });
        } catch (error) {
            setStatus({
                type: "error",
                message: "Failed to send message. Please try again later."
            });
        }
    };

    return (
        <div className="contact-page">
            <img src={backgroundImage} alt="Background" className="background-image" />

            <section className="contact-section">
                <div className="contact-box">
                    <h2>Contact Us</h2>
                    {status.message && (
                        <div className={`alert ${status.type === "success" ? "alert-success" : "alert-error"}`}>
                            {status.message}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                        />
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                        <label htmlFor="subject">Subject</label>
                        <input
                            type="text"
                            id="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Subject of your message"
                            required
                        />
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Write your message here..."
                            required
                        ></textarea>
                        <button type="submit">Send Message</button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Contact;