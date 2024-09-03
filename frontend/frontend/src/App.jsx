import React, { useContext, useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import Appointement from "./pages/Appointement";
import AboutUs from "./pages/AboutUs";

import Register from "./pages/Register";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { Context } from "./main";
import axios from "axios";
const App = () => {
  const {isAuthenticated, setisAuthenticated, setUser} = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://online-doctor-appintement-system-1.onrender.com/api/v1/user/patient/me",
          { withCredentials: true }
        );  
        setisAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        console.error("Failed to fetch user",error);
        setisAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointement" element={<Appointement />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <ToastContainer position="top-center" />
        <Footer/>
      </Router>
      
    </>
  );
};

export default App;
