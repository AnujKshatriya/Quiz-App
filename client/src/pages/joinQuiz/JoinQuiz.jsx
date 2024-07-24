import React from 'react'
import "./JoinQuiz.css"
import SocketConnection from '../../custom hooks/SocketConnection'

const JoinQuiz = () => {

    SocketConnection()
    
  return (
    <div>
      JoinQuiz
    </div>
  )
}

export default JoinQuiz
