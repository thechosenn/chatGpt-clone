import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import './RegisterForm.css'
import { FaUserAlt, FaLock } from "react-icons/fa";
import { MdOutlineEmail  } from "react-icons/md";
import BoxTitle from "../boxTitle/BoxTitle";

function RegisterForm() {

  const navigate = useNavigate();
  
  // states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //register ctrl
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/v1/auth/register", { username, email, password });
      toast.success("User Register Successfully");
      navigate("/login");
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
        <h2>Sign Up</h2>
        <div className='input-box'>
          <input 
          type='text' 
          placeholder='Username'
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }} required/>
          <FaUserAlt className='icon'/>
        </div>
        <div className='input-box'>
          <input 
          type='email' 
          placeholder='Email'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }} required/>
          <MdOutlineEmail  className='icon'/>
        </div>
        <div className='input-box'>
          <input 
          type='password' 
          placeholder='password' 
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}required/>
          <FaLock className='icon'/>
        </div>

        <div className="remember-forgot">
          <label><input type='checkbox' /> Remember me </label>
          <a href='#'>Forgot password?</a>
        </div>

        <button type='submit'>Sign Up</button>

        <div className="register-link">
          <p>Already have an account ? <Link to="/login">Please Login</Link></p>
        </div>
      </form>
    </div>
    </div>
  )
}

export default RegisterForm