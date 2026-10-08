import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useEffect } from "react"
// import(apiurl) from "./api"
import HomePage from "./pages/home.jsx";
import CareerQuiz from "./pages/carrerquiz.jsx";
import Contact from "./pages/contact.jsx";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar.jsx";
import Disclaimer from "./pages/disclaimer.jsx";
import Course from "./pages/course.jsx";
import CourseDetails from "./pages/coursedetails.jsx";
import Register from "./pages/register.jsx";
import About from "./pages/about.jsx";
import Privacypolicy from "./pages/privacypolicy";
import AdminForm from "./pages/adminform.jsx";
import AdminDashboard from "./pages/admindashboard.jsx";
import Login from "./pages/login.jsx";
import ScrollToTop from "./components/ScrollToTop";
import { apiurl } from "./api.js";

function App() {
  useEffect; {
    () => {
      let modified = false;
      const checkSession = async () => {
        const token = localStorage.getItem("token");
        if (!token || notified) return;

        try {
          const response = await fetch(`http://localhost:5000/api/auth/session`)
          {
            headers: { Authorization: `Bearer $(token)` }
          }
        }
        catch (error) {
          console.error("error", error)
        }

        if (response.status !== 401) return;
        const data = await response.json();

        if (
          data.code !== "SESSION_TAKEN_OVER" ||
          localStorage.getItem("token ") !== token
        ) {
          return;
        }
        notified = true;
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("role");
        window.alert(data.message);
        window.location.assign("/login");

      }
    }
  //   checkSession();
  //   const interval = window.setInterval(checkSession, 10000);

  //   return () => window.clearInterval(interval);
  // }, []);
  }



  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/carrerquiz" element={<CareerQuiz />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/adminform" element={<AdminForm />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/course" element={<Course />} />
        <Route path="/about" element={<About />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/privacypolicy" element={<Privacypolicy />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
