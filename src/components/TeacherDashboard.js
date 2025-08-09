import React, { useState, useEffect } from "react";
import "../styles/TeacherDashboard.css";
import avatarImg from "../images/backgroundlanding.jpeg"; // Placeholder avatar
import { getStudentsBySection, getStudentGrades, getStudentAttendanceSummary, getStudentRemarks, addRemark, addAttendance, addGrade, getAverageGrades } from "../services/api";

const sampleGrades = [
  { studentId: "STU001", subject: "Math", grade: "A" },
  { studentId: "STU001", subject: "Science", grade: "B+" },
  { studentId: "STU001", subject: "English", grade: "A-" },
  { studentId: "STU002", subject: "Math", grade: "B" },
  { studentId: "STU002", subject: "Science", grade: "A" },
  { studentId: "STU002", subject: "English", grade: "B+" },
  { studentId: "STU003", subject: "Math", grade: "C" },
  { studentId: "STU003", subject: "Science", grade: "B-" },
  { studentId: "STU003", subject: "English", grade: "B" },
];

const sampleAttendance = [
  { studentId: "STU001", subject: "Math", date: "2024-05-01", status: "Present" },
  { studentId: "STU001", subject: "Math", date: "2024-05-02", status: "Absent" },
  { studentId: "STU001", subject: "Science", date: "2024-05-01", status: "Present" },
  { studentId: "STU001", subject: "Science", date: "2024-05-02", status: "Present" },
  { studentId: "STU001", subject: "English", date: "2024-05-01", status: "Absent" },
  { studentId: "STU001", subject: "English", date: "2024-05-02", status: "Present" },
  { studentId: "STU002", subject: "Math", date: "2024-05-01", status: "Present" },
  { studentId: "STU002", subject: "Math", date: "2024-05-02", status: "Present" },
  { studentId: "STU002", subject: "Science", date: "2024-05-01", status: "Present" },
  { studentId: "STU002", subject: "Science", date: "2024-05-02", status: "Present" },
  { studentId: "STU002", subject: "English", date: "2024-05-01", status: "Present" },
  { studentId: "STU002", subject: "English", date: "2024-05-02", status: "Present" },
  { studentId: "STU003", subject: "Math", date: "2024-05-01", status: "Absent" },
  { studentId: "STU003", subject: "Math", date: "2024-05-02", status: "Present" },
  { studentId: "STU003", subject: "Science", date: "2024-05-01", status: "Absent" },
  { studentId: "STU003", subject: "Science", date: "2024-05-02", status: "Present" },
  { studentId: "STU003", subject: "English", date: "2024-05-01", status: "Present" },
  { studentId: "STU003", subject: "English", date: "2024-05-02", status: "Present" },
];

const sampleRemarks = [
  { date: "2024-05-01", remark: "Great improvement." },
  { date: "2024-05-03", remark: "Needs to participate more." },
];

const sampleProgress = [
  { student: "Alice Smith", progress: "Excellent" },
  { student: "Bob Johnson", progress: "Good" },
  { student: "Charlie Lee", progress: "Average" },
];

function getSubjectWiseAttendanceForStudent(attendance, studentId) {
  const subjectMap = {};
  attendance
    .filter(a => a.studentId === studentId)
    .forEach(({ subject, status }) => {
      if (!subjectMap[subject]) subjectMap[subject] = { total: 0, present: 0 };
      subjectMap[subject].total += 1;
      if (status === "Present") subjectMap[subject].present += 1;
    });
  return Object.entries(subjectMap).map(([subject, { total, present }]) => ({
    subject,
    percentage: total ? Math.round((present / total) * 100) : 0,
    present,
    total,
  }));
}

const TeacherDashboard = () => {
  const [activeSection, setActiveSection] = useState("List of Students");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [grades, setGrades] = useState([]);
  const [attendanceSummary, setAttendanceSummary] = useState({});
  const [remarks, setRemarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [remarkForm, setRemarkForm] = useState({
    studentId: "",
    date: "",
    remark: ""
  });
  const [remarkStatus, setRemarkStatus] = useState("");
  const [attendanceForm, setAttendanceForm] = useState({
    studentId: "",
    subject: "",
    status: "Present"
  });
  const [attendanceStatus, setAttendanceStatus] = useState("");
  const [gradeForm, setGradeForm] = useState({
    studentId: '',
    subject: '',
    grade: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [gradeStatus, setGradeStatus] = useState('');
  const [averageGrades, setAverageGrades] = useState({});
  const [loadingAverages, setLoadingAverages] = useState(false);

  // Replace with actual teacher info from localStorage or context
  const teacherObj = JSON.parse(localStorage.getItem("teacher"));
  const teacherName = teacherObj?.fullName || "Teacher";
  const teacherSection = teacherObj?.section || "A";

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await getStudentsBySection(teacherSection);
        setStudents(res.data);
        if (res.data.length > 0) setSelectedStudent(res.data[0]);
      } catch (error) {
        setStudents([]);
        setSelectedStudent(null);
      }
    };
    fetchStudents();
  }, [teacherSection]);

  useEffect(() => {
    const fetchStudentData = async () => {
      if (!selectedStudent) return;
      
      setLoading(true);
      setError("");
      
      try {
        // Fetch grades
        const gradesRes = await getStudentGrades(selectedStudent.studentId);
        setGrades(gradesRes.data);
        
        // Fetch attendance summary
        const attendanceRes = await getStudentAttendanceSummary(selectedStudent.studentId);
        setAttendanceSummary(attendanceRes.data);

        // Fetch remarks
        const remarksRes = await getStudentRemarks(selectedStudent.studentId);
        setRemarks(remarksRes.data);
      } catch (err) {
        setError("Failed to fetch student data");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [selectedStudent]);

  useEffect(() => {
    const fetchAverageGrades = async () => {
      setLoadingAverages(true);
      try {
        const response = await getAverageGrades();
        setAverageGrades(response.data);
      } catch (error) {
        console.error('Error fetching average grades:', error);
      } finally {
        setLoadingAverages(false);
      }
    };

    fetchAverageGrades();
  }, []);

  const handleRemarkSubmit = async (e) => {
    e.preventDefault();
    setRemarkStatus("");
    
    if (!remarkForm.studentId || !remarkForm.date || !remarkForm.remark.trim()) {
      setRemarkStatus("Please fill in all fields");
      return;
    }

    try {
      await addRemark(remarkForm);
      setRemarkStatus("Remark added successfully!");
      
      // Refresh remarks list
      const remarksRes = await getStudentRemarks(remarkForm.studentId);
      setRemarks(remarksRes.data);
      
      // Clear form
      setRemarkForm({
        studentId: "",
        date: "",
        remark: ""
      });
    } catch (err) {
      setRemarkStatus("Failed to add remark");
    }
  };

  const handleAttendanceSubmit = async (e) => {
    e.preventDefault();
    setAttendanceStatus("");
    
    if (!attendanceForm.studentId || !attendanceForm.subject) {
      setAttendanceStatus("Please select both student and subject");
      return;
    }

    try {
      const attendanceData = {
        studentId: attendanceForm.studentId,
        subject: attendanceForm.subject,
        attendedClasses: attendanceForm.status === "Present" ? 1 : 0
      };

      await addAttendance(attendanceData);
      setAttendanceStatus("Attendance added successfully!");
      
      // Refresh attendance summary
      const attendanceRes = await getStudentAttendanceSummary(attendanceForm.studentId);
      setAttendanceSummary(attendanceRes.data);
      
      // Clear form
      setAttendanceForm({
        studentId: "",
        subject: "",
        status: "Present"
      });
    } catch (err) {
      setAttendanceStatus("Failed to add attendance");
    }
  };

  const handleGradeSubmit = async (e) => {
    e.preventDefault();
    if (!gradeForm.studentId || !gradeForm.subject || !gradeForm.grade) {
      setGradeStatus('Please fill in all fields');
      return;
    }

    try {
      await addGrade(gradeForm);
      setGradeStatus('Grade added/updated successfully');
      // Refresh grades
      const response = await getStudentGrades(gradeForm.studentId);
      setGrades(response.data);
      // Reset form
      setGradeForm(prev => ({
        ...prev,
        subject: '',
        grade: ''
      }));
    } catch (error) {
      setGradeStatus('Error adding/updating grade');
      console.error('Error:', error);
    }
  };

  const getGradeStatus = (average) => {
    if (average >= 9.0) return "Excellent";
    if (average >= 7.5) return "Good";
    if (average >= 6.0) return "Average";
    return "Needs Improvement";
  };

  const sidebarOptions = [
    "List of Students",
    "Current Student Grades",
    "Add Grades",
    "Current Attendance",
    "Check & Add Attendance",
    "Add Remarks",
    "Monitor Academic Progress",
  ];

  const handleLogout = () => {
    window.location.href = "/login";
  };

  return (
    <div className="dashboard-container">
      <header className="top-navbar">
        <div className="profile-info">
          <img src={avatarImg} alt="Avatar" className="profile-avatar" />
          <span className="profile-id">{teacherName}</span>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <div className="dashboard-layout">
        <nav className="sidebar">
          <ul className="menu">
            {sidebarOptions.map((item) => (
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
          {activeSection === "List of Students" && (
            <div className="dashboard-box">
              <h2>List of Students</h2>
              <ul className="student-list">
                {students.map((student) => (
                  <li
                    key={student.studentId}
                    className={selectedStudent?.studentId === student.studentId ? "selected" : ""}
                    onClick={() => setSelectedStudent(student)}
                  >
                    {student.fullName} ({student.studentId})
                  </li>
                ))}
              </ul>
            </div>
          )}
          {activeSection === "Current Student Grades" && (
            <div className="dashboard-box">
              <h2>Current Student Grades</h2>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="student-select" style={{ marginRight: '0.5rem' }}><b>Select Student:</b></label>
                <select
                  id="student-select"
                  className="form-control"
                  value={selectedStudent?.studentId}
                  onChange={e => {
                    const stu = students.find(s => s.studentId === e.target.value);
                    if (stu) setSelectedStudent(stu);
                  }}
                  style={{ width: 'auto', display: 'inline-block' }}
                >
                  {students.map(student => (
                    <option key={student.studentId} value={student.studentId}>{student.fullName}</option>
                  ))}
                </select>
              </div>
              <p><b>Student:</b> {selectedStudent?.fullName}</p>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className="error-message">{error}</p>
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
                    {grades.map((grade, idx) => (
                      <tr key={idx}>
                        <td>{grade.subject}</td>
                        <td>{grade.grade}</td>
                        <td>{grade.date || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
          {activeSection === "Add Grades" && (
            <div className="dashboard-box">
              <h2>Add Grades</h2>
              <form className="dashboard-form" onSubmit={handleGradeSubmit}>
                <select 
                  className="form-control"
                  value={gradeForm.studentId}
                  onChange={e => setGradeForm(prev => ({ ...prev, studentId: e.target.value }))}
                  required
                >
                  <option value="">Select Student</option>
                  {students.map((student) => (
                    <option key={student.studentId} value={student.studentId}>
                      {student.fullName}
                    </option>
                  ))}
                </select>
                <select 
                  className="form-control"
                  value={gradeForm.subject}
                  onChange={e => setGradeForm(prev => ({ ...prev, subject: e.target.value }))}
                  required
                >
                  <option value="">Select Subject</option>
                  <option value="Math">Math</option>
                  <option value="Science">Science</option>
                  <option value="English">English</option>
                  <option value="History">History</option>
                  <option value="Geography">Geography</option>
                </select>
                <select 
                  className="form-control"
                  value={gradeForm.grade}
                  onChange={e => setGradeForm(prev => ({ ...prev, grade: e.target.value }))}
                  required
                >
                  <option value="">Select Grade</option>
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="B-">B-</option>
                  <option value="C+">C+</option>
                  <option value="C">C</option>
                  <option value="C-">C-</option>
                  <option value="D+">D+</option>
                  <option value="D">D</option>
                  <option value="D-">D-</option>
                  <option value="F">F</option>
                </select>
                <input 
                  className="form-control"
                  type="date"
                  value={gradeForm.date}
                  onChange={e => setGradeForm(prev => ({ ...prev, date: e.target.value }))}
                  required
                />
                <button className="dashboard-btn" type="submit">Add/Update Grade</button>
              </form>
              {gradeStatus && (
                <p className={gradeStatus.includes("success") ? "success-message" : "error-message"}>
                  {gradeStatus}
                </p>
              )}
              <div style={{ marginTop: '2rem' }}>
                <h3>Current Grades</h3>
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p className="error-message">{error}</p>
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
                      {grades.map((grade, idx) => (
                        <tr key={idx}>
                          <td>{grade.subject}</td>
                          <td>{grade.grade}</td>
                          <td>{new Date(grade.date).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
          {activeSection === "Current Attendance" && (
            <div className="dashboard-box">
              <h2>Current Attendance (Subject-wise)</h2>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="attendance-student-select" style={{ marginRight: '0.5rem' }}><b>Select Student:</b></label>
                <select
                  id="attendance-student-select"
                  className="form-control"
                  value={selectedStudent?.studentId}
                  onChange={e => {
                    const stu = students.find(s => s.studentId === e.target.value);
                    if (stu) setSelectedStudent(stu);
                  }}
                  style={{ width: 'auto', display: 'inline-block' }}
                >
                  {students.map(student => (
                    <option key={student.studentId} value={student.studentId}>{student.fullName}</option>
                  ))}
                </select>
              </div>
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
          {activeSection === "Check & Add Attendance" && (
            <div className="dashboard-box">
              <h2>Check & Add Attendance</h2>
              <form className="dashboard-form" onSubmit={handleAttendanceSubmit}>
                <select 
                  className="form-control"
                  value={attendanceForm.studentId}
                  onChange={e => setAttendanceForm(prev => ({ ...prev, studentId: e.target.value }))}
                  required
                >
                  <option value="">Select Student</option>
                  {students.map((student) => (
                    <option key={student.studentId} value={student.studentId}>
                      {student.fullName}
                    </option>
                  ))}
                </select>
                <select 
                  className="form-control"
                  value={attendanceForm.subject}
                  onChange={e => setAttendanceForm(prev => ({ ...prev, subject: e.target.value }))}
                  required
                >
                  <option value="">Select Subject</option>
                  <option value="Math">Math</option>
                  <option value="Science">Science</option>
                  <option value="English">English</option>
                  <option value="History">History</option>
                  <option value="Geography">Geography</option>
                </select>
                <select 
                  className="form-control"
                  value={attendanceForm.status}
                  onChange={e => setAttendanceForm(prev => ({ ...prev, status: e.target.value }))}
                  required
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
                <button className="dashboard-btn" type="submit">Add Attendance</button>
              </form>
              {attendanceStatus && (
                <p className={attendanceStatus.includes("success") ? "success-message" : "error-message"}>
                  {attendanceStatus}
                </p>
              )}
              <div style={{ marginTop: '2rem' }}>
                <h3>Current Attendance Summary</h3>
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
            </div>
          )}
          {activeSection === "Add Remarks" && (
            <div className="dashboard-box">
              <h2>Add Remarks</h2>
              <form className="dashboard-form" onSubmit={handleRemarkSubmit}>
                <select 
                  className="form-control"
                  value={remarkForm.studentId}
                  onChange={e => setRemarkForm(prev => ({ ...prev, studentId: e.target.value }))}
                  required
                >
                  <option value="">Select Student</option>
                  {students.map((student) => (
                    <option key={student.studentId} value={student.studentId}>
                      {student.fullName}
                    </option>
                  ))}
                </select>
                <input 
                  className="form-control" 
                  type="date"
                  value={remarkForm.date}
                  onChange={e => setRemarkForm(prev => ({ ...prev, date: e.target.value }))}
                  required
                />
                <textarea 
                  className="form-control" 
                  placeholder="Remark"
                  value={remarkForm.remark}
                  onChange={e => setRemarkForm(prev => ({ ...prev, remark: e.target.value }))}
                  required
                />
                <button className="dashboard-btn" type="submit">Add Remark</button>
              </form>
              {remarkStatus && (
                <p className={remarkStatus.includes("success") ? "success-message" : "error-message"}>
                  {remarkStatus}
                </p>
              )}
              <div style={{ marginTop: '2rem' }}>
                <h3>Recent Remarks</h3>
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p className="error-message">{error}</p>
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
            </div>
          )}
          {activeSection === "Monitor Academic Progress" && (
            <div className="dashboard-box">
              <h2>Monitor Academic Progress</h2>
              {loadingAverages ? (
                <p>Loading...</p>
              ) : (
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Average Grade</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => {
                      const average = averageGrades[student.studentId] || 0;
                      const scaledAverage = (average / 4.0) * 10; // Convert 4.0 scale to 10.0 scale
                      return (
                        <tr key={student.studentId}>
                          <td>{student.fullName}</td>
                          <td>{scaledAverage.toFixed(1)}/10</td>
                          <td>{getGradeStatus(scaledAverage)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard; 