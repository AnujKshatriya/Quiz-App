import React, { useEffect} from 'react'
import Footer from './components/Footer/Footer'
import { Route, Routes } from 'react-router-dom'
import io from 'socket.io-client'
import Home from './pages/Home/Home'
import QuizCreate from './pages/quizCreate/quizCreate'


const App = () => {
  

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

      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/quiz-create" element={<QuizCreate />} />
        </Routes>
      <Footer/>
    </div>
  )
}

export default App
