import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css";
import { registerTeacher } from "../services/api";

const TeacherRegistration = () => {
    const [formData, setFormData] = useState({
        employeeId: "",
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        gender: "",
        section: ""
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
            await registerTeacher(formData);
            navigate("/teacherlogin");
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
                    <h2>Teacher Registration</h2>
                    <p>Create your teacher account</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                        <label htmlFor="employeeId">Employee ID</label>
                            <input
                                type="text"
                            id="employeeId"
                            className="form-control"
                                placeholder="Enter your Employee ID"
                            value={formData.employeeId}
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

                        <div className="form-group">
                            <label htmlFor="gender">Gender</label>
                        <select
                            id="gender"
                            className="form-control"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                        <label htmlFor="section">Section</label>
                        <input
                            type="text"
                            id="section"
                            className="form-control"
                            placeholder="Enter your section"
                            value={formData.section}
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
                        <Link to="/teacherlogin">Login here</Link>
                        </p>
                </div>
            </div>
        </div>
    );
};

export default TeacherRegistration;