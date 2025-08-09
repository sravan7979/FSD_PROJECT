import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import FAQ from "./components/FAQ";
import Login from "./components/Login";
import StudentLogin from "./components/StudentLogin";
import StudentRegistration from "./components/StudentRegistration";
import TeacherLogin from "./components/TeacherLogin";
import TeacherRegistration from "./components/TeacherRegistration";
import ParentLogin from "./components/ParentLogin";
import ParentRegistration from "./components/ParentRegistration";
import StudentDashboard from "./components/StudentDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import ParentDashboard from './components/ParentDashboard';
import "./App.css";

const Layout = ({ children }) => {
  const location = useLocation();

  const navbarPaths = [
    "/",
    "/about",
    "/contact",
    "/faq",
    "/login",
    "/studentlogin",
    "/studentregistration",
    "/teacherlogin",
    "/teacherregistration",
    "/parentlogin",
    "/parentregistration",
  ];

  return (
    <>
      {navbarPaths.includes(location.pathname) && <Navbar />}
      {children}
      {navbarPaths.includes(location.pathname) && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/login" element={<Login />} />
          <Route path="/studentlogin" element={<StudentLogin />} />
          <Route path="/studentregistration" element={<StudentRegistration />} />
          <Route path="/teacherlogin" element={<TeacherLogin />} />
          <Route path="/teacherregistration" element={<TeacherRegistration />} />
          <Route path="/parentlogin" element={<ParentLogin />} />
          <Route path="/parentregistration" element={<ParentRegistration />} />
          <Route path="/studentdashboard" element={<StudentDashboard />} />
          <Route path="/teacherdashboard" element={<TeacherDashboard />} />
          <Route path="/parentdashboard" element={<ParentDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;