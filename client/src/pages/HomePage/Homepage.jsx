import React from 'react'
import './Homepage.css'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Homepage() {

  const [ value, setValue] = useState(null)
  const [ message, setMessage] = useState(null)
  const [ previousChat, setPreviousChat] = useState([])
  const [ currentTitle, setCurrentTitle] = useState(null)

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

  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle)
    setMessage(null)
    setValue("")
  }

  const createNewChat = () => {
    setMessage(null)
    setValue("")
    setCurrentTitle(null)
  }
  
  const getMessages = async () => {
    const options = {
      method: "POST",
      body : JSON.stringify({
        message: value
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }
    try {
      const response = await fetch('http://localhost:8080/api/v1/openai/search', options)
      const data = await response.json()
      // console.log(data)
      setMessage(data.choices[0].message)
    }catch (error){
      console.log(error)
    }
  }

  useEffect(() => {
      console.log(currentTitle, value, message)
      if (!currentTitle && value && message){
        setCurrentTitle(value)
      }
      if(currentTitle && value && message){
        setPreviousChat(prevChats => (
          [...prevChats,
            {
              title: currentTitle,
              role: "user",
              content: value
            },
            {
              title: currentTitle,
              role: message.role,
              content: message.content
            }
          ]
        ))
      }
  }, [message, currentTitle]) 

  const currentChat = previousChat.filter(previousChat => previousChat.title === currentTitle)

  const uniqueTitles = Array.from(new Set(previousChat.map(previousChat => previousChat.title)))

  console.log(uniqueTitles)
  
    return (
      <>
        <div className='app'>
          <section className='side-bar'> 
            <button onClick={createNewChat}>+ New chat</button>
            <ul className='history'>
              {uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
            </ul>
            <nav>
            {loggedIn ? (
              <>
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
            )}
            </nav>
          </section>
          <section className='main'>
            {!currentTitle && <h2>Keiken GPT</h2>}
            <ul className='feed'>
              {currentChat?.map((chatMessage, index) => 
              <li key={index}>
                <p className='role'>{chatMessage.role}</p>
                <p>{chatMessage.content}</p>
              </li>)}
            </ul>
            <div className='buttom-section'>
              <div className='input-container'>
                <input value={value} 
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                          
                          getMessages();
                          setValue('') 
                        }
                        }}
                />
                <div id='submit' onClick={getMessages}>➢</div>
              </div>
              <p className='info'>
                ChatGPT can make mistakes. Consider checking important information. Implemented By The Chosen.
              </p>
            </div>
          </section>
        </div>
      </>
    )
}

export default Homepage