import './App.css'
import { Outlet } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import Navbar from "./components/navbar/Navbar";

function App() {
  return(
    <>
      {/* <Toaster /> */}
      {/* <p>Hello word</p> */}
      <Outlet/> 
    </>
  );
}

export default App
