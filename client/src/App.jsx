import React, { useEffect, useState} from 'react'
import Footer from './components/Footer/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import QuizCreate from './pages/quizCreate/quizCreate'
import Navbar from './components/Navbar/Navbar'
import Login from './components/Login/Login'
import SignUp from './components/signup/Signup'
import JoinQuiz from './pages/joinQuiz/JoinQuiz'


const App = () => {
  const [login,showLogin] = useState(false)
  const [signup,showSignup] = useState(false)

  return (
    <div>
      {login?<Login showLogin={showLogin} showSignup={showSignup}/>:""}
      {signup?<SignUp showLogin={showLogin} showSignup={showSignup}/>:""}
      <Navbar showLogin={showLogin} showSignup={showSignup}/>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/quiz-create" element={<QuizCreate />} />
          <Route path='/join-quiz' element={<JoinQuiz/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
