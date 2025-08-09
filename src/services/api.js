import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Student APIs
export const registerStudent = (data) => axios.post(`${API_URL}/students/register`, data);
export const loginStudent = (data) => axios.post(`${API_URL}/students/login`, data);
export const getStudentsBySection = (section) => axios.get(`${API_URL}/students/section/${section}`);
export const getStudentById = (studentId) => axios.get(`${API_URL}/students/${studentId}`);

// Teacher APIs
export const registerTeacher = (data) => axios.post(`${API_URL}/teachers/register`, data);
export const loginTeacher = (data) => axios.post(`${API_URL}/teachers/login`, data);

// Parent APIs
export const registerParent = (data) => axios.post(`${API_URL}/parents/register`, data);
export const loginParent = (data) => axios.post(`${API_URL}/parents/login`, data);

// Attendance APIs
export const getStudentAttendanceSummary = (studentId) => axios.get(`${API_URL}/attendance/student/${studentId}/summary`);
export const addAttendance = (data) => axios.post(`${API_URL}/attendance`, data);

// Grades APIs
export const getStudentGrades = (studentId) => axios.get(`${API_URL}/grades/student/${studentId}`);
export const addGrade = (data) => axios.post(`${API_URL}/grades`, data);
export const getAverageGrades = () => axios.get(`${API_URL}/grades/averages`);

// Remarks APIs
export const getStudentRemarks = (studentId) => axios.get(`${API_URL}/remarks/student/${studentId}`);
export const addRemark = (data) => axios.post(`${API_URL}/remarks`, data);

// Issues APIs
export const reportStudentIssue = (data) => axios.post(`${API_URL}/issues`, data);