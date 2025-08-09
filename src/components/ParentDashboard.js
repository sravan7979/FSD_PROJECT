import React, { useState, useEffect } from "react";
import "../styles/ParentDashboard.css";
import avatarImg from "../images/backgroundlanding.jpeg";
import { getStudentById, getStudentAttendanceSummary, getStudentGrades, getStudentRemarks } from "../services/api";

const ParentDashboard = () => {
  const [activeSection, setActiveSection] = useState("Overview");
  const [student, setStudent] = useState(null);
  const [attendance, setAttendance] = useState({});
  const [grades, setGrades] = useState([]);
  const [remarks, setRemarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const parentData = JSON.parse(localStorage.getItem("parent"));
  const parentName = parentData?.fullName || "Parent";
  const studentId = parentData?.studentId;

  useEffect(() => {
    if (studentId) {
      fetchStudentDetails();
    } else {
      setError("No student ID associated with this parent account");
      setLoading(false);
    }
  }, [studentId]);

  const fetchStudentDetails = async () => {
    if (!studentId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const [studentRes, attendanceRes, gradesRes, remarksRes] = await Promise.all([
        getStudentById(studentId),
        getStudentAttendanceSummary(studentId),
        getStudentGrades(studentId),
        getStudentRemarks(studentId)
      ]);
      
      setStudent(studentRes.data);
      setAttendance(attendanceRes.data);
      setGrades(gradesRes.data);
      setRemarks(remarksRes.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching student details');
      setStudent(null);
      setAttendance({});
      setGrades([]);
      setRemarks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("parent");
    window.location.href = "/login";
  };

  const calculateAverageGrade = () => {
    if (grades.length === 0) return 'N/A';
    const gradeValues = {
      'A+': 10, 'A': 9.5, 'A-': 9,
      'B+': 8.5, 'B': 8, 'B-': 7.5,
      'C+': 7, 'C': 6.5, 'C-': 6,
      'D+': 5.5, 'D': 5, 'D-': 4.5,
      'F': 0
    };
    const sum = grades.reduce((acc, curr) => acc + (gradeValues[curr.grade] || 0), 0);
    return (sum / grades.length).toFixed(1);
  };

  const calculateTotalAttendance = () => {
    const total = Object.values(attendance).reduce((acc, curr) => acc + curr.total, 0);
    const present = Object.values(attendance).reduce((acc, curr) => acc + curr.attended, 0);
    return { total, present };
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading student details...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="top-navbar">
        <div className="profile-info">
          <img src={avatarImg} alt="Avatar" className="profile-avatar" />
          <span className="profile-id">{parentName}</span>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <div className="dashboard-layout">
        <nav className="sidebar">
          <ul className="menu">
            {[
              "Overview",
              "Attendance",
              "Grades",
              "Remarks",
              "Contact Teacher",
            ].map((item) => (
              <li
                key={item}
                className={activeSection === item ? "active" : ""}
                onClick={() => setActiveSection(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>
        <main className="main-content">
          <div className="dashboard-box">
            {error && <div className="error-message">{error}</div>}

            {student && (
              <>
                <div className="student-info" style={{ marginBottom: '2rem' }}>
                  <h3>Student Information</h3>
                  <div className="details-grid">
                    <div className="detail-item">
                      <label>Name:</label>
                      <span>{student.fullName}</span>
                    </div>
                    <div className="detail-item">
                      <label>Student ID:</label>
                      <span>{student.studentId}</span>
                    </div>
                    <div className="detail-item">
                      <label>Section:</label>
                      <span>{student.section}</span>
                    </div>
                    <div className="detail-item">
                      <label>Email:</label>
                      <span>{student.email}</span>
                    </div>
                  </div>
                </div>

                {activeSection === "Overview" && (
                  <div>
                    <h3>Overview</h3>
                    <div className="overview-stats">
                      <div className="stat-box">
                        <h4>Attendance</h4>
                        {Object.keys(attendance).length > 0 ? (
                          <p>{calculateTotalAttendance().present}/{calculateTotalAttendance().total}</p>
                        ) : (
                          <p>No attendance data</p>
                        )}
                      </div>
                      <div className="stat-box">
                        <h4>Average Grade</h4>
                        <p>{calculateAverageGrade()}/10</p>
                      </div>
                      <div className="stat-box">
                        <h4>Recent Remarks</h4>
                        <p>{remarks.length > 0 ? remarks[0].remark : 'No remarks'}</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === "Attendance" && (
                  <div>
                    <h3>Attendance (Subject-wise)</h3>
                    {Object.keys(attendance).length > 0 ? (
                      <table className="dashboard-table">
                        <thead>
                          <tr>
                            <th>Subject</th>
                            <th>Attendance %</th>
                            <th>Present</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(attendance).map(([subject, data], idx) => (
                            <tr key={idx}>
                              <td>{subject}</td>
                              <td>{Math.round(data.percentage)}%</td>
                              <td>{data.attended}</td>
                              <td>{data.total}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p>No attendance records found</p>
                    )}
                  </div>
                )}

                {activeSection === "Grades" && (
                  <div>
                    <h3>Grades</h3>
                    {grades.length > 0 ? (
                      <table className="dashboard-table">
                        <thead>
                          <tr>
                            <th>Subject</th>
                            <th>Grade</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {grades.map((grade, idx) => (
                            <tr key={idx}>
                              <td>{grade.subject}</td>
                              <td>{grade.grade}</td>
                              <td>{new Date(grade.date).toLocaleDateString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p>No grades found</p>
                    )}
                  </div>
                )}

                {activeSection === "Remarks" && (
                  <div>
                    <h3>Remarks</h3>
                    {remarks.length > 0 ? (
                      <ul className="remarks-list">
                        {remarks.map((item, idx) => (
                          <li key={idx}>
                            <span className="remarks-date">{new Date(item.date).toLocaleDateString()}:</span> {item.remark}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No remarks found</p>
                    )}
                  </div>
                )}

                {activeSection === "Contact Teacher" && (
                  <div>
                    <h3>Contact Teacher</h3>
                    <form className="contact-form">
                      <select className="form-control">
                        <option value="">Select Subject</option>
                        {Object.keys(attendance).map(subject => (
                          <option key={subject} value={subject}>{subject}</option>
                        ))}
                      </select>
                      <textarea
                        className="form-control"
                        placeholder="Type your message..."
                        rows={5}
                      ></textarea>
                      <button className="dashboard-btn" type="submit">
                        Send Message
                      </button>
                    </form>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ParentDashboard; 