import './App.css'
import { Outlet } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import LoginForm from './components/loginForm/LoginForm';

function App() {
  return(
    <>
      <Toaster />
      {/* <p>Hello word</p> */}
      <Outlet/> 
      <LoginForm />
    </>
  );
}

export default App
