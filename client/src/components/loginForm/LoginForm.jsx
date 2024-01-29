import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import './LoginForm.css'
import { FaUserAlt, FaLock } from "react-icons/fa";
import { MdOutlineEmail  } from "react-icons/md";
import Navbar from "../navbar/Navbar";
import BoxTitle from "../boxTitle/BoxTitle";
// import { Link, useNavigate } from "react-router-dom";


function LoginForm() {

    const navigate = useNavigate();
    //media
    
    // states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    //register ctrl
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post("http://localhost:8080/api/v1/auth/login", { email, password });
        toast.success("Login Successfully");
        localStorage.setItem("authToken", true);
        navigate("/chat");
      } catch (err) {
        console.log(error);
        if (err.response.data.error) {
          setError(err.response.data.error);
        } else if (err.message) {
          setError(err.message);
        }
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
  return (
    <div className="parent">
    <BoxTitle/>
    <div className='wrapper'> 
      <form onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <div className='input-box'>
          <input 
          type='email' 
          placeholder='Email' 
          value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          required/>
          <MdOutlineEmail  className='icon'/>
        </div>
        <div className='input-box'>
          <input type='password' 
          placeholder='password'
          value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }} required/>
          <FaLock className='icon'/>
        </div>

        <div className="remember-forgot">
          <label><input type='checkbox' /> Remember me </label>
          <a href='#'>Forgot password?</a>
        </div>

        <button type='submit'>Login</button>

        <div className="register-link">
          <p>Don't gave an account? <Link to="/register">Please Register</Link></p>
        </div>
      </form>
    </div>
    </div>
  )
}

export default LoginForm