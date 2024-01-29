import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Navigate, Outlet, Route, RouterProvider } from 'react-router-dom'
import Homepage from './pages/HomePage/Homepage';
import App from './App';
import LoginForm from './components/loginForm/LoginForm';
import RegisterForm from './components/registerForm/RegisterForm';

const Router = () => {
  
    const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>} >
            <Route path="chat" element={<Homepage/>} />
            <Route path="register" element={<RegisterForm />} />
            <Route path="login" element={<LoginForm />} />
        </Route>
        )
    )
    return (
        <RouterProvider router={router}/>
    )
}

export default Router