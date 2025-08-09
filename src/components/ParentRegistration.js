import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css";
import { registerParent } from "../services/api";

const ParentRegistration = () => {
    const [formData, setFormData] = useState({
        parentId: "",
        fullName: "",
        email: "",
        phoneNumber: "",
        studentId: "",
        studentName: "",
        password: ""
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await registerParent(formData);
            navigate("/parentlogin");
        } catch (err) {
            let msg = "Registration failed.";
            if (err.response?.data) {
                if (typeof err.response.data === "string") {
                    msg = err.response.data;
                } else if (typeof err.response.data === "object" && err.response.data.message) {
                    msg = err.response.data.message;
                }
            }
            setError(msg);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-header">
                    <h2>Parent Registration</h2>
                    <p>Create your parent account</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                        <label htmlFor="parentId">Parent ID</label>
                            <input
                                type="text"
                            id="parentId"
                            className="form-control"
                                placeholder="Enter your Parent ID"
                            value={formData.parentId}
                            onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                            <input
                                type="text"
                            id="fullName"
                            className="form-control"
                                placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                            className="form-control"
                                placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                type="tel"
                            id="phoneNumber"
                            className="form-control"
                                placeholder="Enter your phone number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                        <label htmlFor="studentId">Student ID</label>
                            <input
                                type="text"
                            id="studentId"
                            className="form-control"
                                placeholder="Enter your child's Student ID"
                            value={formData.studentId}
                            onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="studentName">Student Name</label>
                            <input
                                type="text"
                                id="studentName"
                            className="form-control"
                                placeholder="Enter your child's name"
                            value={formData.studentName}
                            onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                            className="form-control"
                                placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                                required
                            />
                        </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="auth-button">
                        Register
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        Already have an account?{" "}
                        <Link to="/parentlogin">Login here</Link>
                        </p>
                </div>
            </div>
        </div>
    );
};

export default ParentRegistration;