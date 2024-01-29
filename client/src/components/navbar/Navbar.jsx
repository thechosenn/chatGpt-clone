import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import './Navbar.css'


const Navbar = () => {
  const navigate = useNavigate();
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));

  //handle logout
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/api/v1/auth/logout");
      localStorage.removeItem("authToken");
      toast.success("logout successfully ");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="navbar">
    <h1 className="navbar-title">
      Keiken AI GPT3 
    </h1>
    {/* {loggedIn ? (
      <>
        <Link to="/chat" class="nav-link" p={1}>
          Home
        </Link>
        <Link to="/login" class="nav-link" onClick={handleLogout} p={1}>
          Logout
        </Link>
      </>
    ) : (
      <>
        <Link to="/register" class="nav-link" p={1}>
          Sign Up
        </Link>
        <Link to="/login" class="nav-link" p={1}>
          Sign In
        </Link>
      </>
    )} */}
  </div>
  );
};

export default Navbar;