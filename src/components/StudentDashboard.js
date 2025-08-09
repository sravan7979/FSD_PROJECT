import React, { useState, useEffect } from "react";
import "../styles/StudentDashboard.css";
import avatarImg from "../images/backgroundlanding.jpeg"; // Use a placeholder avatar image
import { getStudentAttendanceSummary, getStudentGrades, getStudentRemarks, reportStudentIssue } from "../services/api";

const sampleRemarks = [
  { date: "2024-05-01", remark: "Excellent participation." },
  { date: "2024-05-03", remark: "Needs improvement in homework." },
];

const StudentDashboard = () => {
  const [activeSection, setActiveSection] = useState("Attendance");
  const [attendanceSummary, setAttendanceSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [grades, setGrades] = useState([]);
  const [gradesLoading, setGradesLoading] = useState(true);
  const [gradesError, setGradesError] = useState("");
  const [remarks, setRemarks] = useState([]);
  const [remarksLoading, setRemarksLoading] = useState(true);
  const [remarksError, setRemarksError] = useState("");
  const [issueText, setIssueText] = useState("");
  const [issueStatus, setIssueStatus] = useState("");
  // Get studentId from localStorage (set during login)
  const studentObj = JSON.parse(localStorage.getItem("student"));
  const studentId = studentObj?.studentId || "";

  useEffect(() => {
    if (activeSection === "Attendance") {
      setLoading(true);
      getStudentAttendanceSummary(studentId)
        .then(res => {
          setAttendanceSummary(res.data);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to fetch attendance summary");
          setLoading(false);
        });
    }
    if (activeSection === "Grades") {
      setGradesLoading(true);
      getStudentGrades(studentId)
        .then(res => {
          setGrades(res.data);
          setGradesLoading(false);
        })
        .catch(() => {
          setGradesError("Failed to fetch grades");
          setGradesLoading(false);
        });
    }
    if (activeSection === "Remarks") {
      setRemarksLoading(true);
      getStudentRemarks(studentId)
        .then(res => {
          setRemarks(res.data);
          setRemarksLoading(false);
        })
        .catch(() => {
          setRemarksError("Failed to fetch remarks");
          setRemarksLoading(false);
        });
    }
  }, [activeSection, studentId]);

  const handleLogout = () => {
    // Placeholder for logout logic
    window.location.href = "/login";
  };

  const handleReportIssue = async (e) => {
    e.preventDefault();
    setIssueStatus("");
    if (!issueText.trim()) {
      setIssueStatus("Please enter your issue.");
      return;
    }
    const payload = {
      studentId: studentObj?.studentId,
      name: studentObj?.fullName,
      phoneNumber: studentObj?.phoneNumber,
      email: studentObj?.email,
      issue: issueText
    };
    try {
      await reportStudentIssue(payload);
      setIssueStatus("Issue reported successfully!");
      setIssueText("");
    } catch {
      setIssueStatus("Failed to report issue.");
    }
  };

  return (
    <div className="dashboard-container">
      <header className="top-navbar">
        <div className="profile-info">
          <img src={avatarImg} alt="Avatar" className="profile-avatar" />
          <span className="profile-id">{studentId}</span>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <div className="dashboard-layout">
        <nav className="sidebar">
          <ul className="menu">
            {[
              "Attendance",
              "Grades",
              "Remarks",
              "Report Issue",
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
          {activeSection === "Attendance" && (
            <div className="dashboard-box">
              <h2>Attendance (Subject-wise)</h2>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className="error-message">{error}</p>
              ) : (
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
                    {Object.entries(attendanceSummary).map(([subject, data], idx) => (
                      <tr key={idx}>
                        <td>{subject}</td>
                        <td>{Math.round(data.percentage)}%</td>
                        <td>{data.attended}</td>
                        <td>{data.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
          {activeSection === "Grades" && (
            <div className="dashboard-box">
              <h2>Grades</h2>
              {gradesLoading ? (
                <p>Loading...</p>
              ) : gradesError ? (
                <p className="error-message">{gradesError}</p>
              ) : (
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Grade</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grades.map((row, idx) => (
                      <tr key={idx}>
                        <td>{row.subject}</td>
                        <td>{row.grade}</td>
                        <td>{row.date || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
          {activeSection === "Remarks" && (
            <div className="dashboard-box">
              <h2>Remarks</h2>
              {remarksLoading ? (
                <p>Loading...</p>
              ) : remarksError ? (
                <p className="error-message">{remarksError}</p>
              ) : (
                <ul className="remarks-list">
                  {remarks.map((item, idx) => (
                    <li key={idx}>
                      <span className="remarks-date">{item.date}:</span> {item.remark}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {activeSection === "Report Issue" && (
            <div className="dashboard-box">
              <h2>Report an Issue</h2>
              <form className="report-form" onSubmit={handleReportIssue}>
                <textarea
                  className="form-control"
                  placeholder="Describe your issue..."
                  rows={5}
                  value={issueText}
                  onChange={e => setIssueText(e.target.value)}
                ></textarea>
                <button className="dashboard-btn" type="submit">
                  Submit
                </button>
                {issueStatus && <div className="error-message">{issueStatus}</div>}
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard; 