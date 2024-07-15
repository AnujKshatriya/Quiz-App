import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import BodySection from './components/SampleBody/samplebody'
import AppDownload from './components/App/App'
import Login from './components/Login/Login'
import SignUp from './components/signup/Signup'
import io from 'socket.io-client'

const App = () => {
  const [login,showLogin] = useState(false)
  const [signup,showSignup] = useState(false)

  useEffect(()=>{
    const socket = io("http://localhost:3000",{
      transports: ['websocket', 'polling'],
    })
    // console.log(socket)
    return ()=>{
      socket.close()
    }
  },[])

  return (
    <div>

      {login?<Login showLogin={showLogin} showSignup={showSignup}/>:""}
      {signup?<SignUp showLogin={showLogin} showSignup={showSignup}/>:""}
      <Navbar showLogin={showLogin} showSignup={showSignup}/>

      <BodySection/>
      <AppDownload/>
      <Footer/>
    </div>
  )
}

export default App
